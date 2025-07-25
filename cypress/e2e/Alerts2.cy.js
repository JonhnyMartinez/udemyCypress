require("cypress-plugin-tab");
import "cypress-xpath";
//npm install --save-dev cypress-real-events
import "cypress-real-events/support";
const XLSX = require("xlsx");

let tiempo = 2000;
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

describe("Validaciones Assertions Should, and", () => {
  beforeEach(() => {
    // cy.visit('https://the-internet.herokuapp.com/basic_auth');
    cy.viewport(1900, 900);
  });

  it("Manejo de Alerts Directo", () => {
    cy.wait(2000);
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).wait(tiempo);

    cy.get(".example")
      .should(
        "have.contain",
        "Congratulations! You must have the proper credentials."
      )
      .wait(tiempo);
  }); //it
  it.only("Manejo de Alerts Directo", () => {
    cy.wait(2000);
    cy.visit("https://the-internet.herokuapp.com/basic_auth", {
      auth: {
        username: "admin",
        password: "admin",
      },
    }).wait(tiempo);

    cy.xpath("//*[@id='content']/div/ul/li[3]/button").realClick();
    cy.on("window:alert", (t) => {
      expect(t).to.contains("I am a JS alert");
    }).wait(tiempo);
    cy.xpath("//*[@id='content']/div/ul/li[3]/button").click();
  }); //it
  it("Manejo de Alerts Directo", () => {
    cy.wait(2000);
    cy.on("window:alert", (t) => {
      expect(t).to.contains("I am a JS alert");
    }).wait(tiempo);
    cy.get("#result")
      .should("have.text", "You successfully clicket and alert")
      .wait(tiempo);
  }); //it
  it("Manejo de Alerts Directo", () => {
    cy.wait(2000);
    cy.on("window:confirm", (t) => {
      expect(t).to.contains("I am a JS Confirm");
    }).wait(tiempo);
    cy.get("#result").should("have.text", "You clicked: Ok").wait(tiempo);
  }); //it

  it("Manejo de Alerts Directo", () => {
    cy.wait(2000);
    cy.on("window:confirm", () => false);
    cy.get("#result").should("have.text", "You clicked: Cancel").wait(tiempo);
  }); //it

  it("Manejo de Alerts Directo", () => {
    cy.window().then((wind) => {
      cy.stub(win, "promp").returns("Saludos desde Cypress");
    });
    cy.xpath("//*[@id='content']/div/ul/li[3]/button")
      .click({ time: 40000 })
      .wait(tiempo);

    cy.on("window:confirm", (str) => {
      expect(str).to.equal("I am a JS prompt");
      return true;
    });
    cy.get("#result")
      .should("have.text", "You entered: Saludos desde Cypress")
      .wait(tiempo);
  }); //it
}); //Describe
