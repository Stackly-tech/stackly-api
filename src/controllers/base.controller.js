// base.controller.js

export class BaseController {

    ok(res, data = null, message = "Success") {
        return res.status(200).json({
            success: true,
            message,
            data
        });
    }

    created(res, data = null, message = "Created Successfully") {
        return res.status(201).json({
            success: true,
            message,
            data
        });
    }

    accepted(res, data = null, message = "Accepted") {
        return res.status(202).json({
            success: true,
            message,
            data
        });
    }

    noContent(res) {
        return res.status(204).send();
    }

    badRequest(res, message = "Bad Request") {
        return res.status(400).json({
            success: false,
            message
        });
    }

    unauthorized(res, message = "Unauthorized") {
        return res.status(401).json({
            success: false,
            message
        });
    }

    forbidden(res, message = "Forbidden") {
        return res.status(403).json({
            success: false,
            message
        });
    }

    notFound(res, message = "Resource Not Found") {
        return res.status(404).json({
            success: false,
            message
        });
    }

    conflict(res, message = "Resource Conflict") {
        return res.status(409).json({
            success: false,
            message
        });
    }

    unprocessable(res, message = "Validation Failed") {
        return res.status(422).json({
            success: false,
            message
        });
    }

    internalError(res, message = "Internal Server Error") {
        return res.status(500).json({
            success: false,
            message
        });
    }
}