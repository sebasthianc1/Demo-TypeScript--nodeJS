import {Page, PageContext} from "@testing/wdio-page-objects";

const select = {
    dashboard:'.oxd-topbar-header-breadcrumb',
    header:'header[class="oxd-topbar"]',
    layout:'[class="oxd-layout-context"]',
    footer:'[class="oxd-layout-footer"]',
}

@PageContext({
    path: '/web/index.php/dashboard/index', 
    wrapper: `[id="app"]`, //Padre  o nodo principal
})
export class globalPage extends Page {
 
    

 
}