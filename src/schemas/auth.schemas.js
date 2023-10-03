import Joi from "joi";

export const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().required(),
    cpf: Joi.string().pattern(/^\d{11}$/).required(),
    phone: Joi.string().min(11).max(11).required()
})
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})