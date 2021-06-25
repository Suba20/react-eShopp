import axios from "axios";
import React, { useEffect, useState } from "react";
import "../App.css";
import {
  Card,
  Container,
  Image,
  Icon,
  Grid,
  TransitionablePortal,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const ProductList = ({ searchPattern, sortType }) => {
  const [products, changeProducts] = useState([]);
  const [currentProducts,changeCurrentProducts]=useState([]);
  const sortProducts = async() => {
          let sortedProducts = [...currentProducts];
          switch(sortType){
            case '>':
            case '<':
              for (var i = 0; i < sortedProducts.length; i++) {
                for (var j = i + 1; j < sortedProducts.length; j++) {
                  if (eval("sortedProducts["+i+"].price"+sortType+"sortedProducts["+j+"].price")) {
                    var x = sortedProducts[i];
                    sortedProducts[i] = sortedProducts[j];
                    sortedProducts[j] = x;
                  }
                }
              }
              changeCurrentProducts(sortedProducts);
              break; 
            case 'latest':
              for (var i = 0; i < sortedProducts.length; i++) {
                for (var j = i + 1; j < sortedProducts.length; j++) {
                  if (eval("sortedProducts["+i+"].date < sortedProducts["+j+"].date")){
                    var x = sortedProducts[i];
                    sortedProducts[i] = sortedProducts[j];
                    sortedProducts[j] = x;
                  }
                }
              }
              changeCurrentProducts(sortedProducts);
              break;    
            default:
              console.log('sort type: None')    
          }
  };
  const filterProducts = async () => {
    switch(searchPattern.trim()){
      case '':
        changeCurrentProducts(products);
        break;
      default:
        changeCurrentProducts(products.filter((product)=>
        product.title.toLocaleLowerCase().includes(searchPattern.trim().toLocaleLowerCase())
           ))          
    }
  };
  useEffect(()=>{
    axios
      .get(`https://eshopbackendapi.herokuapp.com/api/getProducts`)
      .then((res) => {
        console.log('hi')
        changeProducts([...res.data]);
        changeCurrentProducts([...res.data]);     
      })
      .catch((error) => console.log(error.message));
  },[])

  useEffect(()=>{
    filterProducts();
  },[searchPattern])

  useEffect(()=>{
    sortProducts();
  },[sortType])
  
  const renderItems = () => {
    return (
      <Grid>
        {currentProducts.length == 0 && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
            }}
          >
            <h1>No products available</h1>
          </div>
        )}
        {currentProducts.map((product) => (
          <Grid.Column
            mobile={16}
            tablet={6}
            computer={5}
            style={{ margin: "5px" }}
          >
            <Link to={`/${product._id}`}>
              <Card
                key={product._id}
                style={{ left: "50%", transform: "translateX(-50%)" }}
              >
                <Card.Content>
                  <Image
                    src={product.image}
                    style={{ height: "200px", marginBottom: "15px" }}
                  />
                  <Card.Header>{product.title}</Card.Header>
                  <Card.Meta>
                    <Icon name="dollar" />
                    {product.price}
                  </Card.Meta>
                  <Card.Description>{product.description}</Card.Description>
                </Card.Content>
              </Card>
            </Link>
          </Grid.Column>
        ))}
      </Grid>
    );
  };
//console.log("rende" + currentProducts.length);
return <Container>{renderItems()}</Container>;
};

export default ProductList;