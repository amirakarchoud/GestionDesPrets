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
    cy.wait(1000);

    cy.get('button:has(i.fa-pencil)').click();

    cy.get('select')
      .eq(1)
      .find('option:nth-child(3)') // Find the first non-disabled option in the list
      .then((firstOption) => {
        const firstOptionValue = firstOption.val();
        cy.get('select')
          .eq(1)
          .select(firstOptionValue)
          .should('have.value', firstOptionValue);
      });

    // Select a type
    cy.get('select')
      .eq(2)
      .find('option:nth-child(2)') // Find the first non-disabled option in the list
      .then((firstOption) => {
        const firstOptionValue = firstOption.val();
        cy.get('select')
          .eq(2)
          .select(firstOptionValue)
          .should('have.value', firstOptionValue);
      });


    // Select an object using the Multiselect component
    cy.get('.multiselect').click(); // Open the dropdown
    cy.get('.multiselect__content-wrapper .multiselect__content .multiselect__element .multiselect__option:not(.multiselect__option--disabled)')
      .first() // Select the first visible option, skipping the initial disabled option
      .click(); // Click the selected option


    // Add a comment
    cy.get('textarea')
      .clear()
      .type('This is a test comment to edit the request')
      .should('have.value', 'This is a test comment to edit the request');

    // Click the "Ajouter Une demande" button
    cy.contains('button', 'Modifier la demande').click();

  });
});
