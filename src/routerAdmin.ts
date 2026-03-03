import express from 'express';
const routerAdmin = express.Router();

import restaurantController from './controllers/restaurant.controller';

// 🏠 Home page
routerAdmin.get('/', restaurantController.goHome);

// 🔐 Login routes
routerAdmin
  .route('/login')
  .get(restaurantController.getLogin)
  .post(restaurantController.processLogin);

// 📝 Signup routes
routerAdmin
  .route('/signup')
  .get(restaurantController.getSignUp)
  .post(restaurantController.processSignup);

export default routerAdmin;