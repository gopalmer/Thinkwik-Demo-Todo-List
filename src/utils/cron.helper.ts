import cron from "node-cron";
import { cronService } from "../services";
import { APP_CONSTANTS } from "../constants";

export const setupCronJobs = (): void => {
  // Schedule CRON job to run at midnight every day
  cron.schedule(APP_CONSTANTS.CRON_MIDNIGHT, async () => {
    console.log("Running CRON job to update expired todos");
    try {
      const result = await cronService.runExpiredTodosUpdate();
      console.log(`Updated ${result} expired todos`);
    } catch (error) {
      console.error("Error in CRON job:", error);
    }
  });

  console.log("CRON jobs scheduled successfully");
};
