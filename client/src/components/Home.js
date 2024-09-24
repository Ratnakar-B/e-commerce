import React, { useState } from "react";
// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import Tab from "react-bootstrap/Tab";
// import Tabs from "react-bootstrap/Tabs";
import Carousel from "react-bootstrap/Carousel";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Home() {
  let loc = useLocation();
  console.log(loc);
  let navigate = useNavigate();

  let [product, setProduct] = useState([]);
  let [womensAccessories, setWomensAccessories] = useState([]);
  let [mensFootwear, setMensFootwear] = useState([]);

  let getDataFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:3333/mensAccessories",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setProduct(JSOData);
    console.log(JSOData);
  };
  let getWomensClothingDataFromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:3333/womenClothings",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setWomensAccessories(JSOData);
    console.log(JSOData);
  };

  let mensFootwearfromServer = async () => {
    let reqOptions = {
      method: "GET",
    };

    let JSONData = await fetch(
      "http://localhost:3333/mensFootwear",
      reqOptions
    );
    let JSOData = await JSONData.json();
    setMensFootwear(JSOData);
    console.log(JSOData);
  };

  // let deleteProfilefromDatabase = async () => {
  //   let dataToSend = new FormData();
  //   dataToSend.append("email", loc.state.data.email);
  //   let reqOptions = {
  //     method: "DELETE",
  //     body: dataToSend,
  //   };

  //   let JSONData = await fetch(
  //     "http://localhost:3333/deleteAccount",
  //     reqOptions
  //   );

  //   let JSOData = await JSONData.json();
  //   if (JSOData.status == "success") {
  //     navigate("/");
  //     localStorage.clear();
  //     alert(JSOData.msg);
  //     console.log(JSOData);
  //   } else {
  //     console.log("something went wrong");
  //   }
  // };

  let deleteAccountFromDatabase = async () => {
    try {
      let dataToSend = new FormData();

      dataToSend.append("email", loc.state.data.email);
      let reqOptions = {
        method: "DELETE",
        body: dataToSend,
      };

      let JSONData = await fetch(
        "http://localhost:3333/deleteAccount",
        reqOptions
      );

      let JSOData = await JSONData.json();

      if (JSOData.status == "success") {
        navigate("/");
        alert(JSOData.msg);
        localStorage.clear();
      } else {
        console.log("something went wrong");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="main-container">
      <div>
        <Navbar
          collapseOnSelect
          expand="lg"
          className=" navBar-backgroundColor"
        >
          <Container>
            <Navbar.Brand href="#home">
              <img
                className="brandPic"
                title="Shop Now"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQkoq_1TtgNGSwdDQF0TNjTlUc_ues6Zy1rQ&usqp=CAU"
                alt=""
              ></img>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="#mens_clothes">
                  <button
                    className="navBtns"
                    type="button"
                    onClick={() => {
                      getDataFromServer();
                    }}
                  >
                    Men
                  </button>
                </Nav.Link>
                <Nav.Link href="#womens_clothes">
                  <button
                    className="navBtns"
                    type="button"
                    onClick={() => {
                      getWomensClothingDataFromServer();
                    }}
                  >
                    Women
                  </button>
                </Nav.Link>
                <Nav.Link href="#footware">
                  <button
                    className="navBtns"
                    type="button"
                    onClick={() => {
                      mensFootwearfromServer();
                    }}
                  >
                    Footwear
                  </button>
                </Nav.Link>
                <Nav.Link href="">
                  <button
                    className="navBtns"
                    type="button"
                    onClick={() => {
                      navigate("/profile", { state: loc.state.data });
                    }}
                  >
                    Profile
                  </button>
                </Nav.Link>
                <Nav.Link href="">
                  <button
                    type="button"
                    className="navBtns"
                    onClick={() => {
                      deleteAccountFromDatabase();
                    }}
                  >
                    Delete(AC)
                  </button>
                </Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link eventKey={2} href="#memes">
                  <Link className="logout" to="">
                    Cart
                  </Link>
                </Nav.Link>
                <Nav.Link eventKey={2} href="#memes">
                  <Link className="logout" to="/">
                    Logout
                  </Link>
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="home-container">
        <div className="home">
          <div>
            {/* <h1 className="welcome-text">
              Welcome "{loc.state.data.firstName}"
            </h1> */}
            <img
              className="offerPic"
              src="https://www.onlygfx.com/wp-content/uploads/2022/03/special-offer-discount-tags-grunge-brush-stroke-5.png"
              alt=""
            ></img>
            <h2>If you can't stop thinking about it...</h2>
            <h1 className="quotesLogin"> Buy it.</h1>

            <div>
              <img
                className="mediaPic"
                title="FaceBook"
                src="./images/FB.png"
                alt=""
              ></img>
              <img
                className="mediaPic"
                title="Instagram"
                src="./images/insta.png"
                alt=""
              ></img>
              <img
                className="mediaPic"
                title="Twitter"
                src="./images/Twitter.png"
                alt=""
              ></img>
            </div>
          </div>
          <div>
            <img
              className="brand-post"
              src="https://img.freepik.com/free-photo/lady-poses-dressing-room-with-bright-clothes-shoes-girl-beret-lilac-blouse-looking-camera-pink-background_197531-17602.jpg"
              alt=""
            ></img>
          </div>
        </div>
      </div>
      <div className="home-container">
        <div className="home">
          <div>
            <div>
              <p className="online_product">
                <h1 className="men-category">Men Accessories</h1>
                Shop for latest Mens Accessories Online at best price...
              </p>
            </div>

            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://tonythetailor.in/wp-content/uploads/2016/07/Formal-Suits-for-Men.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://frenchcrown.in/cdn/shop/articles/Featured_image.jpg?v=1704777925&width=2048"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://www.shopcartindia.com/cdn/shop/files/7_f6f424e6-ec35-4335-8f91-0ae103f0d031.webp?v=1688995493"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://cosmosgroup.sgp1.digitaloceanspaces.com/news/9748107_mens%20wear%20clothing%20brands.jpg"
                  alt="Fourth slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://bobbysfashions.com/wp-content/uploads/2018/05/Style-Accessories-for-Men.jpg"
                  alt="Fifth slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="mensAccess"
                  src="https://res.cloudinary.com/stitch-fix/image/upload/f_auto,q_auto/v1702934212/landing-pages/pages/US/men/Style%20Forecast%2024/231130_StyleForecast_M__PRODUCT.jpg"
                  alt="Sixth slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <div className="home-container">
        <div className="home">
          <div>
            <div>
              <p className="online_product">
                <h1 className="men-category">Women Accessories</h1>
                Shop for latest Womens Accessories Online at best price...
              </p>
            </div>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="womenAccessories"
                  src="https://assets.ajio.com/medias/sys_master/root/20210128/kizl/6011c0edaeb2696981581088/trink_dual-toned_bird_carved_necklace_with_earrings.jpg"
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="womenAccessories"
                  src="https://images.freekaamaal.com/post_images/1690630306.webp"
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="womenAccessories"
                  src="https://asset20.ckassets.com/thegoodlookbook/wp-content/uploads/sites/2/2018/09/Dresses-770x513.png"
                  alt="Third slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="womenAccessories"
                  src="https://www.tresmode.com/cdn/shop/articles/tresmode-blog-image-july_1.jpg?v=1689682195"
                  alt="Fourth slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="womenAccessories"
                  src="https://justintime.in/cdn/shop/files/CK_offer_card_1500x.png?v=1705662365"
                  alt="Fifth slide"
                />
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
      <div>
        <p className="online_product">
          <h1 className="men-category">Footwear Collections</h1>
        </p>
      </div>
      <div>
        <img
          className="footwear"
          src="https://www.cordwainers.in/wp-content/uploads/2017/12/women-shoes-1.jpg"
          alt=""
        ></img>
        <img
          className="footwear"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqUowRUOjnNuez6czPbwNGoFqwyEPYr3czww&usqp=CAU"
          alt=""
        ></img>
        <img
          className="footwear"
          src="https://www.theshoeboxnyc.com/wp-content/uploads/2022/07/Men-shoe-vs-women-shoe.jpg"
          alt=""
        ></img>
        <img
          className="footwear"
          src="https://i.pinimg.com/736x/e5/ed/da/e5edda882d785dd32c8154223fb363ed.jpg"
          alt=""
        ></img>
      </div>
      <div>
        <p className="online_product">
          <h1 className="men-category">
            New Arrival - Branded Watches (Men&Women)
          </h1>
        </p>
      </div>
      <div className="watch-category">
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="TOMMY HILFIGER"
              variant="top"
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/9/8/v/-original-imagp8nzctutnzkh.jpeg?q=70"
            />
            <Card.Body>
              <Card.Title className="watchName">TOMMY HILFIGER</Card.Title>
              <Card.Text>Analog Watch - For Men TH1710494</Card.Text>
              <Card.Text>
                Price: ₹14,999.25/-
                <p>
                  <del>₹19999/-</del> <span>25%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="FOSSIL"
              variant="top"
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/y/r/z/-original-imagphkzsajh8rjf.jpeg?q=70"
            />
            <Card.Body>
              <Card.Title className="watchName">FOSSIL </Card.Title>
              <Card.Text>RHETT Analog Watch - For Men BQ1009</Card.Text>
              <Card.Text>
                Price: ₹7.500/-
                <p>
                  {" "}
                  <del>10000/-</del> <span>25%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="Titan"
              variant="top"
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/h/9/l/-original-imagrgwx2bn8gqna.jpeg?q=70"
            />
            <Card.Body>
              <Card.Title className="watchName">Titan</Card.Title>
              <Card.Text>Analog Watch - For Men NP1773YL03</Card.Text>
              <Card.Text>
                Price: ₹2,750/-
                <p>
                  <del>5000/-</del> <span>45%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="CASIO"
              variant="top"
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/d/8/i/-original-imagz3zgqqcegjx2.jpeg?q=70"
            />
            <Card.Body>
              <Card.Title className="watchName">CASIO</Card.Title>
              <Card.Text>Analog Watch - For Men NP1773YL03</Card.Text>
              <Card.Text>
                Price: ₹1750/-
                <p>
                  <del>5000/-</del> <span>65%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="CASIO"
              variant="top"
              src="https://rukminim2.flixcart.com/image/612/612/xif0q/watch/g/j/k/-original-imags4bbyjt68h4r.jpeg?q=70"
            />
            <Card.Body>
              <Card.Title className="watchName">TOMMY HILFIGER</Card.Title>
              <Card.Text>Analog Watch - For Women TH1781789</Card.Text>
              <Card.Text>
                Price: ₹11,049.15/-
                <p>
                  <del>12999/-</del> <span>15%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="Titan"
              variant="top"
              src="https://rukminim2.flixcart.com/image/832/832/xif0q/watch/y/a/r/-original-imagr5tqfderwugh.jpeg?q=70&crop=false"
            />
            <Card.Body>
              <Card.Title className="watchName">Titan </Card.Title>
              <Card.Text>
                Karishma Analog Watch - For Women NP2598WM02
              </Card.Text>
              <Card.Text>
                Price: ₹5,520/-
                <p>
                  <del>8000/-</del> <span>31%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
        <div>
          {/* <Card style={{ width: "18rem" }}>
            <Card.Img
              className="watch-img"
              title="Fastrack"
              variant="top"
              src="https://rukminim2.flixcart.com/image/832/832/xif0q/watch/d/d/u/-original-imagq9jy3vgz7sgh.jpeg?q=70&crop=false"
            />
            <Card.Body>
              <Card.Title className="watchName">Fastrack </Card.Title>
              <Card.Text>
                Fundamentals Analog Watch - For Women NM68010SM02
              </Card.Text>
              <Card.Text>
                Price: ₹7,799.22/-
                <p>
                  <del>9999/-</del> <span>22%</span>
                </p>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </Card.Text>
            </Card.Body>
          </Card> */}
        </div>
      </div>

      <br></br>
      <br></br>

      <br></br>

      {product.map((productObj) => {
        return (
          <div id="mens_clothes" className="mensShirt-category">
            {/* <div>
              <p className="online_product">
                <h1 className="men-category">Mens Shirts and T-Shirts</h1>
              </p>
            </div> */}

            <div>
              <img src={productObj.pic} alt=""></img>
            </div>
            <div>
              <p>Brand Name: {productObj.brandName}</p>
            </div>
            <div>Shirt/T-Shirt Type: {productObj.type}</div>
            <br></br>
            <div>
              <h5>
                Price: {productObj.price} <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </h5>
            </div>
          </div>
        );
      })}

      <br></br>
      <br></br>

      {womensAccessories.map((productObj) => {
        return (
          <div id="womens_clothes" className="womens-category">
            {/* <div>
              <p className="online_product">
                <h1 className="men-category">Womens Clothings</h1>
              </p>
            </div> */}
            <div>
              <img src={productObj.pic} alt=""></img>
            </div>
            <div>
              <p>Brand Name: {productObj.brandName}</p>
            </div>
            <div>Type of Clothings(Ethnic or occasion): {productObj.type}</div>
            <br></br>
            <div>
              <h5>
                Price: {productObj.price}
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </h5>
            </div>
          </div>
        );
      })}

      <br></br>
      <br></br>
      {/* <div>
        <p className="online_product">
          <h1 className="men-category">Mens Footwear</h1>
        </p>
      </div> */}

      {mensFootwear.map((productObj) => {
        return (
          <div id="footware" className="footwear-category">
            {/* <div>
              <p className="online_product">
                <h1 className="men-category">Mens Footwear</h1>
              </p>
            </div> */}
            <div>
              <img src={productObj.pic} alt=""></img>
            </div>
            <div>
              <p>Brand Name: {productObj.brandName}</p>
            </div>
            <div>FootWear Type: {productObj.type}</div>
            <br></br>
            <div>
              <h5>
                Price: {productObj.price}
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
              </h5>
            </div>
          </div>
        );
      })}
      <div>
        <p>@2024 Mern Full Stack Developer...</p>
      </div>
    </div>
  );
}

export default Home;
