// models/index.js

'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};
const modelDefiner = require('./modelDefiner'); // Correct path to modelDefiner

let sequelizeInstance; // 여기에 Sequelize 인스턴스를 생성하는 코드를 작성

if (config.use_env_variable) {
    sequelizeInstance = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelizeInstance = new Sequelize(config.database, config.username, config.password, config);
}

fs.readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = modelDefiner(sequelizeInstance, Sequelize); // Using modelDefiner correctly
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelizeInstance;
db.Sequelize = Sequelize;

module.exports = { db, modelDefiner }; // db와 modelDefiner를 함께 내보냄