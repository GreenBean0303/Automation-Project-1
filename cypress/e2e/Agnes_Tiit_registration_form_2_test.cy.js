beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

/*
Assignement 4: add content to the following tests
*/

describe('Section 1: Functional tests', () => {

    //4.1
    //26.11.2023
    it('User can use only same both first and validation passwords', ()=>{
        //26.11.2023
        // Add test steps for filling in only mandatory fields
        cy.get('[data-testid="user"]').type('AgnesT')
        cy.get('input[name="email"]').type('Agnes.T@cerebum.ee')
        cy.get('input[name="name"]').type('Agnes')
        cy.get('[data-testid="lastNameTestId"]').type('T')
        cy.get('[data-testid="phoneNumberTestId"]').type('5959595959')

        // Type confirmation password which is different from first password
        cy.get('input[name="password"]').type('GreenTea456')
        cy.get('[name="confirm"]').type('GreenTea000000')

        //click on some other field or element on the page before in order to activate the assertion of the password matching
        cy.get('body').click({force: true}).then(() => {
              // Assert that the corresponding error message is visible and the submit button is not enabled
              cy.get('#password_error_message').should('be.visible')
              cy.get('.submit_button').should('not.be.enabled')
        });

        // Change the values to make the passwords match
        cy.get('[name="confirm"]').clear().type('GreenTea456')

        // Click on some other element before the assertion
        cy.get('body').click({force: true}).then(() => {
            // Assert that error message is not visible and that submit button is enabled
            cy.get('#password_error_message').should('not.be.visible')
            cy.get('.submit_button').should('be.enabled')
        });


    })
    
    //4.2
    it('User can submit form with all fields added', ()=>{
        // Add test steps for filling in ALL fields
         //26.11.2023
        cy.get('[data-testid="user"]').type('AgnesT')
        cy.get('input[name="email"]').type('agnes@cerebum.ee')
        cy.get('input[name="name"]').type('Agnes')
        cy.get('[data-testid="lastNameTestId"]').type('T')
        cy.get('[data-testid="phoneNumberTestId"]').type('5959595959')
        cy.get('#javascriptFavLanguage').click()
        cy.get('input[name="vehicle1"]').click()
        cy.get('#cars').select('opel')
        cy.get('#animal').select('cat')
        cy.get('input[name="password"]').type('GreenTea456')
        cy.get('[name="confirm"]').type('GreenTea456')
        cy.get('body').click({force: true})


        // Assert that submit button is enabled and after submitting the form system show successful message
        cy.get('.submit_button').should('be.enabled')
        // Asseert that after submitting the form, system show successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
            
        
    })

    //4.3
    //26.11.2023
    it('User can submit form with valid data and only mandatory fields added', ()=>{
        // Add test steps for filling in ONLY mandatory fields
        cy.get('[data-testid="user"]').type('AgnesT')
        cy.get('input[name="email"]').type('agnes@cerebum.ee')
        cy.get('input[name="name"]').type('Agnes')
        cy.get('[data-testid="lastNameTestId"]').type('T')
        cy.get('[data-testid="phoneNumberTestId"]').type('5959595959')
        
        // click on some other field or element on the page before in order to activate the assertion 
        cy.get('body').click({force: true})

        // Assert that submit button is enabled
        cy.get('.submit_button').should('be.enabled')

        // Assert that after submitting the form system shows successful message
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    })

    // Add at least 1 test for checking some mandatory field's absence
    //4.4
    //26.11.2023
    it('Submit button is disabled when mandatory field "user" is empty', () => {
        // Fill all mandatory fields on the page
        cy.get('[data-testid="user"]').type('AgnesT')
        cy.get('input[name="email"]').type('agnes@cerebum.ee')
        cy.get('input[name="name"]').type('Agnes')
        cy.get('[data-testid="lastNameTestId"]').type('T')
        cy.get('[data-testid="phoneNumberTestId"]').type('5959595959')
    
        // Clear the "user" field
        cy.get('[data-testid="user"]').clear()
    
        // Click on some other field or element on the page to activate the assertion
        cy.get('body').click({ force: true })
    
        // Assert that submit button is disabled
        cy.get('.submit_button').should('not.be.enabled')

        // Assert that error message is showing
        cy.get('#input_error_message').should('be.visible')
    });
    


})

/*
Assignement 5: create more visual tests
*/
// 27.11.2023
//5.2
describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('#logo').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('#logo').invoke('height').should('be.lessThan', 167)
            .and('be.greaterThan', 165)   
        cy.get('#logo').invoke('width').should('be.lessThan', 179)
            .and('be.greaterThan', 177)   
        
    })

    it('My test for second picture', () => {
        // Create similar test for checking the second picture
        cy.log('Will check logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        // get element and check its parameter height, to less than 178 and greater than 100
        cy.get('[data-cy="cypress_logo"]').invoke('height').should('be.lessThan', 89)
            .and('be.greaterThan', 87)
        cy.get('[data-cy="cypress_logo"]').invoke('width').should('be.lessThan', 117)
            .and('be.greaterThan', 115)   
    });

    //5.3
    it('Check navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_1.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    // Create similar test for checking the second link 
    it('Check second navigation part', () => {
        cy.get('nav').children().should('have.length', 2)

        // Get navigation element, find siblings that contains h1 and check if it has Registration form in string
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        
        // Get navigation element, find its first child, check the link content and click it
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        
        // Check that currently opened URL is correct
        cy.url().should('contain', '/registration_form_3.html')
        
        // Go back to previous page
        cy.go('back')
        cy.log('Back again in registration form 2')
    })

    //5.4
    it('Check that radio button list is correct', () => {
        // Array of found elements with given selector has 4 elements in total
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text','HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text','CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text','JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text','PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that checkbox list is correct', () => {
        // Array of found elements with given selector has 3 elements in total
        cy.get('input[type="checkbox"]').should('have.length', 3)
    
        // Verify labels of the checkboxes
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')
    
        // Verify default state of checkboxes
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')
    
        // Marking the first checkbox as checked
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
    
        // Marking the second checkbox as checked and asserting the state of the first and second checkboxes
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(0).should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('be.checked')
    });
    
    

    //29.11.2023
    //5.5
    it('Car dropdown is correct', () => {
        // Here is an example how to explicitely create screenshot from the code
        // Select second element and create screenshot for this area, and full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')

        // Here are given different solutions how to get the length of array of elements in Cars dropdown
        // Next 2 lines of code do exactly the same!
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars').find('option').should('have.length', 4)
        
        //Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')
        cy.get('#cars').find('option').eq(1).should('have.text', 'Saab')
        cy.get('#cars').find('option').eq(2).should('have.text', 'Opel')
        cy.get('#cars').find('option').eq(3).should('have.text', 'Audi')
        
        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    // Create test similar to previous one
    it('Favourite animal dropdown is correct', () => {
        // Here is an example of how to explicitly create a screenshot from the code
        // Select the second element and create screenshots for this area and the full page
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')
    
        // Verify that there are 6 options in the dropdown
        cy.get('#animal').find('option').should('have.length', 6)
    
        // Verify all the options
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

    
        // Advanced level: Check the content of the Animals dropdown
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value);
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        });
    });
    

})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type('validemail@yeap.com')
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type('Doe')
    cy.get('[data-testid="phoneNumberTestId"]').type('10203040')
    // If element has multiple classes, then one of them can be used
    cy.get('#password').type('MyPass')
    cy.get('#confirm').type('MyPass')
    cy.get('h2').contains('Password').click()
}