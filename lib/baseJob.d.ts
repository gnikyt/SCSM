import { Step } from './types/step';
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
