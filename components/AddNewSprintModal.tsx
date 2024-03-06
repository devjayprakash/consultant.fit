'use client';

import { trpc } from '@/app/api/_trpc/client';
import { createSprintValidator } from '@/validators/sprints';
import { zodResolver } from '@hookform/resolvers/zod';
import { addDays } from 'date-fns';
import { useForm } from 'react-hook-form';
import { DatePickerWithRange } from './DateRangePicker';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';

function AddNewSprintModal({
  project_id,
  open,
  setOpen,
  onSprintAdded,
}: {
  project_id: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  onSprintAdded: () => void;
}) {
  const { mutate: createSprint, error: createSprintError } =
    trpc.sprints.createSprint.useMutation({
      onSettled: () => {
        onSprintAdded();
        setOpen(false);
      },
    });

  const form = useForm({
    resolver: zodResolver(createSprintValidator),
    defaultValues: {
      name: '',
      range: {
        from: new Date(),
        to: addDays(new Date(), 20),
      },
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new sprint</DialogTitle>
          <DialogDescription>
            Sprints are used to organize your project into smaller, more
            manageable chunks.
          </DialogDescription>
          <div className="mt-2">
            {createSprintError && (
              <div className="bg-red-100 text-red-900 p-4 rounded-lg mt-4 mb-4">
                {createSprintError.message}
              </div>
            )}
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(async (values) => {
                  await createSprint({
                    project_id,
                    sprint_info: values,
                  });
                })}
                className="space-y-3"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="range"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select duration</FormLabel>
                      <FormControl>
                        <DatePickerWithRange
                          onChange={field.onChange}
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end pt-4">
                  <Button>Create sprint</Button>
                </div>
              </form>
            </Form>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewSprintModal;
