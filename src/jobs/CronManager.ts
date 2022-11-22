import { CronJob } from 'cron';
import Container from 'typedi';
import { IJob } from './IJob';
import { OrderExpiryJob } from './OrderExpiryJob';

export class JobManager {
  private readonly cron: CronJob;

  private jobs: IJob[];

  constructor() {
    this.jobs = [
      Container.get(OrderExpiryJob),
      // Adding more jobs here
    ];
  }

  run() {
    this.jobs.forEach((job) => {
      const cron = new CronJob(job.jobTime, async () => {
        try {
          job.execute();
        } catch (e) {
          console.log(`CRON JOB ERROR: ${e} | ${JSON.stringify(e)}`);
        }
      });

      if (cron.running != null || cron.running !== false) cron.start();
    });
  }
}
