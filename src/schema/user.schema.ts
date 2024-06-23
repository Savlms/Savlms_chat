import joi from 'joi'

const createUserSchema = joi.object({
    username:  joi.string().required().lowercase().trim(),
    password: joi.string().required().min(7),
    role: joi.string().optional().lowercase().trim()
});

const editUserSchema = joi.object({
    username:  joi.string().required().lowercase().trim(),
    password: joi.string().required().min(7),
    role: joi.string().optional().lowercase().trim()
});

export {createUserSchema, editUserSchema};
