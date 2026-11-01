
describe("Caso 2 - Login com sucesso", () => {
  it("deve realizar login com email e senha corretos", () => {
    const email = `pgats${Date.now()}@teste.com`;
    const senha = "Teste@12345";

    // Criar uma conta para o teste
    cy.visit("/login");

    cy.get('[data-qa="signup-name"]').type("Usuario PGATS");
    cy.get('[data-qa="signup-email"]').type(email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get("#id_gender1").check();
    cy.get('[data-qa="password"]').type(senha);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("5");
    cy.get('[data-qa="years"]').select("1995");
    cy.get('[data-qa="first_name"]').type("Usuario");
    cy.get('[data-qa="last_name"]').type("PGATS");
    cy.get('[data-qa="address"]').type("Rua de Teste, 100");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("Ontario");
    cy.get('[data-qa="city"]').type("Toronto");
    cy.get('[data-qa="zipcode"]').type("A1A1A1");
    cy.get('[data-qa="mobile_number"]').type("11999999999");
    cy.get('[data-qa="create-account"]').click();

    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();

    // Sair da conta criada
    cy.get('a[href="/logout"]').click();

    // Fazer login com os mesmos dados
    cy.visit("/login");
    cy.get('[data-qa="login-email"]').type(email);
    cy.get('[data-qa="login-password"]').type(senha);
    cy.get('[data-qa="login-button"]').click();

    cy.contains("Logged in as Usuario PGATS").should("be.visible");
    cy.get('a[href="/logout"]').should("be.visible");
  });
});
