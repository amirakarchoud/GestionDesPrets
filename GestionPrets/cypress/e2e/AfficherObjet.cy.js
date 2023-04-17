describe('template spec', () => {
 it("passes", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
  });

  it("filtrer correctement par label et afficher les bonnes données", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    cy.get('input[type="text"]').type("key");
    cy.wait(1000)
    //cy.get("tbody tr").should("have.length", 3);
    cy.wait(1000)
    cy.get("tbody tr").eq(0).should("contain", "key");
    //cy.get("tbody tr").eq(1).should("contain", "key");
    //cy.get("tbody tr").eq(2).should("contain", "key");
    cy.get('input[type="text"]').clear();
  });
  it("Ouvre un modal après avoir cliqué sur le bouton supprimer", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
     // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-trash-o").first().click({ force: true });
    cy.wait(1000)

    // Vérifier que le modal est affiché
    cy.get(".modal").should("be.visible");
    cy.get(".modal-content").should(
      "contain",
      "Etes vous sur de supprimer cet objet ?"
    );
  });

  it("Redirige vers la page de modification après avoir cliqué sur le bouton de modification", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.get("button i.fa.fa-pencil").first().click({ force: true });
    cy.wait(1000)
    // Vérifier que l'URL a changé
    cy.url().should('include', '/objetmodif')

    // Vérifier que le formulaire de modification est visible
    cy.get('form').should('be.visible')
  });

  it("Redirige vers la page d'ajout après avoir cliqué sur le bouton Ajouter objet", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.contains("Ajouter un objet").click();
    cy.wait(1000)
    // Vérifier que l'URL a changé
    cy.url().should('include', '/objetadd')

    // Vérifier que le formulaire de modification est visible
    cy.get('form').should('be.visible')
  });

  it("Redirige vers la page des types après avoir cliqué sur le bouton Gestion des types", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.contains("Gestion des types").click();
    cy.wait(1000)
    // Vérifier que l'URL a changé
    cy.url().should('include', '/type')

    // Vérifier que le formulaire de modification est visible
   // cy.get('form').should('be.visible')
  });


  it("Redirige vers la page des groupes après avoir cliqué sur le bouton Gestion des groupes", () => {
    cy.visit("http://localhost:8080/#/admin/objet");
    cy.wait(1000)
    // Sélectionner le bouton et cliquer dessus
    cy.contains("Gestion des groupes").click();
    cy.wait(1000)
    // Vérifier que l'URL a changé
    cy.url().should('include', '/groupe')

    // Vérifier que le formulaire de modification est visible
    //cy.get('form').should('be.visible')
  });
})