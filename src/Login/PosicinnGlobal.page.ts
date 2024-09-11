import {Page, PageContext} from "@testing/wdio-page-objects";

const select = {
    dashboard:`[class='oxd-main-menu-item active'] [class='oxd-text oxd-text--span oxd-main-menu-item--name']`,
    header:'header[class="oxd-topbar"]',
    layout:'[class="oxd-layout-context"]',
    footer:'[class="oxd-layout-footer"]',
}

@PageContext({
    path: '/web/index.php/dashboard/index', 
    wrapper: `[id="app"]`, //Padre  o nodo principal
})
export class globalPage extends Page {
 
    async validPosicionGlobal() {
            await (await $(select.header)).waitForDisplayed({timeout: 120000 });
            await (await $(select.header)).isExisting();
    
            await (await $(select.layout)).waitForDisplayed({timeout: 120000 });
            await (await $(select.layout)).isExisting();
            
            await (await $(select.footer)).waitForDisplayed({timeout: 120000 });
            await (await $(select.footer)).isExisting();
        }
    

    async validDashboardText() {
        await (await $(select.dashboard)).waitForDisplayed({timeout: 120000 });
        await (await $(select.dashboard)).isExisting();
        return await (await $(select.dashboard)).getText();     
    }
    async getDashboardText(){
        const elem = await $(select.dashboard);
        await (elem).waitForDisplayed({timeout: 120000 });
        await (elem).isExisting();
        return await (elem).getText();
    }

 
}