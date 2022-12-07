/// <reference types="Cypress" />

import { loginPage } from "../pageObjects/loginPOM"
import { allGalleries } from "../pageObjects/allGalleriesObject"


describe("all galleries test", () => {
    let existingUser = {
        validEmail: "marko@gmail.com",
        validPass: "test1234",
    };

    let searchTerm = "novi sad 3 slike";

    before("log into the app", () => {
        cy.visit("/login");

        cy.url().should("include", "/login");
        loginPage.loginHeading.should("be.visible")
        .and("have.text", "Please login");

        loginPage.login(existingUser.validEmail, existingUser.validPass);

        cy.url().should("include", "/login");
        // allGalleries.allGalleriesHeading
        // .should("be.visible")
        // .and("have.text", "All Galeries");
    })

    it.only("test pagination", () => {
        allGalleries.singleGallery.should("have.length", 10);
        allGalleries.loadMoreButton.click();
        allGalleries.singleGallery.should("have.length", 20);
    })

    it("all galleries loaded", () =>{
        AllGalleries.singleGallery.should("have.length", 10)
        allGalleriesObject.galleryImage.should("have.length", 1);
    });

    it("redirect to single gallery", () =>{
        allGalleriesObject
        .singleGallery
        .first()
        .find("a")
        .click()
        allGalleriesObject.allGalleriesHeading.should("not.be visible");
        cy.url().should("include", "/galleries");
    })



    it("search for existing gallery", () =>{
        allGalleriesObject.search(searchTerm);
        allGalleriesObject.singleGallery.should("have.length", 1);
        
    })

    
})