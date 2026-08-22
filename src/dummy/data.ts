import { FAQItem } from "@/types/types";

export const FAQS: FAQItem[] = [
  {
    question: "How does the real-time message delivery work?",
    answer:
      "Our app uses Socket.io with dual WebSocket and HTTP long-polling transports. When you send a message, it is optimistically displayed in your UI while being persisted via REST API and broadcast in real-time to active chat room members.",
  },
  {
    question: "Can I create both Direct and Group chats?",
    answer:
      "Yes! You can search registered users by name or phone number to initiate 1-to-1 Direct chats, or select multiple team members to launch custom Group chats.",
  },
  {
    question: "What privileges do Group Admins have?",
    answer:
      "Group creators automatically receive Admin privileges. Admins can rename the group, add new participants, promote existing members to Admin, or remove members from the group.",
  },
  {
    question: "How does authentication and route protection work?",
    answer:
      "Authentication tokens are stored securely in HTTP-only cookies. Next.js 16 Proxy middleware protects private routes such as /chat, automatically redirecting unauthenticated users to the login screen.",
  },
  {
    question: "Is the interface responsive on mobile devices?",
    answer:
      "Absolutely! The chat application uses a fully responsive layout with mobile navigation controls, allowing seamless switching between conversation lists and active message feeds.",
  },
];
