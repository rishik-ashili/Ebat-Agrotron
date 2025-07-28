
'use client';

import { Button } from '@/components/ui/button';
import {
  CameraIcon,
  HouseIcon,
  ListBulletsIcon,
  MapTrifoldIcon,
  PlantIcon,
  PresentationChartIcon,
  UserIcon,
} from '@/components/icons';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { CheckCircle, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

type Task = {
  id: number;
  task_name: string;
  field: string;
  is_done: boolean;
};

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const router = useRouter();
  const { toast } = useToast();

  const fetchUserAndTasks = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push('/');
    } else {
      setUser(user);
      const { data: tasksData, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('is_done', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        toast({ variant: 'destructive', title: 'Error fetching tasks', description: error.message });
      } else {
        setTasks(tasksData);
      }
    }
  }, [router, toast]);


  useEffect(() => {
    fetchUserAndTasks();
  }, [fetchUserAndTasks]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const getFirstName = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.split(' ')[0];
    }
    if (user?.email) {
      const emailName = user.email.split('@')[0];
      return emailName.charAt(0).toUpperCase() + emailName.slice(1);
    }
    return 'User';
  };

  const handleUpdateTask = async (taskId: number, isDone: boolean) => {
    const { error } = await supabase.from('tasks').update({ is_done: isDone }).eq('id', taskId);
    if (error) {
      toast({ variant: 'destructive', title: 'Error updating task', description: error.message });
    } else {
      fetchUserAndTasks(); // Refresh tasks
      toast({ title: `Task marked as ${isDone ? 'done' : 'pending'}` });
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    const { error } = await supabase.from('tasks').delete().eq('id', taskId);
    if (error) {
      toast({ variant: 'destructive', title: 'Error deleting task', description: error.message });
    } else {
      fetchUserAndTasks(); // Refresh tasks
      toast({ title: 'Task deleted successfully' });
    }
  };

  return (
    <div className="relative mx-auto flex size-full min-h-screen max-w-sm flex-col justify-between bg-background font-body text-foreground">
      <div>
        <header className="flex items-center justify-between bg-background p-4 pb-2">
          <h2 className="flex-1 text-lg font-bold tracking-tight text-foreground">
            Good Morning, {getFirstName()}!
          </h2>
          <AlertDialog>
             <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-12 w-12 text-foreground">
                    <ListBulletsIcon className="h-6 w-6" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

        </header>
        <p className="px-4 pb-3 pt-1 text-sm font-normal leading-normal text-muted-foreground">
          Sunny, 24°C
        </p>

        <main className="space-y-4 px-4">
          <div className="flex items-stretch justify-between gap-4 rounded-lg bg-card p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div className="flex flex-[2_2_0px] flex-col gap-1">
              <p className="text-sm font-normal leading-normal text-muted-foreground">
                Urgent
              </p>
              <p className="text-base font-bold leading-tight text-foreground">
                High Pest Alert in Field B
              </p>
              <p className="text-sm font-normal leading-normal text-muted-foreground">
                Take action to prevent crop damage.
              </p>
            </div>
            <div className="relative flex-1">
              <Image
                src="https://placehold.co/100x75.png"
                alt="pest alert"
                data-ai-hint="field pests"
                width={100}
                height={75}
                className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat object-cover"
              />
            </div>
          </div>
          <div className="flex items-stretch justify-between gap-4 rounded-lg bg-card p-4 shadow-[0_0_4px_rgba(0,0,0,0.1)]">
            <div className="flex flex-[2_2_0px] flex-col gap-1">
              <p className="text-base font-bold leading-tight text-foreground">
                Overall Farm Health: 85% (Good)
              </p>
              <p className="text-sm font-normal leading-normal text-muted-foreground">
                Keep up the great work!
              </p>
            </div>
            <div className="relative flex-1">
              <Image
                src="https://placehold.co/100x75.png"
                data-ai-hint="healthy vegetables"
                alt="farm health"
                width={100}
                height={75}
                className="aspect-video w-full rounded-lg bg-cover bg-center bg-no-repeat object-cover"
              />
            </div>
          </div>
        </main>

        <div className="flex flex-wrap justify-between gap-3 px-4 py-3">
          <Button className="min-w-[84px] flex-1 text-sm font-bold">
            Scan for Disease
          </Button>
          <Button
            variant="secondary"
            className="min-w-[84px] flex-1 text-sm font-bold"
          >
            View Health Map
          </Button>
        </div>
        <div className="px-4 py-3">
          <Button asChild variant="secondary" className="w-full text-sm font-bold">
            <Link href="/create-task">Create Task</Link>
          </Button>
        </div>

        <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold tracking-tight text-foreground">
          Upcoming Tasks
        </h2>
        <div className="space-y-2 px-4">
           {tasks.length > 0 ? (
            tasks.map((task) => (
              <AlertDialog key={task.id} onOpenChange={(open) => !open && setSelectedTask(null)}>
                <AlertDialogTrigger asChild onClick={() => setSelectedTask(task)}>
                  <div className={cn(
                      "flex min-h-[72px] items-center gap-4 rounded-lg bg-card py-2 px-4 cursor-pointer transition-colors hover:bg-accent",
                      task.is_done && "opacity-60"
                    )}>
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-secondary text-foreground">
                      <PlantIcon className="h-6 w-6" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className={cn("line-clamp-1 text-base font-medium leading-normal text-foreground", task.is_done && "line-through")}>
                        {task.task_name}
                      </p>
                      <p className="line-clamp-2 text-sm font-normal leading-normal text-muted-foreground">
                        {task.field}
                      </p>
                    </div>
                  </div>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{selectedTask?.task_name}</AlertDialogTitle>
                    <AlertDialogDescription>
                       What would you like to do with this task?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                     <AlertDialogAction
                      onClick={() => handleUpdateTask(selectedTask!.id, !selectedTask!.is_done)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>{selectedTask?.is_done ? 'Mark as Pending' : 'Mark as Done'}</span>
                    </AlertDialogAction>
                    <AlertDialogAction
                      variant="destructive"
                      onClick={() => handleDeleteTask(selectedTask!.id)}
                      className="flex items-center gap-2"
                    >
                       <Trash2 className="h-4 w-4" />
                      <span>Delete Task</span>
                    </AlertDialogAction>
                     <AlertDialogCancel className="col-span-full">Cancel</AlertDialogCancel>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            ))
          ) : (
             <div className="text-center text-muted-foreground py-8">
                <p>No tasks yet.</p>
                <p>Click "Create Task" to get started.</p>
            </div>
          )}
        </div>
      </div>

      <footer className="sticky bottom-0 mt-8 bg-background">
        <div className="flex gap-2 border-t border-border px-4 pb-3 pt-2">
          <Link
            href="/dashboard"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-primary"
          >
            <div className="flex h-8 items-center justify-center">
              <HouseIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Dashboard</p>
          </Link>
          <Link
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <MapTrifoldIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">My Farm</p>
          </Link>
          <Link
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <CameraIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Scan</p>
          </Link>
          <Link
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <PresentationChartIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Reports</p>
          </Link>
          <Link
            href="#"
            className="flex flex-1 flex-col items-center justify-end gap-1 text-muted-foreground"
          >
            <div className="flex h-8 items-center justify-center">
              <UserIcon className="h-6 w-6" />
            </div>
            <p className="text-xs font-medium">Profile</p>
          </Link>
        </div>
        <div className="h-5 bg-background"></div>
      </footer>
    </div>
  );
}
