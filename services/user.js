const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const getById = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (user) return res.status(200).json(user);
        return res.status(404).json('user-non-trouvé');
    } catch (error) {
        return res.status(501).json(error);
    }
};

const add = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const temp = {
        name: req.body.name,
        firstname: req.body.firstname,
        email: req.body.email,
        password: req.body.password
    };

    try {
        const salt = await bcrypt.genSalt(10);
        temp.password = await bcrypt.hash(temp.password, salt);

        const user = await User.create(temp);
        console.log("User created " + user.name);

    
        return res.status(201).json(user);
    } catch (error) {
        return res.status(501).json(error);
    }
};

const update = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json("user_not_found");

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }

        Object.keys(req.body).forEach((key) => {
            if (req.body[key]) {
                user[key] = req.body[key];
            }
        });

        await user.save();
        return res.status(201).json(user);
    } catch (e) {
        return res.status(501).json(e);
    }
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        await User.deleteOne({ _id: id });
        return res.status(204).json('delete_ok');
    } catch (e) {
        return res.status(501).json(e);
    }
};

const getAll = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: "Erreur serveur", error: e });
    }
};

const getByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "Utilisateur non trouvé" });
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: "Erreur serveur", error: e });
    }
};

const authenticate = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email }, '-__v -createdAt -updateAt');
        if (!user) return res.status(404).json('user_not_found');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(403).json('wrong_credentials');

        const { password: pwd, ...userWithoutPassword } = user._doc;
        const expireIn = 24 * 60 * 60;

        const token = jwt.sign({ user: userWithoutPassword }, process.env.SECRET_KEY, {
            expiresIn: expireIn
        });

    
        return res.status(200).json({
            token: 'Bearer ' + token,
            user: userWithoutPassword
        });
    } catch (error) {
        return res.status(501).json(error);
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    return res.status(200).json({ message: 'Déconnecté avec succès' });
};

module.exports = {
    getAll,
    getById,
    getByEmail,
    add,
    update,
    delete: deleteUser,
    authenticate,
    logout
};
