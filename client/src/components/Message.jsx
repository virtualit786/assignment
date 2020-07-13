import React, { useState, useEffect } from "react";
import { Alert } from "reactstrap";
export const Message = (props) => {
  const [isVisible, setVisible] = useState(true);
  const [isError, setError] = useState(props.isError);
  const [message, setMessage] = useState(props.message);
  const onDismiss = () => {
    setMessage("");
    setVisible(false);
    setError(false);
  };

  useEffect(() => {
    setError(props.isError);
    setMessage(props.message);
    props.message ? setVisible(true) : setVisible(false);
  }, [props.isError, props.message]);

  return message.length ? (
    <Alert
      isOpen={isVisible}
      toggle={onDismiss}
      color={isError ? "danger" : "primary"}
    >
      {message}
    </Alert>
  ) : (
    <></>
  );
};
