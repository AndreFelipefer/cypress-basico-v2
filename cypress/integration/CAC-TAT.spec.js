/// <reference types="Cypress" />
/*----------------------- AULA 01 -----------------------*/
describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(function () {
        cy.visit('./src/index.html');
    });

    /*----------------------- AULA 02 -----------------------*/

    //Exercício extra 01
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT');
    });
    //Exercício extra 02
    it('preenche os campos obrigatórios e envia o formulário', function () {
        const longText = 'teste, teste, teste, teste, teste, test, teste, teste, test';
        cy.get('#firstName').type('André');
        cy.get('#lastName').type('Ferreira');
        cy.get('#email').type('Andre_felipefer@Hotmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible');
    });
    //Exercício extra 02
    it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
        cy.get('#firstName').type('André');
        cy.get('#lastName').type('Ferreira');
        cy.get('#email').type('Andre_felipefer@Hotmail,com');
        cy.get('#open-text-area').type('text');
        cy.contains('button', 'Enviar').click()

        cy.get('.error').should('be.visible');
    });
    //Exercício extra 03
    it('Teste campo de telefone verificando se continua vazio com valor não-numérico', function () {
        cy.get('#phone')
            .type('abcdefghij')
            .should('have.value', '')
    })
    //Exercício extra 04
    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('#phone-checkbox').click();
        cy.get('#firstName').type('André');
        cy.get('#lastName').type('Ferreira');
        cy.get('#email').type('Andre_felipefer@Hotmail.com');
        cy.get('#open-text-area').type('Teste realizazdo com sucesso');
        cy.get('#phone')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible');
    })
    //Exercício extra 05
    it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
        cy.get('#phone-checkbox').click();
        cy.get('#firstName').type('André Felipe')
            .should('have.value', 'André Felipe')
            .clear().should('have.value', '')
        cy.get('#lastName').type('Ferreira')
            .should('be.value', 'Ferreira')
            .clear()
            .should('have.value', '')
        cy.get('#email').type('Andre_felipefer@Hotmail.com')
            .should('be.value', 'Andre_felipefer@Hotmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone').type('998344442')
            .should('be.value', '998344442')
            .clear()
            .should('have.value', '')
        cy.get('#open-text-area').type('Teste realizazdo com sucesso');
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible');

    })
    //Exercício extra 06
    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
    })

    //Exercício extra 07 (Orientado a Objeto (Construtor))
    it('envia o formuário com sucesso usando um comando customizado', function () {
        cy.fillMandatoryFieldsAndSubmit('Jorge', 'Lacerda', 'JorgeLc@hotmail.com')
    })

    //Exercício extra 08
    // cy.contains('button', 'Enviar').click()
    // cy.get('.error').should('be.visible');

    /*----------------------- AULA 03 -----------------------*/
    //Selecionando opções em campos de seleção suspensa
    //Exercício 0
    it('Selecionando ComboBox YouTube', function () {
        cy.get('select')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    //Exercício 01
    it('Selecionando ComboBox Mentoria', function () {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    //Exercício 02
    it('Selecionando ComboBox Index', function () {
        cy.get('select')
            .select(1)
            .should('have.value', 'blog')
    })

    /*----------------------- AULA 04 -----------------------*/
    // Marcando inputs do tipo radio

    it('Marcação do campo Radio ', function () {
        // cy.get(':nth-child(3) > input').check()
        // cy.get('#support-type > :nth-child(2) > input').check()
        cy.get('input[type="radio"][value ="elogio"]').check()
            .should('have.value', 'elogio')
    })

    it('Marca cada tipo de atendimento', function () {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(function ($radio) {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            });
    });

    /*----------------------- AULA 05 -----------------------*/
    it('Marca ambos checkboxes, depois desmarca o último.', function () {
        cy.get('input[type="checkbox"]').check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
        cy.get('input[type="checkbox"][value="phone"]').check()
        cy.get('#firstName').type('André');
        cy.get('#lastName').type('Ferreira');
        cy.get('#email').type('Andre_felipefer@Hotmail.com');
        cy.get('#open-text-area').type('Teste realizazdo com sucesso');
        cy.get('#phone')
        cy.get('.button').click()
        cy.get('.error').should('be.visible');
    })

    /*----------------------- AULA 06 -----------------------*/
    // Exercicio 
    it('seleciona um arquivo da pasta fixtures', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })

    // Exercicio Extra 01 
    it('seleciona um arquivo simulando um drag-and-drop', function () {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })

    })
    // Exercicio Extra 02
    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function () {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function ($input) {
                console.log($input)
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    /*----------------------- AULA 07 -----------------------*/
    // Exercio 
    it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', function () {
        // cy.get('a').should('have.attr', 'target','_blank') // Primeira Opção de acordo com Open Selector 
        cy.get('#privacy a').should('have.attr', 'target','_blank') // Segunda Opção Conforme VideoAula
    })

    // Exercio Extra 01
    it('acessa a página da política de privacidade removendo o target e então clicando no link', function () {
        cy.get('#privacy a')
        .invoke('removeAttr', 'target')
        .click()
        cy.contains('Talking About Testing').should('be.visible')

    })

    // Exercio Extra 02
    
    it('testa a página da política de privacidade de forma independente', function () {
        cy.visit('./src/privacy.html')
        cy.contains('Talking About Testing').should('be.visible')
    
    })

    /*----------------------- AULA 08 -----------------------*/
    // Exercicio (Crie um script no arquivo package.json que abre o Cypress Runner simulando um dispositivo com 410 pixels de largura e 860 pixels de altura)

    /*{
        "pluginsFile": false,
        "viewportHeight": 860,
        "viewportWidth": 410
      }

    "scripts": {
        "cy:open": "cypress open",
        "cy:open:mobile" :"cypress open --config viewportWidth=370 viewportHeight=660",
        "test": "cypress run",
        "test:mobile": "cypress run --config viewportWidth=370 viewportHeight=660"
    },

    /*----------------------- AULA 09 -----------------------*/
    // Documentação do projeto

    /*----------------------- AULA 10 -----------------------*/
    /* Comando GIT pare reverter alteração que subiu para Main 
    - Git log 
    - Git revert <sua_Hash_aqui>
    - Git push origin main --force
    - Git push origin main
    */

    /*----------------------- AULA 11 -----------------------*/
    //Error com campos obrigatorios em brancos
    it('exibe mensagem por 3 segundos', function() {
        cy.clock() // congela o relógio do navegador
        cy.get('.button').click()
        cy.get('.error').should('be.visible');
        cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
        .should('have.value', '')
    })
    
    // Sucesso com campos obrigatorios preenchidos
    it('exibe mensagem por 3 segundos', function() {
        cy.clock() // congela o relógio do navegador
        const longText = 'teste, teste, teste, teste, teste, test, teste, teste, test';
        cy.get('#firstName').type('André');
        cy.get('#lastName').type('Ferreira');
        cy.get('#email').type('Andre_felipefer@Hotmail.com');
        cy.get('#open-text-area').type(longText, { delay: 0 });
        cy.get('.button').click()
        cy.get('.success').should('be.visible')
        cy.tick(3000) // avança o relógio três segundos (em milissegundos). Avanço este tempo para não perdê-lo esperando.
        cy.get('.success').should('not.be.visible');
        
    })

    // Exercício extra 02
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke()', function(){
        cy.get('#firstName').type('André')
        cy.get('#lastName').type('Felipe')
        cy.get('#email').type('Andre_felipefer@Hotmail.com')
        cy.get('#open-text-area').type('Validacao')
        cy.get('.button').click()
        cy.contains('Mensagem enviada com sucesso').should('be.visible')
        .invoke('show')
        cy.get('.button').click()
        cy.get('.error').should('be.visible')
        .and('contain', 'Valide os campos obrigatórios!')
        .invoke('hide')
        
    })
    // Exercício extra 02
    it('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Mensagem enviada com sucesso.')
          .invoke('hide')
          .should('not.be.visible')
        cy.get('.error')
          .should('not.be.visible')
          .invoke('show')
          .should('be.visible')
          .and('contain', 'Valide os campos obrigatórios!')
          .invoke('hide')
          .should('not.be.visible')
      })

      // Exercício extra 03
      it('preenche a área de texto usando o comando invoke', function () {
        const longText = Cypress._.repeat('0123456', 20);
      
        cy.get('#open-text-area')
        .invoke('val', longText) 
        .should('have.value', longText) 
                  
      });
      
    // Exercício extra 04
    it('faz uma requisição HTTP', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
            const { status, statusText, body} = response
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
        

    })

    /*----------------------- AULA 12 -----------------------*/
    // Modelo 01 
    it('Ache o gato', function(){
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(response){
        const {body} = response
        expect(body).to.include('🐈')
        })
    })

    // Modelo 02
    it('Ache o gato', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
    })

    // Modelo 03 
    it.only('encontra o gato escondido', function(){
        cy.get('#cat')
        .invoke('show')
        .should('be.visible')
        cy.get('#title')
        .invoke('text','CAT TAT')
        cy.get('#subtitle')
        .invoke('text','Eu ♥ Gatos!!')
    })


    // FIM Cypress - Basico 
    
});