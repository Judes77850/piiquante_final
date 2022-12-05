const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const dotenv = require("dotenv");
dotenv.config();

exports.signup = (req, res, next) => {
  const regexes = {
    password: 
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,300}$/
  }
  if (regexes.password.test(req.body.password) == false){
    res.status(401).json({ message: 'Mot de passe pas assez sécurisé' })
    console.log('Mot de passe pas assez sécurisé');
  } else {
    bcrypt
      .hash(req.body.password, 15)
      .then((hash) => {
        const user = new User({
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "utilisateur crée" }))
          .catch((error) => res.status(400).json({ error }));
      })
      .catch((error) => res.status(500).json({ error }));
  }
  return;
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        res.status(401).json({ message: "paire id/mdp incorrecte 1" });
      } else {
        bcrypt
          .compare(req.body.password, user.password)
          .then((valid) => {
            if (!valid) {
              res.status(401).json({ message: "paire id/mdp incorrecte 2" });
            } else {
              res.status(200).json({
                userId: user._id,
                token: jwt.sign({ userId: user._id }, process.env.TOKEN, {
                  expiresIn: "24h",
                }),
              });
            }
          })
          .catch((error) => {
            res.status(500).json({ message: "bug1" });
          });
      }
    })
    .catch((error) => res.status(500).json({ message: "bug 2" }));
};
