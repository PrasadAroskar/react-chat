import { SentMessage, UnsentMessage } from "../types";

export async function getMessages(): Promise<SentMessage[]> {
  const resp = await fetch("http://localhost:3001/messages");
  if (!resp.ok) throw resp;
  return resp.json();
}

export async function sendMessage(
  unsentMessage: UnsentMessage
): Promise<SentMessage> {
  const resp = await fetch("http://localhost:3001/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(unsentMessage),
  });
  if (!resp.ok) throw resp;
  return resp.json();
}
