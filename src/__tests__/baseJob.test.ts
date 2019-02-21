import { BaseJob, Step } from '../';

class TestJob3 extends BaseJob { }

describe('BaseJob', () => {
  test('isStep', () => {
    // None
    const value = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value).toBe(false);

    // Single
    (window as any).Shopify = { Checkout: { step: 'shipping_method' } };
    const value2 = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value2).toBe(true);

    // Array
    (window as any).Shopify = { Checkout: { step: 'shipping_method' } };
    const value3 = (new TestJob3()).isStep([Step.ShippingMethod]);
    expect(value2).toBe(true);
  });
});
