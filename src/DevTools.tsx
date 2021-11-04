import { User } from "./types";
import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import Select from "@athena/forge/Select";

type DevToolsProps = {
  user: User;
  users: User[];
  setUser: (user: User) => void;
};

export function DevTools({ users, setUser, user }: DevToolsProps) {
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
    </Form>
  );
}
