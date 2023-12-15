import Joi from 'joi';

export const postValidation = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    location: Joi.object(),
    status: Joi.boolean().required(),
});
