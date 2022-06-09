/// <reference types="Cypress" />

const {createGalleryPage} = require("../page_objects/createGalleryPage")
const {loginPage} = require('../page_objects/loginPage');


describe('create gallery POM', () => {

    const userData = {
        email: 'srdjanstankovic195@gmail.com',
        password: '12341234'
    }

    beforeEach('visit create gallery page', () => {
        cy.visit('/')
        loginPage.loginBtn.click();
        loginPage.login(
            userData.email,
            userData.password
        );
        cy.url().should('not.include', '/login');
        cy.visit('https://gallery-app.vivifyideas.com/create');
        cy.url().should('include', '/create');
    })
       

    it('Create gallery without entering a title', () => {
        createGalleryPage.descriptionInputField.type('nova galerija123');
        createGalleryPage.imageInputField.type('https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        createGalleryPage.submitBtn.click();
        cy.url().should('include', '/create')
    })

    it('Create gallery without adding an image', () => {
        createGalleryPage.titleInputfield.type('nova galerija');
        createGalleryPage.descriptionInputField.type('nova galerija123');
        createGalleryPage.submitBtn.click();
        cy.url().should('include', '/create')
    })

    it('create gallery with incorrect image format', () => {
        createGalleryPage.titleInputfield.type('nova galerija');
        createGalleryPage.descriptionInputField.type('nova galerija123');
        createGalleryPage.imageInputField.type('https://idearocketanimation.com/app/uploads/2017/04/foundergif.gif');
        createGalleryPage.submitBtn.click();
        cy.url().should('include', '/create')
    })

    it('ensure add image button works', () => {
        createGalleryPage.addImageBtn.click();
        createGalleryPage.imageInputField2.should('be.visible');
    })

    it('ensure delete image button works', () => {
        createGalleryPage.addImageBtn.click();
        createGalleryPage.imageInputField2.should('be.visible');
        createGalleryPage.deleteImageButton.click();
        createGalleryPage.imageInputField.should('have.length', 1);
    })

    it('ensure cancel button works', () => {
        createGalleryPage.cancelBtn.click();
        cy.url().should('not.include', '/create')
    })


    xit('successfully create a gallery without a description', () => {
        createGalleryPage.titleInputfield.type('nova galerija');
        createGalleryPage.imageInputField.type('https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        createGalleryPage.submitBtn.click();
        cy.url().should('not.include', '/create')
    })

    xit('successfully create a gallery', () => {
        createGalleryPage.titleInputfield.type('nova galerija');
        createGalleryPage.descriptionInputField.type('nova galerija123');
        createGalleryPage.imageInputField.type('https://images.pexels.com/photos/302743/pexels-photo-302743.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500');
        createGalleryPage.imageInputField.invoke('val').should('contains', '.jpeg' | '.jpg' | '.png');
        createGalleryPage.submitBtn.click();
        cy.url().should('not.include', '/create')
    })
})