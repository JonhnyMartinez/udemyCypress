require('cypress-plugin-tab');
import 'cypress-xpath';
// import { faker } from '@faker-js/faker';
const XLSX = require('xlsx');

let tiempo = 4000;
let ttiempo_espera=5000

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

describe('Prueba de inicio de sesión y navegación en Swag Labs', () => {
  beforeEach(() => {
    // Visitar la página de inicio de sesión
    cy.visit('https://www.saucedemo.com/v1/index.html');
    cy.viewport(1900, 900);
  });

  it('Iniciar sesión y guardar sesión en cookies', () => {
    // Ingresar credenciales y enviar formulario
    cy.get('input[data-test="username"]').type('standard_user').wait(tiempo);
    cy.get('input[data-test="password"]').type('secret_sauce').wait(tiempo);
    cy.xpath("//input[contains(@id,'login-button')]").click().wait(tiempo);

    // Verificar que se haya iniciado sesión correctamente
    cy.url().should('include', '/inventory.html');

    // Guardar las cookies de sesión
    cy.getCookies().then((cookies) => {
      const sessionCookies = cookies.filter(cookie => cookie.name.startsWith('session'));
      sessionCookies.forEach(cookie => {
        cy.setCookie(cookie.name, cookie.value);
        cy.log("Coockie Name y Value: "+cookie.name, cookie.value)
        console.log("Coockie Name y Value: "+cookie.name, cookie.value)
      });
    });
  });

  it('Navegar a la página de inventario sin iniciar sesión', () => {
    // Establecer las cookies de sesión guardadas previamente
    cy.setCookie('sessionCookieName', 'valorDeLaCookie');

    // Visitar la página de inventario
    cy.visit('https://www.saucedemo.com/v1/inventory.html');
    cy.url().should('include', '/inventory.html');
    cy.wait(6000)

    // Realizar aserciones o acciones adicionales en la página de inventario
    // ...
  });

  it('Navegar a la página de inventario sin iniciar sesión Parte dos', () => {
    // Establecer las cookies de sesión guardadas previamente
    cy.setCookie('sessionCookieName', 'valorDeLaCookie');

    // Visitar la página de inventario
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

    cy.xpath("(//button[contains(.,'ADD TO CART')])[1]").click({time:ttiempo_espera}).wait(tiempo)
    cy.xpath("(//button[contains(.,'ADD TO CART')])[3]").click({time:ttiempo_espera}).wait(tiempo)

    cy.get(".shopping_cart_link").scrollIntoView().click({time:ttiempo_espera}).wait(tiempo)
    cy.xpath("//a[@class='btn_secondary'][contains(.,'Continue Shopping')]").scrollIntoView().click({time:ttiempo_espera}).wait(tiempo)

   

    // Realizar aserciones o acciones adicionales en la página de inventario
    // ...
  });


  it('Navegar a la página de inventario sin iniciar sesión Parte tres', () => {
    // Establecer las cookies de sesión guardadas previamente
    cy.setCookie('sessionCookieName', 'valorDeLaCookie');

    // Visitar la página de inventario
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

    // cy.xpath("(//button[contains(.,'ADD TO CART')])[1]").click({time:ttiempo_espera}).wait(tiempo)
    // cy.xpath("(//button[contains(.,'ADD TO CART')])[3]").click({time:ttiempo_espera}).wait(tiempo)

    // cy.get(".shopping_cart_link").scrollIntoView().click({time:ttiempo_espera}).wait(tiempo)
    // cy.xpath("//a[@class='btn_secondary'][contains(.,'Continue Shopping')]").scrollIntoView().click({time:ttiempo_espera}).wait(tiempo)

    // Realizar aserciones o acciones adicionales en la página de inventario
    // ...
  });

 
});