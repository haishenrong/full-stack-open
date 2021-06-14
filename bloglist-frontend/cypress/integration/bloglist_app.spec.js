describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'roots',
      name: 'Huu',
      password: 'trees'
    })
    cy.request('POST', 'http://localhost:3003/api/users', {
      username: 'srorrim',
      name: 'Tom Day',
      password: 'crossroads'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Blogs')
    cy.contains('username')
    cy.get('#username').should('exist')
    cy.contains('password')
    cy.get('#password').should('exist')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('roots')
      cy.get('#password').type('trees')
      cy.get('#login-button').click()

      cy.contains('Huu logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#username').type('branches')
      cy.get('#password').type('stumps')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('roots', 'trees')
      cy.createBlog('Where Were We', 'Haze', 42, 'www.togetheragain.com')
    })

    it('A blog can be created', function() {
      //maybe find a better way to identify
      cy.get('#togglable').click()
      cy.contains('create new blog')
      cy.get('#title').type('Not any different')
      cy.get('#author').type('Huu')
      cy.get('#url').type('www.huuareyuu.com')
      cy.get('#add-blog').click()

      cy.get('.notif')
        .should('contain', 'a new blog')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.contains('Not any different')
      cy.get('#view-blog')
    })

    it('User can like blog', function() {
      cy.get('#view-blog').click()
      cy.get('.likes').contains('42')
      cy.get('#increment-likes').click()
      cy.get('.likes').contains('43')
    })

    it('User can delete own blog', function() {
      cy.contains('Where Were We')
      cy.get('#view-blog').click()
      cy.get('#remove-blog').click()
      cy.contains('Where Were We').should('not.exist')
    })

    it('Other user can not delete own blog', function() {
      cy.contains('Where Were We')
      cy.get('#view-blog').click()
      cy.get('#remove-blog').should('exist')
      cy.get('#logout').click()
      cy.login('srorrim', 'crossroads')
      cy.contains('Where Were We')
      cy.get('#view-blog').click()
      cy.get('#remove-blog').should('not.exist')
    })

    it.only('ordering blogs work', function() {
      cy.createBlog('One', 'Haze', 1, 'www.togetheragain.com')
      cy.createBlog('Thirty Two', 'Haze', 32, 'www.togetheragain.com')
      cy.createBlog('Fifty', 'Haze', 50, 'www.togetheragain.com')
      cy.createBlog('Twenty Five', 'Haze', 25, 'www.togetheragain.com')
      //checks first and last elements to be 50 and 1 respectivly
      cy.get('button#view-blog').click({ multiple: true })
      cy.get('.likes').first().contains('50')
      cy.get('.likes').eq(1).contains('42')
      cy.get('.likes').eq(2).contains('32')
      cy.get('.likes').eq(3).contains('25')
      cy.get('.likes').last().contains('1')
      //clicks button and checks that the first and last elements have been reversed
      cy.get('#sort-blogs').click()
      cy.get('.likes').first().contains('1')
      cy.get('.likes').eq(1).contains('25')
      cy.get('.likes').eq(2).contains('32')
      cy.get('.likes').eq(3).contains('42')
      cy.get('.likes').last().contains('50')
    })
  })
})