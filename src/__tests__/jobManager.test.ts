import { JobManager } from '../jobManager';
import { IJob } from '../interfaces/IJob';
import { BaseJob } from '../baseJob';
import { Step } from '../types/step';
import { Event } from '../types/event';

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

  test('Lists jobs', () => {
    expect(JobManager.list.length).toBe(0);
  });

  test('Clears jobs', () => {
    JobManager.add(new TestJob());
    JobManager.clear();

    expect(JobManager.list.length).toBe(0);
  });

  test('Runs jobs', () => {
    (window as any).Shopify = { Checkout: { step: 'payment_method' } };

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.DomLoad);

    expect(job.run).toBeCalledTimes(1);
  });

  test('Doesnt run jobs not matching step', () => {
    (window as any).Shopify = { Checkout: { step: 'thank_you' } };

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.DomLoad);

    expect(job.run).toBeCalledTimes(0);
  });

  test('Doesnt run jobs not matching event', () => {
    (window as any).Shopify = { Checkout: { step: 'payment_method' } };

    const job = new TestJob();
    const spy = jest.spyOn(job, 'run');

    JobManager.add(job);
    JobManager.execute(Event.Change);

    expect(job.run).toBeCalledTimes(0);
  });
});
