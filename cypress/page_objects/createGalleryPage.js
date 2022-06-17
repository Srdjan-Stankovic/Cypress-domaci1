class CreateGalleryPage {

    get createGalleryBtn() {
        return cy.get('.nav-link').eq(2);
    }

    get titleInput() {
        return cy.get('#title');
    }

    get descriptionInput() {
        return cy.get('#description');
    }

    get imageInput() {
        return cy.get("input[type='url']");
    }

    get imageInputField2() {
        return cy.get("input[type='url']").eq(1);
    }

    get galleryInputParent() {
        return cy.get("div[class = 'form-group']").last();
    }

    get shiftUpBtn() {
        return this.galleryInputParent
            .find('button')
            .eq(1)
    }

    get shiftDownBtn() {
        return this.galleryInputParent
            .find('button')
            .last()
    }

    get deleteImageButton() {
        return this.galleryInputParent
            .find('button')
            .first()
    }

    get createGalleryTitle() {
        return cy.get('h1');
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

    get errorMessage() {
        return cy.get('p[class = "alert alert-danger"]')
    }

    createGallery(title, desc, image) {
        this.titleInput.type(title)
        this.descriptionInput.type(desc)
        this.imageInput.type(image)
        this.submitBtn.click()
    }
}

export const createGalleryPage = new CreateGalleryPage();



