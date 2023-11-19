// models/index.js

const { Sequelize, DataTypes } = require('sequelize');

const modelDefiner = (sequelize) => {
    const Product = sequelize.define('Product', {
        Id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('FOR_SALE', 'SOLD_OUT'),
            defaultValue: 'FOR_SALE',
            allowNull: false,
        },
        createdDate: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
    }, {
        tableName: 'goods',
    });

    return { Product };
};

module.exports = { modelDefiner };