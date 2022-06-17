/// <reference types="Cypress" />

const {allGalleriesPage} = require("../page_objects/allGalleriesPage")

describe('all galleries POM', () => {

    beforeEach('visit home page', () => {
        cy.visit('/');
        cy.url().should('include', 'gallery-app');
    })

    it('open gallery by clicking title', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries/764'
        }).as('getSingleGallery')

       allGalleriesPage.galleryTitleBtn.click();
       cy.wait('@getSingleGallery').then(interception => {
           expect(interception.response.statusCode).to.exist
           expect(interception.response.statusCode).eq(200)
       })
       cy.url().should('include', '/galleries');
       allGalleriesPage.authorTitle.should('be.visible');
    })

    it('open gallery by clicking on author title', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/author-galleries/53?page=1&term='
        }).as('getAuthorsGalleries')

        allGalleriesPage.authorNameBtn.click();
        cy.wait('@getAuthorsGalleries').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        cy.url().should('include', '/authors');
        allGalleriesPage.galleriesOfTitle.should('contain', 'Galleries of');
    })

    it('search for a gallery by using filter', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=Test%20galerija'
        }).as('filterGalleries')

        allGalleriesPage.searchInputField.type('Test galerija');
        allGalleriesPage.filterBtn.click();
        cy.wait('@filterGalleries').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        allGalleriesPage.galleryTitleBtn.should('contain', 'Test galerija');
    })

    it('ensure unexisting gallery wont show', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=1&term=zxy'
        }).as('filterGalleries')

        allGalleriesPage.searchInputField.type('zxy');
        allGalleriesPage.filterBtn.click();
        cy.wait('@filterGalleries').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        allGalleriesPage.noGalleriesTitle.should('be.visible');
        allGalleriesPage.noGalleriesTitle.should('have.text', 'No galleries found');
    })

    it.only ('ensure load more button works properly', () => {
        cy.intercept({
            method: 'GET',
            url: 'https://gallery-api.vivifyideas.com/api/galleries?page=2&term='
        }).as('loadMoreGalleries')

        allGalleriesPage.loadMoreBtn.click();
        cy.wait('@loadMoreGalleries').then(interception => {
            expect(interception.response.statusCode).to.exist
            expect(interception.response.statusCode).eq(200)
        })
        cy.get('.cell').should('have.length', 20);
    })
})