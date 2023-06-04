describe('Login', () => {
  it('Does not do much!', () => {

    cy.visit(Cypress.env('baseUrl'));

    cy.findByRole('textbox', {  name: /email:/i}).type('mario@gmail.com');
    cy.findByPlaceholderText("Password...", { timeout: 7000 }).type('Mario@12345');

  })
})