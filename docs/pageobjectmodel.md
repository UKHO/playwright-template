# Page Object Model pattern

This exemplar showcases a Page Object Model pattern. Good use of this pattern will give maximum reuse of components between different tests whilst making the tests simple to read and understand.

## What is the Page Object Model pattern?

A Page Object Model (POM) uses dedicated classes to interact with the web pages of a website under test. The test scripts use the POM to drive the application which allows for good code reuse, seperation of concerns and easy to read tests.

A test script is only concerned with the high level **intentions** of the user and so becomes very quick and easy to read and understand.

```typescript
test.describe('invalid details should prevent form submit', async () => {
    test('missing hero power', async () => {
        await formPage.fillFormWithValidDetailsExceptHeroPower();
        await formPage.expect.toBeUnableToSubmitForm();
    });
});
```

The page classes are responsible for decoding the user's intentions into interactions with the UI and then performing them on the given page.

```typescript
async fillFormWithValidDetailsExceptHeroPower(): Promise<void> {
    await this._firstnameFieldLocator.fill("MyFirstName");
    await this._lastnameFieldLocator.fill("MyLastName");
    await this._emailFieldLocator.fill("myemail@email.com");
}
```

In our implementation, each page class also has a dedicated assertion class which uses the power of Playwright Locator assertions

```typescript
async toBeUnableToSubmitForm(): Promise<void> {
    await expect(this.formPage._submitButtonFieldLocator).not.toBeEnabled();
}
```

## Page Object Model tips

* A test script should never directly refer to or use a control. This is because a test script should only change if the user journey changes, not if the implementation of the website changes.
* Test scripts should be short - the Page Object Model (POM) classes should contain the complexity of performing actions on the UI
* Locators and Playwright should never be used directly in a test script - these belong in the POM classes.
* POM methods should start with an abstract verb such as `complete`, `set` or `submit`.
* POM methods should not contain control specific intructions such as `click` or `tick`.
* Assertion methods should start with `to` or `not`.
