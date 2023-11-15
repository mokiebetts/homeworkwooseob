const express = require('express');
const router = express.Router();
const Product = require("../models/products.schema");

// 상품 작성 API
router.post('/product', async(req, res) => {
    try {
        const { productName, description, authorName, password } = req.body;
        const status = 'FOR_SALE';

        // 상품이 'SOLD_OUT'인 경우에 에러 응답
        if (status === 'SOLD_OUT') {
            return res.status(400).json({ error: '상품 작성에 실패하였습니다. 상태를 확인하세요.' });
        }

        const product = new Product({
            productName,
            description,
            authorName,
            status,
            password
        });

        await product.save();
        res.status(200).json({ message: '상품이 성공적으로 작성되었습니다.' });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 작성에 실패하였습니다.' });
    }
});


// 상품 목록 조회 API
router.get("/product", async(req, res) => {
    try {

        const products = await Product.find().sort({ createdDate: -1 });

        const productData = products.map((product) => ({
            productName: product.productName,
            authorName: product.authorName,
            status: product.status,
            createdDate: product.createdDate,
        }));

        res.status(200).json(productData);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 조회에 실패하였습니다.' });
    }
});

// 상품 상세 조회
router.get("/product/:id", async(req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 조회에 실패하였습니다.' });
    }
});


// 상품 정보 수정 API
router.put("/product/:id", async(req, res) => {
    try {
        const { productName, description, status, password } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
        }

        if (product.password !== password) {
            return res.status(402).json({ error: '비밀번호가 일치하지 않습니다.' });
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


router.delete("/product/:id", async(req, res) => {
    try {
        // ...

        const { password } = req.body;
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ error: '상품을 찾을 수 없습니다.' });
        }

        if (product.password !== password) {
            return res.status(402).json({ error: '비밀번호가 일치하지 않습니다.' });
        }

        await product.remove();
        res.json({ result: "success" });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: '상품 삭제에 실패하였습니다.' });
    }
});

module.exports = router;