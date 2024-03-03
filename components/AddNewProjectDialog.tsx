'use client';

import { trpc } from '@/app/api/_trpc/client';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createProjectValidator } from '@/validators/projects';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const AppNewProjectDialog = ({
  show,
  setShow,
  refetchProjects,
}: {
  show: boolean;
  setShow: (show: boolean) => void;
  refetchProjects: () => void;
}) => {
  const { mutate: createProject, error } =
    trpc.project.createProject.useMutation({
      onSettled: () => {
        refetchProjects();
      },
    });

  const form = useForm<z.infer<typeof createProjectValidator>>({
    resolver: zodResolver(createProjectValidator),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  return (
    <Dialog onOpenChange={setShow} open={show}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new project</DialogTitle>
          <DialogDescription>Create a new project</DialogDescription>
        </DialogHeader>
        <div>
          {error && (
            <div className="bg-red-100 text-red-900 p-4 rounded-lg mt-4 mb-4">
              {error.message}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(async (v) => {
                await createProject(v);
                form.reset();
                setShow(false);
              })}
              className="space-y-3"
            >
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project name</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'name'}
              />
              <FormField
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Your project description"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
                name={'description'}
              />
              <div className="flex justify-end">
                <Button type="submit" className="mt-6">
                  Create project
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AppNewProjectDialog;
