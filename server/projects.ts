import prisma from '@/lib/prisma';
import { createProjectValidator } from '@/validators/projects';
import { protectedProcedure, router } from './trpc';

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
  });
});

export const projectsRouter = router({
  createProject,
  getProjects,
});
