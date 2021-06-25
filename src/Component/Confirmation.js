import React from "react";

import { Container, Image } from "semantic-ui-react";
import {connect} from 'react-redux'
import axios from "axios";
import { removeAction } from "../Action/action";

class Confirmation extends React.Component {
    componentDidMount(){
        axios.post(`https://eshopbackendapi.herokuapp.com/api/makeOrder`,
        {
            "username":this.props.userInfo.username,
            "mobileNumber":this.props.userInfo.mobileNumber,
            "address":this.props.userInfo.address+","+this.props.userInfo.city+","+this.props.userInfo.state,
            "orderAmount":this.props.userInfo.orderAmount,
            "orderDetails":[...this.props.cart],
        },{
                'Content-Type':'application/json'
        })
        .then(async(res)=>{
            this.props.cart.map((cartItem)=>this.props.dispatch(removeAction({...cartItem})));
            axios.post(`https://eshopbackendapi.herokuapp.com/api/sendMail`,
            {
              email:this.props.userInfo.username,
              orderAmount:this.props.userInfo.orderAmount
            })
            .then((res)=>{
              console.log('Mail sent')
            })
            .catch((err)=>{
              console.send(err)
            })
            // console.log(res.data)
          })
        .catch((err)=>
            console.log(err)
        )
    }
  render() {
    const date = new Date();
    date.setDate(date.getDate() + 14);

    return (
      <Container style={{ width: "50%" }}>
        <h2 style={{ textAlign: "center", paddingTop: "40px" }}>
          Hi <span style={{color:'orange',fontSize:'2.5rem'}}>{this.props.userInfo.username}</span>, you will receive your product by {date.toDateString()}
        </h2>

        <Image
          centered
          src="https://www.bing.com/th/id/OGC.798edd11bde10fec75c14eb82197c45e?pid=1.7&rurl=https%3a%2f%2fmedia1.tenor.com%2fimages%2f798edd11bde10fec75c14eb82197c45e%2ftenor.gif%3fitemid%3d13375603&ehk=DPyzZdIYEE1o0pyjZ0jBWW13Fc74Y9qwX%2bSknhDoqKU%3d"
        />
      </Container>
    );
  }
}

const mapStateToProps=(cartState)=>({
    cart:cartState.cartReducer,
    userInfo:cartState.orderReducer
  })

export default connect(mapStateToProps)(Confirmation)