const { DataTypes, Model } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            // 필요한 경우 여기에서 관계를 정의합니다.
        }
    }

    User.init({
        userId: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false, // 예시: 필요에 따라 조정하세요
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false, // 예시: 필요에 따라 조정하세요
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false, // 예시: 필요에 따라 조정하세요
        },
    }, {
        sequelize,
        modelName: 'User',
    });

    return User;
};