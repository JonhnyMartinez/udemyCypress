/// <reference types="cypress"/>
/*require("cypress-plugin-tab");
import "cypress-xpath";
const XLSX = require("xlsx");*/
//import "cypress-file-upload";
import { faker } from "@faker-js/faker";

let tp = 1500;
let ttiempo_espera = 5000;
let nombreGlobal = "";
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

describe("Funciones Propias personalizadas", () => {
  beforeEach(() => {
    cy.VentanaXY(1900, 900);

    cy.intercept("GET", "https://mcl.spur.us/**", {
      statusCode: 200,
      body: {},
    });
  });

  it("Login", () => {
    cy.Ventana_Inicio("https://www.saucedemo.com/", "Swag", tp);

    cy.Login_Basico(
      '[data-test="username"]',
      "standard_user",
      '[data-test="password"]',
      "secret_sauce",
      "#login-button",
      tp
    );
  });
  it("Login dos por objeto", () => {
    cy.Ventana_Inicio("https://www.saucedemo.com/", "Swag", tp);
    cy.Login_Basico2(
      {
        usernameSelector: '[data-test="username"]',
        username: "standard_user",
        passwordSelector: '[data-test="password"]',
        password: "secret_sauce",
        buttonSelector: "#login-button",
      },
      { s1: '[data-test="title"]', texto: "Products" },
      3000
    );
  });
  it.only("funciones uno", () => {
    //cy.Click_Css("");
    //cy.Texto_Xpath('//*[@id="UserFirstName-kxKb"]', "Rodrigo", tp);
    cy.Ventana_Inicio(
      "https://www.salesforce.com/mx/form/signup/freetrial-sales-ee/?d=70130000000EqoPAAS",
      "Sales",
      tp
    );
    cy.textoSelector(,"Rodrigo","",tp)
    //cy.Texto_Name("UserFirstName", "Juan", tp);
    //cy.Texto_Etiqueta("Nombre", "Pedro", tp);
    //cy.Texto_Css(".firstName", "Juan", tp);
    /*cy.Texto_Etiqueta("Nombre", "Pedro", tp);
    cy.Texto_Etiqueta("Apellidos", "Perez", tp);
    cy.Texto_Etiqueta("Posición", "Sistemas", tp);
    cy.Validar_Error_Xpath("", "Introduzca una correo electrónico", tp);
    cy.Validar_Error_Xpath("", "Introduzca un número de teléfono", tp);*/
  });
});
