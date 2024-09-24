let express = require("express");
let cors = require("cors");
let app = express();
app.use(cors());
let mongoose = require("mongoose");

let multer = require("multer");
app.use("/uploads", express.static("uploads"));

let dotenv = require("dotenv");
dotenv.config();

let jwt = require("jsonwebtoken");
let bcrypt = require("bcrypt");

let connectToMDB = async () => {
  try {
    await mongoose.connect(process.env.dbPath);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.log("Unable to connect to MongoDB");
  }
};

connectToMDB();

let userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  mobileNumber: Number,
  email: String,
  password: String,
  reConfirm: String,
  profilePic: String,
});

let user = new mongoose.model("agent", userSchema);

//Form Data//

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    console.log(req.file);
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

//Login Data//

app.post("/loginData", upload.none(), async (req, res) => {
  console.log(req.body);

  let userInfo = await user.find().and({
    email: req.body.email,
  });
  console.log(userInfo);

  if (userInfo.length == 0) {
    res.json({ status: "failure", msg: "user doesn't exists" });
    console.log({ status: "failure", msg: "user doesn't exists" });
  } else {
    let result = await bcrypt.compare(req.body.password, userInfo[0].password);

    console.log(result);

    if (result == true) {
      let encryptedCredentials = jwt.sign(
        { email: userInfo[0].email, password: userInfo[0].password },
        "Ratnakar"
      );
      console.log(encryptedCredentials);

      res.json({
        status: "success",
        msg: "Successfully logged in",
        token: encryptedCredentials,
        data: userInfo[0],
      });
    } else {
      res.json({
        status: "failure",
        msg: "invalid email/password",
        data: userInfo[0],
      });
    }
  }
  //   else if ((userInfo[0].length = req.body.password)) {
  //     res.json({
  //       status: "success",
  //       msg: "successfully logged in",
  //       data: userInfo[0],
  //     });
  //   }
});

//Token Validation//

app.post("/tokenValidation", upload.none(), async (req, res) => {
  console.log(req.body.token);

  let decryptedInfo = jwt.verify(req.body.token, "Ratnakar");
  console.log(decryptedInfo);

  let userInfo = await user.find().and({ email: decryptedInfo.email });
  console.log(userInfo);

  if (userInfo.length > 0) {
    if (userInfo[0].password == decryptedInfo.password) {
      res.json({
        status: "success",
        msg: "valid login credentials",
        data: userInfo[0],
      });
    }
  } else {
    res.json({ status: "failure", msg: "invalid login credentials" });
  }
});
//Post Data//

app.post("/signupData", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  let userInfo = await user.find().and({
    email: req.body.email,
  });

  console.log(userInfo);

  let bcryptedsPassword = await bcrypt.hash(req.body.password, 10);
  console.log(bcryptedsPassword);

  if (userInfo.length > 0) {
    res.json({ status: "failure", msg: "user already exists" });
    console.log({ status: "failure", msg: "user already exists" });
  } else {
    try {
      let newUser = new user({
        firstName: req.body.fn,
        lastName: req.body.ln,
        mobileNumber: req.body.mobileNumber,
        email: req.body.email,
        password: bcryptedsPassword,
        reConfirm: bcryptedsPassword,
        profilePic: req.file.path,
      });

      await user.insertMany([newUser]);
      res.json({ status: "success", msg: "user created successfully" });
      console.log({ status: "success", msg: "user created successfully" });
    } catch (err) {
      res.json({ status: "failure", msg: err });
      console.log({ status: "failure", msg: err });
    }
  }
});

//Patch Data//

app.patch("/updateData", upload.single("profilePic"), async (req, res) => {
  console.log(req.body);
  console.log(req.file);

  await user.updateMany(
    { email: req.body.email },
    {
      firstName: req.body.fn,
      lastName: req.body.ln,
      mobileNumber: req.body.mobileNumber,
    }
  );
  res.json({ status: "success", msg: "profile successfully updated" });
});

//Delete Data//

app.delete("/deleteAccount", upload.none(), async (req, res) => {
  console.log(req.body);

  let deleteProfile = await user.deleteMany({
    email: req.body.email,
  });
  console.log(deleteProfile);

  res.json({ status: "success", msg: "user deleted successfully" });
});

let morgan = require("morgan");
app.use(morgan("tiny"));
let fs = require("fs");
let path = require("path");

let accesslogData = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});

app.use(morgan("combined", { stream: accesslogData }));

let middlewareFun = () => {
  console.log("This is a Morgan middleware function");
};

//Get Data//

app.get("/employeeInfo", middlewareFun, async (req, res) => {
  let employeeData = await user.find();
  res.json(employeeData);
});

app.get("/mensAccessories", async (req, res) => {
  let peFormalShirt1 = {
    pic: "https://img.tatacliq.com/images/i14/437Wx649H/MP000000020159108_437Wx649H_202311200343441.jpeg",
    brandName: "Peter England",
    type: "Formal Shirt",
    price: "Rs.₹1499/-  ",
  };
  let louisShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/x/3/4/-original-imagsaxebyugmnkb.jpeg?q=70",
    brandName: "LOUIS PHILIPPE",
    type: "Formal Shirt",
    price: "Rs.₹1299/-  ",
  };
  let arrowShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/p/w/c/-original-imags9h7jcn5wbxw.jpeg?q=70",
    brandName: "Arrow",
    type: "Formal Shirt",
    price: "Rs.₹899/-  ",
  };

  let vanHeusenShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/c/h/g/39-vdsfgeslfh85447-van-heusen-original-imagu9xx393hztg5.jpeg?q=70",
    brandName: "VAN HEUSEN",
    type: "Formal Shirt",
    price: "Rs.₹999/-  ",
  };

  let RaymondShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/e/f/h/-original-imagv56zjytczzzp.jpeg?q=70",
    brandName: "Raymond",
    type: "Formal Shirt",
    price: "Rs.₹1199/-  ",
  };

  let blackberryShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/i/b/h/-original-imagt2j9xbsvnsuv.jpeg?q=70",
    brandName: "BlackBerry",
    type: "Formal Shirt",
    price: "Rs.1677/-  ",
  };

  let peterEngShirt2 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shirt/a/k/t/-original-imagugvavskradjg.jpeg?q=70",
    brandName: "Peter England",
    type: "Formal Shirt",
    price: "Rs.₹1499/-  ",
  };
  let allenShirt1 = {
    pic: "https://img.tatacliq.com/images/i14/437Wx649H/MP000000020159108_437Wx649H_202311200343441.jpeg",
    brandName: "Allen Solly",
    type: "Formal Shirt",
    price: "Rs.₹1899/-  ",
  };

  let allenTShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/h/7/g/-original-imagr8x8chytyfdc.jpeg?q=70",
    brandName: "Polo-T-Shirt",
    type: "Allen Solly",
    price: "Rs.₹398/- ",
  };
  let pumaTShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/v/n/j/xxs-58820621-puma-original-imagy5wnrffpdzyg.jpeg?q=70",
    brandName: "PUMA",
    type: "Polo-T-Shirt",
    price: "Rs.₹2999/-  ",
  };

  let jackShirt1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/t-shirt/b/j/f/m-235286203-jack-jones-original-imagub8252nvugqx.jpeg?q=70",
    brandName: "JACK & JONES",
    type: "Round-Neck T-Shirt",
    price: "Rs.₹1499/-  ",
  };
  let louisTJeans2 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/kzegk280/t-shirt/a/h/u/-original-imagbewzpatsv2zt.jpeg?q=70",
    brandName: "Louis Philippe Jeans",
    type: "Round Neck T-Shirt",
    price: "Rs.₹799/-  ",
  };

  let array = [
    peFormalShirt1,
    louisShirt1,
    arrowShirt1,
    vanHeusenShirt1,
    RaymondShirt1,
    blackberryShirt1,
    peterEngShirt2,
    allenShirt1,
    pumaTShirt1,
    jackShirt1,
    louisTJeans2,
    allenTShirt1,
  ];
  res.json(array);
});

app.get("/womenClothings", async (req, res) => {
  let AAYUMI = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/kurta/t/4/d/xxl-h-n-311-s-h-n-original-imagf9zzrrrgwu7x.jpeg?q=70&crop=false",
    brandName: "AAYUMI",
    type: "Women Printed Cotton Blend Anarkali Kurta  (Green)",
    price: "Rs.₹449/-  ",
  };

  let Kedar = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/lehenga-choli/t/f/v/free-3-4-sleeve-kanyadaan-kedar-fab-original-imagy4zcu4wzmvdy.jpeg?q=70&crop=false",
    brandName: "Kedar Fab ",
    type: "Self Design Semi Stitched Lehenga Choli  (Green)",
    price: "Rs.₹699/-  ",
  };

  let Samah = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/sari/l/z/1/-original-imagvhcp2zawsenr.jpeg?q=70&crop=false",
    brandName: "SamFINE WEAR h",
    type: "Self Design Banarasi Cotton Silk Saree  (Multicolor)",
    price: "Rs.₹4999/-  ",
  };

  let KedarFab = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/gown/g/h/2/na-xl-3-4-sleeve-stitched-crush-kedar-fab-na-original-imagvyfshc5mbbz4.jpeg?q=70&crop=false",
    brandName: "Kedar Fab ",
    type: "Printed Georgette Stitched Anarkali Gown  (White)",
    price: "Rs.₹699/-  ",
  };

  let KOTTY = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/dress/x/g/m/xl-kttdressset68-kotty-original-imagv3szw4yq8pre.jpeg?q=70",
    brandName: "KOTTY",
    type: "Women Two Piece Dress Maroon Dress",
    price: "Rs.₹3999/-  ",
  };

  let array = [AAYUMI, Kedar, Samah, KedarFab, KOTTY];
  res.json(array);
});

app.get("/mensFootwear", async (req, res) => {
  let HUSHPUPPIES = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/e/g/u/9-8386000-9-hush-puppies-black-original-imagt4ynyxz2j2ea.jpeg?q=70&crop=false",
    brandName: "HUSH PUPPIES ",
    type: "Oxford For Men  (Black)",
    price: "Rs.₹2,189/-  ",
  };

  let PROVOGUE = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/p/r/h/7-p1031-brown-provogue-brown-original-imagvyukzhryxkg6.jpeg?q=70&crop=false",
    brandName: "PROVOGUE  ",
    type: "Oxford For Men  (Brown)",
    price: "Rs.₹749/-  ",
  };

  let KILLER = {
    pic: "https://rukminim2.flixcart.com/image/832/832/l407mvk0/shoe/e/k/r/-original-imagezy6rnzjyzbc.jpeg?q=70&crop=false",
    brandName: "KILLER ",
    type: "VWI-SS22-061",
    price: "Rs.₹849/-  ",
  };

  let MOCHI = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/d/3/p/-original-imagg6r4hsygyfvj.jpeg?q=70&crop=false",
    brandName: "MOCHI ",
    type: "Oxford For Men  (Black)",
    price: "Rs.₹2,890/-  ",
  };

  let NIKE1 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/p/i/g/6-aq1773-002-6-nike-black-white-original-imagwfnuxzgp5z7y.jpeg?q=70",
    brandName: "NIKE ",
    type: "WEbernon Mid Sneakers For Men",
    price: "Rs.₹5,995/-  ",
  };
  let redtape1 = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/d/w/u/7-rsl051-red-tape-blue-grey-original-imagxwymgevgsraj.jpeg?q=70&crop=false",
    brandName: "RED TAPE ",
    type: "Casual Sports Shoes for Men",
    price: "Rs. Rs.5,995/-  ",
  };
  let redtape2 = {
    pic: "https://rukminim2.flixcart.com/image/612/612/xif0q/shoe/k/e/d/-original-imagx9xf2dwzezug.jpeg?q=70",
    brandName: "RED TAPE ",
    type: "Casual Sports Shoes for Men ",
    price: "Rs.₹1299/-  ",
  };
  let NIKE2 = {
    pic: "https://rukminim2.flixcart.com/image/832/832/xif0q/shoe/d/w/u/7-rsl051-red-tape-blue-grey-original-imagxwymgevgsraj.jpeg?q=70&crop=false",
    brandName: "NIKE  ",
    type: "Air Span II SE Sneakers For Men",
    price: "Rs.₹7,080/-  ",
  };

  let array = [
    HUSHPUPPIES,
    PROVOGUE,
    KILLER,
    MOCHI,
    NIKE1,
    redtape1,
    redtape2,
    NIKE2,
  ];
  res.json(array);
});

app.listen(process.env.port, () => {
  console.log("This port is listening to 3333");
});
