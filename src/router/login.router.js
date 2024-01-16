const express = require("express");
const router = express.Router();
// khai bao controller 
const loginController = require('../app/controllers/LoginController')

router.get('/profile/:id', loginController.profile)
router.get('/edit/:id', loginController.edit)
router.put('/:id', loginController.update)
router.get('/logout', loginController.logout)
router.get('/register', loginController.register)
router.post('/create', loginController.create)
router.post('/login', loginController.login)

router.get('/', loginController.index)





module.exports = router