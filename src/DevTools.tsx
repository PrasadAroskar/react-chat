import { User } from "./types";
import Form from "@athena/forge/Form";
import FormField from "@athena/forge/FormField";
import Select from "@athena/forge/Select";
import userEvent from "@testing-library/user-event";

type DevToolsProps = {
  users: User[];
};

export function DevTools({ users }: DevToolsProps) {
  return (
    <Form
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
        options={users.map((u) => u.username)}
      />
    </Form>
  );
}
