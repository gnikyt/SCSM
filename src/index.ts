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
 * Types of events the jobs can attach to.
 */
export enum Event {
  Load = 'page:load',
  Change = 'page:change',
  DomLoad = 'DOMContentLoaded',
}

export declare type EventType = keyof typeof Event;

/**
 * Steps the jobs can listen for.
 */
export enum Step {
  CustomerInformation = 'customer_information',
  ShippingMethod = 'shipping_method',
  PaymentMethod = 'payment_method',
  ThankYou = 'thank_you',
}

export declare type StepType = keyof typeof Step;

/**
 * Base job interface.
 */
export interface IJob {
  /**
   * Steps the job to listen for.
   */
  steps: Step[];

  /**
   * Steps the events to attach to.
   */
  events: Event[];

  /**
   * Run the code if steps/events matches.
   */
  run(): void;
}

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
    const index = JobManager.jobs.findIndex((existingJob) => {
      return job.constructor.name === existingJob.constructor.name;
    });
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

// Exports
export default {
  JobManager,
  BaseJob,
  Step,
  Event
};
