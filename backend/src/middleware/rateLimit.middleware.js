const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes

    max: 10, // Maximum 10 login attempts per IP

    standardHeaders: true,

    legacyHeaders: false,

    message: {
        success: false,
        message: "Too many login attempts. Please try again later."
    }
});

module.exports = {
    loginRateLimiter
};