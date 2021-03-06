'use strict';

var restify = require('restify');
var server = restify.createServer({ name: 'KeepIced Server' });
var sensor = require('node-dht-sensor');

/**
 * Constantes
 */
var SENSOR_PORT = 25; // Referência ao pino do GPIO
var SENSOR_TYPE = 11; // 11 = DHT11 ; 21 = DHT21 ; 22 = DHT22

/**
 * Verifica o status do servidor
 */
server.get('/status', function (req, res, next) {
    console.log('[GET] Request server status');
    res.send(200);

    return next();
});

/**
 * Verifica o status da temperatura
 */
server.get('/temperature', function (req, res, next) {
    console.log('[GET] Request temperature status');
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