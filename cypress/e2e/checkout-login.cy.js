
describe("Caso 16 - Compra após login", () => {
  it("deve realizar um pedido após fazer login", () => {
    const email = `pgats${Date.now()}@teste.com`;
    const senha = "Teste@12345";

    // Cadastro do usuário
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

    // Adicionar produto ao carrinho
    cy.get('a[href="/products"]').click();

    cy.get(".features_items .product-image-wrapper")
      .first()
      .contains("Add to cart")
      .click();

    cy.contains("Continue Shopping").first().click();

    // Iniciar checkout
    cy.get('a[href="/view_cart"]').first().click();
    cy.contains("Shopping Cart").should("be.visible");
    cy.contains("Proceed To Checkout").first().click();

    cy.contains("Address Details").should("be.visible");
    cy.contains("Review Your Order").should("be.visible");

    cy.get("textarea").first()
      .type("Pedido de teste automatizado PGATS");

    cy.contains("Place Order").first().click();

    // Preencher pagamento
    cy.get('[data-qa="name-on-card"]').type("Usuario PGATS");
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2030");
    cy.get('[data-qa="pay-button"]').click();

    // Validar a confirmação real do pedido
    cy.get("body").should(($body) => {
      const texto = $body.text();

      expect(
        texto.includes("Your order has been placed successfully!") ||
        texto.includes("Congratulations! Your order has been confirmed!")
      ).to.equal(true);
    });
  });
});
