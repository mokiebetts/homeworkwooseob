const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    // 1. Request Header의 Authorization 정보에서 JWT를 가져와서 확인
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new Error('인증이 필요합니다.');
        }

        // JWT를 가져옴
        const token = authHeader.split(' ')[1];

        // 2. JWT의 유효기한이 지났는지 확인
        jwt.verify(token, 'your-secret-key', (err, decoded) => {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    throw new Error('유효하지 않은 토큰입니다.');
                } else if (err.name === 'TokenExpiredError') {
                    throw new Error('토큰이 만료되었습니다.');
                } else {
                    throw new Error('토큰 검증에 실패하였습니다.');
                }
            }

            // 3. JWT 검증에 성공하면 req.locals.user에 사용자 정보 저장
            req.locals = { user: decoded };
            next();
        });
    } catch (error) {
        // 1, 2에서 발생한 에러 처리
        next(error);
    }
};

module.exports = authenticate;