describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:8080/#/admin/groupe");
    cy.wait(2000)
  });

  it("devrait filtrer correctement par label et afficher les bonnes données", () => {
    cy.visit("http://localhost:8080/#/admin/groupe");
    cy.wait(2000);
    cy.get('input[type="text"]').type("key");
    cy.wait(2000);
    cy.get("tbody tr td").first().should('include.text', "key");
    cy.get('input[type="text"]').clear();
  });
  
   
  it("Redirige vers une autre page après avoir cliqué sur le bouton d'ajout", () => {
    cy.visit("http://localhost:8080/#/admin/groupe");
    cy.wait(2000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.nc-icon.nc-simple-add").click();
    cy.wait(2000)
    // Vérifier que l'URL a changé
    cy.url().should('include', '/ajouterGroupe')

    // Vérifier que le formulaire de modification est visible
    cy.get('form').should('be.visible')
  });

    it('Remplit et soumet le formulaire d\'ajout', () => {
      cy.visit('http://localhost:8080/#/admin/ajouterGroupe') // Visite la page d'ajout du groupe
  
      cy.get('#binput') // Sélectionne le champ label
        .type('grp4') // Saisit le nom du groupe
  
      cy.get('textarea') // Sélectionne le champ de description
        .type('Description du groupe4') // Saisit la description du groupe
  
     
  
      cy.get('#valider').click() // Soumet le formulaire
  cy.wait(6000)
      cy.url().should('include', '/groupe') // Vérifie que l'utilisateur est redirigé vers la liste des groupes
    })
    it("Ouvre un modal après avoir cliqué sur le bouton supprimer et test de suppression", () => {
      cy.visit("http://localhost:8080/#/admin/groupe");
      cy.wait(2000)
       // Sélectionner le bouton et cliquer dessus
      cy.get("button i.fa.fa-trash-o").last().click({ force: true });
      cy.wait(2000)
  
      // Vérifier que le modal est affiché
      cy.get(".modal").should("be.visible");
      cy.get(".modal-content").should(
        "contain",
        "Etes vous sûr de supprimer ce groupe ?"
      );
      cy.get("#del").click()
      cy.wait(2000)
      cy.url().should('include', '/groupe') // Vérifie que l'utilisateur est redirigé vers la liste des groupes
     
      
        
      });
      it("Redirige vers une autre page après avoir cliqué sur le bouton de modification", () => {
        cy.visit("http://localhost:8080/#/admin/groupe");
        cy.wait(2000)
        // Sélectionner le bouton et cliquer dessus
        cy.get("button i.fa.fa-pencil").first().click({ force: true });
        cy.wait(2000)
        // Vérifier que l'URL a changé
        cy.url().should('include', '/modifierGroupe')
    
        // Vérifier que le formulaire de modification est visible
        cy.get('form').should('be.visible')
      
    
    
    
        cy.get('#modiflabel')
          .clear()
          .type('key1') // Saisit le nom du groupe
    
        cy.get('textarea') // Sélectionne le champ de description
        .clear()  
        .type('Description du key') // Saisit la description du groupe
    
       
    
        cy.get('#modifier').click() // Soumet le formulaire
        cy.wait(2000)
         // Vérifier que le modal est affiché
         cy.get(".modal").should("be.visible");
         cy.get(".modal-content").should(
           "contain",
           "Etes vous sûr de modifier ce groupe ?"
         );
         cy.get("#upd").click()
         cy.wait(2000)
         cy.url().should('include', '/groupe') // Vérifie que l'utilisateur est redirigé vers la liste des groupes
        
      })
     
       
        
          
        });
