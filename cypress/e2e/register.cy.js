/// <reference types = "Cypress"/>
// Arrow function () => {}

const Locators = require("../fixtures/locators.json")

describe("registration test", () => {
    function makeId(length) {
        var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      }
      let email = `${makeId(5)}@test.com`;

    it("register with valid credentials", () => {
        cy.visit("/register")
        cy.get(Locators.Register.firstName).type("Marko")
        cy.get(Locators.Register.lastName).type("Marko")
        cy.get(Locators.Common.emailInput).type(email)
        cy.get(Locators.Common.passwordInput).type("test1234")
        cy.get(Locators.Register.passwordConfirmationInput).type("test1234")
        cy.get(Locators.Register.checkboxField).click()
        cy.get(Locators.Common.submitButton).click()
        cy.url().should("not.include", "/register")
        
        
        
      
    })

})
