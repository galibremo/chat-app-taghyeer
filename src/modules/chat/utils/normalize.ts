import {
  NormalizedConversation,
  NormalizedMessage,
  RawConversation,
  RawMessage,
  SocketMessageNewPayload,
  User,
} from "@/types/chat";

export function isValidLastMessage(msg: unknown): msg is RawMessage {
  if (!msg || typeof msg !== "object") return false;
  const candidate = msg as Record<string, unknown>;
  return (
    typeof candidate.text === "string" &&
    candidate.text.trim().length > 0 &&
    (candidate.createdAt !== undefined || candidate.sender !== undefined)
  );
}

export function normalizeMessage(
  raw: RawMessage | SocketMessageNewPayload,
): NormalizedMessage {
  const _id =
    ("_id" in raw && raw._id) ||
    ("id" in raw && raw.id) ||
    `temp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  let createdAtIso: string;
  if (typeof raw.createdAt === "number") {
    createdAtIso = new Date(raw.createdAt).toISOString();
  } else if (typeof raw.createdAt === "string") {
    createdAtIso = raw.createdAt;
  } else {
    createdAtIso = new Date().toISOString();
  }

  return {
    _id,
    conversation: raw.conversation,
    sender: (() => {
      const senderVal = raw.sender as unknown;
      if (typeof senderVal === "string") return senderVal;
      if (
        typeof senderVal === "object" &&
        senderVal !== null &&
        "_id" in senderVal
      ) {
        return String((senderVal as { _id: unknown })._id);
      }
      return "";
    })(),
    text: raw.text || "",
    createdAt: createdAtIso,
    status: "sent",
  };
}

export function normalizeConversation(
  raw: RawConversation,
  currentUserId?: string,
): NormalizedConversation {
  const isGroup = raw.type === "group";

  let participants: User[] = [];
  let participant: User | undefined = undefined;
  let name = "";
  let admins: string[] = [];

  if (isGroup) {
    name = raw.name || "Group Chat";
    participants = Array.isArray(raw.participants) ? raw.participants : [];
    admins = raw.admins || [];
  } else {
    // Direct Conversation
    if ("participant" in raw && raw.participant) {
      participant = raw.participant;
      name = participant.name;
      participants = [participant];
    } else if (Array.isArray(raw.participants)) {
      // If participants is an array of objects
      const userObjs = raw.participants.filter(
        (p): p is User => typeof p === "object" && p !== null && "_id" in p,
      );
      if (userObjs.length > 0) {
        participants = userObjs;
        const other =
          userObjs.find((u) => u._id !== currentUserId) || userObjs[0];
        participant = other;
        name = other?.name || "Direct Chat";
      } else {
        name = "Direct Chat";
      }
    } else {
      name = "Direct Chat";
    }
  }

  const lastMessage = isValidLastMessage(raw.lastMessage)
    ? normalizeMessage(raw.lastMessage as RawMessage)
    : null;

  let updatedAt = raw.updatedAt || raw.createdAt || new Date().toISOString();

  if (lastMessage && lastMessage.createdAt) {
    const lastMsgTime = new Date(lastMessage.createdAt).getTime();
    const updatedTime = new Date(updatedAt).getTime();
    if (!isNaN(lastMsgTime) && (isNaN(updatedTime) || lastMsgTime > updatedTime)) {
      updatedAt = lastMessage.createdAt;
    }
  }

  return {
    _id: raw._id,
    type: isGroup ? "group" : "direct",
    name,
    participants,
    participant,
    admins,
    createdBy: "createdBy" in raw ? raw.createdBy : undefined,
    lastMessage,
    updatedAt,
  };
}

export function getConversationTimestamp(conv: NormalizedConversation): number {
  const lastMsgTime = conv.lastMessage?.createdAt
    ? new Date(conv.lastMessage.createdAt).getTime()
    : 0;
  const updatedAtTime = conv.updatedAt
    ? new Date(conv.updatedAt).getTime()
    : 0;
  const validLastMsgTime = isNaN(lastMsgTime) ? 0 : lastMsgTime;
  const validUpdatedAtTime = isNaN(updatedAtTime) ? 0 : updatedAtTime;
  return Math.max(validLastMsgTime, validUpdatedAtTime);
}

export function sortConversations(
  conversations: NormalizedConversation[],
): NormalizedConversation[] {
  return [...conversations].sort(
    (a, b) => getConversationTimestamp(b) - getConversationTimestamp(a),
  );
}

export function updateConversationsList(
  conversations: NormalizedConversation[],
  updatedConv: NormalizedConversation,
): NormalizedConversation[] {
  const filtered = conversations.filter((c) => c._id !== updatedConv._id);
  return sortConversations([updatedConv, ...filtered]);
}
