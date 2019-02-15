import { Event } from '../types/event';
import { Step } from '../types/step';
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
