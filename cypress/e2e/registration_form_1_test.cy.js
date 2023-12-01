//19.11.2023
// Before each test (it...) load .html page
beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_1.html')
})

/*
Assignment 2:

 1. Update the name of test suite by adding you name: “This is first test suite, John Smith”
 2. Replace text ‘Password123’ in the first test with your own chosen password (2 places) - passwords should match
 3. Change phone number in the first test to 555666777
 4. Change the order of steps in the first test:
      -first set phone number
      -then 2 password fields
      -then username
 5. Add comment to the first test containing today’s date
 */

describe('This is first test suite, Agnes Tiit', () => {
    it('User can submit data only when valid mandatory values are added', () => {
        //19.11.2023
        cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
        cy.get('input[name="password"]').type('GreenTea456')
        cy.get('[name="confirm"]').type('GreenTea456')
        cy.get('#username').type('Something')

        //in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()

        // Assert that both input and password error messages are not shown
        // next 2 lines check exactly the same, but using different approach
        cy.get('#input_error_message').should('not.be.visible')
        cy.get('#password_error_message').should('have.css', 'display', 'none')

        // Assert that success message is visible
        // next 2 lines check exactly the same, but using different approach
        cy.get('#success_message').should('be.visible')
        cy.get('#success_message').should('have.css', 'display', 'block')
    });


    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get('input[name="password"]').type('Password123')
        cy.get('[name="confirm"]').type('Password123123')
        // type('{enter}') is clicking native button e.g to click backspace use '{backspace}'
        cy.get('[name="confirm"]').type('{enter}')

        // Scroll to bottom of the page
        cy.window().scrollTo('bottom')

        // Assert that password error message is visible, and message should contain 'Passwords do not match!
        cy.get('#password_error_message').should('be.visible').should('contain', 'Passwords do not match!')
        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')
        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
        // Assert that password confirmation input fields has attribute 'title' with text stating 'Both passwords should match'
        cy.get('input[name="confirm"]').should('have.attr', 'title', 'Both passwords should match')
    })

    it('User cannot submit data when username is absent', () => {
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')

        // Scroll back to username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contain given text
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has tooltip with error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options how to check error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })

    /*
    Assignment 3: add the content to the following tests
    */
 // 3.2
    it('User can submit data only when valid mandatory values are added', () => {
            //19.11.2023
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('[data-testid="phoneNumberTestId"]').type('555666777')
            cy.get('input[name="firstName"]').type("Agnes")
            cy.get('input[name="lastName"]').type("Tiit")
            cy.get('input[name="password"]').type('GreenTea456')
            cy.get('[name="confirm"]').type('GreenTea456')
            cy.get('#username').type('Something')
    
            //in order to activate submit button, user has to click somewhere outside the input field
            cy.get('h2').contains('Password').click()
            cy.get('.submit_button').should('be.enabled')
            cy.get('.submit_button').click()
    
            // Assert that both input and password error messages are not shown
            // next 2 lines check exactly the same, but using different approach
            cy.get('#input_error_message').should('not.be.visible')
            cy.get('#password_error_message').should('have.css', 'display', 'none')
    
            // Assert that success message is visible
            // next 2 lines check exactly the same, but using different approach
            cy.get('#success_message').should('be.visible')
            cy.get('#success_message').should('have.css', 'display', 'block')
        });
// 3.3   
    it('User cannot submit data when phone number is absent', () => {
        // Add test, similar to the previous one with the phone number field not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that the success message is not visible
        cy.get('#username').type('Jabadijabado')
        cy.get('[data-testid="phoneNumberTestId"]').clear() // Clear phone number
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')

        // Scroll back to the username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that the Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that the success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that the username has a tooltip with an error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options for checking error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
})

//3.4
    it('User cannot submit data when password and/or confirmation password is absent', () => {
        // Add test, similar to the previous one with the password and/or confirmation password fields not filled in
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that the success message is not visible
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
        cy.get("input[name='password']").clear() // Clear password field
        cy.get('[name="confirm"]').clear() // Clear confirmation password field

        // Scroll back to the username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()

        // Asserting that the Submit button is disabled
        cy.get('.submit_button').should('be.disabled')

        // Assert that the success message is not visible
        cy.get('#success_message').should('not.be.visible')

        // Assert that correct error message is visible and contains the given text
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

        // Assert that username has a tooltip with an error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')

        // There are 2 options for checking error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
})

    //3.5
    it('User cannot add letters to phone number', () => {
        // Add test, similar to the previous one with letters in the phone number field
        // All other fields should be entered correctly
        // Assert that submit button is not enabled and that the success message is not visible
        cy.get('#username').type('johnDoe')
        cy.get('[data-testid="phoneNumberTestId"]').type('Cerebrum Hub') // Entering letters into the phone number field
        cy.get("input[name='password']").type('Password123')
        cy.get('[name="confirm"]').type('Password123')
    
        // Scroll back to the username input field
        cy.get('#username').scrollIntoView()
        cy.get('#username').clear()
        cy.get('h2').contains('Password').click()
    
        // Asserting that the Submit button is disabled
        cy.get('.submit_button').should('be.disabled')
    
        // Assert that the success message is not visible
        cy.get('#success_message').should('not.be.visible')
    
        // Assert that correct error message is visible and contains the given text
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    
        // Assert that username has a tooltip with an error message
        cy.get('input[name="username"]').should('have.attr', 'title').should('contain', 'Input field')
    
        // There are 2 options for checking error message visibility: using CSS or simply be.visible
        // none = not visible; block = visible
        cy.get('#input_error_message').should('be.visible')
        cy.get('#input_error_message').should('have.css', 'display', 'block')
    })
    
})
