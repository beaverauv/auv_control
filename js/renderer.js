// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require('eventemitter2');
// var ROSLIB = require('./dist/scripts/roslib.js'); //prototype error
// var ROSLIB = require('./roslib.min.js'); //prototype error
// var ROSLIB = require('./node_modules/roslib/RosLib.js'); // cannot find module
// var ROSLIB = require('roslib'); //cannot find module
// var ROSLIB = require('./bower_components/roslib/build/roslib.js'); //prototype error
require('./horizon.js');
require('./compass.js');
// require('./dist/scripts/gauge.js');
require('./cockpit.js');
// require('tether');

var cockpit = new NodecopterCockpit(
  '#stream',
  '#compass',
  '#horizon',
  '#batterygauge'
);
