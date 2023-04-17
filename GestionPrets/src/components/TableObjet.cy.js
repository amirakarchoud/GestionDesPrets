import TableObjet from './TableObjet.vue'

describe('<TableObjet />', () => {

  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(TableObjet)
  });

  it('renders the correct number of rows and columns', () => {

    const data = [{ _id: 1, label: 'Key C320', borrowed: false,type: {_id:1,label:'test' ,group: {_id:1,label:'test'}}},{
      id: 2,label: 'Key A210',borrowed: false,type: {_id:2,label:'test label',group: {_id:3,label:'test2'}}}, {
      _id: 3, label: 'cantine',borrowed: true,type: {_id:1,label:'test',group: {_id:1,label:'test'}}},{
      _id: 4,label: 'badge',borrowed: false,type: {_id:1,label:'test',group: {_id:1,label:'test'}}}];

  cy.mount(TableObjet, {
    propsData: { data:data}
  })
  cy.get('.table tr').should('have.length', data.length + 1)
  cy.get('.table tr:first-child th').should('have.length', Object.keys(data[0]).length+2)
});

it('displays the correct data in each row', () => {
  const data = [{ _id: 1, label: 'Key C320', borrowed: false,type: {_id:1,label:'test' ,group: {_id:1,label:'test'}}},{
    id: 2,label: 'Key A210',borrowed: false,type: {_id:2,label:'test label',group: {_id:3,label:'test2'}}}, {
    _id: 3, label: 'cantine',borrowed: true,type: {_id:1,label:'test',group: {_id:1,label:'test'}}},{
    _id: 4,label: 'badge',borrowed: false,type: {_id:1,label:'test',group: {_id:1,label:'test'}}}];
  cy.mount(TableObjet, { propsData: { data } })
  cy.get('.table tbody tr td').eq(0).should('contain', data[0].label)
  cy.get('.table tbody tr td').eq(1).should('contain', data[0].borrowed ? 'Emprunte' : 'Disponible')
  cy.get('.table tbody tr td').eq(2).should('contain', data[0].type.group.label)
  cy.get('.table tbody tr td').eq(3).should('contain', data[0].type.label)
});

it('should display modal when "trush" button is clicked and confirmation is given', () => {
  // Arrange
  const item = { _id: '123', label: 'Test Object 123', borrowed: false, type: { label: 'Type Label', group: { label: 'Group Label' } } };
  const data = [item];
  cy.mount(TableObjet, {
    propsData: { data:[item],groups: []}
  });
  // Click the "Supprimer" button
  cy.get('.fa-trash-o').click({force: true});
  // Verify that the confirmation modal is displayed
  cy.get('.modal-content').should('exist');
  // Click the "Supprimer" button in the modal
 // cy.get('.modal-content button.btn-danger').click();

  // Verify that the object is deleted from the table and the page is reloaded
  //cy.contains(item.label).should('not.exist');

});


it('devrait filtrer correctement par label et afficher les bonnes données', () => {
  const data = [{ _id: 1, label: 'Key C320', borrowed: false,type: {_id:1,label:'test' ,group: {_id:1,label:'test'}}},{
    id: 2,label: 'Key A210',borrowed: false,type: {_id:2,label:'test label',group: {_id:3,label:'test2'}}}, {
    _id: 3, label: 'cantine',borrowed: true,type: {_id:1,label:'test',group: {_id:1,label:'test'}}},{
    _id: 4,label: 'badge',borrowed: false,type: {_id:1,label:'test',group: {_id:1,label:'test'}}}];
  cy.mount(TableObjet, { propsData: { data } })

  cy.get('input[type="text"]').type('key')
  cy.get('tbody tr').should('have.length', 2)
  cy.get('tbody tr ').eq(0).should('contain', 'Key')
  cy.get('tbody tr ').eq(1).should('contain', 'Key')
  cy.get('input[type="text"]').clear()
  
})

})