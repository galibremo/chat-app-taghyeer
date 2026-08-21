# Chat API Documentation

Base URL (REST): `https://frontend-task-chatapp.onrender.com/api`
WebSocket URL: `https://frontend-task-chatapp.onrender.com` (root, NOT `/api` — Socket.io serves itself at `/socket.io/`)

> Note: the official Swagger spec only documents requests, not responses or status codes.
> Response bodies and status codes below were captured by manually calling the live API.

---

## Authentication

All protected endpoints require:

```
Authorization: Bearer <token>
```

Token is obtained from `POST /auth/login`.

### POST /auth/login

Logs in an existing user or registers a new one automatically if the phone number hasn't been seen before.

**Auth required:** No

**Request body**
| Field | Type | Required | Description |
|-------|--------|----------|----------------------|
| phone | string | yes | User's phone number |
| name | string | yes | Display name |

**Success response** `200 OK` — same status for both login and register, no separate 201 for new users

```json
{
  "token": "<jwt>",
  "user": {
    "_id": "6a882835e5d6aac97521e521",
    "name": "Galib Remo",
    "phone": "01744716387",
    "createdAt": "2026-08-21T10:28:05.630Z"
  }
}
```

**Error responses**

- `500` — see "Common Error Shape" below (malformed input errors surface as generic server errors on this API rather than clean 400s)

---

### GET /auth/me

Returns the currently authenticated user.

**Auth required:** Yes

**Success response** `200 OK`

```json
{
  "_id": "6a882835e5d6aac97521e521",
  "name": "Galib Remo",
  "phone": "01744716387",
  "createdAt": "2026-08-21T10:28:05.630Z"
}
```

Note: returned directly as the user object, not wrapped in a `user` key (unlike the login response).

---

## Users

### GET /users/search

Searches for users by name or phone number.

**Auth required:** Yes

**Query params**
| Param | Type | Required | Description |
|-------|--------|----------|-------------------------------|
| q | string | yes | Search term (name or phone) — confirmed via `?q=Galib%20Remo` |

**Success response** `200 OK`

```json
[
  {
    "_id": "6a882835e5d6aac97521e521",
    "name": "Galib Remo",
    "phone": "01744716387"
  }
]
```

Returns a plain array (not wrapped), unlike `GET /conversations` which wraps results in `data`.

---

## Conversations

### GET /conversations

Lists all conversations for the logged-in user (direct + group).

**Auth required:** Yes

**Success response** `200 OK`

```json
{
  "data": [
    {
      "_id": "6a882c94e5d6aac97521e79c",
      "type": "group",
      "lastMessage": {},
      "updatedAt": "2026-08-21T10:56:24.728Z",
      "name": "Galib's Team",
      "createdBy": "6a882835e5d6aac97521e521",
      "admins": ["6a882835e5d6aac97521e521", "6a882c77e5d6aac97521e78f"],
      "participants": [
        {
          "_id": "6a882835e5d6aac97521e521",
          "name": "Galib Remo",
          "phone": "01744716387"
        },
        {
          "_id": "6a882a32e5d6aac97521e69a",
          "name": "Test User",
          "phone": "01601716388"
        },
        {
          "_id": "6a882c77e5d6aac97521e78f",
          "name": "Random Number",
          "phone": "01784722435"
        }
      ]
    },
    {
      "_id": "6a882a90e5d6aac97521e6dd",
      "type": "direct",
      "lastMessage": {
        "text": "Hello!",
        "sender": "6a882835e5d6aac97521e521",
        "createdAt": "2026-08-21T10:42:09.821Z"
      },
      "updatedAt": "2026-08-21T10:42:10.067Z",
      "participant": {
        "_id": "6a882a32e5d6aac97521e69a",
        "name": "Test User",
        "phone": "01601716388"
      }
    }
  ]
}
```

**Notes / inconsistencies worth flagging in your write-up**

- Response shape differs by conversation `type`: **group** conversations return a `participants` array (all members) and a `name`; **direct** conversations return a single `participant` object (singular key — the other person) and no `name`. Your frontend needs to branch on `type` to normalize this into one shape.
- `lastMessage` is an empty object `{}` when a group has no messages yet, rather than `null` — worth guarding against in the UI (empty state on the conversation list item).

---

### POST /conversations

Starts a new direct (1-to-1) conversation.

**Auth required:** Yes

**Request body**
| Field | Type | Required | Description |
|--------|--------|----------|-------------------------------|
| userId | string | yes | ID of the user to chat with |

**Success response** `200 OK`

```json
{
  "_id": "6a882a90e5d6aac97521e6dd",
  "participants": ["6a882835e5d6aac97521e521", "6a882a32e5d6aac97521e69a"],
  "createdAt": "2026-08-21T10:38:08.930Z"
}
```

**Notes / inconsistencies**

- This response is noticeably different from how the same conversation appears in `GET /conversations`: here `participants` is a **plain array of ID strings**, there it's a single populated `participant` object. Also missing `type` and `updatedAt` here. Recommend normalizing both into one shape client-side, and mention this discrepancy in your Part 3 write-up.
- Not tested: whether calling this again with a `userId` you already have a direct conversation with returns the existing conversation or creates a duplicate — worth stating as an assumption if you don't test it (e.g. "assumed the API is idempotent here; not confirmed").

---

### GET /conversations/{id}/messages

Returns message history for a conversation.

**Auth required:** Yes

**Path params**
| Param | Type | Description |
|-------|--------|--------------------|
| id | string | Conversation ID |

**Query params**
| Param | Type | Required | Description |
|-------|--------|----------|--------------------------------------------|
| limit | number | no | Max messages to return — confirmed via `?limit=20` |

**Success response** `200 OK`

```json
{
  "messages": [
    {
      "_id": "6a882b81e5d6aac97521e756",
      "conversation": "6a882a90e5d6aac97521e6dd",
      "sender": "6a882835e5d6aac97521e521",
      "text": "Hello!",
      "createdAt": "2026-08-21T10:42:09.821Z"
    }
  ],
  "hasMore": false
}
```

**Notes**

- `hasMore` is a boolean flag, but no cursor/offset param (e.g. `before`, `page`, `skip`) was found in the spec or tested. If pagination beyond the first page is needed, this is ambiguous — worth noting as an open assumption in your write-up.

---

## Groups

### POST /conversations/group

Creates a group conversation.

**Auth required:** Yes

**Request body**
| Field | Type | Required | Description |
|----------------|----------|----------|----------------------------------|
| name | string | yes | Group name |
| participantIds | string[] | yes | IDs of members to include |

**Success response** `201 Created` — the one endpoint in this API that returns 201 instead of 200

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's Org",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    }
  ],
  "createdAt": "2026-08-21T10:46:44.560Z",
  "updatedAt": "2026-08-21T10:46:44.560Z"
}
```

Creator is automatically added to `admins` (matches the description on the docs page).

---

### POST /conversations/{id}/participants

Adds members to an existing group.

**Auth required:** Yes (admin-only, per the docs page description — not independently confirmed)

**Path params:** `id` — conversation ID

**Request body**
| Field | Type | Required | Description |
|----------|----------|----------|----------------------|
| userIds | string[] | yes | IDs of users to add |

**Success response** `200 OK`
Returns the full updated group object with the new member appended to `participants`:

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's Org",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    },
    {
      "_id": "6a882468e5d6aac97521e25e",
      "name": "Recon User",
      "phone": "+15551234567"
    }
  ],
  "createdAt": "2026-08-21T10:46:44.560Z",
  "updatedAt": "2026-08-21T10:48:55.615Z"
}
```

---

### DELETE /conversations/{id}/participants/{userId}

Removes a member from a group, or lets a member leave.

**Auth required:** Yes

**Path params**
| Param | Type | Description |
|--------|--------|-----------------------------------|
| id | string | Conversation ID |
| userId | string | User to remove (or self, to leave)|

**Success response** `200 OK`
Returns the full updated group object with the member removed from `participants`:

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's Org",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    }
  ],
  "createdAt": "2026-08-21T10:46:44.560Z",
  "updatedAt": "2026-08-21T10:51:05.859Z"
}
```

See "Common Error Shape" below for what happens with a malformed `userId`.

---

### POST /conversations/{id}/admins

Promotes a member to admin.

**Auth required:** Yes (admin-only, per docs page — not independently confirmed)

**Path params:** `id` — conversation ID

**Request body**
| Field | Type | Required | Description |
|--------|--------|----------|-----------------------------|
| userId | string | yes | User to promote to admin |

**Success response** `200 OK`
Returns the full updated group object with the new admin appended to `admins`:

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's Org",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521", "6a882c77e5d6aac97521e78f"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    }
  ],
  "createdAt": "2026-08-21T10:46:44.560Z",
  "updatedAt": "2026-08-21T10:55:23.207Z"
}
```

**Confirmed error case:** calling this with a malformed `userId` returns a `500` — see "Common Error Shape" below.

---

### PATCH /conversations/{id}

Renames a group.

**Auth required:** Yes (admin-only, per docs page — not independently confirmed)

**Path params:** `id` — conversation ID

**Request body**
| Field | Type | Required | Description |
|-------|--------|----------|----------------|
| name | string | yes | New group name |

**Success response** `200 OK`
Returns the full updated group object with the new `name`:

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's Team",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521", "6a882c77e5d6aac97521e78f"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    }
  ],
  "createdAt": "2026-08-21T10:46:44.560Z",
  "updatedAt": "2026-08-21T10:56:24.728Z"
}
```

**Pattern worth noting:** every group-mutation endpoint (`/participants`, `/participants/{userId}`, `/admins`, `PATCH /{id}`) returns the **entire updated group object**, not just a confirmation or the changed field. Handy — you can just replace your local conversation state with the response directly.

---

## Messages

### POST /messages

Sends a new message in a conversation (works for both direct and group).

**Auth required:** Yes

**Request body**
| Field | Type | Required | Description |
|----------------|--------|----------|----------------------|
| conversationId | string | yes | Target conversation |
| text | string | yes | Message content |

**Success response** `200 OK`

```json
{
  "_id": "6a882b81e5d6aac97521e756",
  "conversation": "6a882a90e5d6aac97521e6dd",
  "sender": "6a882835e5d6aac97521e521",
  "text": "Hello!",
  "createdAt": "2026-08-21T10:42:09.821Z"
}
```

`sender` is a plain ID string here, not populated with name/phone — you'll likely need to cross-reference against the conversation's `participants` list client-side to show the sender's name.

**Notes**

- Not confirmed whether empty/whitespace-only `text` is rejected server-side — treat this as a frontend responsibility regardless (disable send button / trim + check before calling).

---

## Common Error Shape

Every error tested on this API — regardless of the actual mistake (bad ObjectId format on different endpoints, different fields/models involved) — comes back the same way:

```json
{
  "error": {
    "message": "Cast to ObjectId failed for value \"6a882468e5d6aac97\" (type string) at path \"_id\" for model \"User\"",
    "code": "SERVER_ERROR"
  }
}
```

Two examples hit during testing, both with the same `code: "SERVER_ERROR"` and (assumed) `500` status:

- Removing a participant with a malformed `userId` → cast error at path `"admins"`
- Promoting a malformed `userId` to admin → cast error at path `"_id"` for model `"User"`

**Flag this in your Part 3 write-up:** this looks like a raw, unhandled Mongoose/Mongo cast error leaking straight through to the client as a generic `500 SERVER_ERROR`, rather than the API validating the ID format itself and returning a clean `400 Bad Request`. Practical implication for your frontend: don't assume a clean, predictable `{ error: { message } }` you can just show verbatim — treat any error response defensively (e.g. show a generic "something went wrong" toast rather than surfacing the raw Mongoose message to the user), and validate ID formats client-side where possible before sending.

---

## WebSocket (Socket.io)

Not part of the OpenAPI spec — documented here manually and tested with a small `socket.io-client` script.

**Connection**

```js
const socket = io("https://frontend-task-chatapp.onrender.com", {
  auth: { token },
});
```

Connect at the server root, not the `/api` REST base. Invalid/missing token is rejected at handshake.

### Events

**Client → Server**

`message:send`

```json
{ "conversationId": "<id>", "text": "<message text>" }
```

Optional ack callback — confirmed payload:

```json
{ "ok": true }
```

Simple success flag, not the created message object. If you need the created message client-side right after sending, either rely on the REST `POST /messages` response instead, or wait for your own `message:new` event (note: not confirmed whether the sender also receives their own `message:new` — earlier testing suggested it's only pushed to _other_ participants, so don't assume it fires for the sender).

**Server → Client**

`message:new` — fires when a new message arrives. Confirmed payload:

```json
{
  "id": "6a883e61e5d6aac975220c27",
  "conversation": "6a882c94e5d6aac97521e79c",
  "sender": "6a882a32e5d6aac97521e69a",
  "text": "Hello!",
  "createdAt": 1787313761682
}
```

⚠️ **Inconsistency worth flagging in your write-up:** this uses `id` (not `_id` like every REST response) and `createdAt` is a **raw Unix timestamp number**, not the ISO 8601 string format used everywhere else in the API (e.g. `POST /messages` returns `createdAt: "2026-08-21T10:42:09.821Z"`). Your frontend needs to normalize this — e.g. convert this socket payload into the same shape as REST messages before merging it into local state, or your timestamp formatting/sorting logic will break on one or the other.

`conversation:updated` — fires when a group's name, membership, or admins change (confirmed via a rename; presumed to fire the same way for add/remove participant and promote-admin, though only rename was directly tested). Confirmed payload:

```json
{
  "_id": "6a882c94e5d6aac97521e79c",
  "type": "group",
  "name": "Galib's ORG",
  "createdBy": "6a882835e5d6aac97521e521",
  "admins": ["6a882835e5d6aac97521e521", "6a882c77e5d6aac97521e78f"],
  "participants": [
    {
      "_id": "6a882835e5d6aac97521e521",
      "name": "Galib Remo",
      "phone": "01744716387"
    },
    {
      "_id": "6a882a32e5d6aac97521e69a",
      "name": "Test User",
      "phone": "01601716388"
    },
    {
      "_id": "6a882c77e5d6aac97521e78f",
      "name": "Random Number",
      "phone": "01784722435"
    }
  ]
}
```

This one uses `_id` and matches the REST group-mutation response shape exactly — consistent with REST, unlike `message:new` above. Handy: you can drop this straight into your conversation state the same way you'd handle a REST group-mutation response.

---

## Schema Reference (from spec)

| Schema                   | Fields                     |
| ------------------------ | -------------------------- |
| LoginRequest             | `phone*`, `name*`          |
| StartConversationRequest | `userId*`                  |
| SendMessageRequest       | `conversationId*`, `text*` |
| CreateGroupRequest       | `name*`, `participantIds*` |
| AddParticipantsRequest   | `userIds*`                 |
| PromoteRequest           | `userId*`                  |
| RenameGroupRequest       | `name*`                    |

`*` = required field
