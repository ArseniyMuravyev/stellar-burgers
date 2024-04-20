describe('Интегрированные тесты для приложения Stellar Burgers', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
      fixture: 'ingredients.json'
    });

    cy.visit('http://localhost:4000');
  });

  describe('проверяем работу модальных окон', () => {
    it('модальное окно должно открываться по клику на ингредиент', () => {
      cy.get('[data-cy="ingredient"]').first().click({ force: true });
      cy.get('[data-cy="modal"]').should('exist');
    });

    it('модальное окно должно закрываться по клику на крестик', () => {
      cy.get('[data-cy="ingredient"]').first().click({ force: true });
      cy.get('[data-cy="close-modal"]').click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });

    it('модальное окно должно открываться с правильным ингредиентом', () => {
      cy.get('[data-cy="ingredient"]')
        .contains('Краторная булка N-200i')
        .click({ force: true });
      cy.get('[data-cy="modal"]')
        .contains('Краторная булка N-200i')
        .should('exist');
    });

    it('модальное окно должно закрываться по клику на оверлей', () => {
      cy.get('[data-cy="ingredient"]').first().click({ force: true });
      cy.get('[data-cy="modal-overlay"]').first().click({ force: true });
      cy.get('[data-cy="modal"]').should('not.exist');
    });
  });

  describe('проверяем функцию добавления ингредиента', () => {
    it('ингредиенты по клику на кнопку "Добавить" должны отображаться в конструкторе в правильном количестве', () => {
      cy.get('[data-cy="bun"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="constructor-bun"]').should('exist');
      cy.get('[data-cy="sauces"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="fillings"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="constructor-filling"]').should('exist');

      cy.get('[data-cy="constructor-bun"]').should('have.length', 1);
      cy.get('[data-cy="constructor-filling"]').should('have.length', 2);
    });
  });

  describe('проверяем работу функции авторизации пользователя', () => {
    it('проверка логина пользователя', () => {
      const email = 'john@gmail.ru';
      const password = 'John123456';
      cy.visit('http://localhost:4000/login');
      cy.get('input[name=email]').type(email, { force: true });
      cy.get('input[name=password]').type(`${password}{enter}`, {
        force: true
      });

      cy.url().should('eq', 'http://localhost:4000/');

      cy.getCookie('accessToken').should('exist');
      cy.window().should((win) => {
        const token = win.localStorage.getItem('refreshToken');
        expect(token).to.exist;
      });

      cy.get('[data-cy="profile"]').contains('John').should('exist');

      cy.intercept(
        'POST',
        'https://norma.nomoreparties.space/api/orders',
        (req) => {
          req.reply((res) => {
            res.send({ fixture: 'orderResponse.json' });
          });
        }
      ).as('createOrder');

      cy.get('[data-cy="bun"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="constructor-bun"]').should('exist');
      cy.get('[data-cy="sauces"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });
      cy.get('[data-cy="fillings"]')
        .first()
        .children()
        .contains('Добавить')
        .click({ force: true });

      cy.get('button').contains('Оформить заказ').click({ force: true });

      cy.get('[data-cy="modal"]').should('exist');
      cy.wait('@createOrder').then(() => {
        cy.get('[data-cy="order-number"]').should('exist');
        cy.get('[data-cy="close-modal"]').click({ force: true });
        cy.get('[data-cy="modal"]').should('not.exist');

        cy.get('[data-cy="constructor-bun"]').should('have.length', 0);
        cy.get('[data-cy="constructor-filling"]').should('have.length', 0);
      });
    });
  });
});