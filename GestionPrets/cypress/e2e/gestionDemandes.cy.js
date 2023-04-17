describe('Membre Demande Page', () => {
  it('Clicks on the "Ajouter une Demande" button', () => {
    
    // Visit the specified URL
    cy.visit('http://localhost:8080/#/membre/demande');

    // Click on the "Ajouter une Demande" button
    cy.contains('button', 'Ajouter une Demande').click();

    // Add any assertions or additional actions as needed, for example:
    // - Check if a modal opens after clicking the button
    // - Check if the user is redirected to a new page

    // Select a borrower
    cy.get('select')
      .eq(0)
      .select('lipn admin')
      .should('have.value', 'lipn admin');

    // Select a group
    cy.get('select')
      .eq(1)
      .find('option:nth-child(2)') // Find the first non-disabled option in the list
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
      .type('This is a test comment')
      .should('have.value', 'This is a test comment');

    // Click the "Ajouter Une demande" button
    cy.contains('button', 'Ajouter Une demande').click();



  });
});
