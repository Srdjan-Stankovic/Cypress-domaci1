/// <reference types="Cypress" />

describe('register.cy.js', () => {
    it('visit gallery app and click register button', () => {
        cy.visit('https://gallery-app.vivifyideas.com/');
        cy.url().should('contains', 'gallery-app');
        cy.get('.nav-link').eq(2).click();
        cy.url().should('contains', '/register');
    })

    it('register with all fields empty', () => {
        cy.get('button').click();
        cy.url().should('contains', '/register');
    })

    it('register without accepting terms and conditions', () => {
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test1234@email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341234');
        cy.get('button').click();
        cy.url().should('contains', '/register');
    })

    it('register with an email that has already been taken', () => {
        cy.reload();
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test123@email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341234');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register');
    })

    it('register without typing "@" in email', () => {
        cy.reload();
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test12345email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341234');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register');
    })

    it('confirmed password does not match password', () => {
        cy.reload();
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test@12345email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341235');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('register using a password shorter than 8 character', () => {
        cy.reload();
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test@12345email.com');
        cy.get('#password').type('1234123');
        cy.get('#password-confirmation').type('1234123');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('registering by entering only blank spaces', () => {
        cy.reload();
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
        cy.reload();
        cy.get('#first-name').type('0TeYwCRdgyUiAsF1B1mTtpqNGdDl9plm9tHecsyv3oEl3XVDa2P1QlORGwUxyU3Hud0nb8eupXg7ZOHgE9rqjsAdYs9GXBtCb5GXwjg8WOtZ6ZaFJi4eKaaa31CY88kwynMU8ZIBHbEbpUDG4hHPq5njJP34GKfqYIwXkwcjsersXwUnOP48Kw4KgmfzyDVWkanB5UVRXt7Sxxhkc63lrGd6DC9EKy5AjfG0I70cUpyCcu3CkBdtb6F4qHN6dUnT');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test@12345email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341234');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })

    it('register with last name greater than 255 characters', () => {
        cy.reload();
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('0TeYwCRdgyUiAsF1B1mTtpqNGdDl9plm9tHecsyv3oEl3XVDa2P1QlORGwUxyU3Hud0nb8eupXg7ZOHgE9rqjsAdYs9GXBtCb5GXwjg8WOtZ6ZaFJi4eKaaa31CY88kwynMU8ZIBHbEbpUDG4hHPq5njJP34GKfqYIwXkwcjsersXwUnOP48Kw4KgmfzyDVWkanB5UVRXt7Sxxhkc63lrGd6DC9EKy5AjfG0I70cUpyCcu3CkBdtb6F4qHN6dUnT');
        cy.get('#email').type('test@12345email.com');
        cy.get('#password').type('1234123');
        cy.get('#password-confirmation').type('1234123');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','/register')
    })


    xit('successful registration', () => {
        cy.get('#first-name').type('srdjan');
        cy.get('#last-name').type('stankovic');
        cy.get('#email').type('test-newmail@email.com');
        cy.get('#password').type('12341234');
        cy.get('#password-confirmation').type('12341234');
        cy.get('.form-check-input').click();
        cy.get('button').click();
        cy.url().should('contains','gallery-app');
    })
  
  })