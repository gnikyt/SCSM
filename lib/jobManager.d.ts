import { Event } from './types/event';
import { Step } from './types/step';
import { IJob } from './interfaces/IJob';
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
