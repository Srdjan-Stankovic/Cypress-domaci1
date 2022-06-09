class CreateGalleryPage {

    get createGalleryBtn() {
        return cy.get('.nav-link').eq(2);
    }

    get titleInputfield() {
        return cy.get('#title');
    }

    get descriptionInputField() {
        return cy.get('#description');
    }

    get imageInputField() {
        return cy.get("input[type='url']");
    }

    get imageInputField2() {
        return cy.get("input[type='url']").eq(1);
    }

    get shiftUpBtn() {
        return cy.get('.input-buttons').eq(0);
    }

    get shiftDownBtn() {
        return cy.get('.input-buttons').eq(1);
    }

    get addImageBtn() {
        return cy.get('button[type="button"]').eq(2);
    }

    get submitBtn() {
        return cy.get('button[type="submit"]').eq(0);
    }

    get cancelBtn() {
        return cy.get('button[type="submit"]').eq(1);
    }

    get deleteImageButton() {
        return cy.get('.input-buttons').eq(0);
    }

}

export const createGalleryPage = new CreateGalleryPage();



