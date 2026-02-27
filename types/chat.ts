export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
}

export interface MenuOption {
  label: string;
  message: string;
}
