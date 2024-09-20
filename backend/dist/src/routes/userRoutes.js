"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
router.post("/user", userController_1.createUserController);
router.get("/users", userController_1.getUsersController);
exports.default = express_1.Router;
