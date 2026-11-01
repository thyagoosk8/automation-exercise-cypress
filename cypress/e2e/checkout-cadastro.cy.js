
describe("Caso de teste 15 - Register before Checkout", () => {
  const nome = "Thiago";
  const sobrenome = "Costa";
  const email = `thiago.qa.${Date.now()}@test.com`;
  const senha = "Teste@12345";

  it("deve cadastrar durante o checkout e concluir o pedido", () => {
    // Acessar o site e adicionar um produto ao carrinho
    cy.visit("/");
    cy.get(".features_items .product-image-wrapper")
      .first()
      .contains("Add to cart")
      .click();

    cy.contains("Continue Shopping").click();
    cy.get('a[href="/view_cart"]').first().click();

    // Iniciar o checkout sem estar autenticado
    cy.contains("Proceed To Checkout").click();

    // Abrir o cadastro a partir do checkout
    cy.contains("a", "Register / Login")
      .should("be.visible")
      .click();

    cy.location("pathname").should("eq", "/login");

    // Garantir que o formulário de novo usuário esteja disponível
    cy.contains("h2", "New User Signup!").should("be.visible");

    cy.get('input[data-qa="signup-name"]')
      .should("be.visible")
      .type(nome);

    cy.get('input[data-qa="signup-email"]')
      .should("be.visible")
      .type(email);

    cy.get('button[data-qa="signup-button"]').click();

    // Completar os dados da conta
    cy.get("#id_gender1").check();
    cy.get('[data-qa="password"]').type(senha);
    cy.get('[data-qa="days"]').select("10");
    cy.get('[data-qa="months"]').select("5");
    cy.get('[data-qa="years"]').select("1995");

    cy.get('[data-qa="first_name"]').type(nome);
    cy.get('[data-qa="last_name"]').type(sobrenome);
    cy.get('[data-qa="address"]').type("Rua de Teste, 100");
    cy.get('[data-qa="country"]').select("Canada");
    cy.get('[data-qa="state"]').type("Ontario");
    cy.get('[data-qa="city"]').type("Toronto");
    cy.get('[data-qa="zipcode"]').type("M5V 2T6");
    cy.get('[data-qa="mobile_number"]').type("11999999999");

    cy.get('[data-qa="create-account"]').click();

    // Confirmar a criação da conta
    cy.contains("Account Created!").should("be.visible");
    cy.get('[data-qa="continue-button"]').click();
    cy.contains(`Logged in as ${nome}`).should("be.visible");

    // Voltar ao carrinho e prosseguir com o checkout
    cy.get('a[href="/view_cart"]').first().click();
    cy.contains("Proceed To Checkout").click();

    // Validar endereço e revisão do pedido
    cy.contains("Address Details").should("be.visible");
    cy.contains("Review Your Order").should("be.visible");
    cy.get("#address_delivery").should("be.visible");
    cy.get(".cart_info tbody tr").should("have.length.at.least", 1);

    // Fazer o pedido
    cy.get('textarea[name="message"]')
      .type("Pedido de teste automatizado - caso 15.");

    cy.contains("Place Order").click();

    // Informar pagamento
    cy.get('[data-qa="name-on-card"]').type(`${nome} ${sobrenome}`);
    cy.get('[data-qa="card-number"]').type("4111111111111111");
    cy.get('[data-qa="cvc"]').type("123");
    cy.get('[data-qa="expiry-month"]').type("12");
    cy.get('[data-qa="expiry-year"]').type("2030");
    cy.get('[data-qa="pay-button"]').click();

    // Confirmar o pedido
    cy.contains(
      /order has been placed successfully|order has been confirmed/i
    ).should("be.visible");
  });
});
