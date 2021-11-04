import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import React, { Suspense, useEffect, useState } from "react";
import List from "@athena/forge/List";
import ListItem from "@athena/forge/ListItem";
import { getMessages, sendMessage } from "./api/messagesApi";
import { SentMessage, UnsentMessage, User } from "./types";
import { MessageForm } from "./MessageForm";
import { getUsers } from "./api/userApi";

const DevTools = React.lazy(() => import("./DevTools"));

export function App() {
  const [messages, setMessages] = useState<SentMessage[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [user, setUser] = useState<User>({
    id: 3,
    username: "John_Cena",
  });

  useEffect(() => {
    async function init() {
      const _users = await getUsers();
      setUsers(_users);
    }
    init();
  }, []);

  useEffect(() => {
    async function getInitialData() {
      // todo: use promise all
      const _messages = await getMessages(user.id);
      const _users = await getUsers();
      setMessages(_messages);
      setUsers(_users);
    }
    getInitialData();
  }, [user.id]); // Only run this once.

  async function handelSubmit(unsentMessage: UnsentMessage) {
    // TODO: Handle loading state. Consider optimistic update.
    const sentMessage = await sendMessage(unsentMessage);

    setMessages([...messages, sentMessage]);
  }

  return (
    <Root>
      <header style={{ backgroundColor: "limegreen", padding: 14 }}>
        <h2> Hi, {user.username} </h2>
      </header>

      <section aria-labelleby="chat-heading">
        <h1>Chat</h1>

        <List>
          {messages.map((m, index) => (
            <ListItem key={index}>{m.message}</ListItem>
          ))}
        </List>

        <MessageForm onSubmit={handelSubmit} />
      </section>
      <Suspense fallback="loading...">
        {process.env.REACT_APP_SHOW_DEV_TOOLS === "Y" && (
          <DevTools
            users={users}
            setUser={setUser}
            user={user}
            messages={messages}
            setMessages={setMessages}
          />
        )}
      </Suspense>
    </Root>
  );
}
