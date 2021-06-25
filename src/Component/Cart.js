import { Icon, Item, Table,Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addAction, removeAction, subAction } from "../Action/action";
import Checkout from "./Checkout";
const Cart= ({cart,dispatch}) =>{
    const [grandTotal,changeGrandTotal]=useState(0);
    //console.log(grandTotal.length)
    let tot=0;
    console.log(grandTotal);
    console.log(cart)
    
    useEffect(()=>{
      console.log(cart)
      cart.map((cartItem) =>{ 
        console.log("useEffect:"+tot);
        //changeGrandTotal([...grandTotal,{...cartItem}])
        tot+=cartItem.price*cartItem.qty;
      });
      changeGrandTotal(tot)
    },[cart])
    const callMe=()=>{
      cart.map((cartItem)=>dispatch(removeAction({...cartItem})))
    }
    return (
      <div >
        {console.log("Hi888")}
            <Table
            padded
            style={{ width: "80%", marginLeft: "120px", marginTop: "50px" }}>
            <Table.Header className="center aligned">
              <Table.Row>
                <Table.HeaderCell>Product</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
                <Table.HeaderCell>Quantity</Table.HeaderCell>
                <Table.HeaderCell>Total</Table.HeaderCell>
                <Table.HeaderCell></Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            {cart.map((cartItem) => (
              <Table.Body>
                <Table.Row>
                  <Table.Cell className="center aligned">
                    <Item>
                      <img class="ui small circular image" src={cartItem.image} style={{left:'50%',transform:'translateX(-50%)'}}></img>
                      <div>
                        <Item.Header style={{ fontSize: "20px" }}>
                          {cartItem.title}{" "}
                        </Item.Header>
                      </div>
                      <div>
                        <Item.Description>{cartItem.description}</Item.Description>
                      </div>
                    </Item>
                  </Table.Cell>
                  <Table.Cell style={{ fontSize: "20px" }} className="center aligned">
                    <Icon name="dollar" />
                    {cartItem.price}
                  </Table.Cell>
                  <Table.Cell className="center aligned">
                    <div>
                      <button class="ui black icon button" onClick={()=>{
                      if(cartItem.qty==1)
                      dispatch(removeAction({...cartItem}))
                      else 
                      dispatch(subAction({...cartItem}))}}>
                        <i class="minus icon"></i>
                      </button>{""}
                      {cartItem.qty}{" "}
                      <button class="ui black icon button" size="small" onClick={
                        ()=>
                        dispatch(addAction({...cartItem}))}>
                        <i class="plus icon"></i>
                      </button>
                    </div>
                  </Table.Cell>
                  <Table.Cell style={{ fontSize: "20px" }} className="center aligned">
                    <Icon name="dollar" />
                    {cartItem.price*cartItem.qty}
                    {/* {callMe(cartItem.price*cartItem.qty)} */}
                  </Table.Cell>
                  <Table.Cell>
                    <button class=" ui red icon  button" onClick={()=>
                      dispatch(removeAction({...cartItem}))}>
                      <i class="times circle icon"></i>
                    </button>
                  </Table.Cell>
                </Table.Row>
                <Table.Row></Table.Row>
              </Table.Body>
            ))}
            <Table.Body>
                <Table.Row>
                  <Table.Cell className="center aligned">
                    <Item></Item>
                  </Table.Cell>
                  <Table.Cell className="center aligned">
                    <Item></Item>
                  </Table.Cell>
                  <Table.Cell className="center aligned">
                    <Item>{cart.length==0 && (<h3>Cart is empty</h3>)}</Item>
                  </Table.Cell>
                  <Table.Cell className="center aligned">
                    <Item>{cart.length>0 && grandTotal}</Item>
                  </Table.Cell>
                  <Table.Cell >
                  {cart.length > 0 && (
                <><Link to="/buy"><button class=" ui green icon button">Checkout</button></Link>
                <Button primary onClick={callMe}>Clear cart</Button></>)} 
                  </Table.Cell>
                </Table.Row>
            </Table.Body>
          </Table>
          
        </div>
    );
  }
  const mapStateToProps=(cartState)=>({
    cart:cartState.cartReducer
  })
  
  export default connect (mapStateToProps)(Cart)


