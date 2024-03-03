import { object, string } from 'zod';

export const createProjectValidator = object({
  name: string().min(1, {
    message: 'Project name is required',
  }),
  description: string().min(1, {
    message: 'Project description is required',
  }),
});
