import { User } from '../models/user';
import { sendSuccessResponse, sendCreatedResponse, sendErrorResponse, sendNotFoundResponse } from '../utils/responseHandler';

export default class UserController {

    createUser = async (req: any, res: any) => {
        try {
            const user = await User.create(req.body);
            sendCreatedResponse(res, user);
        } catch (error) {
            sendErrorResponse(res, error);
        }
    };

    getAllUser = async (req: any, res: any) => {
        try {
            const users = await User.findAll();
            sendSuccessResponse(res, users, 'Users retrieved successfully');
        } catch (error) {
            sendErrorResponse(res, error, 404);
        }
    };

    getUserById = async (req: any, res: any) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                sendSuccessResponse(res, user, 'User retrieved successfully');
            } else {
                sendNotFoundResponse(res);
            }
        } catch (error) {
            sendErrorResponse(res, error);
        }
    };

    updateUser = async (req: any, res: any) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.update(req.body);
                sendSuccessResponse(res, user, 'User updated successfully');
            } else {
                sendNotFoundResponse(res);
            }
        } catch (error) {
            sendErrorResponse(res, error);
        }
    };

    deleteUser = async (req: any, res: any) => {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                res.status(204).send();
            } else {
                sendNotFoundResponse(res);
            }
        } catch (error) {
            sendErrorResponse(res, error);
        }
    };
}
