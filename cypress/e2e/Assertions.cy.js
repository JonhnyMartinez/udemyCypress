/// <reference types="cypress" />
require('cypress-plugin-tab');
import 'cypress-xpath';
const XLSX = require('xlsx');

let tiempo = 1000;
let ttiempo_espera = 5000;

let sessionCookies = [];

function scroll(x, y, t) {
  cy.window().then((win) => {
    win.scrollBy(x, y);
    cy.wait(t);
  });
}

Cypress.on('uncaught:exception', (err, runnable) => {
  // Evitar que la excepción detenga la ejecución
  return false;
});

describe('Validaciones Assertions Should, and', () => {
  beforeEach(() => { 
    cy.visit('https://www.saucedemo.com/v1/');   
    cy.viewport(1900, 900);  
  });

  it('Ejemplos Should y And', () => { 
    //Verificar si un elemento está visible y contiene un texto específico:
    cy.xpath("//h4[contains(.,'Accepted usernames are:')]").should('be.visible').and('contain', 'Accepted usernames are:');
    cy.wait(3000)

    //Verificar si un campo de entrada está habilitado y tiene un valor específico:
    cy.xpath("//input[contains(@data-test,'username')]").should('be.enabled').and('have.value', '');
    cy.wait(3000)

    //Verificar si un elemento tiene una clase CSS específica y está habilitado:
    cy.xpath("//input[contains(@data-test,'username')]").should('have.class', 'form_input').and('be.enabled');
    cy.wait(3000)

    //Verificar si un elemento no tiene una clase CSS específica y está habilitado:
    cy.xpath("//input[contains(@data-test,'username')]").should('not.have.class', 'form_innn').and('be.enabled');
    cy.wait(3000)
    

    //Tiene un Atributo y una clase Especifica 
    cy.xpath("//input[contains(@data-test,'username')]")     
    .should('exist')
    .should('have.attr', 'placeholder')
    cy.wait(3000)
    

    // Verificar si un elemento tiene una clase CSS específica y no contiene un texto específico:    
    cy.xpath("//input[contains(@data-test,'username')]")    
    .should('have.class', 'form_input').and('not.contain', 'Rodrigo');
    cy.wait(3000)
    

    // Verificar que el título de la página sea "Swag Labs":
   cy.title().should('eq', 'Swag Labs');
   

    //Verificar que el botón de inicio de sesión esté visible:
    cy.get('.btn_action').should('be.visible');
    

    //Verificar que la imagen del logo esté cargada correctamente:
    cy.get('.login_logo').should('be.visible').and('not.have.attr', 'src');
    cy.wait(3000)

  });//it


  it('Ejemplos Should y And Parte Dos', () => { 

    cy.xpath("//input[contains(@data-test,'username')]").type("rodrigo","time:20000")
    
    cy.xpath("//input[contains(@type,'password')]").type("12345","time:5000")
    
    cy.get('.btn_action')
    
    .should('be.visible')
    
    .click({time:5000})
    
    // Verificar que se muestre un mensaje de error al intentar iniciar sesión con credenciales incorrectas:
    cy.get('.error-button').should('be.visible');
    cy.wait(3000)
    
  });//it
  
  it('Ejemplos Should y And Parte Tres', () => { 

    cy.xpath("//input[contains(@data-test,'username')]").type("standard_user","time:5000")
    
    cy.xpath("//input[contains(@type,'password')]").type("secret_sauce","time:5000")
    
    cy.get('.btn_action')
    
    .should('be.visible')
    
    .click({time:5000})
    
    //Verificar que se pueda iniciar sesión correctamente con credenciales válidas:
    cy.url().should('include', '/inventory.html');
    cy.wait(2000)
    
    // Verificar que se muestren los productos en la página de inventario:
    cy.get('.inventory_item').should('have.length.greaterThan', 0);
    

    // Verificar que se pueda agregar un producto al carrito de compras:
    cy.get('.inventory_item:first-child .btn_primary').click();
    cy.wait(2000)
    
    cy.get('.shopping_cart_badge').should('have.text', '1');
    

    // Verificar que se pueda eliminar un producto del carrito de compras:
    cy.get('.shopping_cart_link').click();
    cy.wait(2000)
    
    cy.get('.cart_item').should('have.length.greaterThan', 0);
    
    cy.xpath("//div[@class='inventory_item_name'][contains(.,'Sauce Labs Backpack')]").then(($product) => {
      const productTitle = $product.text();
      cy.log(productTitle)
      cy.wait(2000)
      
      cy.xpath("//button[@class='btn_secondary cart_button'][contains(.,'REMOVE')]").click();
      
      
      // cy.get('.cart_list').should('contain', productTitle);
      cy.get('.cart_list').should('not.contain', productTitle);
      cy.log("Ya no esta el producto")
      cy.wait(2000)
      
      
    });
    cy.wait(3000)

  });//it


    it('Ejemplos Should y And Parte Cuatro', () => { 

      cy.xpath("//input[contains(@data-test,'username')]").type("standard_user","time:5000")
      
      cy.xpath("//input[contains(@type,'password')]").type("secret_sauce","time:5000")
      
      cy.get('.btn_action')
      
      .should('be.visible')
      
      .click({time:5000})
      
      //Verificar que se pueda iniciar sesión correctamente con credenciales válidas:
      cy.url().should('include', '/inventory.html');
      
      // Verificar que se muestren los productos en la página de inventario:
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
      
  
      // Verificar que se pueda filtrar los productos por categoría:
      cy.get('.product_sort_container').select('Price (low to high)');
      
      cy.get('.inventory_item_price').then(($prices) => {
        const prices = $prices.toArray().map((el) => parseFloat(el.textContent.replace('$', '')));
        const sortedPrices = [...prices].sort((a, b) => a - b);
        
        cy.wrap(prices).should('deep.equal', sortedPrices);
        
      });
      cy.wait(3000)

    });//it

    it('Ejemplos Should y And Parte Cinco', () => { 

      cy.xpath("//input[contains(@data-test,'username')]").type("standard_user","time:5000")
      
      cy.xpath("//input[contains(@type,'password')]").type("secret_sauce","time:5000")
      
      cy.get('.btn_action')
      
      .should('be.visible')
      
      .click({time:5000})
      
      //Verificar que se pueda iniciar sesión correctamente con credenciales válidas:
      cy.url().should('include', '/inventory.html');
      
      // Verificar que se muestren los productos en la página de inventario:
      cy.get('.inventory_item').should('have.length.greaterThan', 0);
      
  
      // Verificar que se pueda realizar una compra exitosa:
      cy.get('.inventory_item').each(($product) => {
        cy.wrap($product).find('.btn_primary').click();
        cy.wait(700)
        
      });
      cy.get('.shopping_cart_link').click().wait(tiempo);
      
      cy.get('.cart_item').should('have.length.greaterThan', 0).wait(tiempo);
      
      cy.get('.checkout_button').click().wait(tiempo)
      
      cy.get('[data-test="firstName"]').type('John').wait(tiempo)
      
      cy.get('[data-test="lastName"]').type('Doe').wait(tiempo)
      
      cy.get('.btn_primary').click().wait(tiempo)
      
      cy.get('.error-button').should('be.visible').wait(tiempo)
      

      //Verificar que se pueda cerrar sesión correctamente:
      cy.get('.bm-burger-button').click();
      
      cy.get('#logout_sidebar_link').click();
      
      cy.url().should('include', '/index.html');
      cy.wait(3000)

    });//it

    it.only('Ejemplos Should y And Parte Seis', () => {
      cy.xpath("//input[contains(@data-test,'username')]").type("standard_user", { timeout: 5000 });
      cy.xpath("//input[contains(@type,'password')]").type("secret_sauce", { timeout: 5000 });
      
      cy.get('.btn_action').should('be.visible').click({ timeout: 5000 });
      
    
      // Verificar que se pueda iniciar sesión correctamente con credenciales válidas:
      cy.url().should('include', '/inventory.html');
      

      // Verificar que se pueda agregar todos los productos al carrito de compras:
      cy.get('.btn_primary').each(($button) => {
        cy.wrap($button).click();
        cy.wait(2000)
        
      });
      cy.get('.shopping_cart_badge').should('have.text', '6');
      cy.wait(7000)
      
      
      cy.wait(3000)
    
    });//it
  


});//Describe







//Ejemplos Extras 
    //Verificar si un elemento está oculto y no contiene un texto específico:
    //cy.get('#elemento').should('be.hidden').and('not.contain', 'Texto no esperado');

    //Verificar si un elemento está deshabilitado y no tiene un atributo específico:
    //cy.get('#elemento').should('be.disabled').and('not.have.attr', 'atributo-especifico');

    //Verificar si un elemento tiene un ancho y alto específicos:
    //cy.get('#elemento').should('have.css', 'width', '100px').and('have.css', 'height', '200px');

    // Verificar si un elemento tiene un estilo CSS específico y su valor es mayor que otro elemento:
    // cy.get('#elemento1').should('have.css', 'font-size').and('be.greaterThan', '#elemento2');

    // Verificar si un elemento tiene una propiedad específica y su valor es igual a otro elemento:
    // cy.get('#elemento1').should('have.prop', 'checked').and('equal', '#elemento2');


