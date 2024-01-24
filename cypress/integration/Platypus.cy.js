// cypress/integration/interface.spec.js
describe('Visitar URL Remota', () => {
  beforeEach(function () {
    // Ações que devem ocorrer antes de cada teste
    cy.visit('https://platypus.amee.com.br/login.php'); // Interagir com a interface do usuário
  });

  
  it('Verificação de campos obrigatorios', function(){
    cy.get('.btn').click()
    cy.on('window:alert', msg =>{
      expect(msg).eq('Usuário ou senha inválida!')
  })
  })

  it('Preenchendo campos loguin', function(){
    cy.get('#form2Example11').type('andre.felipe@amee.com.br') // Preenche campo E-mail
    cy.get('#form2Example22').type('2023@QWE!') // Preenche campo Senha
    cy.get('.btn').click()  // Clica no botão acessar
    cy.on('window:alert', msg =>{  // verifica o pop-up
      expect(msg).eq('Usuário ou senha inválida!') // se tem a mensagem :Usuário ou senha inválida!
    });
  })


});