Cypress.Commands.add('getModal', () => cy.get('[data-cy="modal"]'));

Cypress.Commands.add('getConstructorFilling', () =>
  cy.get('[data-cy="constructor-filling"]')
);

Cypress.Commands.add('getConstructorBun', () =>
  cy.get('[data-cy="constructor-bun"]')
);

Cypress.Commands.add('getIngredient', () => cy.get('[data-cy="ingredient"]'));
  