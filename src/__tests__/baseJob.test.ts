import { BaseJob } from '../baseJob';
import { Step } from '../types/step';

class TestJob3 extends BaseJob { }

describe('BaseJob', () => {
  test('isStep', () => {
    const value = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value).toBe(false);

    (window as any).Shopify = { Checkout: { step: 'shipping_method' } };
    const value2 = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value2).toBe(true);
  });
});
