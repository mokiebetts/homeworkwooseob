const express = require('express');
const authRouter = require("./routers/auth.router.js");
const productsrouter = require("./routers/productsrouter.js");
const usersRouter = require("./routers/user.router.js");
const jwt = require("jsonwebtoken");

const token = jwt.sign({ myPayloadData: 1234 },
    "mysecretkey", { expiresIn: "12h" });





const jwt = require("jsonwebtoken");

const decodedValue = jwt.decode(token);

const decodedValueByVerify = jwt.verify(token, "mysecretkey");

// const app = express();
// const port = 3000;




// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use("/api", [authRouter, productsrouter, usersRouter]);

// app.get('/', (req, res) => {
//     res.send('Hello World!');
// });

// app.listen(port, () => {
//     console.log(port, '포트로 서버가 열렸어요!');
// });