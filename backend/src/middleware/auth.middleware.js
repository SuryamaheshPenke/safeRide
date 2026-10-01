const { verifyToken } = require("../utils/jwt");
const prisma = require("../config/prisma");

async function authenticate(req, res, next) {
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
        const decoded = verifyToken(token);

        // Verify that the user still exists and is active
        const user = await prisma.user.findUnique({
            where: {
                id: Number(decoded.id)
            },
            select: {
                id: true,
                email: true,
                status: true,
                roleId: true,
                companyId: true
            }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User account not found."
            });
        }

        if (user.status !== "ACTIVE") {
            return res.status(403).json({
                success: false,
                message: "Your account is not active."
            });
        }

        // Keep JWT identity information in req.user
        req.user = decoded;

        // Store current user information separately
        req.currentUser = user;

        next();

    } catch (error) {

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({
                success: false,
                message: "Authentication token has expired. Please login again."
            });
        }

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({
                success: false,
                message: "Invalid authentication token."
            });
        }

        console.error("Authentication error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

module.exports = authenticate;