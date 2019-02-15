import { Event, EventType } from './types/event';
import { Step, StepType } from './types/step';
import { IJob } from './interfaces/IJob';

/**
 * Uppercase the first letter.
 * @param input The input string.
 */
const upperFirst = (input: string): string => {
  return input.slice(0, 1).toUpperCase() + input.slice(1, input.length);
};

/**
 * Convert snake case to pascal case.
 * @param input The input string.
 */
const snakeToPascal = (input: string): string => {
  return input.split('_').map((str) => {
    return upperFirst(
      str.split('/')
      .map(upperFirst)
      .join('/'));
  }).join('');
};

/**
 * Job manager for checkout.
 */
export class JobManager {
  /**
   * The jobs array.
   */
  private static jobs: IJob[] = [];

  /**
   * The current step of the checkout.
   */
  static get currentStep(): Step {
    let step: string;
    try {
      step = (window as any).Shopify.Checkout.step || 'thank_you';
    } catch {
      step = 'thank_you';
    }

    const convertedStep: string = snakeToPascal(step);

    return Step[convertedStep as StepType];
  }

  /**
   * Return a list of jobs.
   */
  static get list(): IJob[] {
    return JobManager.jobs;
  }

  /**
   * Clears all jobs.
   */
  static clear(): void {
    JobManager.jobs = [];
  }

  /**
   * Add a job to the list for execution.
   * @param job The job instance.
   */
  static add(job: IJob): void {
    JobManager.jobs.push(job);
  }

  /**
   * Find and remove a job.
   * @param job The job to remove.
   */
  static remove(job: IJob): boolean {
    // Find the matching job
    const index = JobManager.jobs.findIndex(existingJob => typeof job === (typeof existingJob));
    if (index === -1) {
      // No matches
      return false;
    }

    // Found, remove
    JobManager.jobs.splice(index, 1);
    return true;
  }

  /**
   * Execute the jobs.
   * @param event The addEventListener type.
   */
  static execute(event: Event): void {
    for (const job of JobManager.jobs) {
      if (job.events.indexOf(event) === -1) {
        // Job does not fall into this event, skip
        continue;
      }

      // Check if job steps matches
      if (job.steps.length === 0 || job.steps.indexOf(JobManager.currentStep) > -1) {
        job.run();
      }
    }
  }
}
