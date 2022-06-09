/// <reference types="Cypress" />

const {allGalleriesPage} = require("../page_objects/allGalleriesPage")

describe('all galleries POM', () => {

    beforeEach('visit home page', () => {
        cy.visit('/');
        cy.url().should('include', 'gallery-app');
    })

    it('open gallery by clicking title', () => {
       allGalleriesPage.galleryTitleBtn.click();
       cy.url().should('include', '/galleries');
    })

    it('open gallery by clicking on author title', () => {
        allGalleriesPage.authorNameBtn.click();
        cy.url().should('include', '/galleries');
    })

    it('search for a gallery by using filter', () => {
        allGalleriesPage.searchInputField.type('Test galerija');
        allGalleriesPage.filterBtn.click();
        cy.wait(1000);
        allGalleriesPage.galleryTitleBtn.should('contain', 'Test galerija');
    })

    it('ensure unexisting gallery wont show', () => {
        allGalleriesPage.searchInputField.type('zxy');
        allGalleriesPage.filterBtn.click();
        cy.wait(1000);
        allGalleriesPage.noGalleriesTitle.should('contain', 'No galleries found');
    })

    it('ensure load more button works properly', () => {
        allGalleriesPage.loadMoreBtn.click();
        cy.get('.cell').should('have.length', 20);
    })
})