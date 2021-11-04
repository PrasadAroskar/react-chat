import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

(window as any).fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
  })
);

describe("App", () => {
  beforeEach(() => {
    render(<App />);
    (fetch as jest.Mock).mockClear();
  });

  it.skip("should clear out the textarea when submit button is clicked", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");

    // Clicking this will clear the message input
    userEvent.click(sendButton);

    // Now the message input should be empty
    expect(messageInput).toHaveValue("");

    // send button should be disabled again since we just submitted a message, thus the field is empty.
    expect(sendButton).toHaveAttribute("aria-disabled", "true");
  });

  it("should display a message after send is clicked", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");
    userEvent.click(sendButton);
    screen.getByText("example message");
  });
});
