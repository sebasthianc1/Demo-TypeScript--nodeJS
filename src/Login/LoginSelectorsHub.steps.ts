import { Given, Then, When, World } from "@testing/cucumber-runner";
import { pageProvider } from "@testing/wdio-page-objects";
import { LoginSelectorsHubPage } from "./LoginSelectorsHub.page";
import { globalPage } from "./PosicinnGlobal.page";
import { expect } from "chai";


export class LoginOrangeSteps {

    world: World;

    constructor(world){
        this.world = world;
    }

    get LoginSelectorsHubPage() {
        return pageProvider.wait(LoginSelectorsHubPage);
    }
    get globalPage() {
        return pageProvider.wait(globalPage);
    }
    varDatamanager(){
        const user =  this.world.users.get();
        return user;
    }

    async form(){

        const form = this.varDatamanager()
        const {userNameInput, pizzaNameInput, conceptTestInput, passwordInput}= form
        return await form
    }

    @Given(/^que estoy en la página de selectorHub$/)
    async sesion() {
        await pageProvider.go(LoginSelectorsHubPage); 
    }
    @When(/^ingreso  datos en el formulario$/)
    async credenciales() {
        const form = await this.form();
        await ((await this.LoginSelectorsHubPage)).completarFormulario(form.userNameInput, form.pizzaNameInput, form.conceptTestInput, form.passwordInput )
    }
    
}
