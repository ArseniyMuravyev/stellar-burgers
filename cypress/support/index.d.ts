declare namespace Cypress {
  interface Chainable {
    /**
     * Custom command to select DOM element by data-cy attribute for modal.
     * @example cy.getModal()
     */
    getModal(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select DOM element by data-cy attribute for constructor filling.
     * @example cy.getConstructorFilling()
     */
    getConstructorFilling(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select DOM element by data-cy attribute for constructor bun.
     * @example cy.getConstructorBun()
     */
    getConstructorBun(): Chainable<JQuery<HTMLElement>>;

    /**
     * Custom command to select DOM element by data-cy attribute for ingredient.
     * @example cy.getIngredient()
     */
    getIngredient(): Chainable<JQuery<HTMLElement>>;
  }
}
