import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";
import { MessageForm } from "./MessageForm";

describe("App", () => {
  beforeEach(() => {
    render(<App />);
    (fetch as jest.Mock).mockClear();
  });
  it("should display a message input with an accessible label", () => {
    screen.getByLabelText("Message");
  });

  it("should render a Submit button with a label of 'Send'", () => {
    screen.getByRole("button", { name: "Send" });
  });

  it("should set aria-disabled on the Send button when the Message textarea is empty", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    expect(sendButton).toHaveAttribute("aria-disabled", "true");
  });

  it("should NOT disable the Send button when the Message textarea is populated", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");
    expect(sendButton).toHaveAttribute("aria-disabled", "false");
  });
});
