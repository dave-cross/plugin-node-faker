'use strict';

const pluginName = 'plugin-node-faker';


const faker = require('faker');

function onAddFakerData(patternlab) {
  // Convert data to JSON string and process. Then, return it to an object.
  var stringData = JSON.stringify(patternlab.data, (key, value) => {
    // Testy, testy. If value is a string, change it to 'shark'.
    // if (typeof value === 'string') {
    //   return 'shark';
    // }
    if (typeof value === 'string' && value.indexOf("faker") !== -1) {
      var fakerItem = value.slice(6); // assume "faker." is the first 6 chars of value
      try {
        return faker.fake(`{{${fakerItem}}}`);
      } catch (e) {
        console.log("Oh oh!", e);
      }
    }
    return value;
  });
  patternlab.data = JSON.parse(stringData);
}

/**
 * Define what events you wish to listen to here
 * For a full list of events - check out https://github.com/pattern-lab/patternlab-node/wiki/Creating-Plugins#events
 * @param patternlab - global data store which has the handle to the event emitter
   */
function registerEvents(patternlab) {
  //register our handler at the appropriate time of execution
  patternlab.events.on('patternlab-pattern-before-data-merge', onAddFakerData);
}

/**
* A single place to define the frontend configuration
* This configuration is outputted to the frontend explicitly as well as included in the plugins object.
*
*/
function getPluginFrontendConfig() {
  return {
    'name':'pattern-lab\/' + pluginName
  };
}

/**
* The entry point for the plugin. You should not have to alter this code much under many circumstances.
* Instead, alter getPluginFrontendConfig() and registerEvents() methods
  */
function pluginInit(patternlab) {

  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  //write the plugin json to public/patternlab-components
  var pluginConfig = getPluginFrontendConfig();

  //add the plugin config to the patternlab-object
  if (!patternlab.plugins) {
    patternlab.plugins = [];
  }
  patternlab.plugins.push(pluginConfig);

  //setup listeners if not already active. we also enable and set the plugin as initialized
  if (!patternlab.config.plugins) {
    patternlab.config.plugins = {};
  }

  //attempt to only register events once
  if (patternlab.config.plugins[pluginName] !== undefined &&
     patternlab.config.plugins[pluginName].enabled &&
     !patternlab.config.plugins[pluginName].initialized) {

    //register events
    registerEvents(patternlab);

    //set the plugin initialized flag to true to indicate it is installed and ready
    patternlab.config.plugins[pluginName].initialized = true;
  }

}

module.exports = pluginInit;
