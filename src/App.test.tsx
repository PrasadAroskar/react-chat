import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("App", () => {
  it("should display a message input with an accessible label", () => {
    render(<App />);
    screen.getByLabelText("Message");
  });
});
