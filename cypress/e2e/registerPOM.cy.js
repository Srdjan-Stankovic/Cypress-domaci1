/// <reference types="Cypress" />

const { registrationPage } = require("../page_objects/registrationPage")
const faker = require('@faker-js/faker');

describe('register POM', () => {
   
    const userData = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        passwordWithoutNumber: faker.internet.password(20, true, /[A-Z]/),
        shortPassword: faker.internet.password(4),
        firstNameWith256Chars: faker.random.alpha(256),
        lastNameWith256Chars: faker.random.alpha(256)
    }

    before('visit register page', () => {
        cy.visit('/')
        registrationPage.registerBtn.click();
        cy.url().should('include', '/register');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    beforeEach('reload page', () => {
        cy.reload();
    })

    it('register with password less than 8 character', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('registerShortPassword')

        registrationPage.register(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.shortPassword
        )
        cy.wait('@registerShortPassword').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
        })
        cy.url().should('include', '/register');
        registrationPage.errorMessage.should('be.visible')
            .and('have.text', 'The password must be at least 8 characters.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        registrationPage.registerBtn.should('be.visible');
        registrationPage.submitBtn.should('be.visible');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    it('register with password without a number', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('registerPasswordWithoutNumber')

            registrationPage.register(
                userData.firstName,
                userData.lastName,
                userData.email,
                userData.passwordWithoutNumber
            )
            cy.wait('@registerPasswordWithoutNumber').then(interception => {
                expect(interception.response.statusCode).to.exist
                expect(interception.response.statusCode).eq(422)
            })
        cy.url().should('include', '/register');
            registrationPage.errorMessage.should('be.visible')
            .and('have.text', 'The password format is invalid.')
            .and('have.css', 'background-color', 'rgb(248, 215, 218)')
        registrationPage.registerBtn.should('be.visible');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    it('register with only spaces entered', () => {
        registrationPage.register('   ', '   ', '   ', '   ');
        cy.url().should('include', '/register');
        registrationPage.submitBtn.should('be.visible');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    it('register with a name greater than 255 characters', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('nameGreaterThan255Char')

        registrationPage.register(
            userData.firstNameWith256Chars,
            userData.lastName,
            userData.email,
            userData.password,
            userData.confirmPassword
        )
        cy.wait('@nameGreaterThan255Char').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(500)
        })
        cy.url().should('include', '/register');
        registrationPage.registerBtn.should('be.visible');
        registrationPage.submitBtn.should('be.visible');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    it('register with a last name greater than 255 characters', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('lastNameGreaterThan255Char')

        registrationPage.register(
            userData.firstName,
            userData.lastNameWith256Chars,
            userData.email,
            userData.password,
            userData.confirmPassword
        )
        cy.wait('@lastNameGreaterThan255Char').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(500)
        })
        cy.url().should('include', '/register');
        registrationPage.registerBtn.should('be.visible');
        registrationPage.submitBtn.should('be.visible');
        registrationPage.registerHeading.should('have.text', 'Register')    
    })

    it('valid registration using POM', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/auth/register'
        }).as('successfulRegistration')

        registrationPage.register(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.password,
            userData.confirmPassword
        );
        cy.wait('@successfulRegistration').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('not.include', '/register');
        registrationPage.registerHeading.should('have.text', 'All Galleries')
        registrationPage.termsCheckbox.should('not.exist');
    })

})