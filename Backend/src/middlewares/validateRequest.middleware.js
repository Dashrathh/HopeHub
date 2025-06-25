import { ZodError } from 'zod'
import { ApiError } from "../utils/ApiError.js";

export function validateRequest(schema) {

    return function (req, res, next) {

        try {
            schema.parse({
                ...req.body,
                ...req.files,
            });

            next()
        } catch (error) {

            if (error instanceof ZodError) {
                const resError = error.errors.map((e) => e.message);
                return res.status(422).json(new ApiError(409, "Invalid data", resError))
            }

            next(error);
        }
    }
}
