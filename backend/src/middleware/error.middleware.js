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

    const statusCode = err.statusCode || 500;

    return res.status(statusCode).json({

        success: false,

        message:
            statusCode === 500
                ? "Internal server error."
                : err.message

    });

};