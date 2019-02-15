"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jobManager_1 = require("./jobManager");
var baseJob_1 = require("./baseJob");
var event_1 = require("./types/event");
var step_1 = require("./types/step");
// Export to global space (for browser)
global.SCSM = {
    JobManager: jobManager_1.JobManager,
    BaseJob: baseJob_1.BaseJob,
    Event: event_1.Event,
    Step: step_1.Step,
};
