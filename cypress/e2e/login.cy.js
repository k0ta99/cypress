/// <reference types = "Cypress"/>
// Arrow function () => {}

describe("login test", () => {
    it("login with valid credentials", () => {
        cy.visit("/")
        cy.get('a[href="/login"]').click()
        //cy.get('a[class="nav-link nav-buttons"]').first()
        //cy.get('input[id="email"]')
        cy.get("#email").type("kkk@gmail.com")
        cy.get("#password").type("test1234")
        cy.get('button').click()
    })

    it('logout',() =>{
        cy.get(".nav-link").should("have.length", 4)
        cy.get(".nav-link").eq(3).click()
    })


})
