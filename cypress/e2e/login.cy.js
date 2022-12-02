/// <reference types = "Cypress"/>
// Arrow function () => {}

const Locators = require("../fixtures/locators.json")

describe("login test", () => {
    it("login with valid credentials", () => {
        cy.visit("/")
        cy.get(Locators.Login.loginButton).click()
        cy.get(Locators.Common.emailInput).type("kkk@gmail.com")
        cy.get(Locators.Common.passwordInput).type("test1234")
        cy.get(Locators.Common.submitButton).click()
    })

    it('logout',() =>{
        cy.get(".nav-link").should("have.length", 4)
        cy.get(".nav-link").eq(3).click()
    })


})
