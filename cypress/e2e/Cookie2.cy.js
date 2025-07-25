require('cypress-plugin-tab');
import 'cypress-xpath';
const XLSX = require('xlsx');

let tiempo = 1000;
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

describe('Prueba de inicio de sesión y navegación en Swag Labs', () => {
  before(() => {
    // Verificar si ya se han guardado las cookies de sesión
    if (sessionCookies.length === 0) {
      // Visitar la página de inicio de sesión solo si las cookies no están guardadas
      cy.visit('https://www.saucedemo.com/v1/index.html');
      cy.viewport(1900, 900);

      // Ingresar credenciales y enviar formulario
      cy.get('input[data-test="username"]').type('standard_user').wait(tiempo);
      cy.get('input[data-test="password"]').type('secret_sauce').wait(tiempo);
      cy.xpath("//input[contains(@id,'login-button')]").click().wait(tiempo);

      // Verificar que se haya iniciado sesión correctamente
      cy.url().should('include', '/inventory.html');

      // Guardar las cookies de sesión
      cy.getCookies().then((cookies) => {
        sessionCookies = cookies.filter(cookie => cookie.name.startsWith('session'));
      });
    }
  });

  it('Navegar a la página de inventario sin iniciar sesión Parte dos', () => {
    // Establecer las cookies de sesión guardadas previamente
    sessionCookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });

    // Visitar la página de inventario
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

    // Realizar acciones en la página de inventario
    cy.xpath("(//button[contains(.,'ADD TO CART')])[1]").click({ time: ttiempo_espera }).wait(tiempo);
    cy.xpath("(//button[contains(.,'ADD TO CART')])[3]").click({ time: ttiempo_espera }).wait(tiempo);

    cy.get(".shopping_cart_link").scrollIntoView().click({ time: ttiempo_espera }).wait(tiempo);
    cy.get(".cart_item").should('have.length', 2);

    // Realizar aserciones o acciones adicionales en la página de inventario
    // ...
  });

  it.only('Navegar  Parte tres', () => {
    // Establecer las cookies de sesión guardadas previamente
    sessionCookies.forEach(cookie => {
      cy.setCookie(cookie.name, cookie.value, {
        domain: cookie.domain,
        path: cookie.path,
        secure: cookie.secure,
        httpOnly: cookie.httpOnly,
        expiry: cookie.expiry,
      });
    });

    // Visitar la página de inventario
    cy.visit('https://www.saucedemo.com/v1/inventory.html');

    // Realizar acciones en la página de inventario
    // ...

    // Realizar aserciones o acciones adicionales en la página de inventario
    // ...
  });

  // Resto de las pruebas...

});