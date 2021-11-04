import { SentMessage } from "../types";

export async function getMessages(): Promise<SentMessage[]> {
  const resp = await fetch("http://localhost:3001/messages");
  if (!resp.ok) throw resp;
  return resp.json();
}
