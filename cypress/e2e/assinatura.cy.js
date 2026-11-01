
describe("Caso 10 - Assinatura na página inicial", () => {
  it("deve permitir assinar a newsletter", () => {
    cy.visit("/");

    cy.get("footer").scrollIntoView();

    cy.contains("h2", "Subscription").should("be.visible");

    cy.get("#susbscribe_email")
      .should("be.visible")
      .type(`pgats${Date.now()}@teste.com`);

    cy.get("#subscribe").click();

    cy.contains("You have been successfully subscribed!")
      .should("be.visible");
  });
});
