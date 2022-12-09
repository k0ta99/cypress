/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { loginPage } from "../pageObjects/loginPOM";
import { createGallery } from "../pageObjects/createGalleryPOM";
import { allGalleries } from "../pageObjects/allGalleriesObject"

describe("create gallery test", () =>{
    let galleryId;


    let existingUser = {
        validEmail: "marko@gmail.com",
        validPassword: "test1234"
    };

    let galleryData = {
        galleryTitle: faker.random.word(),
        galleryDescription: faker.random.words(),
        galleryImageUrl: "https://thrivethemes.com/wp-content/uploads/2018/05/photo-jpeg-example.jpg",
        secondGalleryImageUrl: "http://staffmobility.eu/sites/default/files/isewtweetbg.jpg",
        galleryImageWrongFormat: "https://cdn-icons-png.flaticon.com/512/29/29264.ico",
        galleryTitleBlank: " "

    }

    before("log into the app", () =>{
        cy.visit("/login");
        cy.url().should("include", "/login");
        loginPage.login(existingUser.validEmail, existingUser.validPassword);
        loginPage.loginButton.click();
        cy.visit("/create");
        cy.url().should("include", "/create");

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.titleLabel.should("be.visible");
        createGallery.descriptionLabel.should("be.visible");
        createGallery.imagesLabel.should("be.visible");
        createGallery.submitButton.should("be.visible");
    })

    it("create gallery with wrong image format", ()=>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("invalidGalleryCreationAttempt");

        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageWrongFormat
        );

        cy.wait("@galleryCreation").then(interception =>{
            expect(interception.response.body.statusCode).to.eq(422);
            expect(interception.response.body.id).to.not.exist;
        })
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "Wrong format of image")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
        cy.url().should("include", "/create");
    })

    it("create gallery with blank input field for title", () =>{
        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")
        createGallery.createNewGallery(
            galleryData.galleryTitleBlank,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        cy.url().should("include", "/create");
        createGallery.alertMessage.should("be.visible")
        .and("have.text", "The title field is required.")
        .and("have.css", "background-color", 'rgb(248, 215, 218)');
    })

    it("fill in gallery data then click cancel", () =>{
        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")
        createGallery.cancelCreatingGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
    })

    it("add multiple images", () => {
        cy.wait(1500)
        createGallery.createGalleryWithSecondImage(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl,
            galleryData.secondGalleryImageUrl
        )
    })

    it.only("create gallery with valid data", () =>{
        cy.intercept(
            "POST",
            "https://gallery-api.vivifyideas.com/api/galleries"
        ).as("galleryCreation");

        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")

        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );

        cy.wait("@galleryCreation").then(interception =>{
            expect(interception.response.body.title).to.eq(galleryData.galleryTitle)
            expect(interception.response.body.description).to.eq(galleryData.galleryDescription)
            galleryId = interception.response.body.id;

            cy.visit('/galleries/${galleryId}');
            cy.get("h1").should("have.text", galleryData.galleryTitle)
        });
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);
        allGalleries.singleGallery
        .first()
        .find('img')
        .should("have.", galleryData.galleryImageUrl)
        allGalleries.allGalleriesHeading.should("be.visible")
        .and("have.text", "All Galleries")
    })

    it.only("redirect to all galleries clicking on All Galleries link", () =>{
        createGallery.createGalleryHeading.should("be.visible")
        .and("have.text", "Create Gallery")
        createGallery.createNewGallery(
            galleryData.galleryTitle,
            galleryData.galleryDescription,
            galleryData.galleryImageUrl
        );
        createGallery.redirectToAllGalleries();
        cy.url().should("not.include", "/create");
        allGalleries.singleGallery.should("have.length", 10);

       
    })
})