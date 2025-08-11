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
//import { faker } from "@faker-js/faker";
//import cypress from "cypress";
//import cypress from "cypress";
require("cypress-plugin-tab");
import "cypress-xpath";
import "cypress-real-events/support";
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

/** */
Cypress.Commands.add("Click_Texto", (texto, tiempo = 1000) => {
  cy.contains(texto).should("be.visible").click({ time: 5000 });
  cy.wait(tiempo);
  cy.log("Click en el elemento por Css : " + texto);
});
/** */
Cypress.Commands.add("Texto_Xpath", (selector, texto, tiempo = 1000) => {
  cy.xpath(selector).should("be.visible").first().type(texto);
  cy.wait(tiempo);
  cy.log("texto: " + texto);
});
/** */
Cypress.Commands.add("Texto_Name", (selector, texto, tiempo = 1000) => {
  cy.get(`[name="${selector}"]`)
    .scrollIntoView()
    .should("be.visible")
    .clear()
    .type(texto);
  cy.wait(tiempo);
  cy.log("Texto: " + selector + " " + texto);
});
/** */
Cypress.Commands.add("Texto_Etiqueta", (Label, texto, tiempo = 1000) => {
  cy.contains("label", Label)
    .invoke("attr", "for")
    .then((fieldId) => {
      cy.get(`#${fieldId}`)
        .first()
        .should("be.visible")
        .clear()
        .type(texto)
        .wait(tiempo)
        .log("Texto: " + texto);
    });
});
/** */
Cypress.Commands.add("Texto_Css", (selector, texto, tiempo = 1000) => {
  cy.get(selector)
    .scrollIntoView()
    .should("be.visible")
    .first()
    .click()
    .then(($el) => {
      const existingText = $el.text();
      if (existingText) {
        cy.wrap($el).clear();
      }
      if ($el.is("input,textarea")) {
        cy.wrap($el).val(texto);
      } else {
        $el.val(texto);
      }
    });
  cy.wait(tiempo);
  cy.log("Texto: " + texto);
});
//add clase y id
Cypress.Commands.add(
  "addClaseId",
  (selector, clase = "", id = "", tiempo = 1000) => {
    cy.xpath(selector)
      .should("be.visible")
      .then(($el) => {
        $el.attr("class", clase);
        $el.attr("id", id);
      });
    cy.wait(tiempo);
  }
);
/** */
Cypress.Commands.add(
  "textoSelector",
  (selector, texto, selectorType = "css", tiempo = 1000) => {
    switch (selectorType) {
      case "xpath":
        cy.xpath(selector)
          .should("be.visible")
          .first()
          .click()
          .then(($el) => {
            const existingText = $el.text();
            if (existingText) {
              cy.wrap($el).clear();
            }
            if ($el.is("input,textarea")) {
              cy.wrap($el).val(texto);
            } else {
              $el.val(texto);
            }
          });
        cy.wait(tiempo);
        cy.log("Texto: " + texto);
        break;
      case "css":
        cy.get(selector)
          .scrollIntoView()
          .should("be.visible")
          .first()
          .click()
          .then(($el) => {
            const existingText = $el.text();
            if (existingText) {
              cy.wrap($el).clear();
            }
            if ($el.is("input,textarea")) {
              cy.wrap($el).val(texto);
            } else {
              $el.val(texto);
            }
          });
        cy.wait(tiempo);
        cy.log("Texto: " + texto);
        break;
      case "name":
        cy.get(`[name="${selector}"]`)
          .scrollIntoView()
          .should("be.visible")
          .first()
          .click()
          .then(($el) => {
            const existingText = $el.text();
            if (existingText) {
              cy.wrap($el).clear();
            }
            if ($el.is("input,textarea")) {
              cy.wrap($el).val(texto);
            } else {
              $el.val(texto);
            }
          });
        cy.wait(tiempo);
        cy.log("Texto: " + texto);
        break;
      case "label":
        cy.contains("label", selector)
          .invoke("attr", "for")
          .then((fieldId) => {
            cy.get(`#${fieldId}`)
              .first()
              .should("be.visible")
              .then(($el) => {
                if (existingText) {
                  cy.wrap($el).clear();
                }
                if ($el.is("input,textarea")) {
                  cy.wrap($el).val(texto);
                } else {
                  $el.val(texto);
                }
              })
              .wait(tiempo)
              .log("Texto: " + texto);
          });
        break;
      case "id":
        cy.get(`#${selector}`)
          .scrollIntoView()
          .should("be.visible")
          .then(($el) => {
            const existingText = $el.text();
            if (existingText) {
              cy.wrap($el).clear();
            }
            if ($el.is("input,textarea")) {
              cy.wrap($el).val(texto);
            } else {
              $el.val(texto);
            }
          });
        cy.wait(tiempo);
        cy.log("Texto: " + texto);
        break;
      default:
        throw new Error(`TIpo de selector "${selectorType}" no valido.`);
    }
  }
);

/**
 * Validar Error
 */
Cypress.Commands.add(
  "Validar_Error_Xpath",
  (selector, mensaje, tiempo = 1000) => {
    cy.xpath(selector, { timeout: tiempo })
      .should("be.visible", { timeout: tiempo })
      .click()
      .tab()
      .wait(tiempo)
      .then(() => {
        cy.get("span.error-msg").should("be.visible").and("contain", mensaje);
      });
    cy.log("se encontro el error: " + mensaje);
  }
);
/** */
Cypress.Commands.add(
  "Texto_Xpath_Habilitar",
  (selector, texto, tiempo = 1000) => {
    cy.xpath(selector)
      .scrollIntoView()
      .should("be.visible")
      .then(($el) => {
        // Verificar si está deshabilitado
        if ($el.prop("disabled")) {
          // Habilitar el campo si está deshabilitado
          $el.prop("disabled", false);
        }
        // Volver a envolver el elemento para usar comandos Cypress
        cy.wrap($el).clear().type(texto);
      });

    cy.wait(tiempo);
    cy.log("Texto: " + texto);
  }
);

/** */
Cypress.Commands.add(
  "Texto_Css_Habilitar",
  (selector, texto, tiempo = 1000) => {
    cy.get(selector)
      .scrollIntoView()
      .should("be.visible")
      .then(($el) => {
        //verificar si el campo esta deshabilitado
        if ($el.prop("disabled")) {
          ///remover la propiedad disabled
          cy.wrap($el)
            .invoke("prop", "disabled", false)
            .should("not.be.disabled");
        }
      })
      .clear()
      .type(texto);
    cy.wait(tiempo);
    cy.log("Texto: " + texto);
  }
);

Cypress.Commands.add(
  "Texto_Etiqueta_Habilitar",
  (Label, texto, tiempo = 1000) => {
    cy.contains("label", Label)
      .invoke("attr", "for")
      .then(($fielId) => {
        cy.get(`#${fieldId}`)
          .first()
          .should("be.visible")
          .then(($el) => {
            //verificar si el campo esta deshabilitado
            if ($el.prop("disabled")) {
              ///remover la propiedad disabled
              cy.wrap($el)
                .invoke("prop", "disabled", false)
                .should("not.be.disabled");
            }
          })
          .clear()
          .type(texto);
        cy.wait(tiempo);
        cy.log("Texto: " + texto);
      });
  }
);
/** */
Cypress.Commands.add(
  "Copiar_Pegar_Css",
  (campoOrigen, campoDestino, tiempo = 1000) => {
    //copiar el valor del resultado
    cy.get(campoOrigen).then(($origen) => {
      const valorResultado = $origen.val();
      cy.log("Valor Copiado: " + valorResultado);
      //pegar el valor del resultado en el campo de destino
      cy.get(campoDestino).clear().type(valorResultado).wait(tiempo);
      cy.log("Valor Copiado: " + campoDestino + valorResultado);
    });
  }
);
/** */
Cypress.Commands.add(
  "Copiar_Pegar_Xpath",
  (campoOrigen, campoDestino, tiempo = 1000) => {
    //copiar el valor del resultado
    cy.xpath(campoOrigen).then(($origen) => {
      const valorResultado = $origen.val();
      cy.log("Valor Copiado: " + valorResultado);
      //pegar el valor del resultado en el campo de destino
      cy.xpath(campoDestino).clear().type(valorResultado).wait(tiempo);
    });
  }
);

Cypress.Commands.add("Combo_Xpath", (selector, texto, tiempo = 1000) => {
  cy.xpath(selector).scrollIntoView().should("be.visible").select(texto);
  cy.wait(tiempo);
  cy.log("Seleccion: " + texto);
});
Cypress.Commands.add("Combo_Css", (selector, texto, tiempo = 1000) => {
  cy.get(selector).scrollIntoView().should("be.visible").select(texto);
  cy.wait(tiempo);
  cy.log("Seleccion: " + texto);
});
Cypress.Commands.add("Combo_Name", (selector, texto, tiempo = 1000) => {
  cy.get(`[name="${selector}"]`)
    .scrollIntoView()
    .should("be.visible")
    .select(texto);
  cy.wait(tiempo);
  cy.log("Seleccion: " + texto);
});
Cypress.Commands.add("Combo_Etiqueta", (Label, texto, tiempo = 1000) => {
  cy.contains("label", Label)
    .invoke("attr", "for")
    .sthen((fieldId) => {
      cy.get(`#${fieldId}`)
        .first()
        .scrollIntoView()
        .should("be.visible")
        .select(texto);
      cy.wait(tiempo);
      cy.log("Seleccion: " + texto);
    });
});
///caso aparte del comandos//
Cypress.Commands.add("login", (username, password) => {
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get("#login-button").click({ time: 5000 });
  cy.xpath("//div[@class='product_label']").should("contain", "Products");
});
