// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { faker } from "@faker-js/faker";
import cypress from "cypress";
Cypress.Commands.add(
  "Login_Basico",
  (s1, username, s2, password, button, tiempo = 1000) => {
    cy.get(s1).type(username);
    cy.wait(tiempo);
    cy.get(s2).type(password);
    cy.wait(tiempo);
    cy.get(button).click({ time: 5000 });
    cy.Validar_Texto('[data-test="title"]', "Products", 2000);
    cy.wait(tiempo);
  }
);

Cypress.Commands.add("VentanaXY", (x, y, tiempo = 1000) => {
  cy.viewport(x, y);
  cy.wait(tiempo);
  cy.log("Tamaño de la venta " + x + " " + y);
});

Cypress.Commands.add("Ventana_Inicio", (url, title, tiempo = 1000) => {
  cy.visit(url);
  cy.title().should("contain", title);
  cy.wait(tiempo);
  cy.log("Url" + url + "Titulo " + title);
});

Cypress.Commands.add("Login_Basico2", (options, options2, tiempo = 1000) => {
  const {
    usernameSelector,
    username,
    passwordSelector,
    password,
    buttonSelector,
  } = options;
  const { s1, texto } = options2;
  cy.get(usernameSelector).type(username);
  cy.wait(tiempo);
  cy.get(passwordSelector).type(password);
  cy.wait(tiempo);
  cy.get(buttonSelector).click({ timeout: 5000 });
  cy.wait(tiempo);
  cy.Validar_Texto(s1, texto);
  cy.log("se llama a funcion validar texto");

  cy.wait(tiempo);
});
Cypress.Commands.add("Validar_Texto", (s1, texto, tiempo = 100) => {
  cy.get(s1).should("have.text", texto);
  cy.wait(tiempo);
  cy.log("Texto a validar: " + texto);
});

/////-----///////
Cypress.Commands.add("Click_Xpath", (selector, tiempo = 1000) => {
  cy.xpath(selector).should("be.visible").click({ time: 5000 });
  cy.wait(tiempo);
  cy.log("Click en el elemento: " + selector);
});
Cypress.Commands.add("Click_Css", (selector, tiempo = 1000) => {
  cy.get(selector).should("be.visible").click({ time: 5000 });
  cy.wait(tiempo);
  cy.log("Click en el elemento: " + selector);
});
Cypress.Commands.add("Texto_Xpath", (selector, texto, tiempo = 1000) => {
  cy.xpath(selector).should("be.visible").first().type(texto);
  cy.wait(tiempo);
  cy.log("texto: " + texto)
});
///caso aparte del comandos//
Cypress.Commands.add("login", (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get("#login-button").click({ time: 5000 });
  cy.xpath("//div[@class='product_label']").should("contain", "Products");
});
