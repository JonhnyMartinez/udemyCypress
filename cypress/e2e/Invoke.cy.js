/// <reference types="cypress" />
require('cypress-plugin-tab');
import 'cypress-xpath';
// import { faker } from '@faker-js/faker';
const XLSX = require('xlsx');

let tiempo=1000

function scroll(x,y,t) {
  cy.window().then((win) => {
    win.scrollBy(x,y);
    cy.wait(t);
  });
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // Evitar que la excepción detenga la ejecución
  return false;
});


let textField=""
let textPass=""

describe('Practica Invoke', () => {

  beforeEach(() => {    
    cy.viewport(1900, 900);
  
  });

  

 
  it('Trabajo con funciones Invoke', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://the-internet.herokuapp.com/windows');
    cy.title().should("contains", "The");
    scroll(0,-300,tiempo)


    //interceptar el GET DEL LOG
    cy.intercept('GET', 'https://298279967.log.optimizely.com/event*', (req) => {
      req.reply('');
    }).as('optimizelyEvent');



    // cy.xpath("//a[contains(.,'Click Here')]").click({time:10000})

     //target_blanck
    cy.xpath("//a[contains(.,'Click Here')]").invoke("removeAttr",'target').click({time:10000})

    cy.get('h3').should("contain","New Wind")

    // Verifica que se haya enviado el formulario exitosamente
    //cy.contains('Formulario enviado exitosamente').should('be.visible');
  });

  it('Trabajo con funciones Invoke Atributo', () => { 
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.title().should("contains", "The");
    scroll(0,-500,tiempo)

    cy.xpath("//input[contains(@id,'username')]").type("rodrigo").wait(2000)
    //Obtener atributo ->name
    cy.xpath("//input[contains(@id,'username')]").invoke('attr', 'id').should('equal', 'username');
    cy.wait(4000)

  });//it




  it('Trabajo con funciones Invoke Texto', () => { 
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.title().should("contains", "The");
    scroll(0,-300,tiempo)

    cy.xpath("//input[contains(@id,'username')]").type("rodrigo").wait(2000)
    //Obtener valor del campo
    cy.xpath("//input[contains(@id,'username')]").invoke('val').should('equal', 'rodrigo');

     //Obtener valor del texto
     cy.get("h2").invoke('text').should('contain', 'Login Page');

  });//it


  //Ejemplo Campo oculto dar click
  // cy.get('.my-element').invoke('show').click();




  it('Trabajo con funciones Invoke Establecer valor de un campo', () => { 
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.title().should("contains", "The");
    scroll(0,-500,tiempo)

    cy.xpath("//input[contains(@id,'username')]").invoke('val', 'Erika');
    cy.wait(2000)
    //Ejemplo de establecer un valor en un campo de entrada:

    cy.xpath("//input[contains(@id,'username')]").clear().type("rodrigo").wait(2000)
    //Obtener valor del campo

    cy.xpath("//input[contains(@id,'username')]").invoke('val', 'Juan');
    cy.wait(2000)
    
  });//it
  


  it('Trabajo con funciones Invoke Obtener Valor del Texto', () => { 
    cy.visit('https://the-internet.herokuapp.com/login');
    cy.title().should("contains", "The");
    scroll(0,-500,tiempo)

    cy.xpath("//h4[contains(@class,'subheader')]").scrollIntoView();

    cy.xpath("//h4[contains(@class,'subheader')]", { timeout: 5000 })
    .invoke('text')
    .then((text) => {
      cy.log("Valor del Texto: " + text);
      console.log("Valor del Texto Inspeccionar: " + text);

      if (text.includes('tomsmith')) {
        cy.log('Se encontró la palabra "tomsmith" en el texto.');
      } else {
        cy.log('La palabra "tomsmith" no se encontró en el texto.');
      }
    });
    
  });//it


  //Validar si un elemento es visible 
  // cy.get('.mi-elemento').invoke('is', ':visible').should('be.true');



  function cambiarColorDePagina() {
    return document.body.style.backgroundColor = 'red';
  }

  
  it.only('Trabajo con funciones Invoke Disparar Evento', () => { 
      cy.visit('https://the-internet.herokuapp.com/login');
      cy.title().should("contains", "The");
      scroll(0, -500,1000);

      cy.get('input[id="username"]').type('Rodrigo').wait(2000).then(() => {
        cy.get('body').invoke('attr', 'style', 'background-color: red');
        // cy.get('body').invoke('attr', 'style', cambiarColorDePagina());
      });

      textField = cy.get('input[id="username"]');
      textField.clear().type('Juan').wait(2000).then(() => {
      textField.invoke('attr', 'style', 'background-color: blue');
    });

    cy.get('body').invoke('attr', 'style', 'background-color: black').wait(1000)
    cy.get('body').invoke('attr', 'style', 'background-color: white').wait(1000)

    textField.clear().type('Erika').wait(2000).then(() => {
      textField.invoke('attr', 'style', 'background-color: yellow');
    });

    textField.clear().type('Carlos').wait(2000).then(() => {
      textField.invoke('attr', 'style', 'display: none');
      cy.log("Campo nombre desaparece")
      
    });


    textPass = cy.xpath("//input[@id='password']");
    textPass.clear().type('123456').wait(2000).then(() => {
      textPass.invoke('attr', 'style', 'display: none');
     
    });

  
    cy.reload()
    
   
    // textField.invoke('attr', 'style', 'display: block').then(()=>{
    //   textField.clear().type('Juan').wait(2000)
    // })

    // cy.get('textField')
    // .should('not.be.null')
    // .invoke('attr', 'style', 'display: block')
    // // .clear()
    // .type('Juan')
    // .wait(2000);

    // textPass.invoke('attr', 'style', 'display: block').then(()=>{
    //   textPass.clear().type('12345').wait(2000)
    // })


    cy.get('input[id="username"]').type('Pedro').wait(2000).then(() => {
      cy.get('input[id="username"]').invoke('attr', 'readonly', 'readonly');
    });

    cy.xpath("//input[@id='password']").type('123456').wait(2000).then(() => {
      cy.xpath("//input[@id='password']").invoke('attr', 'disabled', 'disabled');
      cy.wait(10000)
    }); 


  });


  


 

});//Todas las pruebas

  