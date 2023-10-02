import * as express from 'express';
import * as controller from '../../controllers/user.controller';
import { validateUser } from '../../utils/api-validator';

const router = express.Router();

router.route('/register').post(validateUser, controller.register);
router.route('/login').post(validateUser, controller.login);

export default router;
