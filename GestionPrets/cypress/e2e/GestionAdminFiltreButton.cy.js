describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/#/admin/pret')
    cy.wait(2000);
    cy.contains('Prêts Non Retournés').click();
    cy.wait(1000);
    cy.contains('button', 'Retour').click();

    cy.contains('Prêts Assignés').click();
    cy.wait(1000);


    cy.contains('button', 'Retour').click();
    cy.contains('Prêts Retournés').click();
    cy.wait(1000);
    cy.contains('button', 'Retour').click();



  })
})
