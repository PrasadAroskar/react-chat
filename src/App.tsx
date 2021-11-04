import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import { useEffect, useState } from "react";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { getMessages, sendMessage } from "./api/messagesApi";
import { SentMessage, UnsentMessage, User } from "./types";
import { MessageForm } from "./MessageForm";

export function App() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [user, setUser] = useState<User>({
    id: 1,
    username: "prasadaroskar",
  });

  useEffect(() => {
    async function getInitialMessages() {
      const _messages = await getMessages();
      setMessages(_messages);
    }
    getInitialMessages();
  }, []); // Only run this once.

  async function handelSubmit(unsentMessage: UnsentMessage) {
    // TODO: Handle loading state. Consider optimistic update.
    const sentMessage = await sendMessage(unsentMessage);

    setMessages([...messages, sentMessage]);
  }

  return (
    <Root>
      <h1>Chat</h1>

      <List>
        {messages.map((m, index) => (
          <ListItem key={index}>{m.message}</ListItem>
        ))}
      </List>

      <MessageForm onSubmit={handelSubmit} />
    </Root>
  );
}
