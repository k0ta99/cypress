/// <reference types = "Cypress"/>
// Arrow function () => {}

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
        cy.get("#first-name").type("Marko")
        cy.get("#last-name").type("Marko")
        cy.get("#email").type(email)
        cy.get("#password").type("test1234")
        cy.get("#password-confirmation").type("test1234")
        cy.get('input[type="checkbox"]').click()
        cy.get("button").click()
        cy.url().should("not.include", "/register")
        
        
        
      
    })

})
