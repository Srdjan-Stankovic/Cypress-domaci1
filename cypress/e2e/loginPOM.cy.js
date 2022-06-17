/// <reference types="Cypress" />

import {loginPage} from '../page_objects/loginPage';

describe('login POM', () => {
    let validEmail = 'srdjanstankovic195@gmail.com'
    let invalidEmail = 'srdjanstankovic@gmail.com'
    let validPassword = '12341234'

    before('visit login page', () => {
        cy.visit('/login')
        cy.url().should('contains', '/login');
    })

    it('invalid login using POM', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('invalidLogin')

        cy.url().should('include', '/login');
        loginPage.login(invalidEmail, validPassword);
        cy.wait('@invalidLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(401)
        })

        cy.url().should('include', '/login');
        loginPage.errorMessage.should('be.visible')
            .and('have.text', 'Bad Credentials')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)');
        loginPage.loginTitle.should('have.text', 'Please login');
    })

    it.only('valid login using POM', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/login'
        }).as('validLogin')

        cy.url().should('include', '/login');
        loginPage.login(validEmail, validPassword);
        cy.wait('@validLogin').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })

        cy.url().should('not.include', '/login');
        loginPage.loginTitle.should('have.text', 'All Galleries');
        loginPage.logoutBtn.should('be.visible');
    })

        it('wait for the logout request', () => {
            cy.intercept({
                method: 'POST',
                url: 'https://gallery-api.vivifyideas.com/api/auth/logout'
            }).as('logout');

            loginPage.logoutBtn.click();
            cy.wait('@logout').then(interception => {
                expect(interception.response.statusCode).eq(200);
            })
        })

    

})

    // it.only('valid login using POM', () => {
    //     cy.loginViaBackend(
    //         Cypress.env('VALID_USER_EMAIL'),
    //         Cypress.env('VALID_USER_PASSWORD')
    //         );
    //     cy.visit('/create')

    //     //cy.url().should('include', '/login');
    //     //loginPage.login(validEmail, validPassword);
    //     //cy.url().should('not.include', '/login');
    // })





// it.only('valid login using POM', () => {
//     cy.request({
//         method: 'POST',
//         url: 'https://gallery-api.vivifyideas.com/api/auth/login',
//         body: {
//             email: validEmail,
//             password: validPassword
//         }
//     }).its('body').then(response => {
//         console.log('RESPONSE', response)
//         window.localStorage.setItem('token', response.access_token)
//     })