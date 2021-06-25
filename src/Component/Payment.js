import { React, useState } from "react";
import { Form, Container, Input, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

const Payment = () => {
  const history = useHistory();
  const [cardnumberInput, setCardnumber] = useState("");
  const [validCardnumber, validateCardnumber] = useState(true);
  const [cvvInput, setCvv] = useState("");
  const [validCvv, validateCvv] = useState(true);
  const handleSubmit = (e) => {
    e.preventDefault();
      history.push({ pathname: "/confirm" });
  };
  return (
    <Container style={{ width: "50%" }}>
      <h2 style={{ textAlign: "center" }}>Card Payment</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          type="text"
          icon="paypal card"
          label="Card Number"
          placeholder="Card Number"
          value={cardnumberInput}
          onChange={(e) => {
            setCardnumber(e.target.value);
            validateCardnumber(
              e.target.value.length === 16 && !isNaN(e.target.value)
            );
          }}
          error={
            validCardnumber
              ? false
              : {
                  content: "Enter valid card number",
                  pointing: "above",
                }
          }
          required
        />
        <Form.Group widths="equal">
          <Form.Input
            type="text"
            label="CVV"
            placeholder="CVV"
            value={cvvInput}
            onChange={(e) => {
              setCvv(e.target.value);
              validateCvv(e.target.value.length == 3 && !isNaN(e.target.value));
            }}
            error={
              validCvv
                ? false
                : {
                    content: "Enter valid CVV",
                    pointing: "above",
                  }
            }
            required
          />
          <Form.Field
            id="form-input-control-date-of-expiry"
            control={Input}
            label="Date of Expiry"
            placeholder="MM/YY"
            required
          />
        </Form.Group>
        <Button>Pay</Button>
      </Form>
    </Container>
  );
};

export default Payment;
