require('cypress-plugin-tab');
import 'cypress-xpath';
import { faker } from '@faker-js/faker';
const XLSX = require('xlsx');
// npm install xlsx

let tiempo = 500;

describe('Ejemplo Datos tipo Excel', () => {
  beforeEach(() => {
    cy.visit('https://rodrigovillanueva.com.mx/form/demo-application');
    cy.viewport(1900, 1000);
    cy.title().should("eq", "Demo: Application | RodrigoVillanueva.com.mx");
  });

  it('Datos Excel Extraer', () => {
    let contador = 0;
    // Sube la ventana
    cy.window().then((win) => {
      win.scrollBy(0, -500);
    });
    cy.wait(tiempo);
    

    cy.readFile('C:\\Users\\Rodrigo\\Documents\\VIDEOS_UDEMY_ES\\CYPRESS_2024\\CYPRESS_PRACTICAS\\cypress\\fixtures\\datos.xlsx', 'binary').then((fileContent) => {
      const workbook = XLSX.read(fileContent, { type: 'binary' });
      const sheetName = workbook.SheetNames[0]; // Nombre de la primera hoja
      const sheet = workbook.Sheets[sheetName];
      const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); //Leer desde la columna uno

      // Omitir la primera fila (títulos de las columnas)
      const dataRows = data.slice(1);

      // Iterar sobre las filas y pasar los valores
        for (let i = 0; i < dataRows.length; i++) {
          const row = dataRows[i];
          // const nombre = row[0]; // Valor en la columna "nom"
          // const email = row[1]; // Valor en la columna "email"
          // const tel = row[2]; // Valor en la columna "telefono"

          const nombre = row[0] ? row[0].toString() : ''; // Valor en la columna "nombre" convertido a cadena de texto
          const email = row[1] ? row[1].toString() : ''; // Valor en la columna "email" convertido a cadena de texto
          const tel = row[2] ? row[2].toString() : ''; // Valor en la columna "telefono" convertido a cadena de texto

          cy.xpath("//input[@id='edit-contact-name']").clear().type(nombre);
          cy.xpath("//input[@id='edit-contact-email']").clear().type(email);
          cy.xpath("//input[@id='edit-contact-phone']").clear().type(tel, { delay: 1 });

          // cy.xpath("//input[@id='edit-contact-name']").type(nombre);
          // cy.xpath("//input[@id='edit-contact-email']").type(email);
          // cy.xpath("//input[@id='edit-contact-phone']").type(tel, { delay: 1 });

          // if (nombre !== '') {
          //   cy.xpath("//input[@id='edit-contact-name']").clear().type(nombre);
          // }else{
          //   cy.xpath("//input[@id='edit-contact-name']").clear().type("Vacio");
          // }
          
          // if (email !== '') {
          //   cy.xpath("//input[@id='edit-contact-email']").clear().type(email);
          // }
          
          // if (tel !== '') {
          //   cy.xpath("//input[@id='edit-contact-phone']").clear().type(tel, { delay: 1 });
          // }
          cy.wait(tiempo);
          contador++;
          cy.log("Registro numero: " + contador)

          cy.window().then((win) => {
            win.scrollBy(0, -500);
          });
          cy.wait(tiempo);
        }
    });
  });
});