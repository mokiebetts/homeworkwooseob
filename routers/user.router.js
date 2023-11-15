const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models');


router.post('/signup', async(req, res) => {
    try {
        const { email, password, name } = req.body;


        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: '이미 가입된 이메일 주소입니다.' });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const newUser = await User.create({ email, password: hashedPassword, name });


        const userWithoutPassword = {
            id: newUser.id,
            email: newUser.email,
            name: newUser.name,
        };

        res.status(201).json({ message: '회원가입이 완료되었습니다.', user: userWithoutPassword });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: '서버 오류가 발생했습니다.' });
    }
});

module.exports = router;