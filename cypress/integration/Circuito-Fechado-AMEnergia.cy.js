// cypress/integration/interface.spec.js
describe('Visitar URL Remota', () => {
  beforeEach(function () {
    // Ações que devem ocorrer antes de cada teste
    cy.visit('https://sgeoi.com.br/energyeasy/cf/login/index.php'); // Interagir com a interface do usuário
  });

  // Teste que ocorrerá após as ações definidas no beforeEach
  it('verifica o título da aplicação', function () {
    cy.title().should('be.equal', 'Circuito Fechado | AMEnergia');
  });

  it('Teste verificação de campos obrigatorios', function () {
    cy.get('#submit_novo').click()
  })

  it('Teste preenchendo formulário de Login', function () {
    // Clique no link usando um seletor mais robusto para evitar problemas de aspas

    // Agora, você pode realizar ações no novo conteúdo carregado pela navegação do link
    // Exemplo: preencher campos no novo formulário que foi carregado
    cy.get('[height="75"] > #pass_login2').type('andre.felipe');
    cy.get('[height="50"] > #pass_login2').type('2023@QWE!');
    cy.get('#submit_novo').click();
    cy.get('a[href*="informatica_input.php"]').click();
    cy.get('[href="javascript: AjaxLink(\'baixa\',\'../inc/informatica.inc.php?acao=11\');"] > img').click()
    cy.get('#bt_input_bt_5 > .input > .text_input').click()
    cy.get('#_11_unidade').type('430043284')
    cy.get('.a_b2 > #lupa').click()
    cy.clock()
    


  });

  it('Deve fazer uma chamada à API e verificar a resposta', () => {
    cy.request('https://sgeoi.com.br/energyeasy/cf/login/index.php').then(response => {
      expect(response.status).to.equal(200)
      
    });
  });

});