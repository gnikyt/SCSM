import { JobManager } from './jobManager';
import { BaseJob } from './baseJob';
import { Event } from './types/event';
import { Step } from './types/step';

// Export to global space (for browser)
(global as any).SCSM = {
  JobManager,
  BaseJob,
  Event,
  Step,
};

// Node exports
module.exports = {
  JobManager,
  BaseJob,
  Event,
  Step,
};
