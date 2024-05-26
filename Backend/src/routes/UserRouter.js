const express = require("express");
const router = express.Router()
const userController = require('../controllers/UserController');
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

router.post('/sign-up' , userController.createUser)
router.post('/sign-in' , userController.loginUser)
router.post('/log-out' , userController.logoutUser)
router.put('/update-user/:id', authUserMiddleware,  userController.updateUser) //Temporary remove authMiddleware
router.delete('/delete-user/:id', authMiddleware, userController.deleteUser)    //Temporary remove authMiddleware
router.get('/getAll', authMiddleware, userController.getAllUser)   //Temporary remove authMiddleware
router.get('/get-details/:id', userController.getDetailsUser) //Temporary remove authMiddleware
router.post('/refresh-token', userController.refreshToken)
router.post('/delete-many' , authMiddleware,  userController.deleteManyUser) //Temporary remove authMiddleware

module.exports = router