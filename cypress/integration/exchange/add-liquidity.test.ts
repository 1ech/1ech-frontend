describe('Add Liquidity', () => {
  it('loads the two correct tokens', () => {
    cy.visit('/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'CAKE')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'USDS')
  })

  it('loads the ECH and tokens', () => {
    cy.visit('/add/ECH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'ECH')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'CAKE')
  })

  it('loads the WECH and tokens', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'WECH')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'CAKE')
  })

  it('does not crash if ECH is duplicated', () => {
    cy.visit('/add/ECH/ECH')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'ECH')
    cy.get('#add-liquidity-input-tokenb #pair').should('not.contain.text', 'ECH')
  })

  it('does not crash if address is duplicated', () => {
    cy.visit('/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'CAKE')
    cy.get('#add-liquidity-input-tokenb #pair').should('not.contain.text', 'CAKE')
  })

  it('token not in storage is loaded', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'QUACK')
    cy.get('#add-liquidity-input-tokenb #pair').should('contain.text', 'CAKE')
  })

  it('single token can be selected', () => {
    cy.visit('/add/0xD74b782E05AA25c50e7330Af541d46E18f36661C')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'QUACK')
    cy.visit('/add/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'USDS')
    cy.visit('/add/ECH')
    cy.get('#add-liquidity-input-tokena #pair').should('contain.text', 'ECH')
  })

  it('redirects /add/token-token to add/token/token', () => {
    cy.visit('/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82-0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56')
    cy.url().should(
      'contain',
      '/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56',
    )
  })

  it('redirects /add/ECH-token to /add/ECH/token', () => {
    cy.visit('/add/ECH-0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.url().should('contain', '/add/ECH/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
  })

  it('redirects /add/token-ECH to /add/token/ECH', () => {
    cy.visit('/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82-ECH')
    cy.url().should('contain', '/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/ECH')
  })

  it('redirects /add/WECH to /add/WECH/token', () => {
    cy.visit('/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c-0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82')
    cy.url().should(
      'contain',
      '/add/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
    )
  })

  it('redirects /add/token-WECH to /add/token/WECH', () => {
    cy.visit('/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82-0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c')
    cy.url().should(
      'contain',
      '/add/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
    )
  })
})
