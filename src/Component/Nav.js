import { useState } from "react";
import { Dropdown, Label} from "semantic-ui-react";
import { useHistory, Link, useLocation } from "react-router-dom";
const Nav = ({filterProducts,sortProducts}) => {
  const location = useLocation();
  
  const [toShowAll, changeShowAll] = useState(false);
  const [toShowSort, changeShowSort] = useState(false);
  const toggle = () => changeShowAll(!toShowAll);
  {console.log(toShowAll)}
  const searchStyles={
      height: "70%",
      width: "100%",
      top: "50%",
      transform: "translateY(-50%)",
  }
  const showItems = () => {
    return (
      <div className="ui vertical accordion borderless fluid menu">
        <div className="item">
        {location.pathname == "/" && (<div className="ui icon input">
            <input type="text" placeholder="Search products" onChange={filterProducts} />
          </div>)}
        </div>
        {location.pathname == "/" && (
          <div className="item">
            Sort by
            <div className="menu">
              <a className="item" onClick={()=>{toggle();sortProducts('>')}}>Price low to high</a>
              <a className="item" onClick={()=>{toggle();sortProducts('<')}}>Price high to low</a>
              <a className="item" onClick={()=>{toggle();sortProducts('latest')}}>Latest</a>
              <a className="item" onClick={()=>{toggle();sortProducts('none')}}>None</a>
            </div>
          </div>
        )}
        <Link to="/cart">
          <a
            className={`item ${location.pathname == "/cart" && "active"}`}
            onClick={toggle}
          >
            Cart
          </a>
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className="ui borderless huge menu hidden">
        <div className="ui container grid">
          <div className="computer only row">
            <Link to="/">
              <a className="header item">
                <i className="building icon "></i> eShop
              </a>
            </Link>
            {location.pathname == "/" && (<div className="ui search">
              <div
                className="ui icon input"
                style={searchStyles}
              >
                <input
                  className="prompt"
                  type="text"
                  placeholder="Search products..." onChange={filterProducts}
                />
              </div>
              <div className="results"></div>
            </div>)}

            <div className="right menu">       
              {location.pathname == "/" && (
                <a className="ui dropdown item" onClick={()=>changeShowSort(!toShowSort)}>
                  Sort by<i className="dropdown icon"></i>
                  {toShowSort && (
                    <div className="right menu">
                      <div className="item" onClick={()=>sortProducts('>')}>
                        Price <i className="sort amount up icon"></i>
                      </div>
                      <div className="item" onClick={()=>sortProducts('<')}>
                        Price <i className="sort amount down icon"></i>
                      </div>
                      <div className="item"  onClick={()=>sortProducts('latest')}>Latest</div>
                      <div className="item" onClick={()=>sortProducts('none')}>None</div>
                    </div>
                  )}
                </a>
              )}

              <Link to="/cart">
                <a
                  className={`item ${location.pathname == "/cart" && "active"}`}
                >
                  <i className="shopping cart icon"></i> Cart
                </a>
              </Link>
            </div>
          </div>

          <div className="tablet mobile only row">
            <Link to="/">
              <a className="header item" onClick={()=>{changeShowAll(false)}}>
                <i className="building icon"></i> eShop
              </a>
            </Link>
            <div className="right menu">
              <a className="menu item">
                <div
                  className="ui basic icon toggle button"
                  onClick={() => changeShowAll(!toShowAll)}
                >
                  <i className="content icon"></i>
                </div>
              </a>
            </div>
            {toShowAll ? showItems() : ""}
          </div>
        </div>
      </div>
    </>
  );
};
export default Nav;