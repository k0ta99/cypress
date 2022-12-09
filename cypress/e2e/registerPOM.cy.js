/// <reference types="Cypress" />

import { faker } from "@faker-js/faker";
import { registerPage } from "../pageObjects/registerPage.js";
import { loginPage } from "../pageObjects/loginPOM"

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

  it("register with existing email address", () => {
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

it("register via BE", () =>{
  cy.request(
    "POST",
    "https://gallery-api.vivifyideas.com/api/auth/register",
    {
     email: randomUser.randomEmail,
     first_name: randomUser.randomFirstName,
     last_name: randomUser.randomLastName,
     password: randomUser.randomPassword,
     password_confirmation: randomUser.randomPassword,
     terms_and_conditions: true
    }
  );
  cy.visit("/login")
  loginPage.login(randomUser.randomEmail, randomUser.randomPassword)
})
});