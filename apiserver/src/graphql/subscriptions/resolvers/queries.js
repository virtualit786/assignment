import { models } from "../../../models/index.js";

export default {
  async processedSubscriptions() {
    const { Subscriptions } = models;
    const subscriptions = await Subscriptions.findAll({
      where: { is_email_sent: true },
    });
    return subscriptions;
  },

  async unprocessedSubscriptions() {
    const { Subscriptions } = models;
    const subscriptions = await Subscriptions.findAll({
      where: { is_email_sent: false },
    });
    return subscriptions;
  },
};
