const { configBuild } = require('@testing/wdio-config');
const { config } = require('./base.conf');
const { join } = require('path');

const device = {
    platformName: 'Android',
    platformVersion: '10.0',
    'appium:deviceName': 'Samsung Galaxy Tab Active 2 GoogleAPI Emulator',
    'appium:automationName': 'UiAutomator2',
    'sauce:options': {
        appiumVersion: '1.16.0'
    }
}

exports.web = {
    ...device,
    browserName: 'Chrome'
};

exports.device = {
    ...device,
    autoWebview: true,
    'appium:app': join( __dirname, '../bin/AndroidWebView.apk')
};

exports.config = configBuild(config, {
    capabilities: [exports.device, exports.web],
}, process.env.GRID_USER ? {} : {
    port: 4723,
    services: ['appium']
});
