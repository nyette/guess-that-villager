describe("the game", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("allows the user to continue, if their guess is correct", () => {
    cy.intercept("https://acnhapi.com/v1/villagers/*", {
      fixture: "villager",
    }).as("getVillager");
    cy.contains("Play").click();
    cy.wait("@getVillager");
    cy.get("input").should("be.visible");
    cy.get("input").should("have.value", "");
    cy.get("input").type("Pietro");
    cy.get("input").should("have.value", "Pietro");
    cy.contains("Submit").click();
    cy.contains("Correct").should("be.visible");
    cy.contains("Continue").should("be.visible");
    cy.contains("Continue").click();
    cy.get("input").should("have.value", "");
    cy.contains("Submit").click();
    cy.contains("Game Over").should("be.visible");
  });

  it("allows the user to replay, if their guess is wrong", () => {
    cy.contains("Play").click();
    cy.contains("Submit").click();
    cy.contains("Game Over").should("be.visible");
    cy.contains("Replay").should("be.visible");
    cy.contains("Replay").click();
    cy.get("input").should("be.visible");
    cy.get("input").should("have.value", "");
    cy.contains("Submit").click();
    cy.contains("Game Over").should("be.visible");
  });

  it("allows the user to return to the main menu, if there is an error", () => {
    cy.intercept("https://acnhapi.com/v1/villagers/*", { statusCode: 404 }).as(
      "getVillager"
    );
    cy.contains("Play").click();
    cy.wait("@getVillager");
    cy.contains("Oops").should("be.visible");
    cy.contains("Quit").should("be.visible");
    cy.contains("Quit").click();
    cy.contains("Guess That Villager").should("be.visible");
  });
});
