/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "../pageObjects/registerPage.js";

describe("register POM", () => {
  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
    invalidRandomEmail: faker.internet.domainSuffix(),
    existingEmail: "marko@gmail.com",
    passwordConfirmation: "drugo"
  };

  before("register page assertations", () =>{
    cy.visit("/register");
    registerPage.checkboxTOS.should("not.be.checked");
    registerPage.registerHeading.should("be.visible")
    .and("have.text", "Register");
  })

  beforeEach("visit register page", () => {
    cy.visit("/register");
    cy.url().should("include", "/register");
  });

  it("register with valid data", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.randomEmail,
      randomUser.randomPassword,
      randomUser.randomPassword
    );
    cy.url().should("not.include", "/register");
  });

  it("register with invalid email address", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.invalidRandomEmail,
      randomUser.randomPassword
    );
    registerPage.checkboxTOS.should("be.checked");    
    cy.url().should("include", "/register");
  });

  it.only("register with existing email address", () => {
    registerPage.register(
      randomUser.randomFirstName,
      randomUser.randomLastName,
      randomUser.existingEmail,
      randomUser.randomPassword
    );
    registerPage.checkboxTOS.should("be.checked");
    registerPage.alertMessage.should("be.visible")
    .and("exist")
    .and("have.length", 1)
    .and("have.text" , "The email has already been taken.")    
    cy.url().should("include", "/register");
  });

  

  it("register with invalid password format", () => {
    cy.get("#first-name").type("Marko")
    cy.get("#last-name").type("Marko")
    cy.get("#email").type(email)
    cy.get("#password").type("test12")
    cy.get("#password-confirmation").type("test12")
    cy.get('input[type="checkbox"]').click()
    cy.get("button").click()
    cy.url().should("not.include", "/register")
})



});