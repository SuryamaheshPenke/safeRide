module.exports = (err, req, res, next) => {
    console.error("ERROR:", err);

    // Malformed JSON
    if (err.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request body."
        });
    }

    // Request body too large
    if (err.type === "entity.too.large") {
        return res.status(413).json({
            success: false,
            message: "Request body is too large."
        });
    }

    // Prisma foreign key constraint error
    if (err.code === "P2003") {
        return res.status(409).json({
            success: false,
            message: "Operation failed because related records exist."
        });
    }

    // Prisma record not found error
    if (err.code === "P2025") {
        return res.status(404).json({
            success: false,
            message: "Requested record was not found."
        });
    }

    const statusCode = err.statusCode || 500;

    // Never expose internal error details for server errors
    if (statusCode >= 500) {
        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }

    return res.status(statusCode).json({
        success: false,
        message: err.message || "Request failed."
    });
};