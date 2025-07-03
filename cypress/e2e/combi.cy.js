require('cypress-plugin-tab');
import 'cypress-xpath';
// import { faker } from '@faker-js/faker';
const XLSX = require('xlsx');

let tiempo=2500

function scroll(x,y,t) {
  cy.window().then((win) => {
    win.scrollBy(x,y);
    cy.wait(t);
  });
  
}

describe('Practica ComboBox', () => {

  beforeEach(() => {    
    cy.viewport(1900, 900);
  
  });

  

 
  it('Trabajo con los ComboBox', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://www.zoho.com/commerce/free-demo.html');
    cy.title().should("contains", "Book");
    scroll(0,-5,tiempo)
    cy.xpath("//input[@id='zcf_reported_by']").type("Rodrigo")
    cy.xpath("//input[@id='zcf_email']").type("rodrigo@gmail.com")
    scroll(0,-5,tiempo)

    cy.xpath("//select[@id='zcf_address_country']").select('Mali').wait(2000)
    // cy.xpath("//select[@id='zcf_address_country']").select(['Mali','México','Peru']).wait(2000)
    // scroll(0,-5,tiempo)
    cy.xpath("//select[@id='zcf_address_country']").select('Iran').wait(2000)
    cy.xpath("//select[@id='zcf_address_country']").select('Mexico').wait(2000)
    // scroll(0,-5,tiempo)
   

    // Verifica que se haya enviado el formulario exitosamente
    //cy.contains('Formulario enviado exitosamente').should('be.visible');
  });

  it('Trabajo con los ComboBox 2', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    scroll(0,-50,tiempo)
    cy.visit('https://www.dummyticket.com/dummy-ticket-for-visa-application/');

    // cy.xpath("//span[@title='Visa application']").click({time:5000})
    // cy.get(".select2-search__field").type("Visa extension").type('{enter}').wait(2000)
    cy.xpath("//span[@title='Visa application']").click({time:5000})
    cy.get(".select2-search__field").type("Visa Extension").type('{enter}').wait(10000)
    scroll(0,-50,tiempo)
    // cy.get('#deliverymethod_1').click({time:5000})


    cy.xpath("//span[contains(@id,'select2-billing_country-container')]").click({time:5000})
    cy.xpath("//input[@class='select2-search__field']").type("Moldova").type('{enter}').wait(6000).then(()=>{
      cy.log("Pais Seleccionado es Moldova")
    });
   
   

    // Verifica que se haya enviado el formulario exitosamente
    //cy.contains('Formulario enviado exitosamente').should('be.visible');
  });

  

  it.only('Realizar búsqueda en Google y seleccionar tercer resultado', () => {
    cy.visit('https://www.google.com');
  
    // Ingresa el término de búsqueda en el campo de búsqueda de Google
    cy.xpath("//textarea[contains(@id,'APjFqb')]")
    .type('ferrari')
    .wait(3000);
  
  cy.get("div.wM6W7d>span").each(($el, index, $list) => {
    cy.log($el.text().trim());
    if ($el.text().trim() === "Ferrari F1") {
      cy.wrap($el).click({ timeout: 3000 });
    }
  });
    

  });//prueba it

});

  