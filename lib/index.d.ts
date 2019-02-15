/**
 * Types of events the jobs can attach to.
 */
export declare enum Event {
    Load = "page:load",
    Change = "page:change",
    DomLoad = "DOMContentLoaded"
}
export declare type EventType = keyof typeof Event;
/**
 * Steps the jobs can listen for.
 */
export declare enum Step {
    CustomerInformation = "customer_information",
    ShippingMethod = "shipping_method",
    PaymentMethod = "payment_method",
    ThankYou = "thank_you"
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
export declare class BaseJob {
    /**
     * Checks if the step is active.
     * @param step The step to check.
     */
    isStep(step: Step | Step[]): boolean;
}
/**
 * Job manager for checkout.
 */
export declare class JobManager {
    /**
     * The jobs array.
     */
    private static jobs;
    /**
     * The current step of the checkout.
     */
    static readonly currentStep: Step;
    /**
     * Return a list of jobs.
     */
    static readonly list: IJob[];
    /**
     * Clears all jobs.
     */
    static clear(): void;
    /**
     * Add a job to the list for execution.
     * @param job The job instance.
     */
    static add(job: IJob): void;
    /**
     * Find and remove a job.
     * @param job The job to remove.
     */
    static remove(job: IJob): boolean;
    /**
     * Execute the jobs.
     * @param event The addEventListener type.
     */
    static execute(event: Event): void;
}
