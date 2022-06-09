/// <reference types="Cypress" />

import {loginPage} from '../page_objects/loginPage';

describe('login POM', () => {
    let validEmail = 'srdjanstankovic195@gmail.com'
    let validPassword = '12341234'

    before('visit login page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
    })

    it('valid login using POM', () => {
        cy.url().should('include', '/login');
        loginPage.login(validEmail, validPassword);
        cy.url().should('not.include', '/login');
    })
})