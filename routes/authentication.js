"use strict";

/**
Аутентификация(authentication) -
                это процесс проверки учётных данных пользователя (логин/пароль).
                Проверка подлинности пользователя путём сравнения введённого им логина/пароля
                с логином/паролем, сохранённым в базе данных пользователей.

Авторизация(authorization) - 
                это проверка прав пользователя на доступ к определенным ресурсам.
*/

var express = require("express");
var router = express.Router();
var passport = require("passport");
var mongoose = require("mongoose");

var User = mongoose.model("User");

router.post("/register", function(req, res, next) {
  if (!req.body.username || !req.body.password || !req.body.repeat) {
    // 400 = bad request
    return res.status(400).json({ err: "Заполните все поля" });
  }

  if (req.body.password !== req.body.repeat) {
    // 400 = bad request
    return res.status(400).json({ err: "Пароли не совпадают" });
  }

  var user = new User();
  user.username = req.body.username;
  user.setPassword(req.body.password);

  user.save(err => {
    if (!err) {
      res.json({ token: user.generateJWT() });
    } else {
      res.status(401).json({err: err.message});
    }
  });
});

router.post("/login", function(req, res, next) {
  if (!req.body.username || !req.body.password) {
    return res.status(400).json({ err: "Заполните все поля" });
  }

  passport.authenticate("local", function(err, user, info) {
    if (err) {
      res.status(500);
      res.json({ err: "Database error" });
    } else if (user) {
      res.json({ token: user.generateJWT() });
    } else {
      res.status(401);
      res.json({ err: info });
    }
  })(req, res, next);
});

module.exports = router;
