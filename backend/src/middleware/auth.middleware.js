const jwt = require("jsonwebtoken");

function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;

    // Check whether Authorization header exists
    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is required."
        });
    }

    // Check Bearer format
    if (!authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "Authorization header must use Bearer token."
        });
    }

    const token = authHeader.substring(7).trim();

    // Check whether token exists
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication token is required."
        });
    }

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Authentication token has expired. Please login again."
            });
        }

        return res.status(401).json({
            success: false,
            message: "Invalid authentication token."
        });
    }
}

module.exports = authenticate;