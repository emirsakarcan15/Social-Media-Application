const User = require("../models/user")
const bcrypt = require("bcrypt")
const dotenv = require("dotenv")
const jwt = require("jsonwebtoken")

dotenv.config()


const postSignup = async (req, res) => {
    const { username, password, rePassword } = req.body;

    if (!username || !password || !rePassword) {
        return res.status(400).json({ message: "All fields are required."});
    }

    if (username.includes(" ") || username.includes("@") || username.includes("#") || username.includes("$") || username.includes("%") || username.includes("^") || username.includes("&") || username.includes("*") || username !== username.toLowerCase()) {
        return res.status(400).json({ message: "Username can't include space, uppercase or special character" });
    }

    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
        return res.status(409).json({ message: "Username already taken."});
    }

    if (password !== rePassword) {
        return res.status(400).json({ message: "Passwords do not match."});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        username: username,
        password: hashedPassword,
        createdAt: new Date(),
        lastLogin: new Date(),
        photos: [],
        reels: [],
        profilePhoto: "",
        followers: [],
        following: [],
        bio: ""
    }

    const USER = await User.create(newUser);

    const token = jwt.sign({ id: USER._id}, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    })

    res.status(200).json({ message: "Signup successful!"});
}

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "All fields are required."});
    }

    const allUsers = await User.find();
    const existingUser = allUsers.find( user => user.username === username);
    
    if (!existingUser) {
        return res.status(401).json({ message: "Invalid username or password."});
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
        return res.status(401).json({ message: "Invalid username or password."});
    }

    existingUser.lastLogin = new Date();
    await existingUser.save();

    const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    })

    res.status(200).json({ message: "Login successful!"});
}

const get = (req, res) => {
    res.send("Account route is working!");
}

module.exports = {
    postSignup,
    postLogin,
    get
};