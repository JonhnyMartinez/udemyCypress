//npm install -D cypress-xpath
//npm install -D cypress-plugin-tab
//npm install --save-dev @faker-js/faker
//Pagina ->  https://fakerjs.dev/guide/frameworks.html

require("cypress-plugin-tab");
import "cypress-xpath";
// import faker from 'faker';
// const faker = require("faker");
// npm install @faker-js/faker
import { faker } from "@faker-js/faker";

let tiempo = 300;

let NP = 2;

describe("Ejemplo de Función Faker", () => {
  it("Formulario Faker", () => {
    //Declaramos variables
    let fakeName = faker.internet.firstName();
    let fakeEmail = faker.internet.email();
    let fakeTel = faker.phone.imei();

    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
    cy.viewport(1900, 800);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
    cy.xpath("//input[@id='edit-contact-name']").type(fakeName);
    cy.xpath("//input[@id='edit-contact-email']").type(fakeEmail).wait(300);
    cy.xpath("//input[@id='edit-contact-phone']").type(fakeTel, { delay: 100 });

    cy.wait(300);
  });

  it("Formulario Faker Con Ciclos", () => {
    for (let x = 1; x <= NP; x++) {
      //Declaramos variables
      let fakeName = faker.internet.userName();
      let fakeEmail = faker.internet.email();
      let fakeTel = faker.phone.imei();

      cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
      cy.viewport(1900, 800);
      cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
      cy.xpath("//input[@id='edit-contact-name']").type(fakeName);
      cy.xpath("//input[@id='edit-contact-email']").type(fakeEmail).wait(500);
      cy.xpath("//input[@id='edit-contact-phone']").type(fakeTel, {
        delay: 100,
      });

      cy.wait(500);
      cy.log("Numero de Repetición: " + x);
    }
  });
});
