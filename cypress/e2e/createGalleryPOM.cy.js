/// <reference types="Cypress" />

const {createGalleryPage} = require("../page_objects/createGalleryPage")
const faker = require('@faker-js/faker');


describe('create gallery POM', () => {

    let galleryId;
    let galleryData = {
        title: faker.name.firstName(),
        description: faker.name.firstName(),
        image: faker.image.abstract() + '.jpg',
        invalidImage: 'https://idearocketanimation.com/app/uploads/2017/04/foundergif.gif'
    }

    beforeEach('login via backend', () => {
        cy.loginViaBackend() 
        cy.visit('/create');
        cy.url().should('include', '/create');
    })
       

    it('Create gallery without entering a title', () => {
        createGalleryPage.descriptionInput.type(galleryData.description);
        createGalleryPage.imageInput.type(galleryData.image);
        createGalleryPage.submitBtn.click();
        cy.url().should('include', '/create');
        createGalleryPage.submitBtn.should('be.visible');
    })

    it('Create gallery without adding an image', () => {
        createGalleryPage.titleInput.type(galleryData.title);
        createGalleryPage.descriptionInput.type(galleryData.description);
        createGalleryPage.submitBtn.click();
        cy.url().should('include', '/create');
        createGalleryPage.createGalleryTitle.should('be.visible');
    })

    it('create gallery with incorrect image format', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('invalidImageFormat')

        createGalleryPage.titleInput.type(galleryData.title);
        createGalleryPage.descriptionInput.type(galleryData.description);
        createGalleryPage.imageInput.type(galleryData.invalidImage);
        createGalleryPage.submitBtn.click();
        cy.wait('@invalidImageFormat').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(422)
        })
        cy.url().should('include', '/create')
        createGalleryPage.errorMessage.should('be.visible')
            .and('have.text', 'Wrong format of image');
    })

    it('ensure add image button works', () => {
        createGalleryPage.addImageBtn.click();
        createGalleryPage.imageInputField2.should('be.visible');
    })

    it('ensure delete image button works', () => {
        createGalleryPage.addImageBtn.click();
        createGalleryPage.imageInputField2.should('be.visible');
        createGalleryPage.deleteImageButton.click();
        createGalleryPage.imageInput.should('have.length', 1);
        createGalleryPage.imageInputField2.should('not.exist');
    })

    it('ensure cancel button works', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term='
        }).as('cancelBtn')

        createGalleryPage.cancelBtn.click();
        cy.wait('@cancelBtn').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('not.include', '/create')
    })


    xit('successfully create a gallery without a description', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGalleryPage.titleInput.type(galleryData.title);
        createGalleryPage.imageInput.type(galleryData.image);
        createGalleryPage.submitBtn.click();
        cy.wait('@createGallery').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(201)
        })
        cy.url().should('not.include', '/create')
    })

    // xit('successfully create a gallery with a jpg image', () => {
    //     createGalleryPage.createGallery(
    //         galleryData.title,
    //         galleryData.description,
    //         galleryData.image
    //     )
    //     console.log(createGalleryPage.imageInput.invoke('val'));
    //     createGalleryPage.imageInput.invoke('val').should('contains', '.jpg')
    //     createGalleryPage.submitBtn.click();
    //     cy.url().should('not.include', '/create')
    // })

    xit('create gallery', () => {
        cy.intercept({
            method: 'POST',
            url: 'https://gallery-api.vivifyideas.com/api/galleries'
        }).as('createGallery')

        createGalleryPage.createGallery(
            galleryData.title,
            galleryData.description,
            galleryData.image
        )

        cy.wait('@createGallery').then(interception => {
            galleryId = interception.response.body.id

            expect(interception.response.body.title).eq(galleryData.title)
            cy.visit('/galleries/' + galleryId)
            cy.get('h1').should('have.text', galleryData.title)
        })
    })

    //ifContainsString(string) {
      //  createGalleryPage.imageInputField.invoke('val').should('contains', string);
    //}
})


