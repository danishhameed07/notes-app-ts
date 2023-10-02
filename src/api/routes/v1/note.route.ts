import * as express from 'express';
import * as controller from '../../controllers/note.controller';
import { validateNote, validateNoteParams } from '../../utils/api-validator';

const router = express.Router();

router.route('/create').post(validateNote, controller.create);
router.route('/edit').put(validateNote, controller.edit);
router.route('/delete/:noteId').delete(validateNoteParams, controller.deleteNote);
router.route('/get/:noteId').get(validateNoteParams, controller.get);
router.route('/list').get(controller.list);

export default router;
