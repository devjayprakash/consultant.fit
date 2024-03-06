import prisma from '@/lib/prisma';
import { createProjectValidator } from '@/validators/projects';
import { object, string } from 'zod';
import { protectedProcedure, router } from './trpc';

const getProjectDetails = protectedProcedure
  .input(string())
  .query(async (args) => {
    return await prisma.project.findFirst({
      where: {
        id: args.input,
        belongsTo: {
          clerkId: args.ctx.clerk_id,
        },
      },
      select: {
        name: true,
        description: true,
      },
    });
  });

const createProject = protectedProcedure
  .input(createProjectValidator)
  .mutation(async (args) => {
    await prisma.project.create({
      data: {
        name: args.input.name,
        description: args.input.description,
        belongsTo: {
          connect: {
            clerkId: args.ctx.clerk_id,
          },
        },
      },
    });
    return true;
  });

const getProjects = protectedProcedure.query((args) => {
  return prisma.project.findMany({
    where: {
      belongsTo: {
        clerkId: args.ctx.clerk_id,
      },
    },
    select: {
      id: true,
      name: true,
      description: true,
    },
    orderBy: {
      created_at: 'desc',
    },
  });
});

const createTaskStatus = protectedProcedure
  .input(
    object({
      task_name: string(),
      project_id: string(),
    })
  )
  .mutation(async ({ input, ctx }) => {
    await prisma.taskStatus.create({
      data: {
        name: input.task_name,
        belongsTo: {
          connect: {
            id: input.project_id,
            belongsTo: {
              clerkId: ctx.clerk_id,
            },
          },
        },
      },
    });
    return true;
  });

const getAllTasksStatues = protectedProcedure
  .input(string())
  .query(async (args) => {
    return await prisma.taskStatus.findMany({
      where: {
        belongsTo: {
          id: args.input,
          belongsTo: {
            clerkId: args.ctx.clerk_id,
          },
        },
      },
    });
  });

export const projectsRouter = router({
  createProject,
  getProjects,
  getProjectDetails,
  createTaskStatus,
  getAllTasksStatues,
});
