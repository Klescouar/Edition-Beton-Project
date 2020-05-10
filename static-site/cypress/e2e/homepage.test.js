/// <reference types="Cypress" />

describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should display a link to about page", () => {
    cy.contains("En savoir plus").click();
    cy.url().should("include", "/about");
  });

  it("should display a list of categories", () => {
    cy.contains("Par catégories");
    cy.get(".NavBar__Content__Actions__Categories__List a").should(
      "have.length.gte",
      3
    );
  });

  it("should display article detail", () => {
    cy.get(".Articles__Article").first().click();
    cy.get(".ril-image-current.ril__image").should("be.visible");
  });

  it("should be possible to navigate through images", () => {
    cy.get(".Articles__Article").first().click();
    cy.get('[aria-label="Previous image"]').should("be.visible");
    cy.get('[aria-label="Next image"]').should("be.visible");
  });
});
