context('Notebook', () => {
  it('lists added search results', () => {
    cy.server();
    cy.fixture('trump_response.json').then((response) => {
      cy.log(response);
      cy.route(
        'GET',
        'http://hn.algolia.com/api/v1/search_by_date?tags=story&query=Trump*',
        response,
      );
    })

    cy.visit('http://localhost:3000');

    cy.get('a:contains("Notebooks")')
      .click();

    cy.get('input[type="text"]')
      .clear()
      .type('Politics');

    cy.get('button:contains("Submit")')
      .click();

    cy.get('input[type="text"]')
      .clear()
      .type('Technology');

    cy.get('button:contains("Submit")')
      .click();

    cy.get('a:contains("Home")')
      .click();

    cy.get('input[type="text"]')
      .type('Trump')

    cy.get('button:contains("Submit")')
      .click();

    cy.get('h2:contains("$4.8T Budget with Big Safety-Net Cuts")')
      .closest('.MuiPaper-root')
      .find('.MuiSelect-root')
      .click();

    cy.get('li:contains("Politics")')
      .click()
      .type('{esc}');

    cy.get('h2:contains("Michael Bloomberg is trying to buy the presidency")')
      .closest('.MuiPaper-root')
      .find('.MuiSelect-root')
      .click();

    cy.get('li:contains("Politics")')
      .click()
      .type('{esc}');

    cy.get('a:contains("Notebooks")')
      .click();

    cy.get('h2:contains("Politics")')
      .closest('.MuiPaper-root')
      .find('span:contains("Open")')
      .click();

    cy.get('h2:contains("$4.8T Budget with Big Safety-Net Cuts")')
      .should('be.visible');

    cy.get('h2:contains("Michael Bloomberg is trying to buy the presidency")')
      .should('be.visible');
  });
});
