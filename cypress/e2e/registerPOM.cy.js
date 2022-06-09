/// <reference types="Cypress" />

const { registrationPage } = require("../page_objects/registrationPage")

describe('register POM', () => {
   
    const userData = {
        firstName: 'Srdjan',
        lastName: 'Stankovic',
        email: 'srdjanstankovic19955@gmail.com',
        password: '12341234',
        confirmPassword: '12341234'
    }

    before('visit register page', () => {
        cy.visit('/')
        registrationPage.registerBtn.click();
        cy.url().should('include', '/register');    
    })

    it('valid registration using POM', () => {
        registrationPage.register(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password,
            userData.confirmPassword
        );
        cy.url().should('not.include', '/register');
    })

})