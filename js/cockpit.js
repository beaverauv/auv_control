/*jshint browser:true */
/*global NodecopterStream:true,
         Compass:true,
         Gauge:true,
         ArtificialHorizon:true,
         requestAnimationFrame:true
*/
(function (window, document) {
    'use strict';
    var NC = function NodecopterCockpit(
        ROSLIB, dronestreamDiv, compassDiv, horizonCanvas, gaugeId
    ) {
        var qs           = document.querySelector.bind(document),
            //copterStream = new NodecopterStream(qs(dronestreamDiv)),
            compass      = new Compass(qs(compassDiv)),
            horizon      = new ArtificialHorizon(qs(horizonCanvas)),
            lastMessage = null,
            navDataRenderer = function () {
                // if (!lastMessage) {
                //     return;
                // }
                //var data = JSON.parse(lastMessage);
                // valastMessage;
                horizon.setValues({
                    roll : lastMessage.angular.x * Math.PI / 180,
                    pitch : lastMessage.angular.y * Math.PI / 180,
                    altitude : lastMessage.linear.z,
                    // altitude : data.linear.z,

                    speed : 1 // no idea...
                });
                horizon.draw();
                // gauge.setValue(data.demo.batteryPercentage);
                // gauge.draw();
                compass.moveTo(lastMessage.angular.z);
            };

            var ros = new ROSLIB.Ros({
              'url' : 'ws://localhost:9090'
            });

            var listener = new ROSLIB.Topic({
              ros : ros,
              name : '/cmd_vel',
              messageType : 'geometry_msgs/Twist'
            });

            listener.subscribe(function(message) {
                    lastMessage=message;
                    requestAnimationFrame(navDataRenderer);
            });


        // navdataSocket.onmessage = function (msg) {
        //     lastMessage = msg.data;
        //     requestAnimationFrame(navDataRenderer);
        // };
    };
    window.NodecopterCockpit = NC;
}(window, document));
