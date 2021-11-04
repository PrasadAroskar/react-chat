import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { App } from "./App";

const mockFetch = jest.fn(
  () =>
    new Promise((resolve) => {
      resolve({
        ok: true,
        status: 200,
        json: async () => ({ response: { STATUS: "SUCCESS" } }),
      });
    })
);

(global as any).fetch = mockFetch;

describe("App", () => {
  beforeEach(() => {
    render(<App />);
    (fetch as jest.Mock).mockClear();
  });

  it.skip("should clear out the message textarea when 'Send' is clicked", async () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");

    // Clicking this should clear the message input.
    userEvent.click(sendButton);

    // Now, the message input should be empty.
    await waitFor(() => {
      expect(messageInput).toHaveValue("");
    });

    // Send button should be disabled again since we just submitted a message, thus, the field is empty.
    expect(sendButton).toHaveAttribute("aria-disabled", "true");
  });

  it("should display the message after Send is clicked", () => {
    const sendButton = screen.getByRole("button", { name: "Send" });
    const messageInput = screen.getByLabelText("Message");
    userEvent.type(messageInput, "example message");
    userEvent.click(sendButton);
    screen.getByText("example message");
  });
});
