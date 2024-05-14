describe('My first test', () => {
  it('should be default open the simple form page', () => {
    cy.visit('https://example.cypress.io');

    cy.contains('type').click();

    cy.url().should('include', '/commands/actions');

    cy.get('.action-email').type('fake@email.com');
    cy.get('.action-email').should('have.value', 'fake@email.com');
  });
});
