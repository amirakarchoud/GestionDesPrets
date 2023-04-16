describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/#/admin/objetadd')
    cy.wait(1000)
  });
 
  it("Remplir et valide le formulaire d'ajout et redirige vers tableau", () => {
  	    cy.visit('http://localhost:8080/#/admin/objetadd')
    cy.wait(2000)
     // Generate a unique label using a timestamp
  const label = `New Object Label ${Date.now()}`
  	    // Fill out the form fields
    cy.get('#labelOb').type(label)
    //cy.contains('Veuillez selectionner un groupe').click()
    cy.get('#g', { timeout: 10000 },{withinSubject:null}).find('option')
  .eq(1)
  .then($option => {
    cy.get('#g').select($option.val())
  });

cy.wait(1000)

  cy.get('#t', { timeout: 10000 },{withinSubject:null}).find('option')
  .eq(1)
  .then($option => {
    cy.get('#t').select($option.val())
  });

    cy.wait(1000)
    // Click the "Modifier" button and confirm the modification
   cy.get('[type="submit"]').contains('Ajouter Un Objet').click()

    //cy.wait(1000)
    // Check that the success notification is displayed
    //cy.get('.notifications-container').should('be.visible')
    cy.contains('Objet ajoute avec succes !');
    cy.url().should('include', '/objet') // Vérifie que l'utilisateur est redirigé vers la liste des objets
  });



   it('Retourne vers la page de tableau quand le bouton retouner et clique', () => {
  	 cy.visit('http://localhost:8080/#/admin/objetadd')
    cy.wait(1000)
    // Click the "Modifier" button without filling out any fields
    cy.get('[type="submit"]').contains('Retour').click()

    cy.wait(1000)

    cy.url().should('include', '/objet')
  })
})