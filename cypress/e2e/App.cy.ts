/// <reference types="cypress" />

describe('Testa o App', () => {
  it('Testa se consegue entrar no no App', () => {
    cy.visit('http://localhost:5173/');
  });

  it('Testa se existe os inputs de Altura e Peso, e também se existe o botão de calcular', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').should('be.visible');
    cy.get('[data-testid="input-weight"]').should('be.visible');
    cy.get('[data-testid="button-calcular"]').should('be.visible');
  });

  it('Testa se é possível escrever nos dois inputs', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('60.0');
  });

  it('Testa se ao clicar no botão de calcular, os inputs e o botão ficam desabilitados', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('60.0');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="input-height"]').should('be.disabled');
    cy.get('[data-testid="input-weight"]').should('be.disabled');
    cy.get('[data-testid="button-calcular"]').should('be.disabled');
  });

  it('Testa se ao clicar na flecha, os inputs e o botão voltam a ficar habilitados', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('60.0');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="back-arrow"]').click()
    cy.get('[data-testid="input-height"]').should('be.enabled');
    cy.get('[data-testid="input-weight"]').should('be.enabled');
    cy.get('[data-testid="button-calcular"]').should('be.enabled');
  });

  it('Testa se o usuário digitar sem colocar vírgula, ela é colocada automaticamente', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('165').should('have.value', 1.65);
    cy.get('[data-testid="input-weight"]').type('6040').should('have.value', 60.4);
  });

  it('Testa se com altura 1.65(165) e peso 30.4(3040) o IMC é Magreza', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('30.4');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Magreza')

    cy.get('[data-testid="back-arrow"]').click()

    cy.get('[data-testid="input-height"]').type('165');
    cy.get('[data-testid="input-weight"]').type('3040');
    cy.get('[data-testid="button-calcular"]').click();

  })

  it('Testa se com altura 1.65(165) e peso 60.4(6040) o IMC é Normal', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('60.4');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Normal')

    cy.get('[data-testid="back-arrow"]').click()

    cy.get('[data-testid="input-height"]').type('165');
    cy.get('[data-testid="input-weight"]').type('6040');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Normal')
  });

  it('Testa se com altura 1.65(165) e peso 80.4(8040) o IMC é Sobrepeso', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('80.4');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Sobrepeso')

    cy.get('[data-testid="back-arrow"]').click()

    cy.get('[data-testid="input-height"]').type('165');
    cy.get('[data-testid="input-weight"]').type('8040');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Sobrepeso')
  });

  it('Testa se com altura 1.65(165) e peso 90.4(9040) o IMC é Obesidade', () => {
    cy.visit('http://localhost:5173/');

    cy.get('[data-testid="input-height"]').type('1.65');
    cy.get('[data-testid="input-weight"]').type('90.4');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Obesidade')

    cy.get('[data-testid="back-arrow"]').click()

    cy.get('[data-testid="input-height"]').type('165');
    cy.get('[data-testid="input-weight"]').type('9040');
    cy.get('[data-testid="button-calcular"]').click();

    cy.get('[data-testid="imc-title"]').contains('Obesidade')
  })
});

export {};
