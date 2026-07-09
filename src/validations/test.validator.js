
import Joi from "joi";

export const createTestSchema =
Joi.object({

    title:
        Joi.string()
        .required(),

    duration:
        Joi.number()
        .positive()
        .required()
});
