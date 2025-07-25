require('cypress-plugin-tab');
import 'cypress-xpath';
// import { faker } from '@faker-js/faker';
const XLSX = require('xlsx');

let tiempo = 2000;

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

describe('Practica Uso de las Sesiones', () => {
  beforeEach(() => {
    cy.viewport(1900, 900);
  });

  it('Inicia sesión y guarda la sesión', () => {
    cy.visit('https://www.saucedemo.com/v1/'); // Abre la página de inicio de sesión

    // Ingresa tus credenciales y envía el formulario de inicio de sesión
    // cy.xpath("//input[contains(@data-test,'username')]").type('standard_user');
    // cy.wait(tiempo)
    // cy.xpath("//input[contains(@type,'password')]").type('secret_sauce');
    // cy.wait(tiempo)
    // cy.get('#login-button').click({ time: 5000 });
    cy.login('standard_user','secret_sauce')
    cy.wait(tiempo)

    // Guarda el estado de la sesión en el almacenamiento local
    cy.window().then((win) => {
      const sessionData = {
        token: win.localStorage.getItem('token'), // Ejemplo: obtener el token de autenticación
        userId: win.localStorage.getItem('userId'), // Ejemplo: obtener el ID de usuario
        // Puedes guardar cualquier dato relacionado con la sesión que necesites
      };
      cy.wrap(sessionData).as('sessionData'); // Guarda los datos de sesión para usarlos en pruebas posteriores
    });
  });

  // Se reutiliza las Sesiones
  describe('Prueba posterior a iniciar sesión', () => {
    it('Realiza una acción sin iniciar sesión nuevamente', () => {
      // Restaura el estado de la sesión desde el almacenamiento local
      cy.window().then((win) => {
        const sessionData = {
          token: win.localStorage.getItem('token'), // Ejemplo: obtener el token de autenticación
          userId: win.localStorage.getItem('userId'), // Ejemplo: obtener el ID de usuario
          // Puedes guardar cualquier dato relacionado con la sesión que necesites
        };
        cy.wrap(sessionData).as('sessionData'); // Guarda los datos de sesión para usarlos en pruebas posteriores
        cy.wait(tiempo)
        cy.visit('https://www.saucedemo.com/v1/inventory.html'); // Abre la página del panel de control
        cy.wait(tiempo)
        // Realiza las acciones que deseas probar en el panel de control
        // Por ejemplo, verifica la presencia de un elemento en la página
        cy.xpath("//div[@class='product_label']").should('contain', 'Products');
        cy.wait(tiempo)
      });
    });
  });



    it('Realiza una acción sin iniciar sesión nuevamente', () => {
      cy.visit('https://www.saucedemo.com/v1/inventory.html'); // Abre la página del panel de control
      // Realiza las acciones que deseas probar en el panel de control
      // Por ejemplo, verifica la presencia de un elemento en la página
      cy.xpath("//div[@class='product_label']").should('contain', 'Products');
      //Click add car
      cy.xpath("(//button[contains(.,'ADD TO CART')])[1]").click({time:5000}).wait(2000)
      cy.xpath("(//button[contains(.,'ADD TO CART')])[3]").click({time:5000}).wait(2000)

      cy.get(".shopping_cart_link").scrollIntoView().click({time:5000}).wait(2000)
      cy.xpath("//a[@class='btn_secondary'][contains(.,'Continue Shopping')]").scrollIntoView().click({time:5000}).wait(2000)
    });


    it('Cuarta prueba sin inicio de Sesión', () => {
      cy.visit('https://www.saucedemo.com/v1/inventory.html'); // Abre la página del panel de control
      // Realiza las acciones que deseas probar en el panel de control
      // Por ejemplo, verifica la presencia de un elemento en la página
      cy.xpath("//div[@class='product_label']").should('contain', 'Products');
      //Click add car
      cy.xpath("(//button[contains(@class,'inventory')])[5]").click({time:5000}).wait(2000)
      cy.wait(tiempo)
      cy.xpath("(//button[contains(@class,'inventory')])[6]").click({time:5000}).wait(2000)
      cy.wait(tiempo)

      cy.get(".shopping_cart_link").scrollIntoView().click({time:5000}).wait(2000)
      cy.wait(tiempo)
      cy.xpath("//a[@class='btn_secondary'][contains(.,'Continue Shopping')]").scrollIntoView().click({time:5000}).wait(2000)
    });

});


