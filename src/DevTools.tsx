import { SentMessage, User } from "./types";
import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import Select from "@athena/forge/Select";
import { deleteMessage } from "./api/messagesApi";

type DevToolsProps = {
  user: User;
  users: User[];
  setUser: (user: User) => void;
  messages: SentMessage[];
  setMessages: (sentMessages: SentMessage[]) => void;
};

export default function DevTools({
  users,
  setUser,
  user,
  messages,
  setMessages,
}: DevToolsProps) {
  return (
    <Form
      includeSubmitButton={false}
      style={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "lightblue",
        padding: 16,
      }}
    >
      <FormField
        inputAs={Select}
        id="select-user"
        labelText="Select user"
        onChange={(event) => {
          const user = users.find(
            (u) => u.username === event.currentTarget.value
          );
          setUser(user!);
        }}
        options={users.map((u) => u.username)}
        value={user.username}
      />

      <FormField
        inputAs={Select}
        id="delete-message"
        labelText="Message to Delete"
        onChange={(event) => {
          const id = parseInt(event.currentTarget.value);
          deleteMessage(id);
          setMessages(messages.filter((m) => m.id !== id));
        }}
        options={messages.map((m) => {
          return { text: m.message, value: m.id };
        })}
        value={messages.length > 0 ? messages[0].message : ""}
      />
    </Form>
  );
}
