import gql from "graphql-tag";
const SEND_SUBSCRIPTION_EMAILS_MUTATION = gql`
  mutation {
    sendSubscriptionEmails {
      ok
      successfull
      failed
      error {
        message
      }
    }
  }
`;
export default SEND_SUBSCRIPTION_EMAILS_MUTATION;
