import chalk from "chalk";
import { apolloClient, SEND_SUBSCRIPTION_EMAILS_MUTATION } from "../graphql";

(async () => {
  const log = console.log;
  try {
    const response = await apolloClient.mutate({
      mutation: SEND_SUBSCRIPTION_EMAILS_MUTATION,
    });
    const sendSubscriptionEmails = response.data.sendSubscriptionEmails;
    if (sendSubscriptionEmails.ok) {
      log(`Subscription processor completed ${chalk.green("successfully")}`);
      log(
        `${chalk.green(
          sendSubscriptionEmails.successfull
        )} Subscription emails  ${chalk.green("successfully")} sent `
      );
      log(
        `${chalk.red(
          sendSubscriptionEmails.failed
        )} Subscription emails ${chalk.red("failed")} to be sent`
      );
    } else {
      log(chalk.red("There were no outstanding Subscriptions to process"));
    }
  } catch (error) {
    log(`Subscription emails failed with error: \n ${chalk.red(error)}`);
  }
})();
