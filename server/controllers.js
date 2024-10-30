const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');

const userSchema = Joi.object({
    firstName: Joi.string().min(3).required(),
    lastName: Joi.string().min(3).required(),
    cpf: Joi.string().pattern(/^\d{11}$/).required(),
    password: Joi.string().min(8).required()
});

exports.register = async (req, res) => {
    const { error } = userSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ ...req.body, password: hashedPassword });

    await newUser.save();
    res.status(201).send('Usuário registrado com sucesso');
};

exports.login = async (req, res) => {
    const user = await User.findOne({ cpf: req.body.cpf });
    if (!user || !await bcrypt.compare(req.body.password, user.password)) {
        return res.status(401).send('CPF ou senha incorretos');
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
};
