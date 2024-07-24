const { User } = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { use } = require("../routes/authRoutes");
const { Op } = require("sequelize");
const crypto = require("crypto");

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

// Define Joi schemas
const signupSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  securityQuestion: Joi.string().required(),
  securityAnswer: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

const forgotPasswordSchema = Joi.object({
  email: Joi.string().email().required(),
  securityAnswer: Joi.string(),
});


exports.signup = async (req, res) => {
  try {
    const { error } = signupSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password, securityQuestion, securityAnswer } =
      req.body;

    // Hash the password before saving the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      securityQuestion,
      securityAnswer: hashedSecurityAnswer,
    });
    res.status(201).json({ token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { error } = loginSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, password } = await req.body;

    let user = await User.findOne({ where: { email: email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ token: generateToken(user) });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { error } = forgotPasswordSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, securityAnswer } = req.body;
    console.log(email);
    console.log(securityAnswer);

    let user = await User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(400).send({ error: "User doesn't exist" });
    }

    const isValid = await bcrypt.compare(securityAnswer, user.securityAnswer);
    console.log(isValid);
    if (!isValid) {
     return res.status(400).json({ error: "Invalid security answer" });
    }

    const token = crypto.randomBytes(20).toString("hex");
    const resetPasswordExpires = Date.now() + 3600000;

    // user.resetPasswordToken = token;
    // user.resetPasswordExpires = resetPasswordExpires;

    await User.update(
      {
        resetPasswordToken: token,
        resetPasswordExpires: resetPasswordExpires,
      },
      {
        where: { email: email },
      }
    );

    res
      .status(200)
      .json({ token: token, message: "Password reset token issued" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const {error} = Joi.object({token : Joi.string(), newPassword : Joi.string().min(6)}).validate(req.body);
    if(error){
      return res.status(400).json({error : error})
    }

    const { token, newPassword } = req.body;

    const user = await User.findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [Op.gt]: Date.now() },
      },
    });

    if (!user) {
      return res.status(400).json({ error: "Invalid token or expried" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpires: null,
      },

      { where: { resetPasswordToken: token } }
    );

    console.log(await User.findOne({where : {resetPasswordToken : token}}))

    res.status(200).json({ message: "Password has been reset" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getQuestion = async (req, res) => {
  try {
    const { email } = req.body;
    JSON.stringify(email);
    typeof email;
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
      res.status(400).json({ error: "User doesnt exist SignUp!" });
    }

    res.status(200).json(user.securityQuestion);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
