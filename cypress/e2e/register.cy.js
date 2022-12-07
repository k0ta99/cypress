/// <reference types = "Cypress"/>
// Arrow function () => {}

const Locators = require("../fixtures/locators.json");
import { faker } from "@faker-js/faker";

describe("registration test", () => {

  let randomUser = {
    randomEmail: faker.internet.email(),
    randomFirstName: faker.name.firstName(),
    randomLastName: faker.name.lastName(),
    randomPassword: faker.internet.password(),
  };
   

      beforeEach("visit gallery app", () => {
        cy.visit("/");
        cy.get("a[href='/register']").click();
      }); 

    it.only("register with valid credentials", () => {
        cy.get(Locators.Register.firstName).type(randomUser.randomFirstName)
        cy.get(Locators.Register.lastName).type(randomUser.randomLastName)
        cy.get(Locators.Common.emailInput).type(randomUser.randomEmail)
        cy.get(Locators.Common.passwordInput).type(randomUser.randomPassword)
        cy.get(Locators.Register.passwordConfirmationInput).type(randomUser.randomPassword)
        cy.get(Locators.Register.checkboxField).click()
        cy.get(Locators.Common.submitButton).click()
        cy.url().should("not.include", "/register")

        it("register with invalid email format", () => {
          cy.get("#first-name").type("Marko")
          cy.get("#last-name").type("Marko")
          cy.get("#email").type("markogmail.com")
          cy.get("#password").type("test1234")
          cy.get("#password-confirmation").type("test1234")
          cy.get('input[type="checkbox"]').click()
          cy.get("button").click()
          cy.url().should("not.include", "/register")
      })
  
      it("register with alhpanumeric 'first name' input field", () => {
          cy.visit("https://gallery-app.vivifyideas.com")
          cy.get('a[href="/register"]').click()
          cy.get("#first-name").type("Marko33")
          cy.get("#last-name").type("Marko")
          cy.get("#email").type(email)
          cy.get("#password").type("test1234")
          cy.get("#password-confirmation").type("test1234")
          cy.get('input[type="checkbox"]').click()
          cy.get("button").click()
          cy.url().should("not.include", "/register")
      })
  
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
  
      it("register with unconfirmed password", () => {
          cy.get("#first-name").type("Marko")
          cy.get("#last-name").type("Marko")
          cy.get("#email").type(email)
          cy.get("#password").type("test1234")
          cy.get("#password-confirmation").type("test12")
          cy.get('input[type="checkbox"]').click()
          cy.get("button").click()
          cy.url().should("not.include", "/register")
      })
  
      it("register with unchecked terms and conditions", () => {
          cy.get("#first-name").type("Marko")
          cy.get("#last-name").type("Marko")
          cy.get("#email").type(email)
          cy.get("#password").type("test1234")
          cy.get("#password-confirmation").type("test1234")
          cy.get("button").click()
          cy.url().should("not.include", "/register")
      })
  
      it("register with blank first name", () => {
          cy.get("#first-name").type(" ")
          cy.get("#last-name").type("Marko")
          cy.get("#email").type(email)
          cy.get("#password").type("test1234")
          cy.get("#password-confirmation").type("test1234")
          cy.get('input[type="checkbox"]').click()
          cy.get("button").click()
          cy.url().should("not.include", "/register")
      })
        
        
        
      
    })

})
