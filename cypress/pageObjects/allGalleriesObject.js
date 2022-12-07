class AllGalleries{
    get searchInputField(){
        return cy.get("input[type='text']")
    }

    get filterButton(){
        return cy.get('button')
    }

    get myGalleriesLink(){
        return cy.get("a[href='/my-galleries']")
    }

    get createGalleryLink(){
        return cy.get('a[href="/create"]')
    }

    get loadMoreButton(){
        return cy.get('button[class="btn btn-custom"]')
    }

    get logoutButton(){
        return cy.get(".nav-link").eq(3)
    }

    AllGalleries(searchInputField, filterButton, myGalleries, createGallery, loadMore, logout){
        this.searchInputField.type(searchInputField)
        this.filterButton.click()
        this.myGalleries.click()
        this.createGallery.click()
        this.loadMore.click()
        this.logout.click()
    }
}

export const AllGalleries = new AllGalleries()