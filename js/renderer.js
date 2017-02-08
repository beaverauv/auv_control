var greeting =
// '    ___                  ______            __             __\n' +
// '   /   | __  ___   __   / ____/___  ____  / /__________  / /\n' +
// '  / /| |/ / / / | / /  / /   / __ \\/ __ \\/ __/ ___/ __ \\/ /\n' +
// ' / ___ / /_/ /| |/ /  / /___/ /_/ / / / / /_/ /  / /_/ / /\n' +
// '/_/  |_\\__,_/ |___/   \\____/\\____/_/ /_/\\__/_/   \\____/_/\n ';


'[[;#13a89e;#000000]     ___   __  ___    __   __                                                                    \n' +
'    /   | / / / / |  / /  / /   ____  ____ _                                                     \n' +
'   / /| |/ / / /| | / /  / /   / __ \\/ __ `/                                                     \n' +
'  / ___ / /_/ / | |/ /  / /___/ /_/ / /_/ /                                                      \n' +
' /_/  |_\\____/  |___/  /_____/\\____/\\__, /                                                       \n' +
'                                   /____/  ]'                                                        ;

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
// require('./keypress-2.1.4.min.js');
// require('tether');
// var Terminal = require('terminal.js');
var ros = new ROSLIB.Ros({
  'url' : 'ws://localhost:9090'
});

var tags = ["[DEBUG&#93;", "[ INFO&#93;"];
var color = ["#3A6F02", "#88867C"];
var terminalHistory;
var currentLogLvl = 1;
var listener = new window.keypress.Listener();

var cockpit = new NodecopterCockpit(
  ROSLIB,
  ros,
  '#stream',
  '#compass',
  '#horizon'
);


var my_scope = this;
var my_combos = listener.register_many([
    {
        "keys"          : "w",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnUp").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnUp").button('toggle');
            return true
        },
        "this"          : my_scope
    },
    {
        "keys"          : "a",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnLeft").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnLeft").button('toggle');
            return true
        },
        "this"          : my_scope
    },
    {
        "keys"          : "s",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnDown").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnDown").button('toggle');
            return true
        },
        "this"          : my_scope
    },
    {
        "keys"          : "d",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnRight").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnRight").button('toggle');
            return true
        },
        "this"          : my_scope
    },
    {
        "keys"          : "q",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnTurnLeft").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnTurnLeft").button('toggle');
            return true
        },
        "this"          : my_scope
    },

    {
        "keys"          : "e",
        "is_exclusive"  : true,
        "on_keydown"    : function() {
          $("#btnTurnRight").button('toggle');
        },
        "on_keyup"      : function(event) {
          $("#btnTurnRight").button('toggle');
            return true
        },
        "this"          : my_scope
    },


]);

var infoListener = new ROSLIB.Topic({
  ros : ros,
  name : '/rosout',
  messageType : 'rosgraph_msgs/Log'
});

infoListener.subscribe(function(message){
  if (message.name === '/state_machine'){
    // terminalHistory.push(message);
    if (message.level >= currentLogLvl){

      $.terminal.active().echo('[[;' +
      color[message.level - 1] + ';#000000]' +
      tags[message.level - 1] + ' ' + '[' +
      message.header.stamp.secs + '.' +
      message.header.stamp.nsecs + '&#93;: ' +
      message.msg.replace("]", "&#93;") + ']');
    }
  }
});


jQuery(function($, undefined) {
  function handledata(command, term){
  }

    $('#term_demo').terminal(handledata, {
        greetings: greeting,
        name: 'js_demo',
        height: 300,
        prompt: '> ',
        enabled: false
    });
    $.terminal.active().pause();
});

// $(".toggle-dropdown").dropdown({
//     onChange: function (val) {
//         $.terminal.active().echo(val);
//         // alert(val);
//     }
// });

$(".dropdown-menu li a").click(function(){

  $(this).parents(".btn-group").find('.selection').text($(this).text());
  $(this).parents(".btn-group").find('.selection').val($(this).text());
  var loglvl = $(this).parents(".btn-group").find('.selection').val($(this).text()).context.innerHTML
  if (loglvl === 'Debug'){
      currentLogLvl = 1;
  } else if (loglvl === 'Info'){
    currentLogLvl = 2;
  }
  // console.log(  $(this).parents(".btn-group").find('.selection').val($(this).text()).context.innerHTML)
});


// jQuery(function($, undefined) {
//   var socket = io.connect('http://localhost:30500');
//   var terminal = $('#term_demo').terminal(function(command, terminal) {
//     socket.emit('stdin', command);
//   },
//   {
//       greetings: 'Welcome to the web shell'
//     , height: 300
//     , prompt: 'shell:~$ '
//     , exit: false
//   });
//   socket.on('stdout', function(data) {
//     terminal.echo(String(data));
//   });
//   socket.on('stderr', function(data) {
//     terminal.error(String(data));
//   });
//   socket.on('disconnect', function() {
//     terminal.disable();
//   });
//   socket.on('enable', function() {
//     terminal.enable();
//   });
//   socket.on('disable', function() {
//     terminal.disable();
//   });
//
// });
