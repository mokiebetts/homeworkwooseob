const jwt = require('jsonwebtoken');
const { User } = require('../models'); // Use correct model name "User"

module.exports = async(req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = (authorization || '').split(' ');

    if (!authToken || authType !== 'Bearer') {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
        return;
    }

    try {
        const { userId } = jwt.verify(authToken, 'wooseob-secret-key');
        const user = await User.findByPk(userId);
        res.locals.user = user;
        next();
    } catch (err) {
        res.status(401).send({
            errorMessage: '로그인 후 이용 가능한 기능입니다.',
        });
    }
};