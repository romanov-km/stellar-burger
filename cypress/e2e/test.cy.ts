describe('проверяем доступность приложения', function () {
  const url = 'http://localhost:4000';

  it('сервис должен быть доступен по адресу localhost:4000', function () {
    cy.visit(url);
  });

  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.intercept('POST', 'api/orders', {
      fixture: 'order.json'
    }).as('postOrder');
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    });
    cy.setCookie('accessToken', 'test-token');
    localStorage.setItem('refreshToken', 'refreshToken');
    cy.viewport(1900, 1000);
    cy.visit(url);
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
    cy.get('[data-cy=burger-item]', { timeout: 1000 }).first().click();

    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=modal-close]').click();

    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('проверка на верное отображение данных ингредиента в модальном окне', () => {
    cy.wait('@getIngredients');
    cy.get('[data-cy=burger-item]')
      .first()
      .then(($ingredient) => {
        const ingredientName = $ingredient.find('[data-cy=name-ing]').text();

        cy.wrap($ingredient).click();

        cy.get('[data-cy=modal]').should('be.visible');

        cy.get('[data-cy=modal-name-ing]').should(
          'contain.text',
          ingredientName
        );
      });

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });
  it('создание заказа и проверка номера заказа, очистки конструктора', () => {
    cy.wait('@getIngredients');
    cy.get('h3').contains('Булки').next('ul').contains('Добавить').click();
    cy.get('h3').contains('Начинки').next('ul').contains('Добавить').click();
    cy.get('[data-cy=order-button]').click();
    cy.get('[data-cy=modal]').should('be.visible');
    cy.get('[data-cy=order-number]').should('contain.text', 46581);
    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
    cy.get('@constructor').find('[data-cy=bun-1]').should('have.length', 0);
    cy.get('@constructor').find('[data-cy=bun-2]').should('have.length', 0);
  });
});
