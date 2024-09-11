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

    @Given(/^que estoy en la página de inicio de sesión$/)
    async sesion() {
        await pageProvider.go(LoginSelectorsHubPage); //
    }
    @When(/^ingreso  datos en el formulario$/)
    async credenciales() {
        const credentials = this.varDatamanager();
        const {username, password} = credentials;
        await ((await this.LoginSelectorsHubPage)).completarFormulario();  
    }



    
}
