// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// require('eventemitter2');
// var ROSLIB = require('./roslib.js'); //Uncaught TypeError: Cannot read property 'prototype' of undefined @ 647
var ROSLIB = require('../node_modules/roslib/src/RosLib.js');  //ROSLIB is not defined
// var ROSLIB = require('roslib'); //ROSLIB is not defined
// var ROSLIB = require('../bower_components/roslib/build/roslib.js'); //Uncaught TypeError: Cannot read property 'prototype' of undefined @ 1105
require('./horizon.js');
require('./compass.js');
// require('./dist/scripts/gauge.js');
require('./cockpit.js');
// require('tether');

var cockpit = new NodecopterCockpit(
  ROSLIB,
  '#stream',
  '#compass',
  '#horizon',
  '#batterygauge'
);
