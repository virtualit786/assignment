import gql from "graphql-tag";
export const SUBSCRIBE_MUTATION = gql`
  mutation subscribe($email: String!) {
    subscribe(email: $email) {
      ok
      subscription {
        id
        email
        is_email_sent
      }
      error {        
        message
      }
    }
  }
`;
