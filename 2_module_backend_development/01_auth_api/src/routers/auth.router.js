import { Router } from 'express';
import AuthController from '../controllers/auth.controller.js';
import AuthService from '../services/auth.service.js';
import { validateSignInDto } from '../middleware/validators/validateSignInDto.js';
import { validateSignUpDto } from '../middleware/validators/validateSignUpDto.js';

export default class AuthRouter {
  /** @type Router */
  router;

  /**
   * @private @type AuthController
   */
  _authController;

  /**
   * @param {AuthService} authService
   */
  constructor(authService) {
    this.router = Router();
    this._authController = new AuthController(authService);
    this._initRoutes();
  }

  /** @private */
  _initRoutes() {
    this.router.post(
      '/sign-in',
      validateSignInDto,
      this._authController.signIn.bind(this._authController) // bind correct context
    );
    this.router.post(
      '/sign-up',
      validateSignUpDto,
      this._authController.signUp.bind(this._authController)
    );
  }
}
