# Shopify Checkout Scripts Manager

Helper manager to process Javascript-based changes to Shopify Plus checkout.

Written in TypeScript with exports to plain Javascript and Browser (through Browserify).

## Installation

### Node

`npm i --save scsm`

### Browser

See `dist/scsm(.min).js`

## Usage

Add a script to your `layouts/checkout.liquid` file.

### TypeScript (Node)

```javascript
# TS version...
# checkout.ts

import { JobManager } from 'scsm/Jobmanager';
import { BaseJob } from 'scsm/BaseJob';
import { IJob } from 'scsm/interfaces/IJob';
import { Step } from 'scsm/types/step';
import { Event } from 'scsm/types/event';

// Example basic hello class
class Hello extends BaseJob implements IJob {
  // Fire only on payment method page and shipping method page
  public steps = [Step.PaymentMethod, Step.ShippingMethod];

  // Fire only for DOMContentLoaded
  public events = [Event.DomLoad];

  // Run your code...
  run(): void {
    alert('Hello!');
  }
}

// Add the job
JobManager.add(new Hello());

// Fire all jobs tired to DOMContentLoaded
JobManager.execute(Event.DomLoaded);

// Fire all jobs tired to page:change
JobManager.execute(Event.PageChange);

// Fire all jobs tired to page:load
JobManager.execute(Event.PageLoad);
```

### Javascript (Node)

```javascript
# JS version...
# checkout.js

import { JobManager } from 'scsm/Jobmanager';
import { BaseJob } from 'scsm/BaseJob';
import { Step } from 'scsm/types/step';
import { Event } from 'scsm/types/event';

// Example basic hello class
class Hello extends BaseJob {
  constructor() {
    // Fire only on payment method page and shipping method page
    this.steps = [Step.PaymentMethod, Step.ShippingMethod];

    // Fire only for DOMContentLoaded
    this.events = [Event.DomLoad];
  }

  // Run your code...
  run() {
    alert('Hello!');
  }
}

// Add the job
JobManager.add(new Hello());

// Fire all jobs tired to DOMContentLoaded
JobManager.execute(Event.DomLoaded);

// Fire all jobs tired to page:change
JobManager.execute(Event.PageChange);

// Fire all jobs tired to page:load
JobManager.execute(Event.PageLoad);
```

### Javascript (Browser)

```html
<!-- layouts/checkout.liquid -->
<!-- save scsm.min.js to assets/ -->
{{ 'scsm.min.js' | asset_url | script_url }}

<script>
  function Hello(type) {
    // Fire only on payment method page and shipping method page
    this.steps = [SCSM.Step.PaymentMethod, SCSM.Step.ShippingMethod];

    // Fire only for DOMContentLoaded
    this.events = [SCSM.Event.DomLoad];
  }
  
  Apple.prototype.run = function() {
    alert('Hello!');
  };

  // Add the job
  SCSM.JobManager.add(new Hello());

  // Fire all jobs tired to DOMContentLoaded
  SCSM.JobManager.execute(Event.DomLoaded);

  // Fire all jobs tired to page:change
  SCSM.JobManager.execute(Event.PageChange);

  // Fire all jobs tired to page:load
  SCSM.JobManager.execute(Event.PageLoad);
</script>
```

## Development

Code is written in TypeScript based in `src` directory.

`npm run build` will convert the TypeScript code to Javascript and place output into `lib` directory.

## Packaging

`npm prepare` will compile the TypeScript, run Babelify and Browserify.

This will output TypeScript compile to `lib` directory.
This will output minfied browser compatible Javascript to `dist` directory.

## Testing

`npm test` through Jest. See `src/__tests__`.

## LICENSE

Released under the MIT License.
