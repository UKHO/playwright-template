# Page Object Model pattern

This exemplar showcases a Page Object Model pattern. Good use of this pattern will give maximum reuse of components between different tests whilst making the tests simple to read and understand.

## What is the Page Object Model pattern?

A Page Object Model (POM) uses dedicated classes to interact with the web pages of a website under test. The test scripts use the POM to drive the application which allows for good code reuse, seperation of concerns and easy to read tests.

A test script is only concerned with the **behaviours** of the user and so becomes very quick and easy to read and understand.

```typescript
test.describe('invalid details should prevent form submit', async () => {
    test('missing hero power', async () => {
        await formPage.fillFormWithValidDetailsExceptHeroPower();
        await formPage.expect.toHaveDisabledSubmitButton();
    });
});
```

The page classes are responsible for decoding the behaiour into actions and then performing them on the given page.

```typescript
async fillFormWithValidDetailsExceptHeroPower(): Promise<void> {
    await this._firstnameFieldLocator.fill("MyFirstName");
    await this._lastnameFieldLocator.fill("MyLastName");
    await this._emailFieldLocator.fill("myemail@email.com");
}
```

In our implementation, each page class also has a dedicated assertion class which uses the power of Playwright Locator assertions

```typescript
async toHaveDisabledSubmitButton(): Promise<void> {
    await expect(this.formPage._submitButtonFieldLocator).not.toBeEnabled();
}
```
