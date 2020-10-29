/// <reference types="cypress" />

describe('End to end test', () => {
    const email = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10) + "@gmail.com";
    const firstname = 'John'
    const lastname = 'Doe'
    const password = 'password'

    it('test ui navigation', () => {
        // Start at main screen
        cy.visit('http://localhost:3000')

        // Test navigating to registration
        cy.get('button').contains('Register').click()
        cy.url().should('contain', '/registration')

        // Test navigating to login
        cy.visit('http://localhost:3000')
        cy.get('button').contains('Login').click()
        cy.url().should('contain', '/login')

        // Test navigating to main page
        cy.get('button').contains('Search').click()
        cy.url().should('not.contain', '/login')
    })

    it('test registration through UI', () => {
        // Navigate to register user
        cy.visit('http://localhost:3000/registration')
        // cy.get('button').contains('Register').click()
        
        // Enter all fields, and press register
        cy.get('[data-cy=register_email]').type(email)
        cy.get('[data-cy=register_first_name]').type(firstname)
        cy.get('[data-cy=register_last_name]').type(lastname)
        cy.get('[data-cy=register_password]').type(password)
        cy.get('[data-cy=register_confirm_password]').type(password)
        cy.get('[data-cy=register_register]').click()

        // Should be redirected to login
        cy.url().should('contain', '/login')
    })

    it('test logging in and out through UI', () => {
        // Navigate to login
        cy.visit('http://localhost:3000/login')

        // Enter all fields, and press login
        cy.get('[data-cy=login_email]').type(email)
        cy.get('[data-cy=login_password]').type(password)
        cy.get('[data-cy=login_button]').click()

        // Should be redirected to main screen
        cy.url().should('not.contain', '/login')

        // Log out
        cy.get('button').contains(firstname + ' ' + lastname).click()
        cy.get('[data-cy=logout_button]').click()

        // Should be redirected to login screen
        cy.url().should('contain', '/login')
    })

    it('test adding and removing a movie from favorites', () => {
        // Make sure the user is logged in
        cy.login(email, password)

        // Navigate to the avengers movie
        cy.visit('http://localhost:3000/movie/tt0848228')

        // Make sure the movie title shows
        cy.contains('Avengers')

        // Click on add favorite
        cy.get('[data-cy=add_favorite_button]').click()

        // Removing favorite should now exist
        cy.get('[data-cy=remove_favorite_button]').should('exist')

        // Navigate to favorites page
        cy.get('button').contains('Favorites').click()

        // Make sure the movie is in favorites, and navigate back to it
        cy.contains('Avengers').click()

        // Make sure the movie title shows
        cy.contains('Avengers')

        // Removing favorite
        cy.get('[data-cy=remove_favorite_button]').click()

        // Navigate to favorites page
        cy.visit('http://localhost:3000/favorites')

        // Make sure the movie is not in favorites
        cy.contains('Avengers').should('not.exist')
    })

    it('test searching for a movie', () => {
        // Navigate to main screen
        cy.visit('http://localhost:3000/')

        // Search for 'Deadpool'
        cy.get('label').contains('Search movie').parent().type('Deadpool{enter}')

        // Make sure the deadpool movies has loaded
        cy.contains('Deadpool 2')

        // Make sure a button contains the title and the movie id of deadpool
        cy.get('button').contains('Deadpool 2').should('have.attr', 'href').and('include', '/movie/tt5463162')
    })

})
