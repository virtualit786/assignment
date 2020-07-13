import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { SUBSCRIBE_MUTATION } from "../graphql/SUBSCRIBE_MUTATION";
import {
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { Message } from "../components/Message";

const SubmitButton = ({ submitting }) => {
  if (submitting)
    return (
      <>
        <Button color="primary" className="d-flex m-auto" disabled>
          Submitting
        </Button>
        <span>Processing...</span>
      </>
    );
  else
    return (
      <Button color="primary" className="d-flex m-auto">
        Submit
      </Button>
    );
};

const Subscription = () => {
  const [subscribe] = useMutation(SUBSCRIBE_MUTATION);

  const [, setFormSubmitting] = useState(false);
  const [isFailed, setFailed] = useState(false);
  const [message, setMessage] = useState("");

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    const reset = () => {
      resetForm(true);
      setSubmitting(false);
      setFormSubmitting(false);
      setTimeout(() => {
        setMessage("");
        setFailed(false);
      }, 3000);
    };
    setMessage("");
    setFailed(false);
    setFormSubmitting(true);
    try {
      const response = await subscribe({
        variables: {
          email: values.email,
        },
      });
      const subscriptionResponse = response.data.subscribe;
      if (subscriptionResponse && subscriptionResponse.ok) {
        setMessage("Subscribed successfully!");
        reset();
      } else if (subscriptionResponse && !subscriptionResponse.ok) {
        setMessage(subscriptionResponse.error.message);
        setFailed(true);
        reset();
      }
    } catch (error) {
      console.error(error);
      setMessage("Subscription failed! ", error);
      setFailed(true);
      reset();
    }
  };

  return (
    <Container>
      <Message message={message} isError={isFailed} />
      <Row>
        <Col md="2"></Col>
        <Col md="8" className="mt-5">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={Yup.object({
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
            })}
            onSubmit={onSubmit}
          >
            {({ errors, touched }) => (
              <Form>
                <FormGroup>
                  <Label for="email">Email {errors.email}</Label>
                  <Input
                    type="email"
                    name="email"
                    tag={Field}
                    invalid={errors.email && touched.email}
                  />
                </FormGroup>
                <SubmitButton isFormSubmitting />
              </Form>
            )}
          </Formik>{" "}
        </Col>
        <Col md="2"></Col>
      </Row>
    </Container>
  );
};

export default Subscription;
