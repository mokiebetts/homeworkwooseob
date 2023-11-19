const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../models");
const User = db.User;
const { Op } = require("sequelize");
const router = express.Router();
const emailPattern = /^\S+@\S+\.\S+$/;

// 회원가입
router.post("/sign", async(req, res) => {
    try {
        const { email, password, passwordCheck } = req.body;

        const existsUser = await User.findOne({
            where: { email }
        });

        // 이메일 유효성 검사 함수 정의
        function emailValiChk(email) {
            if (emailPattern.test(email) === false) {
                return res.status(400).json({ message: "이메일 형식이 맞지 않습니다." });
            }
        }

        emailValiChk(email);

        if (existsUser) {
            return res.status(405).json({
                message: "이미 사용중인 이메일 입니다."
            });
        }

        if (password !== passwordCheck) {
            return res.status(400).json({ message: "비밀번호와 비밀번호 확인이 일치하지 않습니다." });
        } else if (password.length < 6) {
            return res.status(400).json({ message: "비밀번호는 6글자 이상 입력해주세요" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({ email, password: hashedPassword });

        res.status(201).json({
            success: true,
            message: "회원가입에 성공했습니다",
            data: user.email
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "서버 오류"
        });
    }
});

// 수정
router.put("/sign", async(req, res) => {
    try {
        const { email, password, newPassword } = req.body;
        if (!email || !password || !newPassword) {
            return res.status(401).json({
                message: "데이터 형식이 올바르지 않습니다."
            });
        }
        const user = await User.findOne({ where: { email } });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();

            return res.status(200).json({
                message: "회원정보를 수정하였습니다."
            });
        } else {
            res.status(402).json({
                message: "비밀번호가 맞지 않습니다."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "회원정보를 수정할 수 없습니다."
        });
    }
});

//삭제
router.delete("/sign", async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({
                message: "데이터 형식이 올바르지 않습니다."
            });
        }

        const user = await User.findOne({ where: { email } });
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            await user.destroy();
            return res.status(200).json({
                message: "회원 탈퇴 완료"
            });
        } else {
            res.status(402).json({
                message: "비밀번호가 맞지 않습니다."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: "회원정보를 수정할 수 없습니다."
        });
    }
});

module.exports = router;