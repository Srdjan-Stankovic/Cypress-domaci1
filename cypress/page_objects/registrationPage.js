class RegistrationPage {

    get registerBtn() {
        return cy.get('.nav-link').eq(2);
    }

    get firstNameInput() {
        return cy.get('#first-name');
    }

    get lastNameInput() {
        return cy.get('#last-name');
    }

    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get passwordConfirmation() {
        return cy.get('#password-confirmation')
    }

    get termsCheckbox() {
        return cy.get('.form-check-input');
    }

    get submitBtn() {
        return cy.get('button');
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    get registerHeading() {
        return cy.get('h1');
    }

    register(firstName, lastName, email, password) {
        this.firstNameInput.type(firstName);
        this.lastNameInput.type(lastName);
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.passwordConfirmation.type(password)
        this.termsCheckbox.click();
        this.submitBtn.click();
    }
}

export const registrationPage = new RegistrationPage();