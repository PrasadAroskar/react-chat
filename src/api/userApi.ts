import { User } from "../types";

export async function getUSers(): Promise<User[]> {
  const resp = await fetch("http://localhost:3001/users");
  if (!resp.ok) throw resp;
  return resp.json();
}
