const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const authenticate = require('../middlewares/auth-middleware');
const User = require("../models/user");


router.post("/auth", async(req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || password !== user.password) {
        res.status(400).json({
            errorMessage: "이메일 또는 패스워드가 틀렸습니다.",
        });
        return;
    }

    const token = jwt.sign({ userId: user.userId },
        "customized-secret-key",
    );

    res.cookie("Authorization", `Bearer ${token}`);
    res.status(200).json({ token });
});


router.get('/profile', authenticate, (req, res) => {

    const user = req.locals.user;
    res.status(200).json(user);
});


module.exports = router;