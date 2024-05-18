import { Router } from 'express';
import UserController from "../../controllers/userController";

const router = Router();
const controller: UserController = new UserController()

router.post('/users', controller.createUser);
router.get('/users', controller.getAllUser);
router.get('/users/:id', controller.getUserById);
router.put('/users/:id', controller.updateUser);
router.delete('/users/:id', controller.deleteUser);

export default router;
