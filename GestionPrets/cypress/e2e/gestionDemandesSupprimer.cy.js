describe('Demande Table', () => {
  it('Clicks on the loop button of a demand', () => {
    // Visit the specified URL
    cy.visit('http://localhost:8080/#/membre/demande');

    // Click on the loop button of the first demand
    cy.get('.table tbody tr')
      .eq(0)
      .find('button')
      .click();
    // Click on the trash button in the modal
    cy.get('button:has(i.fa-trash-o)').click();
    cy.contains('button', 'Oui').click();

  });
});
