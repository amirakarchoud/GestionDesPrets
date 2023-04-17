import FormObjet from './FormObjet.vue'


describe('<FormObjet />', () => {
  it('renders', () => {
    cy.mount(FormObjet)
  });

  it('disables the submit button when required fields are empty', () => {
    // Mount the component
    cy.mount(FormObjet)

   // Assert that the button is initially disabled
expect(cy.get('button[type="submit"]').should('be.disabled'));


  });

  

})