
describe('Blog app', function() {
  beforeEach(function(){
    cy.request('POST','http://localhost:3001/api/testing/reset')

    const user  ={
      "username": "Guru",
      "name": "Guru",
      "password": "password123",
      "blogs": []
  }
    cy.request('POST','http://localhost:3001/api/users/',user)
      .then(response => {
        console.log('response',response)
        if(response.status==201){
          cy.log('User created successfully')
          cy.visit('http://localhost:5173/')

        }
      })

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

    describe('and a blog exists',function(){
      beforeEach ( function(){
        cy.contains('new blog').click()
        cy.get('#title').type('test blog')
        cy.get('#author').type('Guru')
        cy.get('#url').type('www.test.com')
        cy.get('#create-button').click()
      })


      it('user can like a blog ', function(){
        cy.contains('view details').click()
        cy.get('.like-button').click()
        cy.get('.like-count').contains('1')
      })

      it('user can delete a blog',function(){
        cy.contains('view details').click()
        cy.get('.delete-button').click()
        cy.contains('test blog').should('not.exist')
      })


    })




  })
})
