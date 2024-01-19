it('testa a página da política de privacidade de forma independente', function () {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')

})

/* Teste com Lodash - Aula 12  && Exercício extra 1 */

it.only('testa a página da política de privacidade de forma independente', function () {
    Cypress._.times(5, () => {
    cy.visit('./src/privacy.html')
    cy.contains('Talking About Testing').should('be.visible')
    
    })
})
