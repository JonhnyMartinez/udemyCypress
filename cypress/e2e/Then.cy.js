require("cypress-plugin-tab");
import "cypress-xpath";
const XLSX = require("xlsx");

let tiempo = 200;
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

describe("Funciones Then (Promesas)", () => {
  beforeEach(() => {
    cy.visit(
      "https://www.salesforce.com/mx/form/signup/freetrial-sales-pe/?d=70130000000EqoPAAS"
    );
    cy.viewport(1900, 900);
  });

  it("Prueba sin Uno sin then ", () => {
    cy.get("#onetrust-accept-btn-handler").click({ time: 10000 }).wait(1000);
    // Llenar el formulario de registro
    cy.xpath("//input[contains(@name,'UserFirstName')]").type("John", {
      delay: tiempo,
    });
    cy.xpath("//input[contains(@name,'UserLastName')]").type("Doe", {
      delay: tiempo,
    });
    cy.xpath("//input[@name='UserTitle']").type("Software Engineer", {
      delay: tiempo,
    });
    cy.xpath("//input[@name='UserEmail']").type("johndoe@example.com", {
      delay: tiempo,
    });

    // Enviar el formulario
    cy.get('button[type="submit"]').click();
  }); //it

  it.only("Prueba dos con then ", () => {
    cy.get("#onetrust-accept-btn-handler").click({ time: 10000 }).wait(1000); //Boton aceptar Cookis
    // Llenar el formulario de registro
    cy.xpath("//input[contains(@name,'UserFirstName')]")
      .type("John", { delay: tiempo })
      .then(() => {
        //Promesa uno
        cy.log("Promesa despues de llenar el campo nombre");
        cy.wait(2000);
        cy.xpath("//input[contains(@name,'UserFirstName')]").should(
          "have.value",
          "John"
        );
        cy.wait(2000);
      });

    cy.xpath("//input[contains(@name,'UserLastName')]")
      .type("Doe", { delay: tiempo })
      .then(() => {
        cy.xpath("//input[contains(@name,'UserLastName')]")
          .should("have.value", "Doe")
          .then(() => {
            if (tiempo > 1000) {
              cy.log("El retraso es mayor a 1 segundo");
              cy.wait(2000);
            } else {
              cy.log("El retraso es igual o menor a 1 segundo");
              cy.wait(2000);
            }
          });
      });

    /**cy.xpath("//input[contains(@name,'UserLastName')]")
  .type('Doe', { delay: tiempo });

cy.xpath("//input[contains(@name,'UserLastName')]")
  .should('have.value', 'Doe')
  .then(() => {
    if (tiempo > 1000) {
      cy.log('El retraso es mayor a 1 segundo');
    } else {
      cy.log('El retraso es igual o menor a 1 segundo');
    }
    cy.wait(2000);
  }); */

    cy.xpath("//input[@name='UserTitle']")
      // .type('Software Engineer', { delay: tiempo })
      .type("Software", { delay: tiempo })
      .then(() => {
        cy.xpath("//input[@name='UserTitle']")
          // .should('have.value', 'Software Engineer')
          .should("have.value", "Software") //Primer promesa
          .invoke("val")
          .then((fieldValue) => {
            cy.log("Longitud: " + fieldValue.length);
            cy.wait(3000);
            if (fieldValue.length > 10) {
              cy.log(
                "La longitud del campo UserTitle es mayor a 10 caracteres"
              );
              cy.wait(8000);
              cy.xpath("//input[@name='UserEmail']").type(
                "carlos@example.com",
                { delay: tiempo }
              );
              cy.wait(5000);
            } else {
              cy.log(
                "La longitud del campo UserTitle es igual o menor a 10 caracteres"
              );
              cy.xpath("//input[@name='UserEmail']").type("pedro@example.com", {
                delay: tiempo,
              });
              cy.wait(5000);
            }
          });
      });

    // cy.xpath("//input[@name='UserEmail']").type('johndoe@example.com', { delay: tiempo });

    // Enviar el formulario
    cy.get('button[type="submit"]').click();
  }); //it
}); //describe
