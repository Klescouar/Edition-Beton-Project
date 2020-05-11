/// <reference types="Cypress" />

describe("Accessibility tests", () => {
  it("has no detectable accessibility violations on home page", () => {
    cy.visit("/").get("body").injectAxe();
    cy.contains("Par catégories");
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });

  it("has no detectable accessibility violations on about page", () => {
    cy.visit("/about").get("body").injectAxe();
    cy.contains("Par catégories");
    cy.checkA11y(null, {
      includedImpacts: ["critical"],
    });
  });
});
