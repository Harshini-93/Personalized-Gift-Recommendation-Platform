// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors()); // Allow cross-origin requests from frontend

// // Connect to MongoDB
// mongoose
//   .connect("mongodb://localhost/gift-recommendation", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // User Schema
// const userSchema = new mongoose.Schema({
//   username: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { type: String, enum: ["core", "admin"], default: "core" },
// });
// const User = mongoose.model("User", userSchema);

// // Gift Schema (for admin CRUD)
// const giftSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   price: Number,
//   shoppingLink: String,
// });
// const Gift = mongoose.model("Gift", giftSchema);

// // Feedback Schema (existing)
// const feedbackSchema = new mongoose.Schema({
//   userInput: Object,
//   recommendation: Object,
//   rating: Number,
//   comment: String,
//   timestamp: { type: Date, default: Date.now },
// });
// const Feedback = mongoose.model("Feedback", feedbackSchema);

// // Middleware to verify token
// const auth = (req, res, next) => {
//   const token = req.headers["authorization"]?.split(" ")[1]; // Expect "Bearer <token>"
//   if (!token) return res.status(403).json({ message: "No token provided" });
//   jwt.verify(token, "a~}8e#P!cm@AX4>6;RpgFdVBH?Y2T39,", (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid token" });
//     req.user = decoded;
//     next();
//   });
// };

// // Admin middleware
// const isAdmin = (req, res, next) => {
//   if (req.user.role !== "admin")
//     return res.status(403).json({ message: "Admin access required" });
//   next();
// };

// // Register Endpoint
// app.post("/api/register", async (req, res) => {
//   const { username, password, role } = req.body;
//   if (!["core", "admin"].includes(role))
//     return res.status(400).json({ message: "Invalid role" });
//   const hashedPassword = await bcrypt.hash(password, 10);
//   const user = new User({ username, password: hashedPassword, role });
//   await user.save();
//   res.status(201).json({ message: "User registered" });
// });

// // Login Endpoint
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = await User.findOne({ username });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     const token = jwt.sign(
//       { id: user._id, role: user.role },
//       "a~}8e#P!cm@AX4>6;RpgFdVBH?Y2T39,",
//       { expiresIn: "1h" }
//     );
//     res.json({ token });
//   } else {
//     res.status(401).json({ message: "Invalid credentials" });
//   }
// });

// // Updated Recommendation Endpoint with Randomization
// app.post("/api/gifts/recommend", async (req, res) => {
//   const { interests, budget, occasion, age } = req.body;
//   console.log("Received request body:", req.body); // Debug input

//   let query = {};
//   if (budget) {
//     query.price = { $lte: budget }; // Strict budget filter
//   } else {
//     query.price = { $lte: 1000 }; // Default max budget
//   }

//   try {
//     let gifts = await Gift.find(query);
//     console.log("Filtered gifts by price:", gifts); // Debug filtered results

//     if (gifts.length === 0) {
//       // Fallback: Return random gifts if no matches
//       gifts = await Gift.aggregate([{ $sample: { size: 5 } }]);
//       console.log("Fallback random gifts:", gifts);
//     } else if (gifts.length > 5) {
//       // Randomize the top 5 from filtered results
//       gifts = gifts.sort(() => Math.random() - 0.5).slice(0, 5);
//       console.log("Randomized top 5 gifts:", gifts);
//     }

//     res.json(gifts);
//   } catch (error) {
//     console.error("Recommendation error:", error);
//     res.status(500).json({ message: "Error fetching recommendations" });
//   }
// });

// // Existing Feedback Endpoint
// app.post("/api/feedback", auth, async (req, res) => {
//   const { userInput, recommendation, rating, comment } = req.body;
//   const feedback = new Feedback({ userInput, recommendation, rating, comment });
//   await feedback.save();
//   res.json({ message: "Feedback submitted successfully" });
// });

// // Admin: Add Gift
// app.post("/api/gifts", auth, isAdmin, async (req, res) => {
//   const { name, description, price, shoppingLink } = req.body;
//   const gift = new Gift({ name, description, price, shoppingLink });
//   await gift.save();
//   res.status(201).json(gift);
// });

// // Admin: Update Gift
// app.put("/api/gifts/:id", auth, isAdmin, async (req, res) => {
//   const { id } = req.params;
//   const { name, description, price, shoppingLink } = req.body;
//   const gift = await Gift.findByIdAndUpdate(
//     id,
//     { name, description, price, shoppingLink },
//     { new: true }
//   );
//   if (!gift) return res.status(404).json({ message: "Gift not found" });
//   res.json(gift);
// });

// // Admin: Delete Gift
// app.delete("/api/gifts/:id", auth, isAdmin, async (req, res) => {
//   const { id } = req.params;
//   const gift = await Gift.findByIdAndDelete(id);
//   if (!gift) return res.status(404).json({ message: "Gift not found" });
//   res.json({ message: "Gift deleted" });
// });

// // Seed initial gifts if collection is empty
// const seedGifts = async () => {
//   const count = await Gift.countDocuments();
//   if (count === 0) {
//     await Gift.insertMany([
//       {
//         name: "Luxury Watch",
//         description: "Elegant timepiece for special occasions",
//         price: 250,
//         shoppingLink: "https://www.amazon.com/Luxury-Watch/dp/B08XYZ1234",
//       },
//       {
//         name: "Board Game",
//         description: "Fun family gathering game",
//         price: 35,
//         shoppingLink: "https://www.amazon.com/Board-Game/dp/B09ABC5678",
//       },
//       {
//         name: "Perfume",
//         description: "Great birthday gift",
//         price: 60,
//         shoppingLink: "https://www.amazon.com/Perfume-Gift/dp/B07DEF9012",
//       },
//       {
//         name: "Wireless Earbuds",
//         description: "High-quality audio for music lovers",
//         price: 80,
//         shoppingLink: "https://www.amazon.com/Wireless-Earbuds/dp/B0CXYZ7890",
//       },
//       {
//         name: "Leather Wallet",
//         description: "Stylish and durable",
//         price: 40,
//         shoppingLink:
//           "https://www.amazon.in/s?k=leather+wallet+amazon&adgrpid=64160990858&ext_vrnc=hi&hvadid=590594109579&hvdev=c&hvlocphy=9298598&hvnetw=g&hvqmt=e&hvrand=10140801295685942061&hvtargid=kwd-339195140818&hydadcr=24541_2265439&tag=googinhydr1-21&ref=pd_sl_4kcthu4ne5_e",
//       },
//       {
//         name: "Smartphone Stand",
//         description: "Adjustable for video calls",
//         price: 15,
//         shoppingLink: "https://www.amazon.com/Smartphone-Stand/dp/B09GHI2345",
//       },
//       {
//         name: "Cookbook",
//         description: "Best recipes for beginners",
//         price: 25,
//         shoppingLink: "https://www.amazon.com/Cookbook-Beginners/dp/B07JKL6789",
//       },
//       {
//         name: "Fitness Tracker",
//         description: "Track steps and heart rate",
//         price: 120,
//         shoppingLink: "https://www.amazon.com/Fitness-Tracker/dp/B0ABCD1234",
//       },
//       {
//         name: "Coffee Maker",
//         description: "Single-serve brewing system",
//         price: 90,
//         shoppingLink: "https://www.amazon.com/Coffee-Maker/dp/B08XYZ5678",
//       },
//       {
//         name: "Backpack",
//         description: "Durable for travel",
//         price: 70,
//         shoppingLink: "https://www.amazon.com/Travel-Backpack/dp/B09ABC9012",
//       },
//       {
//         name: "Digital Camera",
//         description: "Compact for photography",
//         price: 300,
//         shoppingLink: "https://www.amazon.com/Digital-Camera/dp/B07DEF3456",
//       },
//       {
//         name: "Yoga Mat",
//         description: "Non-slip for workouts",
//         price: 20,
//         shoppingLink: "https://www.amazon.com/Yoga-Mat/dp/B09GHI5678",
//       },
//       {
//         name: "Bluetooth Speaker",
//         description: "Portable audio device",
//         price: 50,
//         shoppingLink: "https://www.amazon.com/Bluetooth-Speaker/dp/B0ABCD5678",
//       },
//       {
//         name: "Sunglasses",
//         description: "UV-protected stylish shades",
//         price: 45,
//         shoppingLink: "https://www.amazon.com/Sunglasses/dp/B08PQR7890",
//       },
//       {
//         name: "Electric Kettle",
//         description: "Fast boiling for tea",
//         price: 30,
//         shoppingLink: "https://www.amazon.com/Electric-Kettle/dp/B07JKL9012",
//       },
//       {
//         name: "Notebook",
//         description: "Leather-bound journal",
//         price: 15,
//         shoppingLink: "https://www.amazon.com/Leather-Notebook/dp/B09ABC3456",
//       },
//       {
//         name: "Gaming Mouse",
//         description: "Ergonomic for gamers",
//         price: 60,
//         shoppingLink: "https://www.amazon.com/Gaming-Mouse/dp/B0CXYZ9012",
//       },
//       {
//         name: "Hoodie",
//         description: "Comfortable casual wear",
//         price: 40,
//         shoppingLink: "https://www.amazon.com/Hoodie-Casual/dp/B07DEF7890",
//       },
//       {
//         name: "Puzzle Set",
//         description: "Challenging 1000-piece puzzle",
//         price: 25,
//         shoppingLink: "https://www.amazon.com/Puzzle-Set/dp/B09GHI9012",
//       },
//       {
//         name: "Hair Dryer",
//         description: "Professional styling tool",
//         price: 50,
//         shoppingLink:
//           "https://www.amazon.in/s?k=hairdryer+amazon&adgrpid=83343679904&ext_vrnc=hi&hvadid=590593983330&hvdev=c&hvlocphy=9298598&hvnetw=g&hvqmt=e&hvrand=5893939901149200897&hvtargid=kwd-322580444085&hydadcr=24567_2265462&mcid=9199db1415de36599a58e931a663ec29&tag=googinhydr1-21&ref=pd_sl_jvvkpnto0_e",
//       },
//       {
//         name: "Desk Lamp",
//         description: "LED adjustable light",
//         price: 35,
//         shoppingLink: "https://www.amazon.com/Desk-Lamp/dp/B08PQR1234",
//       },
//       {
//         name: "Running Shoes",
//         description: "Lightweight for jogging",
//         price: 80,
//         shoppingLink: "https://www.amazon.com/Running-Shoes/dp/B07JKL2345",
//       },
//       {
//         name: "Smartwatch",
//         description: "Fitness and notification tracker",
//         price: 150,
//         shoppingLink: "https://www.amazon.com/Smartwatch/dp/B0CXYZ3456",
//       },
//       {
//         name: "Art Supplies Kit",
//         description: "For creative projects",
//         price: 45,
//         shoppingLink: "https://www.amazon.com/Art-Supplies-Kit/dp/B09ABC7890",
//       },
//       {
//         name: "Electric Toothbrush",
//         description: "Advanced oral care",
//         price: 70,
//         shoppingLink:
//           "https://www.amazon.com/Electric-Toothbrush/dp/B07DEF1234",
//       },
//       {
//         name: "Travel Mug",
//         description: "Insulated for coffee",
//         price: 20,
//         shoppingLink: "https://www.amazon.com/Travel-Mug/dp/B09GHI3456",
//       },
//       {
//         name: "Headphones",
//         description: "Noise-canceling audio",
//         price: 100,
//         shoppingLink: "https://www.amazon.com/Headphones/dp/B0ABCD7890",
//       },
//       {
//         name: "Skincare Set",
//         description: "Moisturizing gift pack",
//         price: 35,
//         shoppingLink: "https://www.amazon.com/Skincare-Set/dp/B08PQR5678",
//       },
//       {
//         name: "Chess Set",
//         description: "Classic wooden design",
//         price: 40,
//         shoppingLink: "https://www.amazon.com/Chess-Set/dp/B07JKL5678",
//       },
//       {
//         name: "Portable Charger",
//         description: "High-capacity power bank",
//         price: 25,
//         shoppingLink: "https://www.amazon.com/Portable-Charger/dp/B09ABC2345",
//       },
//       {
//         name: "Book: Best Seller",
//         description: "Latest fiction novel",
//         price: 15,
//         shoppingLink: "https://www.amazon.com/Best-Seller-Book/dp/B0CXYZ7890",
//       },
//     ]);
//     console.log("Seeded initial gifts");
//   }
// };
// seedGifts().catch(console.error);

// app.listen(5000, () => console.log("Server running on port 5000"));
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors()); // Allow cross-origin requests from frontend

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/gift-recommendation", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["core", "admin"], default: "core" },
});
const User = mongoose.model("User", userSchema);

// Gift Schema (for admin CRUD)
const giftSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  shoppingLink: String,
});
const Gift = mongoose.model("Gift", giftSchema);

// Feedback Schema (existing)
const feedbackSchema = new mongoose.Schema({
  userInput: Object,
  recommendation: Object,
  rating: Number,
  comment: String,
  timestamp: { type: Date, default: Date.now },
});
const Feedback = mongoose.model("Feedback", feedbackSchema);

// Middleware to verify token
const auth = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Expect "Bearer <token>"
  if (!token) return res.status(403).json({ message: "No token provided" });
  jwt.verify(token, "a~}8e#P!cm@AX4>6;RpgFdVBH?Y2T39,", (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid token" });
    req.user = decoded;
    next();
  });
};

// Admin middleware
const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Admin access required" });
  next();
};

// Register Endpoint
app.post("/api/register", async (req, res) => {
  const { username, password, role } = req.body;
  if (!["core", "admin"].includes(role))
    return res.status(400).json({ message: "Invalid role" });
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword, role });
  await user.save();
  res.status(201).json({ message: "User registered" });
});

// Login Endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "a~}8e#P!cm@AX4>6;RpgFdVBH?Y2T39,",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Updated Recommendation Endpoint with Randomization
app.post("/api/gifts/recommend", async (req, res) => {
  const { interests, budget, occasion, age } = req.body;
  console.log("Received request body:", req.body); // Debug input

  let query = {};
  if (budget) {
    query.price = { $lte: budget }; // Strict budget filter
  } else {
    query.price = { $lte: 1000 }; // Default max budget
  }

  try {
    let gifts = await Gift.find(query);
    console.log("Filtered gifts by price:", gifts); // Debug filtered results

    if (gifts.length === 0) {
      // Fallback: Return random gifts if no matches
      gifts = await Gift.aggregate([{ $sample: { size: 5 } }]);
      console.log("Fallback random gifts:", gifts);
    } else if (gifts.length > 5) {
      // Randomize the top 5 from filtered results
      gifts = gifts.sort(() => Math.random() - 0.5).slice(0, 5);
      console.log("Randomized top 5 gifts:", gifts);
    }

    res.json(gifts);
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({ message: "Error fetching recommendations" });
  }
});

// Existing Feedback Endpoint
app.post("/api/feedback", auth, async (req, res) => {
  const { userInput, recommendation, rating, comment } = req.body;
  const feedback = new Feedback({ userInput, recommendation, rating, comment });
  await feedback.save();
  res.json({ message: "Feedback submitted successfully" });
});

// Admin: Add Gift
app.post("/api/gifts", auth, isAdmin, async (req, res) => {
  const { name, description, price, shoppingLink } = req.body;
  const gift = new Gift({ name, description, price, shoppingLink });
  await gift.save();
  res.status(201).json(gift);
});

// Admin: Update Gift
app.put("/api/gifts/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const { name, description, price, shoppingLink } = req.body;
  const gift = await Gift.findByIdAndUpdate(
    id,
    { name, description, price, shoppingLink },
    { new: true }
  );
  if (!gift) return res.status(404).json({ message: "Gift not found" });
  res.json(gift);
});

// Admin: Delete Gift
app.delete("/api/gifts/:id", auth, isAdmin, async (req, res) => {
  const { id } = req.params;
  const gift = await Gift.findByIdAndDelete(id);
  if (!gift) return res.status(404).json({ message: "Gift not found" });
  res.json({ message: "Gift deleted" });
});

// Seed initial gifts with original-style links
const seedGifts = async () => {
  const count = await Gift.countDocuments();
  if (count === 0) {
    await Gift.insertMany([
      {
        name: "Luxury Watch",
        description: "Elegant timepiece for special occasions",
        price: 250,
        shoppingLink: "https://www.amazon.com/dp/B08XYZ1234",
      },
      {
        name: "Board Game",
        description: "Fun family gathering game",
        price: 35,
        shoppingLink: "https://www.amazon.com/dp/B09ABC5678",
      },
      {
        name: "Perfume",
        description: "Great birthday gift",
        price: 60,
        shoppingLink: "https://www.amazon.com/dp/B07DEF9012",
      },
      {
        name: "Wireless Earbuds",
        description: "High-quality audio for music lovers",
        price: 80,
        shoppingLink: "https://www.amazon.com/dp/B0CXYZ7890",
      },
      {
        name: "Leather Wallet",
        description: "Stylish and durable",
        price: 40,
        shoppingLink: "https://www.amazon.com/dp/B08PQR3456",
      },
      {
        name: "Smartphone Stand",
        description: "Adjustable for video calls",
        price: 15,
        shoppingLink: "https://www.amazon.com/dp/B09GHI2345",
      },
      {
        name: "Cookbook",
        description: "Best recipes for beginners",
        price: 25,
        shoppingLink: "https://www.amazon.com/dp/B07JKL6789",
      },
      {
        name: "Fitness Tracker",
        description: "Track steps and heart rate",
        price: 120,
        shoppingLink: "https://www.amazon.com/dp/B0ABCD1234",
      },
      {
        name: "Coffee Maker",
        description: "Single-serve brewing system",
        price: 90,
        shoppingLink: "https://www.amazon.com/dp/B08XYZ5678",
      },
      {
        name: "Backpack",
        description: "Durable for travel",
        price: 70,
        shoppingLink: "https://www.amazon.com/dp/B09ABC9012",
      },
      {
        name: "Digital Camera",
        description: "Compact for photography",
        price: 300,
        shoppingLink: "https://www.amazon.com/dp/B07DEF3456",
      },
      {
        name: "Yoga Mat",
        description: "Non-slip for workouts",
        price: 20,
        shoppingLink: "https://www.amazon.com/dp/B09GHI5678",
      },
      {
        name: "Bluetooth Speaker",
        description: "Portable audio device",
        price: 50,
        shoppingLink: "https://www.amazon.com/dp/B0ABCD5678",
      },
      {
        name: "Sunglasses",
        description: "UV-protected stylish shades",
        price: 45,
        shoppingLink: "https://www.amazon.com/dp/B08PQR7890",
      },
      {
        name: "Electric Kettle",
        description: "Fast boiling for tea",
        price: 30,
        shoppingLink: "https://www.amazon.com/dp/B07JKL9012",
      },
      {
        name: "Notebook",
        description: "Leather-bound journal",
        price: 15,
        shoppingLink: "https://www.amazon.com/dp/B09ABC3456",
      },
      {
        name: "Gaming Mouse",
        description: "Ergonomic for gamers",
        price: 60,
        shoppingLink: "https://www.amazon.com/dp/B0CXYZ9012",
      },
      {
        name: "Hoodie",
        description: "Comfortable casual wear",
        price: 40,
        shoppingLink: "https://www.amazon.com/dp/B07DEF7890",
      },
      {
        name: "Puzzle Set",
        description: "Challenging 1000-piece puzzle",
        price: 25,
        shoppingLink: "https://www.amazon.com/dp/B09GHI9012",
      },
      {
        name: "Hair Dryer",
        description: "Professional styling tool",
        price: 50,
        shoppingLink: "https://www.amazon.com/dp/B0ABCD3456",
      },
      {
        name: "Desk Lamp",
        description: "LED adjustable light",
        price: 35,
        shoppingLink: "https://www.amazon.com/dp/B08PQR1234",
      },
      {
        name: "Running Shoes",
        description: "Lightweight for jogging",
        price: 80,
        shoppingLink: "https://www.amazon.com/dp/B07JKL2345",
      },
      {
        name: "Smartwatch",
        description: "Fitness and notification tracker",
        price: 150,
        shoppingLink: "https://www.amazon.com/dp/B0CXYZ3456",
      },
      {
        name: "Art Supplies Kit",
        description: "For creative projects",
        price: 45,
        shoppingLink: "https://www.amazon.com/dp/B09ABC7890",
      },
      {
        name: "Electric Toothbrush",
        description: "Advanced oral care",
        price: 70,
        shoppingLink: "https://www.amazon.com/dp/B07DEF1234",
      },
      {
        name: "Travel Mug",
        description: "Insulated for coffee",
        price: 20,
        shoppingLink: "https://www.amazon.com/dp/B09GHI3456",
      },
      {
        name: "Headphones",
        description: "Noise-canceling audio",
        price: 100,
        shoppingLink: "https://www.amazon.com/dp/B0ABCD7890",
      },
      {
        name: "Skincare Set",
        description: "Moisturizing gift pack",
        price: 35,
        shoppingLink: "https://www.amazon.com/dp/B08PQR5678",
      },
      {
        name: "Chess Set",
        description: "Classic wooden design",
        price: 40,
        shoppingLink: "https://www.amazon.com/dp/B07JKL5678",
      },
      {
        name: "Portable Charger",
        description: "High-capacity power bank",
        price: 25,
        shoppingLink: "https://www.amazon.com/dp/B09ABC2345",
      },
      {
        name: "Book: Best Seller",
        description: "Latest fiction novel",
        price: 15,
        shoppingLink: "https://www.amazon.com/dp/B0CXYZ7890",
      },
    ]);
    console.log("Seeded initial gifts");
  }
};
seedGifts().catch(console.error);

app.listen(5000, () => console.log("Server running on port 5000"));
