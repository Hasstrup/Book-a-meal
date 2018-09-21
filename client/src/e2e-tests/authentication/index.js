
module.exports = {

  'Should register a new user on click of the sign up button': (client) => {
    client
      .url('http://localhost:8080/')
      .waitForElementVisible('.form-group', 2000)
      .pause(2000)
      .assert.containsText('.main-bold-text', 'Sign Up. Get fed')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(1) > div:nth-child(1) > input', 'Hasstrup Ezekiel')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(1) > div.form-input-group.type-2 > input', 'Hasstrup.ezekiel@mailer.com')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(2) > div:nth-child(1) > input', 'Onosetale32')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(2) > div.form-input-group.type-2 > input', 'Hasstrup.ezekiel')
      .pause(1000)
      .click('#app > div > main > div > div.create-account-center > div.form-group > div.submit-button')
      .pause(2000)
      .waitForElementVisible('.main-body', 5000)
      .assert.visible('.introductory-grid');
  },

  'Log in a user successfully': (client) => {
    client
      .click('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(4)')
      .pause(2000)
      .click('#app > div > div:nth-child(1) > header > div > div.home-tag > p')
      .waitForElementVisible('.form-group', 4000)
      .waitForElementPresent('#switch-xx-accounts', 4000)
      .moveToElement('#switch-xx-accounts', 10, 10)
      .pause(1000)
      .click('#switch-xx-accounts')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(1) > div.form-input-group.type-2 > input', 'Hasstrup.ezekiel@mailer.com')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(2) > div:nth-child(1) > input', 'Onosetale32')
      .click('#app > div > main > div > div.create-account-center > div.form-group > div.submit-button')
      .waitForElementVisible('.main-body', 5000)
      .assert.visible('.introductory-grid')
      .assert.visible('.side-two-IT-info');
  },

  'Should display the user profile and set up a kitchen': (client) => {
    client
      .waitForElementVisible('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(2)', 2000)
      .moveToElement('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(2)', 10, 10)
      .click('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(2)')
      .waitForElementPresent('.show-user-profile', 2000)
      .moveToElement('#app > div > main > div > div > div.show-user-and-kitchen-profile > div.show-user-profile > div > p.user-digits-text.head1', 10, 10)
      .pause(1000)
      .click('#app > div > main > div > div > div.show-user-and-kitchen-profile > div.show-user-profile > div > p.user-digits-text.head1')
      .waitForElementVisible('.new-kitchen', 3000)
      .setValue('#app > div > main > div > div > div.show-user-and-kitchen-profile > div.show-kitchen-profile.new-kitchen > div > div > p.kitchen-name-text.new-kitchen-d.kitchen1', 'Test Kitchen')
      .setValue('#app > div > main > div > div > div.show-user-and-kitchen-profile > div.show-kitchen-profile.new-kitchen > div > div > p.a-little-bio.new-kitchen-d.kitchen1', 'This is a description')
      .moveToElement('#kitchen1', 10, 10)
      .pause(1000)
      .click('#kitchen1')
      .waitForElementVisible('.announce-workstation', 3000)
      .assert.visible('.announce-workstation')
      .assert.containsText('.announce-workstation-desc', 'Control center for Test Kitchen');
  },

  'Should add a meal to the users kitchen': (client) => {
    client
      .moveToElement('#show-menu', 10, 10)
      .assert.visible('#show-menu')
      .click('#show-menu')
      .assert.visible('.new-meal-form')
      .setValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div.menu-options-def > div.menu-options-comp-two > div.new-meal-form > div > div > div.new-meal-title', 'Test Meal')
      .setValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div.menu-options-def > div.menu-options-comp-two > div.new-meal-form > div > div > div.new-meal-description', 'desc')
      .clearValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div.menu-options-def > div.menu-options-comp-two > div.new-meal-form > div > div > div.new-meal-price')
      .setValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div.menu-options-def > div.menu-options-comp-two > div.new-meal-form > div > div > div.new-meal-price', '4000')
      .moveToElement('#show-menu', 10, 10)
      .click('#show-menu')
      .pause(2000)
      .assert.containsText('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div.menu-options-def > div.menu-options-comp-two > div.menu-options-grid.list-grid > div > p', 'Test Meal');
  },
  'Should set the menu of the day for the caterer': (client) => {
    client
      .moveToElement('#motd1', 10, 10)
      .click('#motd1')
      .pause(2000)
      .moveToElement('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-name.motd1', 10, 10)
      .clearValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-name.motd1')
      .setValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-name.motd1', 'Morning Meal')
      .pause(2000)
      .moveToElement('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-desc.motd1', 10, 10)
      .clearValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-desc.motd1')
      .setValue('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-desc.motd1', 'Morning Meal description')
      .pause(200)
      .moveToElement('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-items.motd1', 10, 10)
      .click('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.menu-of-the-day > div.menu-of-the-day-details.item-details-def > div.menu-of-the-day-main > div > p.motd-items.motd1')
      .waitForElementPresent('.modal-content', 4000)
      .assert.visible('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.modal-base > div.modal-content > div.main-modal-content > div')
      .click('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.modal-base > div.modal-content > div.main-modal-content > div')
      .pause(2000)
      .click('#app > div > main > div > div > div.main-workstation > div.main-workstation-main > div:nth-child(2) > div.modal-base > div.modal-content > div.content-head > div')
      .waitForElementNotVisible('.modal-content', 3000)
      .moveToElement('#motd1', 10, 10)
      .click('#motd1')
      .pause(4000);
    // client.end();
  },

  'Should logout the user after setting the menu of the day': (client) => {
    client
      .moveToElement('#app > div > div:nth-child(1) > header > div > div.home-tag > p', 10, 10)
      .click('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(4)')
      .pause(3000)
      .moveToElement('#app > div > div:nth-child(1) > header > div > div.home-tag > p', 10, 10)
      .click('#app > div > div:nth-child(1) > header > div > div.home-tag > p')
      .waitForElementVisible('.form-group', 4000);
  },

  'should create a new user after logging out': (client) => {
    client
      .waitForElementVisible('.form-group', 2000)
      .pause(2000)
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(1) > div:nth-child(1) > input', 'Hasstrup Ezekiel')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(1) > div.form-input-group.type-2 > input', 'Hasstrup.ezekiel@mailerxx.com')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(2) > div:nth-child(1) > input', 'Onosetale32')
      .setValue('#app > div > main > div > div.create-account-center > div.form-group > div:nth-child(2) > div.form-input-group.type-2 > input', 'Hasstrup.ezekiel123')
      .pause(1000)
      .click('#app > div > main > div > div.create-account-center > div.form-group > div.submit-button')
      .pause(2000)
      .waitForElementVisible('.main-body', 5000)
      .assert.visible('.introductory-grid')
      .assert.visible('.main-items-grid')
      .assert.visible('.menu-item');
  },

  'should display the menu after clicking': (client) => {
    client
      .moveToElement('.menu-item', 10, 10)
      .pause(3000)
      .click('.menu-item')
      .waitForElementVisible('.main-menu-page-body', 4000);
  },

  'should show the current order and navigate to the cart page': (client) => {
    client
      .moveToElement('.hover-item-items', 10, 10)
      .click('.hover-item-items')
      .pause(2000)
      .moveToElement('#app > div > main > div > section > div.main-menu-options-list > div > div > div > div.item-details > div.buttons-array-and-togglers > p.option-options', 10, 10)
      .pause(1000)
      .click('#app > div > main > div > section > div.main-menu-options-list > div > div > div > div.item-details > div.buttons-array-and-togglers > p.option-options')
      .pause(2000)
      .assert.visible('.activity-bar');
  },

  'should show the current order of the user': (client) => {
    client
      .moveToElement('#app > div > section > div.activity-side-two > p', 0, 0)
      .click('#app > div > section > div.activity-side-two > p')
      .moveToElement('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(1)', 10, 10)
      .click('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(1)')
      .pause(3000);
  },

  'should process an order by viewing the meal': (client) => {
    client
      .waitForElementVisible('.current-order-stack', 3000)
      .moveToElement('.pay-button-large', 0, 0)
      .click('.pay-button-large')
      .pause(5000)
      .moveToElement('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button', 0, 0)
      .click('body > div.swal-overlay.swal-overlay--show-modal > div > div.swal-footer > div > button')
      .pause(2000)
      .assert.visible('.menu-item')
      .assert.visible('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(1)')
      .moveToElement('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(1)', 0, 0)
      .click('#app > div > div:nth-child(1) > header > div > div.header-buttons > p:nth-child(1)')
      .assert.visible('.order-story-card')
      .assert.visible('.introduce-history');
    client.end();
  }

};
