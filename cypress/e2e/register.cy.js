/// <reference types="Cypress" />


describe('register.cy.js', () => {
    let firstName = ('srdjan');
    let lastName = ('stankovic');
    let email = ('srdjanstankovic195@gmail.com');
    let password = ('12341234');

    beforeEach('visit register page', () => {
        cy.visit('https://gallery-app.vivifyideas.com/register');
        cy.url().should('include', '/register');
    })

    it('visit gallery app and click register button', () => {
        cy.url().should('contains', 'gallery-app');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('contains', '/register');
    })

    it('register with all fields empty', () => {
        cy.get('button').click();
        cy.url().should('contains', '/register');
    })

    it('register without accepting terms and conditions', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('button').click();
        cy.url().should('contains', '/register');
    })

    it('register with an email that has already been taken', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('test123@email.com');
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register');
    })

    it('register without typing "@" in email', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type('srdjanstankovic195gmail.com');
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register');
    })

    it('confirmed password does not match password', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type('12341235');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('register using a password shorter than 8 character', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type('1234123');
        cy.get('#password-confirmation').type('1234123');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('registering by entering only blank spaces', () => {
        cy.get('#first-name').type('     ');
        cy.get('#last-name').type('     ');
        cy.get('#email').type('       ');
        cy.get('#password').type('     ');
        cy.get('#password-confirmation').type('     ');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains', '/register');
    })

    it('register with first name greater than 255 characters', () => {
        cy.get('#first-name').type('0TeYwCRdgyUiAsF1B1mTtpqNGdDl9plm9tHecsyv3oEl3XVDa2P1QlORGwUxyU3Hud0nb8eupXg7ZOHgE9rqjsAdYs9GXBtCb5GXwjg8WOtZ6ZaFJi4eKaaa31CY88kwynMU8ZIBHbEbpUDG4hHPq5njJP34GKfqYIwXkwcjsersXwUnOP48Kw4KgmfzyDVWkanB5UVRXt7Sxxhkc63lrGd6DC9EKy5AjfG0I70cUpyCcu3CkBdtb6F4qHN6dUnT');
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('register with last name greater than 255 characters', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type('0TeYwCRdgyUiAsF1B1mTtpqNGdDl9plm9tHecsyv3oEl3XVDa2P1QlORGwUxyU3Hud0nb8eupXg7ZOHgE9rqjsAdYs9GXBtCb5GXwjg8WOtZ6ZaFJi4eKaaa31CY88kwynMU8ZIBHbEbpUDG4hHPq5njJP34GKfqYIwXkwcjsersXwUnOP48Kw4KgmfzyDVWkanB5UVRXt7Sxxhkc63lrGd6DC9EKy5AjfG0I70cUpyCcu3CkBdtb6F4qHN6dUnT');
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })


    xit('successful registration', () => {
        cy.get('#first-name').type(firstName);
        cy.get('#last-name').type(lastName);
        cy.get('#email').type(email);
        cy.get('#password').type(password);
        cy.get('#password-confirmation').type(password);
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','gallery-app');
    })
  
  })