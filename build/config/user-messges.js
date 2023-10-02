"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundError = exports.getNoteError = exports.deleteNoteError = exports.editNoteError = exports.createNoteError = exports.userLoginAuthError = exports.userLoginError = exports.userRegisterError = exports.userAuthTokenError = exports.listNoteSuccess = exports.getNoteSuccess = exports.deleteNoteSuccess = exports.editNoteSuccess = exports.createNoteSuccess = exports.userLoginSuccess = exports.userRegisterSuccess = void 0;
// success messages
exports.userRegisterSuccess = 'User registered successfully';
exports.userLoginSuccess = 'User logged in successfully';
exports.createNoteSuccess = 'Note created successfully';
exports.editNoteSuccess = 'Note edited successfully';
exports.deleteNoteSuccess = 'Note deleted successfully';
exports.getNoteSuccess = 'Note retrieved successfully';
exports.listNoteSuccess = 'Todos fetched successfully';
// error messages
exports.userAuthTokenError = 'You are not authorized to access this request. Please provide valid access token';
exports.userRegisterError = 'User with the same email already exists. Please register with another one';
exports.userLoginError = 'Incorrect email or password. Please try again';
exports.userLoginAuthError = "Oops! Something went wrong while authenticating.";
exports.createNoteError = 'Oops! Having an error while creating a note';
exports.editNoteError = 'Oops! Having an error while updating a note';
exports.deleteNoteError = 'Oops! Having an error while deleting a note';
exports.getNoteError = 'Oops! unable to find the details for given note';
exports.notFoundError = 'Sorry! We can not find something similar to this';
