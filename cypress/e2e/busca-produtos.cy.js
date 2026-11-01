
describe("Caso 9 - Busca de produtos", () => {
  it("deve pesquisar um produto e exibir resultados", () => {
    cy.visit("/products");

    cy.get("#search_product")
      .should("be.visible")
      .type("top");

    cy.get("#submit_search").click();

    cy.contains("Searched Products")
      .should("be.visible");

    cy.get(".features_items .product-image-wrapper")
      .should("have.length.greaterThan", 0);

    cy.get(".features_items .product-image-wrapper")
      .each(($produto) => {
        cy.wrap($produto).should("be.visible");
      });
  });
});
