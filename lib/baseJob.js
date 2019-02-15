"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jobManager_1 = require("./jobManager");
/**
 * Base abstract job class.
 */
var BaseJob = /** @class */ (function () {
    function BaseJob() {
    }
    /**
     * Checks if the step is active.
     * @param step The step to check.
     */
    BaseJob.prototype.isStep = function (step) {
        if (step.constructor === Array) {
            return step.indexOf(jobManager_1.JobManager.currentStep) > -1;
        }
        return jobManager_1.JobManager.currentStep === step;
    };
    return BaseJob;
}());
exports.BaseJob = BaseJob;
