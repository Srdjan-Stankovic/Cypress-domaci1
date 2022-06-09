/// <reference types="Cypress" />

describe('login.cy.js', () => {
    it('visit gallery app and click login button', () => {
      cy.visit('/');
      cy.url().should('contains', 'gallery-app');
      cy.get('.nav-link').eq(1).click();
      cy.url().should('contains', '/login');
    })
  
  
    it('login without any credentials', () => {
      cy.get('button').click();
      cy.url().should('include', '/login');
    })
  
    it('login without email', () => {
      cy.get('#password').type('12341234')
      cy.get('button').click();
      cy.url().should('include', '/login');
    })
  
    it('login without password', () => {
      cy.get('#email').type('test@email.com')
      cy.get('button').click();
      cy.url().should('include', '/login');
    })
  
    it('login with invalid email | "@" missing', () => {
      cy.reload();
      cy.get('#email').type('testemail.com');
      cy.get('#password').type('12341234');
      cy.get('button').click();
    })
  
    xit('successful logout', () => {
      cy.get('.nav-link').should('have.length', 4);
      cy.get('.nav-link').eq(3).click();
    })
  
    xit('login with valid credentials', () => {
      cy.get('#email').type('test@email.com');
      cy.get('#password').type('12341234')
      cy.get('button').click();
    })
  
  })