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
    wrapper: `[id="page"]`, //Padre  o nodo principal
})
export class LoginSelectorsHubPage extends Page {

    async completarFormulario() {
        await (await $(select.userNameShadowRoot)).click()
        await (await $(select.userNameInput)).setValue("Charly")
 
        await (await $(select.pizzaNameShadowRoot)).click()
        await (await $(select.pizzaNameInput)).setValue("Pepperoni")
 
        await (await $(select.conceptTestInputShadowRoot)).click()
        await (await $(select.conceptTestInputShadowRoot)).setValue("Prueba Automatizada")
 
        await (await $(select.passwordInputShadowRoot)).click()
        await (await $(select.passwordInputShadowRoot)).setValue("Test.1234")
    }
}
