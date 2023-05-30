describe('Login', () => {
  it('Does not do much!', () => {

    cy.visit(Cypress.env('baseUrl'));

    cy.findByRole('textbox', {  name: /email:/i}).type('mario@gmail.com');
    cy.findByLabelText(/password:/i).type('Mario@12345');

  })
})