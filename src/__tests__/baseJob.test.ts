import { BaseJob, Step } from '../';

class TestJob3 extends BaseJob { }

const setStep = (step: string) => {
  (window as any).Shopify = { Checkout: { step } };
};

describe('BaseJob', () => {
  test('isStep', () => {
    // None
    const value = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value).toBe(false);

    // Single
    setStep('shipping_method');
    const value2 = (new TestJob3()).isStep(Step.ShippingMethod);
    expect(value2).toBe(true);

    // Array
    setStep('shipping_method');
    const value3 = (new TestJob3()).isStep([Step.ShippingMethod]);
    expect(value2).toBe(true);
  });
});
