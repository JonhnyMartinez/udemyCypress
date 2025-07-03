//npm install -D cypress-xpath
//npm install -D cypress-plugin-tab
//npm install --save-dev @faker-js/faker
//Pagina ->  https://fakerjs.dev/guide/frameworks.html

require('cypress-plugin-tab')
import 'cypress-xpath';
// import faker from 'faker';
// const faker = require("faker");
import {faker} from '@faker-js/faker';

let tiempo=2000

let NP=2

describe('Ejemplo Datos tipo Json', () => {
  
  
    it('Datos Json', () => {
     let contador = 0
     //Sube la ventana 
     cy.window().then((win) => {
      win.scrollBy(0, -500);
     });
      cy.wait(tiempo);
     
      //Comienza los ciclos
      cy.fixture('datos.json').then((data) => {
        data.forEach((row) => {
          cy.visit('https://rodrigovillanueva.com.mx/form/demo-application')
          cy.viewport(1900,1000)
          cy.title().should("eq","Demo: Application | RodrigoVillanueva.com.mx")
         


          let nombre = row.name;
          let email = row.email;
          let telefono = row.phone;
          
          
          cy.xpath("//input[@id='edit-contact-name']").type(nombre)
          //input[@name='contact[name]']
          cy.xpath("//input[@id='edit-contact-email']").type(email)
          //input[@id='edit-contact-email']
          cy.xpath("//input[@id='edit-contact-phone']").type(telefono,{delay:100})
          cy.wait(tiempo)
          contador++;
          cy.window().then((win) => {
            win.scrollBy(0, -400);
           });
          cy.wait(tiempo);
          cy.log("Dato cargado : " + contador)
          
          
        });
      });
  
    });

});


  