describe('template spec', () => {
  it('passes', () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-pencil").first().click({ force: true });
    cy.wait(1000)
  });
 
  it('Remplir et valide le formulaire de modification et redirige vers tableau', () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-pencil").first().click({ force: true });
    cy.wait(2000)
  	cy.wait(1000)
    // Fill out the form fields
    //cy.get('[label="Label"]').type('New Object Label')
    //cy.contains('Veuillez selectionner un groupe').click()
    cy.get('#g', { timeout: 10000 },{withinSubject:null}).find('option')
  .eq(1)
  .then($option => {
    cy.get('#g').select($option.val())
  });

    cy.wait(1000)
    // Click the "Modifier" button and confirm the modification
   cy.get('[type="submit"]').contains('Modifier').click()

    cy.wait(1000)

    // Vérifier que le modal est affiché
    cy.get(".modal").should("be.visible");
    cy.get(".modal-content").should(
      "contain",
      "Etes vous sur de modifier cet objet ?"
    );

    cy.get('.modal-content > .modal-buttons > .btn-danger').click()

    // Check that the success notification is displayed
    //cy.get('.notifications-container').should('be.visible')
    cy.contains('Objet modifié avec succes !');
    cy.url().should('include', '/objet') // Vérifie que l'utilisateur est redirigé vers la liste des objets
  })

  it('affiche modal quand le bouton Modifier est clique', () => {
  	cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-pencil").first().click({ force: true });
    cy.wait(1000)
    cy.wait(1000)
    // Click the "Modifier" button without filling out any fields
    cy.get('[type="submit"]').contains('Modifier').click()

    cy.wait(1000)

    // Vérifier que le modal est affiché
    cy.get(".modal").should("be.visible");
    cy.get(".modal-content").should(
      "contain",
      "Etes vous sur de modifier cet objet ?"
    );
  });

   it('Retourne vers la page de tableau quand le bouton retouner et clique', () => {
  	cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-pencil").first().click({ force: true });
    cy.wait(1000)
    // Click the "Modifier" button without filling out any fields
    cy.get('[type="submit"]').contains('Retour').click()

    cy.wait(1000)

    cy.url().should('include', '/objet')
  })
})