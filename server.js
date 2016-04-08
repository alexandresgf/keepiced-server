'use strict';

var restify = require('restify');
var server = restify.createServer({ name: 'KeepIced Server' });
var sensor = require('node-dht-sensor');

/**
 * Constantes
 */
var SENSOR_PORT = 24; // Referência ao pino do GPIO
var SENSOR_TYPE = 11; // 11 = DHT11 ; 21 = DHT21 ; 22 = DHT22

/*var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 24);
    },
    read: function () {
        var readout = sensorLib.read();
        console.log('Temperature: ' + readout.temperature.toFixed(2) + 'C, ' + 'humidity: ' + readout.humidity.toFixed(2) + '%');
        setTimeout(function () {
            sensor.read();
        }, 10000);
    }
};*/

/*if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}*/

/**
 * Verifica o status da temperatura
 */
server.get('/status', function (req, res, next) {
    res.send(JSON.stringify(sensor.read()));

    return next();
});

/**
 * Inicialização do servidor na porta 8080 e uma função assíncrona é chamada ao final da execução do método "listen"
 */
server.listen(8080, function () {
    console.log('%s foi iniciado na porta %s', server.name, server.address().port);
    // Inicia a leitura do sensor no pino 24 do Rpi
    sensor.initialize(SENSOR_TYPE, SENSOR_PORT);
});