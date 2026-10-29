import { CanDeactivateFn } from '@angular/router';

import type { NewTaskComponent } from './new-task.component';

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component,
) => {
  if (component.submitted) {
    return true;
  }
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data.',
    );
  }
  return true;
};
