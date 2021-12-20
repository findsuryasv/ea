const express = require('express');
const mongoose = require('mongoose');
const userModel = require('./models/user');
const orderModel = require('./models/order');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();

app.use(express.json());

try {
    mongoose.connect('mongodb+srv://ideyalabs:ideyalabs@cluster0.c3wmm.mongodb.net/ec?retryWrites=true&w=majority');
    console.log('Connected to database')
} catch (error) {
    console.log(error)
}


app.post('/authenticate', async (req, res) => {
    console.log(req.body)
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            res.status(409);
            return;
        }
        const comapre = await bcrypt.compare(req.body.password, user.password);
        if (comapre) {
            res.status(200).json({ token: jwt.sign({id:user._id}, 'ideyalabs') });
            return;
        } else {
            res.status(409);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});


app.post('/create', async (req, res) => {
    try {
        const hasUser = await userModel.findOne({ email: req.body.email });
        if (!hasUser) {
            console.log(hasUser);
            const user = await userModel.create({ email: req.body.email, password: bcrypt.hashSync(req.body.password, 10) });
            res.status(200).json({ token: jwt.sign(user._id, 'ideyalabs') });
            return;
        } else {
            res.sendStatus(409);
            return;
        }
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
});

app.post('/create-order', async (req, res) => {
    try {
        const res = await orderModel.create(req.body);
        res.sendStatus(200);
    } catch (error) {
        res.status(500).json(error)
    }
});

app.get('/orders/:id', async (req, res) => {
    try {
        const res = await orderModel.find({ userId: req.params.id });
        res.status(200).json(res);
    } catch (error) {
        res.status(500).json(error)
    }
});


app.listen(80, () => {
    console.log('Connected on a port 80')
})