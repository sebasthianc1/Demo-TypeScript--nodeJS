import {Page, PageContext} from "@testing/wdio-page-objects";


const select = {
    userNameShadowRoot: "#userName",
    userNameInput: "#kils",
    pizzaNameShadowRoot: "#app2",
    pizzaNameInput: "#pizza",
    conceptTestInputShadowRoot: "#concepts",
    conceptTestInput: "#training",
    passwordInputShadowRoot: "#userPass",
    passwordInput: "#pwd"
}

@PageContext({
    path: '/xpath-practice-page/', 
    wrapper: `[id="page"]`, 
})
export class LoginSelectorsHubPage extends Page {

    async completarFormulario(userNameInput: String, pizzaNameInput: String, conceptTestInput: String, passwordInput: String) {
     
        await (await $(select.userNameShadowRoot)).click()
        await (await $(select.userNameInput)).setValue("Charly")
 
        await (await $(select.pizzaNameShadowRoot)).click()
        await (await $(select.pizzaNameInput)).setValue("Pepperoni")
 
        await (await $(select.conceptTestInputShadowRoot)).click()
        await (await $(select.conceptTestInput)).setValue("Prueba Automatizada")
 
        await (await $(select.passwordInputShadowRoot)).click()
        await (await $(select.passwordInput)).setValue("Test.1234")
    }
}
