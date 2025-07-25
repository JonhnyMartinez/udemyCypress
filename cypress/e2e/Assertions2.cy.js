require('cypress-plugin-tab');
import 'cypress-xpath';
const XLSX = require('xlsx');

let tiempo = 500;
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

describe('Validaciones Assertions Should, and', () => {
  beforeEach(() => { 
    cy.visit('https://www.saucedemo.com/v1/');   
    cy.viewport(1900, 900);  
  });

  it('Ejemplos Should y Assert, expect,and,', () => { 
     //Ejemplo básico con expect:
     cy.xpath("//input[contains(@data-test,'username')]").should('be.visible').wait(tiempo);
     cy.log("Ejemplo básico con expect:").wait(tiempo);


    //  Ejemplo de should('have.text', 'Hello') para verificar el texto de un elemento:  
     cy.xpath("//input[contains(@data-test,'username')]").should('have.text', '').wait(tiempo);
     cy.log("Ejemplo de should('have.text', 'Hello') para verificar el texto de un elemento: ").wait(tiempo);

     //  Ejemplo de should('have.text', 'Hello') para verificar el texto no es de un elemento:  
     cy.xpath("//input[contains(@data-test,'username')]").should('not.have.text', 'UserName').wait(tiempo);
     cy.log("Ejemplo de should('have.text', 'Hello') para verificar el texto no es de un elemento: ").wait(tiempo);

     //Ejemplo de should('have.class', 'active') para verificar si un elemento no tiene una clase específica:
     cy.xpath("//input[contains(@data-test,'username')]").should('not.have.class', 'active').wait(tiempo);
     cy.log("Ejemplo de should('have.class', 'active') para verificar si un elemento no tiene una clase específica:").wait(tiempo);

      //Ejemplo de should('have.class', 'form_input') para verificar si un elemento  tiene una clase específica  form_input:
      cy.xpath("//input[contains(@data-test,'username')]").should('have.class', 'form_input').wait(tiempo);
      cy.log("Ejemplo de should('have.class', 'active') para verificar si un elemento  tiene una clase específica:").wait(tiempo);

      //Ejemplo de should('have.attr', 'placeholder', 'Username') para verificar el valor de un atributo:
      cy.xpath("//input[contains(@data-test,'username')]").should('have.attr', 'placeholder', 'Username').wait(tiempo);
      cy.log("Ejemplo de should('have.attr', 'placeholder', 'Username') para verificar el valor de un atributo:").wait(2000);

      //Ejemplo con assert utilizando una función de comparación:
      cy.xpath("//input[contains(@data-test,'username')]").should(($el) => {
        assert.isTrue($el.hasClass('form_input'));
      });
      cy.log("Ejemplo con assert utilizando una función de comparación:").wait(tiempo)

      //Ejemplo con then para encadenar acciones:
      cy.xpath("//input[contains(@data-test,'username')]").then(($el) => {
        //expect($el).to.have.css('background-color', 'red');
        //Verificar el error rgb(255, 255, 255)
        expect($el).to.have.css('background-color', 'rgb(255, 255, 255)');
        cy.wait(2000)

      });
      cy.log("Ejemplo con then para encadenar acciones, Verificar colores:")

      //Ejemplo con assert y then para realizar una verificación personalizada:
      cy.xpath("//input[contains(@data-test,'username')]").should(($el) => {
        assert.isTrue($el.hasClass('form_input'));       
      });

      cy.log("Ejemplo con assert y then para realizar una verificación personalizada:")


      //Ejemplo con assert y then para realizar dos acciones con condicional:
      cy.xpath("//input[contains(@data-test,'username')]").invoke('addClass', 'demo_class').then(($el) => {
        cy.wrap($el).clear().type("Prueba de Texto")
        cy.wait(1000)
      });

      cy.log("Ejemplo con assert y then para realizar dos acciones con condicional:")
    
    cy.xpath("//input[contains(@data-test,'username')]").clear().type("standard_user", { timeout: 5000 }).wait(tiempo);
    cy.xpath("//input[contains(@type,'password')]").type("secret_sauce", { timeout: 5000 }).wait(tiempo);
    cy.get('.btn_action').should('be.visible').click({ timeout: 5000 }).wait(tiempo);
   

  });//it


  

});//Describe









