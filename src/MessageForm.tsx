import Form from "@athena/forge/Form";
import Textarea from "@athena/forge/Textarea";
import FormField from "@athena/forge/FormField";
import Button from "@athena/forge/Button";
import { UnsentMessage } from "./types";
import { useState } from "react";

type MessageFormProps = {
  onSubmit: (UnsentMessage: UnsentMessage) => Promise<void>;
};

export function MessageForm({ onSubmit }: MessageFormProps) {
  const [message, setMessage] = useState("");

  return (
    <Form
      includeSubmitButton={false}
      onSubmit={async (event) => {
        event.preventDefault();
        const unsentMessage: UnsentMessage = {
          date: new Date().toISOString(),
          message,
          // HACK: Hard coding ids. TODO: Fix.
          recipientUserId: 1,
          senderUserId: 2,
        };
        await onSubmit(unsentMessage);
        setMessage(""); // clear the message input since it was just submitted
      }}
    >
      <FormField
        labelAlwaysAbove
        labelText="Message"
        id="message"
        inputAs={Textarea}
        value={message}
        onChange={(event) => setMessage(event.currentTarget.value)}
      />
      <Button type="submit" text="Send" disabled={!message} />
    </Form>
  );
}
