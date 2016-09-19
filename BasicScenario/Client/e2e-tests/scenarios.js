'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('basicScenario App', function() {

    describe('Scenario 1: Login successful', function() {
        beforeEach(function() {
            browser.get('/');
        });

        it('Login success using valid credentials', function() {
          var user = element(by.model('$ctrl.User'));
          var pass = element(by.model('$ctrl.Password'));
          var loginButton = element(by.tagName('button'));
          user.sendKeys('ayus');
          pass.sendKeys('password');
          loginButton.click();

          expect(browser.getLocationAbsUrl()).toBe('/booking');
        });
    });
});
