
describe('Blog app', function() {
  beforeEach(function(){
    cy.visit('http://localhost:5173/')
  })

  it('front page can be opened', function() {

    cy.contains('Blogs App')
  })

  it('login form can be openend',function(){
    cy.contains('log in').click()
  })

  it('user can login', function(){
    cy.contains('log in').click()
    cy.get('#username').type('Guru')
    cy.get('#password').type('password123')
    cy.get('#login-button').click()

    cy.contains('Guru is logged-in')
  })

  it('login fails with wrong password', function(){
    cy.contains('log in').click()
    cy.get('#username').type('Invalid username  ')
    cy.get('#password').type('Invalid password ')
    cy.get('#login-button').click()
    cy.contains('error Wrong username')
  })

  describe('when user is logged in ',function(){
    beforeEach(function(){
      cy.contains('log in').click()
      cy.get('#username').type('Guru')
      cy.get('#password').type('password123')
      cy.get('#login-button').click()
  
    })

    it('a new blog can be created',function(){
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('Guru')
      cy.get('#url').type('www.test.com')
      cy.get('#create-button').click()
      cy.contains('test blog')
    })
  })
})
