class LoginPage {
    get loginBtn() {
        return cy.get('.nav-link').eq(1);
    }

    get emailInput() {
        return cy.get('#email');
    }

    get passwordInput() {
        return cy.get('#password');
    }

    get submitBtn() {
        return cy.get('button');
    }

    get logoutBtn() {
        return cy.get('.nav-link').eq(3);
    }

    get errorMessage() {
        return cy.get('p[class="alert alert-danger"]');
    }

    get loginTitle() {
        return cy.get('h1');
    }

    login(email, password) {
        this.emailInput.type(email)
        this.passwordInput.type(password)
        this.submitBtn.click()
    }

}

export const loginPage = new LoginPage();