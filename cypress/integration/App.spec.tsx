/// <reference types="cypress" />

describe("App", () => {
  it("should display messages for the default user", () => {
    cy.visit("http://localhost:3000");
    cy.findByText("Hi jeffsalinas");
  });

  it("should support changing the user via DevTools", () => {
    cy.visit("http://localhost:3000");

    // First, the default user should display
    cy.findByText("Hi jeffsalinas");

    // Now, let's change the user
    cy.findByLabelText("Select user").select("coryhouse");

    cy.findByLabelText("chat").within(() => {
      // Now only Cory's messages should display
      cy.findByText("Hi Cory, it's Jeff");
    });
  });

  //   To make this atomic:
  // 1. Click delete in the app
  // 2. Expose a function in dev tools to remove a message
  // 3. Remove the message using a HTTP call to the mock
  // 4. Reset the database

  it("should support posting a new message", () => {
    cy.visit("http://localhost:3000");
    cy.findByLabelText("Message").type("Example message");
    cy.findByRole("button", { name: "Send" }).click();
    cy.findByText("Example message");

    // Delete the message that was just created using the dev tools
    cy.findByLabelText("Message to Delete").select("Example message");

    cy.findByLabelText("chat").within(() => {
      // Now make sure the delete worked. Message shouldn't display anymore
      cy.findByText("Example message").should("not.exist");
    });
  });
});
