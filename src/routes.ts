import { Router } from 'express';
import { MessagesController } from './controllers/MessagesController';
import { SettingsController } from './controllers/SettingsController';
import { UsersController } from './controllers/UsersController';

const routes = Router();

const settingsController = new SettingsController();
const messagesController = new MessagesController();
const usersController = new UsersController();

routes.get('/messages/:id', messagesController.showByUser);
routes.post('/messages', messagesController.create);
routes.post('/settings', settingsController.create);
routes.post('/users', usersController.create);

export { routes };
