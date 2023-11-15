const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('database', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql',
});

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nickname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});


sequelize.sync()
    .then(() => {
        console.log('MySQL 테이블이 성공적으로 생성되었습니다.');
    })
    .catch((error) => {
        console.error('MySQL 테이블 생성 중 에러 발생:', error);
    });

module.exports = User;