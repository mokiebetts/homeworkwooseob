const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

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
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'products',
});


sequelize.sync()
    .then(() => {
        console.log('MySQL 테이블이 성공적으로 생성되었습니다.');
    })
    .catch((error) => {
        console.error('MySQL 테이블 생성 중 에러 발생:', error);
    });

module.exports = Product;