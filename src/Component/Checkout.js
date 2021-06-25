import { React, useState, useEffect } from "react";
import {
  Form,
  Input,
  Grid,
  TextArea,
  Button,
  Table,
  Item,
  Icon,
} from "semantic-ui-react";

import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { userAction } from "../Action/action";

const Checkout = ({ cart ,dispatch}) => {
  console.log("check", cart);
  const history = useHistory();
  const [userInfo,changeUserInfo]=useState({});
  const [totalAmount,calculateTotalAmount]=useState(0);
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );
  useEffect(()=>{  
    calculateTotalAmount(cart.reduce((tot,cartItem)=>tot+(cartItem.price*cartItem.qty),0));
  },[])
  const stateOptions = [
    { text: "Andhra Pradesh", value: "Andhra Pradesh" },
    { text: "Arunachal Pradesh", value: "Arunachal Pradesh" },
    { text: "Assam", value: "Assam" },
    { text: "Bihar", value: "Bihar" },
    { text: "Chandigarh", value: "Chandigarh" },
    { text: "Delhi", value: "Delhi" },
    { text: "Goa", value: "Goa" },
    { text: "Gujarat", value: "Gujarat" },
    { text: "Kerala", value: "Kerala" },
    { text: "Karnataka", value: "Karnataka" },
    { text: "Mumbai", value: "Mumbai" },
    { text: "Maharastra", value: "Maharastra" },
    { text: "Punjab", value: "Punjab" },
    { text: "TamilNadu", value: "TamilNadu" },
  ];

  const [emailInput, setEmail] = useState("");
  const [validEmail, validateEmail] = useState(true);
  const [numberInput, setNumber] = useState("");
  const [validNumber, validateNumber] = useState(true);
  const [cityInput, setCity] = useState("");
  const [validCity, validateCity] = useState(true);
  const handleSubmit =async (e) => {
    e.preventDefault();
    console.log(userInfo)
    await dispatch(userAction(userInfo))
      history.push({ pathname: "/payment" });
  };
  const onChange = (e, label) => {
    const value=e.target.value || e.target.innerText
    changeUserInfo({...userInfo,[label]:value})
    
  };
  useEffect(()=>{
    changeUserInfo({...userInfo,orderAmount:totalAmount})
  },[totalAmount])
  useEffect(()=>{
    console.log(userInfo);
  },[userInfo])
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={8} style={{ paddingRight: "50px" }}>
          <Table
            padded
            style={{ width: "80%", marginLeft: "120px", marginTop: "50px" }}
          >
            <Table.Header className="center aligned">
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>

                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {cart.map((cartItem) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="center aligned">
                    <Item>
                      <img
                        class="ui small circular image"
                        src={cartItem.image}
                        style={{ left: "50%", transform: "translateX(-50%)" }}
                      ></img>
                      <div>
                        <Item.Header style={{ fontSize: "20px" }}>
                          {cartItem.title}{" "}
                        </Item.Header>
                      </div>
                      <div>
                        <Item.Description>
                          {cartItem.description}
                        </Item.Description>
                      </div>
                    </Item>
                  </Table.Cell>
                  <Table.Cell
                    style={{ fontSize: "20px" }}
                    className="center aligned"
                  >
                    <Icon name="dollar" />
                    {cartItem.price}
                  </Table.Cell>

                  <Table.Cell
                    style={{ fontSize: "20px" }}
                    className="center aligned"
                  >
                    <Icon name="dollar" />
                    {cartItem.price * cartItem.qty}
                  </Table.Cell>
                </Table.Row>
              </Table.Body>
            ))}
          </Table>
        </Grid.Column>
        <Grid.Column width={8} style={{ paddingRight: "30px" }}>
          <h1 style={{ textAlign: "center" }}>Checkout Form</h1>
          <Form onSubmit={handleSubmit}>
            <Form.Group widths="equal">
              <Form.Input
                icon="envelope"
                iconPosition="left"
                label="Email"
                placeholder="Email Address"
                required
                value={emailInput}
                onChange={(e) => {
                  onChange(e,'username');
                  setEmail(e.target.value);
                  validateEmail(validEmailRegex.test(e.target.value));
                }}
                error={
                  validEmail
                    ? false
                    : {
                        content: "Please enter a valid email address.",
                      }
                }
              />
              <Form.Input
                type="text"
                icon="mobile"
                iconPosition="left"
                label="Mobile Number"
                placeholder="Mobile Number"
                value={numberInput}
                onChange={(e) => {
                  onChange(e,'mobileNumber');
                  setNumber(e.target.value);
                  validateNumber(
                    e.target.value.length == 10 && !isNaN(e.target.value)
                  );
                }}
                error={
                  validNumber
                    ? false
                    : {
                        content: "Please enter a 10 digit mobile number",
                        pointing: "above",
                      }
                }
                required
              />
            </Form.Group>
            <Form.Field
              id="form-textarea-control-address"
              control={TextArea}
              label="Address"
              placeholder="Address"
              onChange={(e)=>onChange(e,'address')}
              required
            />
            <Form.Group widths="equal">
              <Form.Input
                type="text"
                label="City/District/Town"
                placeholder="City/District/Town"
                value={cityInput}
                onChange={(e) => {
                  onChange(e,'city')
                  setCity(e.target.value);
                  validateCity(e.target.value != "");
                }}
                error={
                  validCity
                    ? false
                    : {
                        content: "This is a required field",
                        pointing: "above",
                      }
                }
                required
              />
              <Form.Select
                fluid
                options={stateOptions}
                label="State"
                placeholder="Select-State"
                required
                onChange={(e)=>onChange(e,'state')}
              />
            </Form.Group>
            <Form.Field
              id="form-input-control-city"
              control={Input}
              label="Amount"
              value={totalAmount}
              readOnly
              placeholder="Amount"
              required
              onChange={(e)=>onChange(e,'orderAmount')}
            />
            {<Button type="submit">Proceed to Pay</Button>}
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = (cartState) => ({
  cart: cartState.cartReducer,
});

export default connect(mapStateToProps)(Checkout);
