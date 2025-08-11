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
  it("funciones uno", () => {
    //cy.Click_Css("");
    //cy.Texto_Xpath('//*[@id="UserFirstName-kxKb"]', "Rodrigo", tp);
    cy.Ventana_Inicio(
      "https://www.salesforce.com/mx/form/signup/freetrial-sales-ee/?d=70130000000EqoPAAS",
      "Sales",
      tp
    );
    cy.Validar_Error_Xpath(
      "//div[contains(@class, 'field')]//input[@name='UserFirstName']",
      "Introduzca su nombre",
      tp
    );
    cy.addClaseId(
      "//div[contains(@class, 'field')]//input[@name='UserFirstName']",
      "className",
      "idName",
      20000
    );
    cy.textoSelector(".className", "Rodrigo", "css", tp);
    cy.textoSelector("#idName", "Pedro", "css", tp);
    cy.textoSelector(
      "//div[contains(@class, 'field')]//input[@name='UserFirstName']",
      "Carlos",
      "xpath",
      tp
    );
    cy.textoSelector("UserFirstName", "Miguel", "name", tp);
    cy.textoSelector("Apellidos", "Erika", "label", tp);
    //cy.Texto_Name("UserFirstName", "Juan", tp);
    //cy.Texto_Etiqueta("Nombre", "Pedro", tp);
    //cy.Texto_Css(".firstName", "Juan", tp);
    /*cy.Texto_Etiqueta("Nombre", "Pedro", tp);
    cy.Texto_Etiqueta("Apellidos", "Perez", tp);
    cy.Texto_Etiqueta("Posición", "Sistemas", tp);
    cy.Validar_Error_Xpath("", "Introduzca una correo electrónico", tp);
    cy.Validar_Error_Xpath("", "Introduzca un número de teléfono", tp);*/
  });
  it("Funciones dos", () => {
    cy.Ventana_Inicio(
      "https://validaciones.rodrigovillanueva.com.mx/Calculador_ok.html",
      "Formulario",
      tp
    );
    cy.Texto_Etiqueta("Número 1", "10", tp);
    cy.Texto_Etiqueta("Número 2", "20", tp);
    cy.Click_Texto("Sumar", tp);
    cy.Click_Texto("Restar", tp);
    // cy.Texto_Etiqueta_Habilitar("Resultado", "400", tp);
    cy.Copiar_Pegar_Css("#resultado", "#resultado2", tp);
    //cy.Texto_Xpath_Habilitar('//*[@id="resultado"]', "100", tp);
    //cy.Texto_Css_Habilitar("#resultado", "50", 3000);
  });
  it.only("Campos Select", () => {
    tp = 1200;
    cy.Ventana_Inicio(
      "https://www.salesforce.com/mx/form/signup/freetrial-sales-ee/?d=70130000000EqoPAAS",
      "Sales",
      tp
    );
    // cy.Combo_Xpath(
    //   "/html/body/div[4]/div/div/div[6]/div[1]/div[2]/div/div/div[2]/div/div[1]/div/form/div[9]/div/select",
    //   "Italiano",
    //   tp
    // );
    // cy.Combo_Xpath("", tp);
    // cy.Combo_Name("CompanyLanguage", "Tai", tp);
    // cy.Combo_Etiqueta("Idioma", "Italiano", tp);

    cy.selectCombo("xpath", '//*[@id="CompanyLanguage-rwKS"]', "Tai", tp);
    cy.selectCombo("name", "CompanyLanguage", "Inglés", tp);
    cy.selectCombo("label", "Idioma", "Alemán", tp);

    cy.selectCombo("label", "Empleados", "1 - 50 empleados", tp);

    cy.addClaseId("", "classEmp", "idEmp", tp);

    cy.selectCombo("css", ".classEmp", "51 - 300 empleados", tp);
    cy.selectCombo("id", "#idEmp", "1,001 - 2,000 empleados", tp);
  });
});
