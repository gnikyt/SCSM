(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.SCSM = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Uppercase the first letter.
 * @param input The input string.
 */
var upperFirst = function (input) {
    return input.slice(0, 1).toUpperCase() + input.slice(1, input.length);
};
/**
 * Convert snake case to pascal case.
 * @param input The input string.
 */
var snakeToPascal = function (input) {
    return input.split('_').map(function (str) {
        return upperFirst(str.split('/')
            .map(upperFirst)
            .join('/'));
    }).join('');
};
/**
 * Types of events the jobs can attach to.
 */
var Event;
(function (Event) {
    Event["Load"] = "page:load";
    Event["Change"] = "page:change";
    Event["DomLoad"] = "DOMContentLoaded";
})(Event = exports.Event || (exports.Event = {}));
/**
 * Steps the jobs can listen for.
 */
var Step;
(function (Step) {
    Step["CustomerInformation"] = "customer_information";
    Step["ShippingMethod"] = "shipping_method";
    Step["PaymentMethod"] = "payment_method";
    Step["ThankYou"] = "thank_you";
})(Step = exports.Step || (exports.Step = {}));
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
            return step.indexOf(JobManager.currentStep) > -1;
        }
        return JobManager.currentStep === step;
    };
    return BaseJob;
}());
exports.BaseJob = BaseJob;
/**
 * Job manager for checkout.
 */
var JobManager = /** @class */ (function () {
    function JobManager() {
    }
    Object.defineProperty(JobManager, "currentStep", {
        /**
         * The current step of the checkout.
         */
        get: function () {
            var step;
            try {
                step = window.Shopify.Checkout.step || 'thank_you';
            }
            catch (_a) {
                step = 'thank_you';
            }
            var convertedStep = snakeToPascal(step);
            return Step[convertedStep];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(JobManager, "list", {
        /**
         * Return a list of jobs.
         */
        get: function () {
            return JobManager.jobs;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Clears all jobs.
     */
    JobManager.clear = function () {
        JobManager.jobs = [];
    };
    /**
     * Add a job to the list for execution.
     * @param job The job instance.
     */
    JobManager.add = function (job) {
        JobManager.jobs.push(job);
    };
    /**
     * Find and remove a job.
     * @param job The job to remove.
     */
    JobManager.remove = function (job) {
        // Find the matching job
        var index = JobManager.jobs.findIndex(function (existingJob) {
            return job.constructor.name === existingJob.constructor.name;
        });
        if (index === -1) {
            // No matches
            return false;
        }
        // Found, remove
        JobManager.jobs.splice(index, 1);
        return true;
    };
    /**
     * Execute the jobs.
     * @param event The addEventListener type.
     */
    JobManager.execute = function (event) {
        for (var _i = 0, _a = JobManager.jobs; _i < _a.length; _i++) {
            var job = _a[_i];
            if (job.events.indexOf(event) === -1) {
                // Job does not fall into this event, skip
                continue;
            }
            // Check if job steps matches
            if (job.steps.length === 0 || job.steps.indexOf(JobManager.currentStep) > -1) {
                job.run();
            }
        }
    };
    /**
     * The jobs array.
     */
    JobManager.jobs = [];
    return JobManager;
}());
exports.JobManager = JobManager;
// Exports
exports.default = {
    JobManager: JobManager,
    BaseJob: BaseJob,
    Step: Step,
    Event: Event
};

},{}]},{},[1])(1)
});
