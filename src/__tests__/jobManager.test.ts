import { JobManager, IJob, BaseJob, Step, Event } from '../';

class TestJob extends BaseJob implements IJob {
  public steps = [Step.PaymentMethod, Step.ShippingMethod];
  public events = [Event.DomLoad];

  run(): void { }
}

class TestJob2 extends BaseJob implements IJob {
  public steps = [Step.PaymentMethod, Step.ShippingMethod];
  public events = [Event.DomLoad];

  run(): void { }
}

const setStep = (step: string) => {
  (window as any).Shopify = { Checkout: { step } };
};

beforeEach(() => {
  // Clear current step
  (window as any).Shopify = { Checkout: { } };

  // Clear all jobs
  JobManager.clear();
});

describe('JobManager', () => {
  test('Adds jobs', () => {
    JobManager.add(new TestJob());

    expect(JobManager.list.length).toBe(1);
  });

  test('Removes jobs', () => {
    const job = new TestJob();
    const job2 = new TestJob2();

    JobManager.add(job);
    JobManager.add(job2);
    expect(JobManager.list.length).toBe(2);

    JobManager.remove(job);
    expect(JobManager.list.length).toBe(1);

    expect((JobManager.list[0] as any).constructor.name).toBe('TestJob2');
  });

  test('Does not remove jobs', () => {
    const job = new TestJob();
    const job2 = new TestJob2();

    JobManager.add(job);
    expect(JobManager.list.length).toBe(1);

    JobManager.remove(job2);
    expect(JobManager.list.length).toBe(1);

    expect((JobManager.list[0] as any).constructor.name).toBe('TestJob');
  });

  test('Lists jobs', () => {
    expect(JobManager.list.length).toBe(0);
  });

  test('Clears jobs', () => {
    JobManager.add(new TestJob());
    JobManager.clear();

    expect(JobManager.list.length).toBe(0);
  });

  test('Runs jobs', () => {
    setStep('payment_method');

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.DomLoad);

    expect(job.run).toBeCalledTimes(1);
  });

  test('Doesnt run jobs not matching step', () => {
    setStep('thank_you');

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.DomLoad);

    expect(job.run).toBeCalledTimes(0);
  });

  test('Doesnt run jobs not matching event', () => {
    setStep('payment_method');

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.Change);

    expect(job.run).toBeCalledTimes(0);
  });

  test('Fallback for current step', () => {
    (window as any).Shopify = undefined;
    expect(JobManager.currentStep).toBe('thank_you');

    (window as any).Shopify = { Checkout: { } };
    expect(JobManager.currentStep).toBe('thank_you');
  });
});
