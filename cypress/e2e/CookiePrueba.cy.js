require("cypress-plugin-tab");
import "cypress-xpath";
const XLSX = require("xlsx");

let tiempo = 1000;
let ttiempo_espera = 5000;

let sessionCookies = [];

function scroll(x, y, t) {
  cy.window().then((win) => {
    win.scrollBy(x, y);
    cy.wait(t);
  });
}

Cypress.on("uncaught:exception", (err, runnable) => {
  // Evitar que la excepción detenga la ejecución
  return false;
});

describe("Prueba de inicio de sesión y navegación en Swag Labs", () => {
  it("Navegar a la página de inventario sin iniciar sesión Parte dos", () => {
    cy.visit("https://www.saucedemo.com/");

    // Completar formulario de login
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // Esperar que se redireccione a la página interna
    cy.url().should("include", "/inventory");

    // Ver cookies
    cy.getCookies().then((cookies) => {
      cy.log(`Cantidad de cookies: ${cookies.length}`);
      cookies.forEach((cookie) => {
        cy.log(`${cookie.name}: ${cookie.value}`);
        console.log(`${cookie.name} = ${cookie.value}`);
      });
    });
  });
  it("Debe crear una cookie de sesión al iniciar sesión correctamente", () => {
    cy.visit("https://www.saucedemo.com/");

    // Completar login
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // Verificar que redirige a /inventory
    cy.url().should("include", "/inventory");

    // Esperar que las cookies se creen
    cy.wait(1000);

    // Validar que la cookie de sesión existe
    cy.getCookie("session-username").should("exist");

    // Validar su valor
    cy.getCookie("session-username").should(
      "have.property",
      "value",
      "standard_user"
    );
  });
  it.only("Debe mantener la sesión activa después de recargar la página", () => {
    cy.visit("https://www.saucedemo.com/");

    // Login
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    // Validar que está en /inventory
    cy.url().should("include", "/inventory");

    // Validar que la cookie de sesión existe
    cy.getCookie("session-username").should("exist");

    // Recargar la página
    cy.reload();

    // Validar que sigue en la misma página
    cy.url().should("include", "/inventory");

    // Validar que la cookie de sesión aún existe
    cy.getCookie("session-username").should("exist");

    // Validar que el usuario sigue logueado (verificando elemento visible)
    cy.get(".inventory_list").should("exist");
  });
});
