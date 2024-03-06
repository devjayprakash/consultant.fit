import { date, object, string } from 'zod';

export const createSprintValidator = object({
  name: string().min(1, {
    message: 'Sprint name is required',
  }),
  range: object({
    from: date(),
    to: date(),
  }),
});
