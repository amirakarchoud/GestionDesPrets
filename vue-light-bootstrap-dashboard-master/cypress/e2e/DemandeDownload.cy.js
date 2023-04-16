import 'cypress-file-upload';
describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:8080/#/membre/demande');
    // Click on the loop button of the first demand
    cy.get('.table tbody tr')
      .eq(0)
      .find('button')
      .click();
    // Click on the trash button in the modal
    /*cy.wait(1000);

    cy.get('button:has(i.nc-cloud-download-93)').click();*/

    //cy.wait(1000);

    cy.get('button:has(i.nc-check-2)').click();

    const fileName = 'example-file.pdf'
    const fileType = 'application/pdf'
    cy.fixture('example-file.pdf').then(fileContent => {
      cy.writeFile('example-file.pdf', fileContent, 'binary')
      cy.get('input[type="file"]').attachFile('example-file.pdf', { subjectType: 'input',  allowEmpty: true })
    })


    // submit the form

    // assert that the file was uploaded successfully
    cy.contains(`Fichier selectionné: ${fileName}`)
    cy.wait(500) // wait for request to complete
    cy.contains('button', 'Valider Demande').click();


  })
})
