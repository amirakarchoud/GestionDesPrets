import TableGroupe from './TableGroupe.vue'

describe('<TableGroupe />', () => {
  const data = [{
    label: 'Key',
    description: 'Key',
  },{
    label: 'grp1',
    description: 'grp1',
  }
  ]
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    
    cy.mount(TableGroupe, {
      propsData: { data:data}
    })  });

  it('affiche le nombre correct de lignes et de colonnes', () => {
  

  cy.mount(TableGroupe, {
    propsData: { data:data}
  })
  cy.get('.table tr').should('have.length', data.length + 1)
  cy.get('.table tr:first-child th').should('have.length', Object.keys(data[0]).length+2)
  cy.get('.table tbody tr td').eq(0).should('contain', data[0].label)
  cy.get('.table tbody tr td').eq(1).should('contain', data[0].description)
  
});

  it('devrait filtrer correctement par label et afficher les bonnes données', () => {
    cy.mount(TableGroupe, {
      propsData: { data:data}
    })

    cy.get('input[type="text"]').type('Key')
    cy.get('tbody tr').should('have.length', 1)
    cy.get('tbody tr td').eq(0).should('have.text', 'Key')
    cy.get('tbody tr td').eq(1).should('have.text', 'Key')
    cy.get('input[type="text"]').clear()
    
  })
    it('Ouvre un modal après avoir cliqué sur le bouton supprimer', () => {
      cy.mount(TableGroupe, {
        propsData: { data:data}
      })
      // Sélectionner le bouton et cliquer dessus
      cy.get('button i.fa.fa-trash-o').first().click({force: true})
  
      // Vérifier que le modal est affiché
      cy.get('.modal').should('be.visible')
      cy.get('.modal-content').should('contain', 'Etes vous sûr de supprimer ce groupe ?')
})

  
})
