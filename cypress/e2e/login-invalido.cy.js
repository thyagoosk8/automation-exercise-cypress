
describe("Caso 3 - Login com dados incorretos", () => {
  it("deve exibir mensagem de erro ao informar email e senha inválidos", () => {
    cy.visit("/login");

    cy.get('[data-qa="login-email"]')
      .type(`inexistente${Date.now()}@teste.com`);

    cy.get('[data-qa="login-password"]')
      .type("SenhaErrada@123");

    cy.get('[data-qa="login-button"]').click();

    cy.contains("Your email or password is incorrect!")
      .should("be.visible");
  });
});
