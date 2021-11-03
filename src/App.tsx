import Form from "@athena/forge/Form";
import Root from "@athena/forge/Root";
import "@athena/forge/dist/forge.css";
import Textarea from "@athena/forge/Textarea";
import FormField from "@athena/forge/FormField";

export function App() {
  return (
    <Root>
      <h1>Chat</h1>
      <Form>
        <FormField labelText="Message" id="message" inputAs={Textarea} />
      </Form>
    </Root>
  );
}
