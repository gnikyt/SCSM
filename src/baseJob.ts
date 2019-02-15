import { JobManager } from './jobManager';
import { Step } from './types/step';

/**
 * Base abstract job class.
 */
export class BaseJob {
  /**
   * Checks if the step is active.
   * @param step The step to check.
   */
  isStep(step: Step | Step[]): boolean {
    if (step.constructor === Array) {
      return step.indexOf(JobManager.currentStep) > -1;
    }

    return JobManager.currentStep === step;
  }
}
