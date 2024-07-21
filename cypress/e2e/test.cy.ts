const MODAL_SELECTOR = '[data-cy=modal]';
const MODAL_CLOSE_SELECTOR = '[data-cy=modal-close]';
const ORDER_BUTTON_SELECTOR = '[data-cy=order-button]';
const BURGER_ITEM_SELECTOR = '[data-cy=burger-item]';
const ORDER_NUMBER_SELECTOR = '[data-cy=order-number]';

describe('проверяем доступность приложения', function () {
  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit('/');
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.viewport(1900, 1000);
    cy.visit('/');
    cy.get('[data-cy=constructor]').as('constructor');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('проверка при отсутствии ингредиентов', () => {
    cy.wait('@getIngredients');
  });

  it('проверка на добавление булок в конструктор', () => {
    cy.wait('@getIngredients');
    cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();

    cy.get('@constructor').find('[data-cy=bun-1]').should('have.length', 1);
    cy.get('@constructor').find('[data-cy=bun-2]').should('have.length', 1);
  });
  it('проверка на добавление начинки в конструктор', () => {
    cy.wait('@getIngredients');

    cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();

    cy.get('@constructor')
      .find('[data-cy=burger-filling]')
      .should('have.length', 1);
  });
  it('проверка открытия и закрытия модального окна ингредиента', () => {
    cy.wait('@getIngredients');
    cy.get(BURGER_ITEM_SELECTOR, { timeout: 1000 }).first().click();

    cy.get(MODAL_SELECTOR).should('be.visible');
    cy.get(MODAL_CLOSE_SELECTOR).click();

    cy.get(MODAL_SELECTOR).should('not.exist');
  });
  it('проверка на верное отображение данных ингредиента в модальном окне', () => {
    cy.wait('@getIngredients');
    cy.get(BURGER_ITEM_SELECTOR)
      .first()
      .then(($ingredient) => {
        const ingredientName = $ingredient.find('[data-cy=name-ing]').text();

        cy.wrap($ingredient).click();

        cy.get(MODAL_SELECTOR).should('be.visible');

        cy.get('[data-cy=modal-name-ing]').should(
          'contain.text',
          ingredientName
        );
      });

    cy.get(MODAL_CLOSE_SELECTOR).click();
    cy.get(MODAL_SELECTOR).should('not.exist');
  });
  it('создание заказа и проверка номера заказа, очистки конструктора', () => {
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');
    cy.wait('@getIngredients');
    cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
    cy.get(ORDER_BUTTON_SELECTOR).click();
    cy.wait('@postOrder').then((interception) => {
      // Проверяем, что ответ существует и содержит ожидаемые данные
      assert.isNotNull(interception.response, 'не нул');
      if (interception.response) {
        const responseBody = interception.response.body;
        cy.log('Боди:', responseBody);
        expect(responseBody).to.have.property('order');
        expect(responseBody.order).to.have.property('number', 46581);
      } else {
        cy.log('ответ undefined или null');
      }
    });
    cy.get(MODAL_SELECTOR).should('be.visible');
    cy.get(ORDER_NUMBER_SELECTOR).should('contain.text', 46581);
    cy.get(MODAL_CLOSE_SELECTOR).click();
    cy.get(MODAL_SELECTOR).should('not.exist');
    cy.get('@constructor').find('[data-cy=bun-1]').should('have.length', 0);
    cy.get('@constructor').find('[data-cy=bun-2]').should('have.length', 0);
  });
});
