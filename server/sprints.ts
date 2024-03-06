import prisma from '@/lib/prisma';
import { createSprintValidator } from '@/validators/sprints';
import { TRPCError } from '@trpc/server';
import { object, string } from 'zod';
import { protectedProcedure, router } from './trpc';

const getAllSprints = protectedProcedure
  .input(string())
  .query(async ({ ctx, input }) => {
    return await prisma.sprint.findMany({
      where: {
        belongsTo: {
          id: input,
          belongsTo: {
            clerkId: ctx.clerk_id,
          },
        },
      },
    });
  });

const createSprint = protectedProcedure
  .input(
    object({
      project_id: string(),
      sprint_info: createSprintValidator,
    })
  )
  .mutation(async ({ input, ctx }) => {
    console.log(input);

    const project = await prisma.project.findFirst({
      where: {
        id: input.project_id,
        belongsTo: {
          clerkId: ctx.clerk_id,
        },
      },
    });

    if (!project) {
      throw new TRPCError({
        message: 'Project not found',
        code: 'BAD_REQUEST',
      });
    }

    await prisma.sprint.create({
      data: {
        name: input.sprint_info.name,
        start_date: input.sprint_info.range.from,
        end_date: input.sprint_info.range.to,
        belongsTo: {
          connect: {
            id: input.project_id,
          },
        },
      },
    });

    return true;
  });

export const sprintsRouter = router({
  createSprint,
  getAllSprints,
});
