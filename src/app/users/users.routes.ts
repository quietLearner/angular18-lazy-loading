import { Routes } from '@angular/router';

import { resolveUserTasks } from '../tasks/tasks.resolver';
import { canLeaveEditPage } from '../tasks/new-task/can-leave-edit-page.guard';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { TasksService } from '../tasks/tasks.service';

//No. Since users.routes.ts is already loaded lazily through loadChildren, you dont have to use loadComponent:

export const routes: Routes = [
  {
    path: '',
    providers: [TasksService], // root is remvoed, The resolver and task components now share the route-provided instance
    children: [
      {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full',
      },
      {
        path: 'tasks', // <your-domain>/users/<uid>/tasks
        loadComponent: () =>
          import('../tasks/tasks.component').then((m) => m.TasksComponent),
        runGuardsAndResolvers: 'always',
        resolve: {
          userTasks: resolveUserTasks,
        },
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveEditPage],
      },
    ],
  },
];
