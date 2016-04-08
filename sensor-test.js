var sensorLib = require('node-dht-sensor');

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 25);
    },
    read: function () {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' 
            + readout.humidity.toFixed(2) + '%, ' + 'error: ' + ((readout.errors) ? 'true' : 'false'));
        setTimeout(function () {
            sensor.read();
        }, 5000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}