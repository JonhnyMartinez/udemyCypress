//npm install -D cypress-xpath
//npm install -D cypress-plugin-tab
import "cypress-plugin-tab";
import "cypress-xpath";

let tiempo = 200;

describe("Práctica Dos", () => {
  it("Formulario_Dos", () => {
    cy.visit("https://rodrigovillanueva.com.mx/form/demo-application");
    cy.viewport(1900, 800);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
    cy.xpath("//input[@id='edit-contact-name']").type("Rodrigo");
    //input[@name='contact[name]']
    cy.xpath("//input[@id='edit-contact-email']").type("Rodrigo@gmail.com");
    //input[@id='edit-contact-email']
    cy.xpath("//input[@id='edit-contact-phone']").type("1234566", {
      delay: 1000,
    });
    cy.xpath("//input[@id='edit-contact-address']")
      .type("Demo de la Dirección", { delay: 200 })
      .type("{backspace}", { delay: 100 })
      .type("Segundo Texto", { delay: 300 })
      .type("{del}")
      .type("Nueva Dirección");
    cy.xpath("//input[contains(@id,'edit-contact-address-2')]")
      .clear()
      .type("Segundo Texto")
      .type("{del}")
      .type("Nueva Dirección")
      .clear()
      .wait(tiempo)
      .type("Este es el ultimo texto")
      .tab()
      .type("Ciudad de México CDMX")
      .wait(tiempo);

    //Campo select
    cy.xpath("//select[contains(@id,'edit-contact-state-province')]")
      .select("Alaska")
      .wait(tiempo)
      .wait(tiempo);
    cy.xpath("//select[contains(@id,'edit-contact-state-province')]")
      .select("Arizona")
      .wait(tiempo);

    //Codigo
    cy.xpath("//input[contains(@id,'edit-contact-postal-code')]")
      .type("08990")
      .wait(tiempo);

    cy.xpath("//select[contains(@id,'edit-contact-country')]")
      .select("Mexico")
      .wait(tiempo);

    cy.xpath("//input[@id='edit-resume-method-paste']").click();

    cy.wait(5000);
  });
});
