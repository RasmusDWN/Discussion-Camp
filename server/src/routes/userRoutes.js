// import express from "express";
// const router = express.Router();

// const userDB = require("../Models/userDB");

// const { response } = require("express");
// const userDB = require("../Models/userDB");

// import { signin, signup } from "../controllers/user";

// router.post("/signin", signin);
// router.post("/signup", signup);

// export default router;

module.exports = (userDB) => {
    const express = require('express');
    const router = express.Router();
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcryptjs');

    const secret = 'test';

    router.post('/signin', async (req, res) => {
        const { username, password } = req.body;

        try {
            const oldUser = await UserModel.findOne({ username });
    
            if (!oldUser) return res.status(404).json({ message: "User doesn't exist" });
    
            const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);
    
            if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid credentials" });
    
            const token = jwt.sign({ username: oldUser.username, id: oldUser._id}, secret, { expiresIn: '1h' });
    
            res.status(200).json({ result: oldUser, token });
        } catch(error) {
            res.status(500).json({ message: "Something went wrong" });
        }
    
    });

    router.post('/signup', async (req, res) => {
        const { username, password } = req.body;

        try {
            const oldUser = await UserModel.findOne({ username });

            if (oldUser) return res.status(400).json({ message: "User already exists"});

            const hashedPassword = await bcrypt.hash(password, 14);

            const result = await UserModel.create({ username, password: hashedPassword, name: `${username}`});

            const token = jwt.sign({ username: result.username, id: result._id}, secret, { expiresIn: "1h"});

            res.status(201).json({ result, token});
        } catch(error) {
            res.status(500).json({ message: "Something went wrong"});
        
            console.log(error);
        }

    });

    return router;
}

