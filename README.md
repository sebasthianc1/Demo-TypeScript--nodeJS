## Demo Testing Project

This project is meant to run tests for Demo.  

-----------------------

### 1. Installation

You need to have the following previous requirements met:
- NodeJS >=v14 (for Acis V6) or >=v10 (for Acis V5)
- NPM properly configured against [Artifactory](https://artifactory.globaldevtools.bbva.com/)
- Java 8 or higher installed (otherwise you won't be able to use local browsers)

> The use of [**VSCode**](https://code.visualstudio.com/?wt.mc_id=DX_841432) for coding is strongly recommended. You may also want to install [Cucumber Gherkin Full Support](https://marketplace.visualstudio.com/items?itemName=alexkrechik.cucumberautocomplete) plugin for a better Gherkin handling.  

-----------------------

### 2. Code Structure

This project is scaffolded with some samples but of course feel free to modify, move, delete and add more code on top. There are some file conventions you should bear in mind when adding new code:

- **\*.page\*.ts** - Files are automatically loaded as PageObject classes.
- **\*.component\*.ts** - Files are automatically loaded as ComponentObject classes.
- **\*.co\*.ts** - Files are automatically loaded as ContainerObject classes.
- **\*.steps\*.ts** - Files are automatically loaded as Cucumber Step classes.
- **\*.hooks\*.ts** - Files are automatically loaded as Cucumber hooks.
- **\*.feature** - Files are automatically loaded as Gherkin files for Cucumber.

For a more complete explanation about the code structure, check the documentation about **[page objects](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse/packages/wdio-page-objects/README.md)** and our **[Cucumber-runner](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse/packages/cucumber-runner/README.md)**.  

---

#### 2.1 Migration To Async Mode [Breaking Change]

As from version v4, considering the [evolution of technologies](https://webdriver.io/blog/2021/07/28/sync-api-deprecation/) Acis underlies, the framework stops giving support to tests in sync mode. This means that the packages [wdio-sync](https://github.com/webdriverio/webdriverio/tree/v6.12.1/packages/wdio-sync) and [fibers](https://github.com/laverdet/node-fibers) are not included anymore, either as a part of the framework core or as dependencies available to the users.

Consequently, **[Acis v5](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse/packages/acis-v5) and [Acis v6](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/e2e-js-framework/browse/packages/acis-v6) only work in async mode** by default, paving the way for the upcoming release of Acis v7 (WebdriverIO v7) and the use of NodeJs +v14.

**How is working in async mode?**

Starting from now, your Cucumber steps and page objects' async methods must be handled by promises, which means that something written until now like:

```ts
    import { PageObject, PageContext } from '@testing/wdio-page-objects';

    @PageContext({
      selector: '#secondWindowButton'
    })
    export class ToSecondWindowPage extends PageObject {
      openSecondWindow() {
        $('#secondWindowButton').click();
      }
    }
```  

It must be rewritten to something like the following:

```ts
    import { PageObject, PageContext } from '@testing/wdio-page-objects';

    @PageContext({
      selector: '#secondWindowButton'
    })
    export class ToSecondWindowPage extends PageObject {
      async openSecondWindow() {
        const $secondWindowButton = await $('#secondWindowButton');
    
        return $secondWindowButton.click();
      }
    }
```

> You can find more info about how to transition from sync to async mode in [this link](https://webdriver.io/docs/async-migration/).

> If you still have the need of using the sync-mode with Acis v5 or Acis v6, just target a version of the framework lower than v4.

-----------------------

### 3. How To Run Tests

To run tests there're several options at your disposal:

- Browsers available in your local machine (Chrome, Firefox, ie, etc) via [SeleniumStandalone](https://github.com/webdriverio/webdriverio/tree/main/packages/wdio-selenium-standalone-service) or [ChromeDriver](https://github.com/SeleniumHQ/selenium/wiki/ChromeDriver) by default.
- [Galatea](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/galatea/browse) or [Sauce Labs](https://saucelabs.com/developers) as Cloud browser / mobile platform providers.
- Mobile emulators or real devices connected to your local machine by using [Appium](http://appium.io/docs/en/about-appium/intro/).  

---

#### 3.1 Execution Environments

You can execute tests from your local machine (against a local driver / Selenium, Galatea or Sauce Labs), but this scaffold also comes with a Jenkinsfile that allows us to execute tests in Jenkins via browsers / mobile platforms provider (Galatea by default). Check the Jenkinsfile to read instructions on how to get the pipeline working.

When executed in Jenkins, test results will be automatically uploaded to [TestManager](`https://globaldevtools.bbva.com/test-manager`). Please, check the log file of the Jenkins job for the specific report URL.  

---

#### 3.2 Browsers / Mobile Platforms Providers

As commented above, Acis integrates the possibility of running tests in remote browsers / mobile platforms with two providers: Galatea and Sauce Labs.

To configure a Jenkins' bot with the required credentials to establish connection with Galatea / Sauce Labs, you can open a request via **[Testing Servicedesk](https://globaldevtools.bbva.com/jira/servicedesk/customer/portal/15/group/38)**.  

--

__Galatea, the recommended option__

**[Galatea](https://globaldevtools.bbva.com/bitbucket/projects/BGTrepos/galatea/browse)** is a proxy server that shares the responsability of running tests' sessions between [Sauce Labs](https://docs.saucelabs.com/overview/) and [Zalenium](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/zalenium/browse), depending on the browser version / platform device availability on a given moment. It's the option **currently recommended** for being the most efficient.

To configure Galatea as default grid provider, just assign the following environment variables when running your tests:

```sh
    GALATEA=true GRID_USER=$GALATEA_USER GRID_PASS=$GALATEA_KEY npm run test:all
```

If your application lives in a local or proxied server you'll also need to assign the environment variable **GRID_TUNNEL**=true in order to grant permission [to open a tunnel](https://globaldevtools.bbva.com/bitbucket/projects/BGTrepos/galatea/browse/tunnel/client-js-launcher) between the server and the grid provider's.

If you're running tests against hybrid or native mobile applications, learn how your application packages are uploaded to the assigned provider's server by checking the **[galatea-app-repository-wdio-service](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/galatea/browse/app-repository/wdio-service)** documentation.  

--

__Sauce Labs__

Also it's possible to run tests in remote browsers provided directly by [Sauce Labs](https://docs.saucelabs.com/overview/). In order to get it configured as default grid provider, just assign the following environment variables when running your tests:

```sh
    GRID_USER=$SAUCELABS_USER GRID_PASS=$SAUCELABS_KEY npm run test:all
```

If your application lives in a local or proxied server you'll also need the following in order to grant permission to stablish connection between your server and Sauce Labs:
- If you're using **WebdriverIO v5**, assign the environment variable **GRID_TUNNEL**=true.
- If you're using **WebdriverIO v6**, assign the Wdio Config property **[sauceConnect](ttps://globaldevtools.bbva.com/bitbucket/projects/BGT/repose2e-js-framework/browse/packages/wdio-config/docs/wdio.md#sauceconnect)**.

If you're running tests against hybrid or native mobile applications, learn how your application packages are uploaded to the assigned provider's server by checking the [wdio-sauce-extend-service](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repose2e-js-framework/browse/packages/wdio-sauce-extend-service) documentation.  

---

#### 3.3 DataManager

In order to retrieve data successfully from [DataManager](https://globaldevtools.bbva.com/bitbucket/projects/BGT/repos/data-manager/browse):

- Assure you have an authentication token, that it's the combination of your [testing credentials](https://globaldevtools.bbva.com/testing), following the format **'username:password'** encoded in Base64:

```bash
    echo -n 'username:password' | openssl base64
```  

- Set the environment variable **DATAMANAGER_HEADERS** with the authentication token obtained:

```bash
    export DATAMANAGER_HEADERS='{"Authorization": `Basic XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX}`}'
```  

- Set the environment variable **DATAMANAGER_BASE_URL** with the DataManager url pointing to your namespace (*your_namespace* for example purposes):

```bash
    export DATAMANAGER_BASE_URL=https://globaldevtools.bbva.com/data-manager-api/namespaces/your_namespace
```

---

#### 3.4 Executing tests under PROXY

If your testing environment (ex. Jenkins) depends on a corporate proxy, there're some extra steps necessary to follow in order to have connectivity between the tests and the internet.

In all circunstances, to execute tests with Acis successfully, the following enviroment variables are mandatory:

```sh
    HTTP_PROXY="http://proxy.cloud.local:8080"
    HTTPS_PROXY="http://proxy.cloud.local:8080"
    http_proxy="http://proxy.cloud.local:8080"
    https_proxy="http://proxy.cloud.local:8080"
    NO_PROXY="172.20.0.0/16,.jenkins,.internal,localhost,127.0.0.1,127.20.0.1,central-jenkins-cache.s3.eu-west-1.amazonaws.com,central-jenkins-cache.s3.amazonaws.com,.eu-west-1.amazonaws.com,jenkins.globaldevtools.bbva.com,artifactory.globaldevtools.bbva.com"
    no_proxy="172.20.0.0/16,.jenkins,.internal,localhost,127.0.0.1,127.20.0.1,central-jenkins-cache.s3.eu-west-1.amazonaws.com,central-jenkins-cache.s3.amazonaws.com,.eu-west-1.amazonaws.com,jenkins.globaldevtools.bbva.com,artifactory.globaldevtools.bbva.com"
```  

--

__WebdriverIO and Galatea__

To execute tests with Acis in Galatea under proxy, check that:

- the version of **Acis** package is **3.4.1** or greater,
- the version of **@testing/galatea-client-js-launcher** (it comes with Acis by default) is **0.69.0** or greater.

--

__WebdriverIO and Sauce Labs__

By defining the environment variables commented above, it should be enough to run your tests with Acis in Sauce Labs under proxy. Just remember to set the *sauceConnect* property (Acis 6) or the GRID_TUNNEL environment variable (Acis 5) to true when a tunnel between Sauce Labs and your application needs to be launched.

As with Galatea, check that the version of the **Acis** package installed in your testing project is **3.4.1** or greater.

---

#### 3.5 Tests' Execution Commands

After cloning the repository in your local machine, there are several execution options available in the *package.json* file:

- `npm t`: shortcut for `npm run test:browser`
- `npm run test:browser`: It executes tests against desktop browsers. Configuration found in *config/browser.js*.
- `npm run test:android`: It executes tests against Android devices. Configuration found in *config/android.js*.
- `npm run test:android:real`: It executes tests against Android real devices. Configuration found in *config/android-real.js*.
- `npm run test:ios`: It executes tests against iOs devices. Configuration found in *config/ios.js*.
- `npm run test:ios:real`: It executes tests against iOs real devices. Configuration found in *config/android.js*.
- `npm run test:all`: It executes tests against browser and emulated devices. Configuration found in *config/all.js*.
- `npm run test:all:real`: It executes tests against real devices. Configuration found in *config/all-real.js*.  

---

#### 3.6 Environment Variables

In order to get executions working, there are some relevant environment variables that must be taken into account:

__Browsers / mobile platforms providers related variables__

- `GRID_USER`: The username provided to connect with Galatea / Sauce Labs.
- `GRID_PASS`: The apikey provided to connect with Galatea / Sauce Labs.
- `GRID_TUNNEL`: The value must be truthy when a tunnel is required to stablish communication between Galatea / Sauce Labs and the server where the application under test is being launched. For example, when your environment is set up in a local server with no direct connection to internet.
- `GALATEA`: The value needs to be explicitely set to truthy so we can enable Galatea as our browsers' provider. Otherwise, if *GRID_USER* and *GRID_PASS* variables are defined, Acis will try to use Sauce Labs as browsers' provider.  

---

#### 3.7 Some Examples

Here some examples of executions:

- **On your desktop browsers**: `npm t`
- **Specific spec on desktop browsers**: `npm t -- --spec src/products/products.feature:4`
- **Specific tags on desktop browsers**: `npm t -- --cucumberOpts.tagExpression '(not @failing)'`
- **Running on Galatea**: `GALATEA=true GRID_USER=my_user GRID_PASS=KEY npm t`
- **Running on a local Android emulator**: `npm run test:android`
- **Running on a local Android emulator an specific spec**: `npm run test:android -- --spec src/products/products.feature:4`

When tests are being executed, browsers start jumping on your screen. Please, do not interfere with them while the tests are running. You can stop the tests anytime by pressing `CTRL+C`.

> **Tip**: If you're on a Windows computer some of this commands (those starting with env variables) may not be compatible if you don't use a bash terminal emulator. Yo can prepend those command with `npx cross-env ` for them to work.  

---

### 4. Under the hood

Tests developed are powered by:
- [webdriverio](https://webdriver.io/), a browser driver based in Selenium.
- [CucumberJS](https://github.com/cucumber/cucumber-js) a test-runner that allows us to write tests in Gherkin and step development.
- [Chai](https://www.chaijs.com/) for assertions.
- [Typescript](https://www.typescriptlang.org/), a typed programming language on top of Javascript developed by Microsoft that you may want to include in your projects(or not).
- ... a lot of love by [Global Testing Team](mailto:testing.global.group@bbva.com)  

---

Did this documentation fullfilled your expectations? If you miss something, [let us know](mailto:testing.global.group@bbva.com)!
