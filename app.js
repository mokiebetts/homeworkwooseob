const express = require('express');
const app = express();
const authRouter = require("./routers/auth.router.js");
const goodsrouter = require("./routers/goods.js");
const usersRouter = require("./routers/user.router.js");
// const jwt = require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const port = 3000;
// const SECRET_KEY = `wooseob-secret-key`;
const path = require('path');
const bodyParser = require('body-parser');

app.use("/api", [authRouter, goodsrouter, usersRouter]);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
    res.status(200).send("hello");
});

// app.listen(port, () => {
//     console.log(`${port}가 열렸습니다.`);
// });

const { sequelize } = require("./models");
const userRouter = require("./routers/user.router.js");

app.use("/auth", userRouter);

app.use(express.static(path.join(__dirname, "public")));

// 에러 처리 미들웨어
// app.use((err, req, res, next) => {
//     // 템플릿 변수 설정
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== "production" ? err : {}; // 배포용이 아니라면 err설정 아니면 빈 객체
//     res.status(err.status || 500);
//     res.render("error"); // 템플릿 엔진을 렌더링 하여 응답
// });

// 서버 실행
app.listen(port, () => {
    console.log(`${port}번 포트에서 대기 중`);
});





// let tokenObject = {}; // Refresh Token을 저장할 Object

// app.get("/set-token/:id", (req, res) => {
//     const id = req.params.id;
//     const accessToken = createAccessToken(id);
//     const refreshToken = createRefreshToken();

//     tokenObject[refreshToken] = id; // 당 유저의 정보를 서버에 저장합니다.
//     res.cookie('accessToken', accessToken); // Access Token을 Cookie에 전달한다.
//     res.cookie('refreshToken', refreshToken); // Refresh Token을 Cookie에 전달한다.

//     return res.status(200).send({ "message": "Token이 정상적으로 발급되었습니다." });
// })

// // Access Token을 생성합니다.
// function createAccessToken(id) {
//     const accessToken = jwt.sign({ id: id }, // JWT 데이터
//             SECRET_KEY, // 비밀키
//             { expiresIn: '10s' }) // Access Token이 10초 뒤에 만료되도록 설정합니다.

//     return accessToken;
// }

// // Refresh Token을 생성합니다.
// function createRefreshToken() {
//     const refreshToken = jwt.sign({}, // JWT 데이터
//             SECRET_KEY, // 비밀키
//             { expiresIn: '7d' }) // Refresh Token이 7일 뒤에 만료되도록 설정합니다.

//     return refreshToken;
// }


// app.get("/get-token", (req, res) => {
//     const accessToken = req.cookies.accessToken;
//     const refreshToken = req.cookies.refreshToken;

//     if (!refreshToken) return res.status(400).json({ "message": "Refresh Token이 존재하지 않습니다." });
//     if (!accessToken) return res.status(400).json({ "message": "Access Token이 존재하지 않습니다." });

//     const isAccessTokenValidate = validateAccessToken(accessToken);
//     const isRefreshTokenValidate = validateRefreshToken(refreshToken);

//     if (!isRefreshTokenValidate) return res.status(419).json({ "message": "Refresh Token이 만료되었습니다." });

//     if (!isAccessTokenValidate) {
//         const accessTokenId = tokenObject[refreshToken];
//         if (!accessTokenId) return res.status(419).json({ "message": "Refresh Token의 정보가 서버에 존재하지 않습니다." });

//         const newAccessToken = createAccessToken(accessTokenId);
//         res.cookie('accessToken', newAccessToken);
//         return res.json({ "message": "Access Token을 새롭게 발급하였습니다." });
//     }

//     const { id } = getAccessTokenPayload(accessToken);
//     return res.json({ "message": `${id}의 Payload를 가진 Token이 성공적으로 인증되었습니다.` });
// })


// function validateAccessToken(accessToken) {
//     try {
//         jwt.verify(accessToken, SECRET_KEY); // JWT를 검증합니다.
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Refresh Token을 검증합니다.
// function validateRefreshToken(refreshToken) {
//     try {
//         jwt.verify(refreshToken, SECRET_KEY); // JWT를 검증합니다.
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

// // Access Token의 Payload를 가져옵니다.
// function getAccessTokenPayload(accessToken) {
//     try {
//         const payload = jwt.verify(accessToken, SECRET_KEY); // JWT에서 Payload를 가져옵니다.
//         return payload;
//     } catch (error) {
//         return null;
//     }
// };