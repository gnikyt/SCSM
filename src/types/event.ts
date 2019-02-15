/**
 * Types of events the jobs can attach to.
 */
export enum Event {
  Load = 'page:load',
  Change = 'page:change',
  DomLoad = 'DOMContentLoaded',
}

export declare type EventType = keyof typeof Event;
