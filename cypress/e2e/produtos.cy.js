
describe("Caso 8 - Produtos e detalhes", () => {
  it("deve exibir a lista de produtos e os detalhes de um produto", () => {
    cy.visit("/");

    cy.get('a[href="/products"]').click();

    cy.url().should("include", "/products");

    cy.get(".features_items .product-image-wrapper")
      .should("have.length.greaterThan", 0);

    cy.get(".features_items .product-image-wrapper")
      .first()
      .contains("View Product")
      .click();

    cy.url().should("match", /\/product_details\/\d+/);

    cy.get(".product-information").should("be.visible");

    cy.contains(".product-information", "Category:")
      .should("be.visible");

    cy.contains(".product-information", "Availability:")
      .should("be.visible");

    cy.contains(".product-information", "Condition:")
      .should("be.visible");

    cy.contains(".product-information", "Brand:")
      .should("be.visible");
  });
});
