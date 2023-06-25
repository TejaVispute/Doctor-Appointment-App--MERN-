const userModel = require("../models/userModels")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
// register callback function
const registerController = async (req, res) => {
    // console.log(req.body)
    try {
        const existingUser = await userModel.findOne({ email: req.body.email })

        if (existingUser) {
            return res.status(200).send({
                message: "User already exists Please",
                success: false

            })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();

        res.status(201).send({ message: "Register Successfully", success: true });



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false, message: `Register Controller ${error.message}`
        })

    }
}



// login callback function
const loginController = async (req, res) => {

    try {
        const user = await userModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).send({ message: 'user Not Found' });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            return res.statue(200).send({
                message: 'invalid Email or password',
                success: false,
            })
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' })

        res.status(200).send({ message: 'Login Success', success: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: `Error occured while login ${error.message}`,
            success: false,
        });
    }
}


// auth controller

const authController = async (req, res) => {
    // console.log(req.body.userId)
    try {
        const user = await userModel.findOne({ _id: req.userId });
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false,

            })
        } else {
            res.status(200).send({
                success: true,
                data: {
                    name: user.name,
                    email: user.email
                }
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Auth Error",
            success: false,
        });
    }
}

module.exports = { loginController, registerController, authController }