const express = require('express');
const router = express.Router();
const { modelDefiner } = require('../models');
const { Sequelize } = require('sequelize'); // 이 줄을 추가

const sequelizeInstance = new Sequelize('database', 'username', 'password', {
    host: 'lexpress-database.c0nroi4ityao.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mysql',
});

const { Product } = modelDefiner(sequelizeInstance);

const authenticate = require('../middlewares/auth-middleware');
const jwt = require('jsonwebtoken');
const { User } = require('../models');

router.post('/auth', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });

        if (!user || password !== user.password) {
            res.status(400).json({
                error: '이메일 또는 패스워드가 틀렸습니다.',
            });
            return;
        }

        const token = jwt.sign({ userId: user.userId }, 'wooseob-secret-key');

        res.cookie('Authorization', `Bearer ${token}`);
        res.status(200).json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/profile', authenticate, (req, res) => {
    const user = req.locals.user;
    res.status(200).json(user);
});

module.exports = router;