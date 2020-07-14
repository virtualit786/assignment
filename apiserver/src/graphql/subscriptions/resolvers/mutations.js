import { models } from "../../../models/index.js";
import { mailSender } from "../../../utils";
import pubsub from "../../pubsub";
import { SUBSCRIPTION_PROCESSED } from "./subscriptions";
export default {
  async subscribe(obj, { email }) {
    const { Subscriptions } = models;
    try {
      const found = await Subscriptions.findOne({ where: { email } });
      if (found) {
        return {
          ok: false,
          subscription: found,
          error: {
            message: `The email '${email}' is already subscribed.`,
          },
        };
      }
      const newSubscription = Subscriptions.create({
        email,
        is_email_sent: false,
      });
      return {
        ok: true,
        subscription: newSubscription,
      };
    } catch (error) {
      console.error("subscribe error ", error);
      return {
        ok: false,
        error: {
          message: error,
        },
      };
    }
  },
  async sendSubscriptionEmails() {
    const { Subscriptions } = models;
    let failedMailsCount = 0;
    const successfull = [];
    const subscriptions = await Subscriptions.findAll({
      where: { is_email_sent: false },
    });
    if (subscriptions && subscriptions.length) {
      try {
        const allSubscriptionPromise = subscriptions.map((subscription) => {
          return mailSender(subscription.email);
        });
        const promiseResult = await Promise.all(allSubscriptionPromise);

        promiseResult.forEach((promiseResult) => {
          if (promiseResult.accepted.length)
            successfull.push(promiseResult.accepted[0]);
          if (promiseResult.rejected.length) failedMailsCount++;
        });
        await markSubscriptionProcessedEmails(successfull, Subscriptions);
        pubsub.publish(SUBSCRIPTION_PROCESSED, {
          subscriptionProcessed: successfull,
        });
        return {
          ok: true,
          successfull: successfull.length,
          failed: failedMailsCount,
        };
      } catch (error) {
        console.error("SubscriptionPromise failed with error ", error);
        return {
          ok: false,
          successfull: 0,
          failed: 0,
          error: { message: error },
        };
      }
    } else {
      return {
        ok: true,
        successfull: 0,
        failed: 0,
      };
    }
  },
};

const markSubscriptionProcessedEmails = async (successfull, Subscriptions) => {
  if (successfull.length) {
    Subscriptions.update(
      { is_email_sent: true },
      {
        where: {
          email: {
            [models.op.in]: successfull,
          },
        },
      }
    );
  }
};
