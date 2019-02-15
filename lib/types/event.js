"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Types of events the jobs can attach to.
 */
var Event;
(function (Event) {
    Event["Load"] = "page:load";
    Event["Change"] = "page:change";
    Event["DomLoad"] = "DOMContentLoaded";
})(Event = exports.Event || (exports.Event = {}));
