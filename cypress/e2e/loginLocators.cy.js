/// <reference types="Cypress" />

const Locators = require('../fixtures/Locators.json');


describe('login with locators test', () => {

    before('', () => {
        cy.visit('/');
        cy.get(Locators.Navigation.actionButton).eq(1).click();
    })

    it('login with locators', () => {
        cy.get(Locators.Navigation.actionButton).eq(1).click();
        cy.get(Locators.Login.emailInput).type('test-newmail@email.com');
        cy.get(Locators.Login.passwordInput).type('12341234');
        cy.get(Locators.Login.submitBtn).click();
    })

    it('successful logout', () => {
        cy.get(Locators.Navigation.actionButton).should('have.length', 4);
        cy.get(Locators.Navigation.actionButton).eq(3).click();
    })
})