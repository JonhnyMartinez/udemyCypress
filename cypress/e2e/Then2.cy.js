require('cypress-plugin-tab');
import 'cypress-xpath';
const XLSX = require('xlsx');

let tiempo = 1500;
let ttiempo_espera = 5000;

let sessionCookies = [];

function scroll(x, y, t) {
  cy.window().then((win) => {
    win.scrollBy(x, y);
    cy.wait(t);
  });
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // Evitar que la excepción detenga la ejecución
  return false;
});

describe('Funciones Then (Promesas)', () => {
  beforeEach(() => {   
    cy.viewport(1900, 900);
  });

    it('Mando a llamar todas las funciones por medio de las promesas', () => {
      try{
      visitSalesforceFreeTrial()
        .then(FormularioUno)
        .then(FormularioDos)
        .then(FormularioTres)
        .then(FuncionesCheck)
        .then(submitForm)
        .then(Verificaciones)
        }catch(error) {
          console.error('Test failed:', error);
        }
    });

    it('Mando a llamar todas las funciones por medio de las promesas', () => {
      try{
      visitSalesforceFreeTrial()
        .then(submitForm)
        .then(FormularioUno)
        .then(FuncionesCheck)
        .then(FormularioTres)
        .then(FormularioDos)
        .then(submitForm)
        .then(Verificaciones)
        }catch(error) {
          console.error('Test failed:', error);
        }
    });



    function visitSalesforceFreeTrial() {   
      return cy.visit('https://www.salesforce.com/mx/form/signup/freetrial-sales-pe/?d=70130000000EqoPAAS')
               .get("#onetrust-accept-btn-handler").click({time:10000}).wait(1000); //Boton aceptar Cookis
    }

    function FormularioUno() {
      return cy.xpath("//input[contains(@name,'UserFirstName')]").type('John')
                .wait(tiempo)
                .xpath("//input[contains(@name,'UserLastName')]").type('Doe')
                .wait(tiempo)
                .xpath("//input[@name='UserTitle']").type('Manager')
                .wait(tiempo)        
    }

    function FormularioDos() {
      return cy.xpath("//input[@name='UserEmail']").type('johndoe@example.com')
                .wait(tiempo)
                .xpath("//input[contains(@type,'tel')]").type('1234567890')
                .wait(tiempo)
                .xpath("//input[contains(@name,'CompanyName')]").type('Acme Inc')
                .wait(tiempo)
        
    }

    function FormularioTres() {
      return cy.xpath("//select[contains(@name,'CompanyEmployees')]").select('1 - 50 empleados').tab()
                .wait(tiempo)
                .xpath("//select[contains(@name,'CompanyLanguage')]").select('Francés')
                .wait(tiempo)
        
    }

    function FuncionesCheck() {
      return cy.xpath("(//div[contains(@class,'checkbox-ui')])[3]").click()
      .wait(tiempo)
        
    }

    function submitForm() {
      return cy.get('button[type="submit"]').click()
      .wait(tiempo)
    }

    function Verificaciones() {
      return cy.get('h1').should('have.text', 'Oops! Something went wrong.')
      .wait(tiempo)
    }

});

 