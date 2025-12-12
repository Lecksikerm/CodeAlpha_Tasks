const bcrypt = require("bcryptjs");
const { AppDataSource } = require("../data-source");
const User = require("../entities/User");
const { ObjectId } = require("mongodb"); 
const jwt = require("jsonwebtoken");

const userRepo = () => AppDataSource.getMongoRepository(User);

// Register
exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const existing = await userRepo().findOne({ where: { email } });
        if (existing) return res.status(400).json({ message: "Email already exists" });

        const hashed = await bcrypt.hash(password, 10);

        const newUser = userRepo().create({
            _id: new ObjectId(),
            name: name || "",
            email,
            password: hashed,
            isAdmin: false,
            createdAt: new Date()
        });

        const savedUser = await userRepo().save(newUser);
        console.log("Saved user:", savedUser);

        res.status(201).json({ id: savedUser._id.toString(), email: savedUser.email });
    } catch (err) {
        console.error("Register Error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Login controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userRepo().findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id.toString(), isAdmin: user.isAdmin },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "7d" }
    );

    res.json({
      token,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
