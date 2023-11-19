const express = require('express');
const router = express.Router();
const Product = require("../models/goods");
const jwt = require('jsonwebtoken');
const model = modelDefiner(sequelize, Sequelize.DataTypes);

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ error: '로그인이 필요합니다.' });

    jwt.verify(token, 'wooseob-secret-key', (err, user) => {
        if (err) return res.status(403).json({ error: '인증에 실패했습니다.' });
        req.user = user;
        next();
    });
};

// 상품 작성 API (인증 필요)
router.post('/product', authenticateToken, async(req, res) => {
    try {
        const { productName, description } = req.body;
        const status = 'FOR_SALE';

        // 상품이 'SOLD_OUT'인 경우에 에러 응답
        if (status === 'SOLD_OUT') {
            return res.status(400).json({ error: '상품 작성에 실패하였습니다. 상태를 확인하세요.' });
        }

        const product = new Product({
            productName,
            description,
            authorId: req.user.userId, // 사용자의 userId로 저장
            status,
        });

        await product.save();
        res.status(200).json({ message: '상품이 성공적으로 작성되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 작성에 실패하였습니다.' });
    }
});

// 상품 수정 API (인증 필요)
router.put("/product/:id", authenticateToken, async(req, res) => {
    try {
        const { productName, description, status } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
        }

        // 사용자 인증
        if (product.authorId !== req.user.userId) {
            return res.status(403).json({ error: '수정 권한이 없습니다.' });
        }

        product.productName = productName;
        product.description = description;
        product.status = status;

        await product.save();
        res.status(200).json({ success: true });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 수정에 실패하였습니다.' });
    }
});

// 상품 삭제 API (인증 필요)
router.delete("/product/:id", authenticateToken, async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
        }

        // 사용자 인증
        if (product.authorId !== req.user.userId) {
            return res.status(403).json({ error: '삭제 권한이 없습니다.' });
        }

        await product.remove();
        res.json({ result: "success" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 삭제에 실패하였습니다.' });
    }
});



module.exports = router;