/// <reference types="cypress" />
// require('cypress-plugin-tab');
// npm install -D cypress-xpath
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

describe('Practica Actions', () => {
  beforeEach(() => {    
    cy.viewport(1900, 900);  
  });

  

 
  it('Acciones Type Simple', () => { 
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-100,3000)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo);
    cy.xpath("//input[@name='name']").type("Rodrigo")
    cy.wait(tiempo);
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo')   
    cy.wait(tiempo);   

  });

  it('Acciones Type Caracteres Especiales', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-250,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type("Rodrigo")
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
    cy.wait(tiempo)  
    cy.xpath("//input[@name='name']").type('{leftarrow}{rightarrow}{uparrow}{downarrow}')
    cy.wait(tiempo)  
    cy.xpath("//input[@name='name']").type('{del}{selectall}{backspace}')
    cy.wait(3000) 
    cy.xpath("//input[@name='name']").type("Juan")
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").should('have.value', 'Juan') 
    cy.wait(tiempo)  

  });

 
  it('Acciones Type Modificadores Key', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-100,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type("Rodrigo")
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").type('{alt}{option}')
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type('{ctrl}{control}')
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type('{meta}{command}{cmd}')
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type('{shift}')
    cy.wait(tiempo)

  });

  it('Acciones Type Delay', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-250,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type("Rodrigo", { delay: 100 })
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
   

  });

  it('Acciones Type Visible o Disabled', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-250,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").type("Rodrigo", { delay: 200 }, { force: true })
    cy.wait(tiempo)
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
  
  });

  it('Acciones Focus', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-100,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").focus()
    cy.wait(4000)
    cy.xpath("//input[@name='name']").type('Rodrigo') 
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
  
  });

  it('Acciones Clear', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    scroll(0,-100,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").focus()
    cy.wait(2000)
    cy.xpath("//input[@name='name']").type('Rodrigo') 
    cy.wait(2000)
    cy.xpath("//input[@name='name']").clear() 
    cy.wait(2000)
    cy.xpath("//input[@name='name']").type('Rodrigo') 
    cy.xpath("//input[@name='name']").should('have.value', 'Rodrigo') 
  
  });

  it.only('Acciones ScrollintoView', () => { 
    // Realiza las interacciones en el formulario
    // cy.get("#onetrust-accept-btn-handler").click({time:10000})
    cy.visit('https://practice-automation.com/form-fields/');
    cy.title().should("contains", "Form Fields");
    // scroll(0,-100,tiempo)
    cy.xpath("//input[@name='name']").should('be.visible');
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").scrollIntoView()
    cy.wait(tiempo) 
    cy.xpath("//input[@name='name']").focus()
    cy.wait(2000)
    cy.xpath("//input[@name='name']").type('Rodrigo') 
    cy.wait(2000)
    cy.xpath("//input[@name='name']").clear() 
    cy.wait(2000)    
    cy.xpath("//input[@name='email']").scrollIntoView()
    cy.wait(3000)  
    cy.xpath("//input[@name='email']").type("rodrigo@gmail.com")
    cy.xpath("//input[@name='email']").should('have.value', 'rodrigo@gmail.com') 

    cy.xpath("//input[@name='name']").scrollIntoView()
    cy.wait(tiempo)
    scroll(0,50,3000) 
    cy.xpath("//input[@name='name']").focus()
    cy.wait(2000)
    cy.xpath("//input[@name='name']").clear()
    cy.wait(2000)
    cy.xpath("//input[@name='name']").type('Juan') 
    cy.wait(4000)
  
  });



});//Describe

  