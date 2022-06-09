class AllGalleriesPage {

    get allGalleriesBtn() {
        return cy.get('.nav-link').eq(0);
    }

    get loginBtn() {
        return cy.get('.nav-link').eq(1);
    }

    get registerBtn() {
        return cy.get('.nav-link').eq(2);
    }

    get searchInputField() {
        return cy.get('.form-control')
    }

    get filterBtn() {
        return cy.get('button[type="button"]')
    }

    get galleryTitleBtn() {
        return cy.get('.box-title').eq(0);
    }

    get authorNameBtn() {
        return cy.get('.box-title').eq(2);
    }

    get loadMoreBtn() {
        return cy.get('button[class="btn btn-custom"]');
    }

    get noGalleriesTitle() {
        return cy.get('h4');
    }
}

export const allGalleriesPage = new AllGalleriesPage();