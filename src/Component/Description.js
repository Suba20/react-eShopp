import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux'
import { Card, Container, Image, Icon, Button, Item } from "semantic-ui-react";
import axios from "axios";
import {Link,Redirect,useHistory} from 'react-router-dom';
import {addAction,removeAction,subAction,newAction} from '../Action/action'

//props.dispatch(actions.)
//disptach(action)
const Description = ({cart,dispatch}) => {
  const params = useParams();
  const [product, changeProduct] = useState({});
  const [isAvailable, changeIsAvailable] = useState(undefined);
  //console.log("helllloooooo");
  useEffect(() => {
    axios
      .get("https://eshopbackendapi.herokuapp.com/api/product/" + params.id)
      .then(async (res) => {
        await changeProduct({
          ...res.data
        });
        changeIsAvailable(
          cart.find((cartItem) => cartItem.id == params.id)
        );
      })
      .catch(function (error) {
        console.log("error");
      });
  }, [cart]);
  const history=useHistory();
  const callMe=async()=>{
    if(!isAvailable)
      await dispatch(newAction(product));
    return history.push("/buy")
  }
  const renderItems = () => {
    return (
      <Item.Group>
        <Item style={{ paddingTop: "100px", paddingRight: "20px" }}>
          <Card style={{ height: 440, width: 500 }}>
            <Image
              src={product.image}
              style={{
                height: 440,
                width: 500,
                paddingTop: "20px",
                paddingRight: "20px",
                paddingLeft: "20px",
                paddingBottom: "20px",
                backgroundColor: "white",
              }}
            />
          </Card>
          <Item.Content style={{ paddingTop: "30px", textAlign: "left" }}>
            <Item.Header
              style={{
                textAlign: "left",
                fontSize: 30,
                fontFamily: "Arial",
                paddingLeft: "20px",
                paddingBottom: "30px",
              }}
            >
              {product.title}
            </Item.Header>
            <Item.Meta>
              <Item.Description
                style={{ textAlign: "left", fontSize: 20, paddingLeft: "20px" }}
              >
                <Icon name="dollar" />
                {product.price}
              </Item.Description>
              <Item.Description
                style={{
                  textAlign: "left",
                  fontSize: 20,
                  paddingLeft: "20px",
                  paddingTop: "20px",
                }}
              >
                {console.log(product.extra_description)}
              </Item.Description>
            </Item.Meta>
            {/* <ul>
               {product.extraDescription.desc1 && (<li><Item.Description style={{textAlign:'left',fontSize:20,paddingTop: "20px"}}>
                 {product.extraDescription.desc1}</Item.Description></li>)}
               {product.extraDescription.desc2 && (<li><Item.Description style={{textAlign:'left',fontSize:20,paddingTop: "20px"}}>
                 {product.extraDescription.desc2}</Item.Description></li>)}
               {product.extraDescription.desc3 && (<li><Item.Description style={{textAlign:'left',fontSize:20,paddingTop: "20px"}}>
                 {product.extraDescription.desc3}</Item.Description></li>)}
               {product.extraDescription.desc4 && (<li><Item.Description style={{textAlign:'left',fontSize:20,paddingTop: "20px"}}>
                 {product.extraDescription.desc4}</Item.Description></li>)}
               {product.extraDescription.desc5 && (<li><Item.Description style={{textAlign:'left',fontSize:20,paddingTop: "20px",paddingBottom:'25px'}}>
                 {product.extraDescription.desc5}</Item.Description> </li>)}
            </ul> */}
            <div style={{ paddingLeft: "40px" }}>
              {isAvailable ? (
                <>
                
                  <button
                    className="ui black icon button"
                    onClick={() => {
                      if (isAvailable.qty == 1)
                      dispatch(removeAction({...isAvailable}))
                      else
                      dispatch(subAction({...isAvailable}))
                    }}
                  >
                    <i className="minus icon"></i>
                  </button>{" "}
                  {isAvailable.qty}{" "}
                  <button
                    className="ui black icon button"
                    size="small"
                    onClick={() =>dispatch(addAction(product))}
                  >
                    <i className="plus icon"></i>
                  </button>
                </>
              ) : (
                <Button
                  positive
                  icon="cart plus"
                  content="Add to Cart"
                  onClick={() => {
                    dispatch(newAction(product))
                  }}
                />
              )}
              <Button positive icon="lightning" content="Buy" onClick={(e)=>callMe()}/>
            </div>
          </Item.Content>
        </Item>
      </Item.Group>
    );
  };

  return <Container>{renderItems()}</Container>;
};

const mapStateToProps=(cartState)=>({
  cart:cartState.cartReducer
})

/*const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators(actions, dispatch)
}*/


export default connect(mapStateToProps)(Description)