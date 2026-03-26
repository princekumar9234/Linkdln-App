import User from "../models/user.model.js";
import Profile from "../models/profile.model.js";
import bcrypt from "bcrypt";
import crypto from "crypto";
import PDFDocument from "pdfkit";
import fs from "fs";

//convert User Data TO PDF.

const convertUserDataTOPDF = async (userData) => {
  const doc = new PDFDocument();

  const outputPath = crypto.randomBytes(32).toString("hex") + ".pdf";
  const stream = fs.createWriteStream("uploads/" + outputPath);

  doc.pipe(stream);

  doc.image(`uploads/${userData.userId.profilePicture}`, {
    align: "center",
    width: 100,
  });
  doc.fontSize(14).text(`Name: ${userData.userId.name}`);
  doc.fontSize(14).text(`username: ${userData.userId.username}`);
  doc.fontSize(14).text(`Email: ${userData.userId.email}`);
  doc.fontSize(14).text(`Bio: ${userData.bio}`);
  doc.fontSize(14).text(`Current Position: ${userData.currentPost}`);

  doc.fontSize(14).text("past work : ");
  userData.pastWork.forEach((work, index) => {
    doc.fontSize(14).text(`company Name :${work.company}`);
    doc.fontSize(14).text(`position: ${work.position}`);
    doc.fontSize(14).text(`year: ${work.year}`);
  });

  doc.fontSize(14).text("education : ");
  userData.pastWork.forEach((edu, index) => {
    doc.fontSize(14).text(`School Name :${edu.school}`);
    doc.fontSize(14).text(`Degree: ${edu.degree}`);
    doc.fontSize(14).text(`fieldOfStudy: ${edu.fieldOfStudy}`);
  });

  doc.end();

  return outputPath;
};

export const register = async (req, res) => {
  try {
    const { name, email, password, username } = req.body;

    if (!name || !email || !password || !username)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({
      email,
    });
    if (user) return res.status(400).json({ messafe: "user alredy exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();

    const profile = new Profile({ userId: newUser._id });

    await profile.save();

    return res.json({ message: "User Created" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(404).json({ message: "all fields are required" });

    const user = await User.findOne({
      email,
    });

    if (!user) return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "invalid Credentials" });
    const token = crypto.randomBytes(32).toString("hex");

    await User.updateOne({ _id: user.id }, { token });

    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//  update for user profile picture
export const uploadProfilePicture = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    user.profilePicture = req.file.filename;

    await user.save();

    return res.json({ message: "Profile picture updated!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// for user update our profile.
export const updateUserProfile = async (req, res) => {
  try {
    const { token, ...newUserData } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    const { username, email } = newUserData;
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      if (existingUser || String(existingUser.id) !== String(user._id)) {
        return res.status(400).json({ message: "user already exists!" });
      }
    }
    Object.assign(user, newUserData);
    await user.save();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserAndProfile = async (req, res) => {
  try {
    const { token } = req.body;

    const user = await User.findOne({ token: token });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const userProfile = await Profile.findOne({ userId: user._id }).populate(
      "userId",
      "name email username profilePicture",
    );
    return res.json(userProfile);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateProfileData = async (req, res) => {
  try {
    const { token, ...newProfileData } = req.body;
    const userProfile = await User.findOne({ token: token });

    if (!userProfile) {
      return res.status(404).json({ message: "user not found" });
    }

    const profile_to_update = await Profile.findOne({ userId: userProfile.id });
    Object.assign(profile_to_update, newProfileData);

    await profile_to_update.save();
    return res.json({ message: "profile updated" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getAllUserProfile = async (_req, res) => {
  try {
    const profiles = await Profile.find().populate(
      "userId",
      "name username email profilePicture",
    );
    return res.json({ profiles });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

//for download resume with the help of username.
export const downloadProfile = async (req, res) => {
  const user_id = req.query.id;
  const userProfile = await Profile.findOne({ userId: user_id }).populate(
    "userId",
    "name username email profilePicture",
  );

  let outputPath = await convertUserDataTOPDF(userProfile);

  return res.json({ message: outputPath });
};

export const sendConnectionRequest = async (req, res) => {
  const { token, connetionId } = req.body;

  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const connectionUser = await User.findOne({ _id: "connectionId" });
    if (!connectionUser) {
      return res.status(404).json({ message: "connection  User not found" });
    }

    const existingRequest = await ConnectionRequest.findOne({
      userId: user._id,
      connectionId: connectionUser._id,
    });

    if (existingRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    const request = new ConnectionRequest({
      userId: user.id,
      connectionId: connectionUser._id,
    });

    await request.save();

    return res.json({ message: " requset sent" });
  } catch (err) {
    return res.status(500).json({ message: " error.message " });
  }
};

export const getMyConnectionsRequests = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }

    const connections = await ConnectionRequest.find({
      userId: user_.id,
    }).populate("userId", "name email username profilePicture");

    return res.json({ connections });
  } catch (error) {
    return res.status(500).json({ message: " error.message " });
  }
};

export const whatAreMyConnections = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    const connections = await ConnectionRequest.find({
      connectionId: user._id,
    }).populate("userId", "name email username profilePicture");

    return res.json(connections);
  } catch (error) {
    return res.status(500).json({ message: " error.message " });
  }
};

export const acceptConnectionRequest = async (req, res) => {
  const { token, requestId, action_type } = req.body;
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({ message: "user not found!" });
    }
    if (action_type === "accept") {
      connection.status_accepted = true;
    } else {
      connection.status_accepted = false;
    }

    await connection.save();
    return res.json({ message: "request updated" });
  } catch (error) {
    return res.status(500).json({ message: " error.message " });
  }
};
