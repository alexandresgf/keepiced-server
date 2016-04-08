'use strict';

var restify = require('restify');
var server = restify.createServer({ name: 'KeepIced Server' });
var sensor = require('node-dht-sensor');

/**
 * Constantes
 */
var SENSOR_PORT = 25; // Referência ao pino do GPIO
var SENSOR_TYPE = 11; // 11 = DHT11 ; 21 = DHT21 ; 22 = DHT22
var READ_DELAY = 5000; // Delay em milisegundos para efetuar a leitura do sensor

/**
 * Verifica o status da temperatura
 */
server.get('/status', function (req, res, next) {
    console.log('[GET] Request temperature status');
    res.send(JSON.stringify(sensor.read()));
    /*setTimeout(function () {
        console.log('[OK] Temperature status was sent');
        res.send(JSON.stringify(sensor.read()));
    }, READ_DELAY);*/

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