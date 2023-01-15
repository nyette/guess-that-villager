/* eslint-disable */

describe("the game", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
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
    cy.contains("Start Next Round").should("be.visible");
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
    cy.contains("Error").should("be.visible");
    cy.contains("Return To Main Menu").should("be.visible");
    cy.contains("Return To Main Menu").click();
    cy.contains("Guess That Villager").should("be.visible");
  });
});
