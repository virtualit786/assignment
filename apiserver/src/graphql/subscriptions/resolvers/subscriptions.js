import pubsub from "../../pubsub";

export const SUBSCRIPTION_PROCESSED = "SUBSCRIPTION_PROCESSED";

const subscriptions = {
  subscriptionProcessed: {
    subscribe: () => pubsub.asyncIterator([SUBSCRIPTION_PROCESSED]),
  },
};

export default subscriptions;
