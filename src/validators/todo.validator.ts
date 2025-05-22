import { celebrate, Joi, Segments } from "celebrate";
import { ERROR_MESSAGES } from "../constants";

export const validateTodoCreate = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().required().messages({
      "string.empty": ERROR_MESSAGES.TITLE_EMPTY,
      "any.required": ERROR_MESSAGES.TITLE_REQUIRED,
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": ERROR_MESSAGES.DESCRIPTION_EMPTY,
      "any.required": ERROR_MESSAGES.DESCRIPTION_REQUIRED,
    }),
    dueDate: Joi.date().iso().required().messages({
      "date.base": ERROR_MESSAGES.INVALID_DUE_DATE,
      "any.required": ERROR_MESSAGES.DUE_DATE_REQUIRED,
    }),
  }),
});

export const validateTodoUpdate = celebrate({
  [Segments.BODY]: Joi.object({
    title: Joi.string().trim().optional().messages({
      "string.empty": ERROR_MESSAGES.TITLE_EMPTY,
    }),
    description: Joi.string().trim().optional().messages({
      "string.empty": ERROR_MESSAGES.DESCRIPTION_EMPTY,
    }),
    dueDate: Joi.date().iso().optional().messages({
      "date.base": ERROR_MESSAGES.INVALID_DUE_DATE,
    }),
    completed: Joi.boolean().optional(),
  }),
});
