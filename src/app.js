const express = require("express");
const connectDB = require("./config/database1");
const app = express();
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");

// Middleware to parse JSON request bodies
app.use(express.json());

app.post("/signup", async (req, res) => {
  // Creating a new instance of the User model

  /*
  const user = new User({
    firstName: "Akshay",
    lastName: "Saini",
    emailId: "akshay@saini.com",
    password: "akshay@123",
  });
  */

  try {
    // Step 1: Validate request body
    validateSignupData(req);

    // Step 2: Destructure data
    const { firstName, lastName, emailId, password } = req.body;

    // Step 3: Encrypt password
    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // Step 4: Create new user object
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });

    await user.save();
    res.send("User Added Successfully!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }
});

// Login route
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      throw new Error("EmailID not present in DB");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful!!!");
    } else {
      throw new Error("Password id not correct");
    }
  } catch (err) {
    res.status(400).send("ERROR = " + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    console.log(userEmail);
    const user = await User.findOne({ emailId: userEmail });
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    // const user = await User.findByIdAndDelete({ _id: userId });
    const user = await User.findByIdAndDelete(userId);

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after", // returns updated doc (like {new: true})
      runValidators: true, // enforce schema validation during update
    });

    console.log(user); // Logs the previous (old) data before update
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

connectDB()
  .then(() => {
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server is successfully listening on port 7777...");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected!!");
  });
