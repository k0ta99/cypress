class CreateGallery{

    get allGalleriesLInk(){
        return cy.get('.nav-link').eq(0)
    }
    
    get createGalleryHeading(){
        return cy.get("h1");
    }

    get titleInput(){
        return cy.get("input").eq(0);
    }

    get descriptionInput(){
        return cy.get("input").eq(1);
    }

    get imageInput(){
        return cy.get("input[placeholder='image url'").eq(0);
    }

    get secondImageInput(){
        return cy.get("input[placeholder='image url'").eq(1);
    }

    get addImageButton(){
        return cy.get("button[type='button'").eq(2);
    }

    get submitButton(){
        return cy.get("button[type='submit'").eq(0);
    }

    get cancelButton(){
        return cy.get("button[type='submit'").eq(1);
    }

    get alertMessage(){
        return cy.get('.alert');
    }

    get titleLabel(){
        return cy.get('label').eq(0)
    }

    get descriptionLabel(){
        return cy.get('label').eq(1)
    }

    get imagesLabel(){
        return cy.get('label').eq(2)
    }

    createNewGallery(titleInput, descriptionInput, imageInput){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageInput.type(imageInput);
        this.submitButton.click();
    }
    
    cancelCreatingGallery(titleInput, descriptionInput, imageInput){
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageInput.type(imageInput);
        this.cancelButton.click();
    }
    
    createGalleryWithSecondImage(titleInput, descriptionInput, imageInput, secondImageInput){
        this.addImageButton.click();
        this.titleInput.type(titleInput);
        this.descriptionInput.type(descriptionInput);
        this.imageInput.type(imageInput);
        this.secondImageInput.type(this.secondImageInput)
        this.submitButton.click();
    }

    redirectToAllGalleries(){
        this.allGalleriesLInk.click();
    }
}

export const createGallery = new CreateGallery()