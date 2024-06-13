import { Router } from 'express';
import UserController from "../../controllers/userController";
import {auth} from "../../middlewares/auth"
const router = Router();
const controller: UserController = new UserController()

router.post('', auth, controller.createUser);
router.get('', controller.getAllUser);
router.get('/:id', controller.getUserById);
router.put('/:id',auth, controller.updateUser);
router.delete('/:id', auth, controller.deleteUser);
router.get('/search', controller.searchUserByName); 
router.post('/:id/avatar', controller.uploadAvatar);

export default router;
