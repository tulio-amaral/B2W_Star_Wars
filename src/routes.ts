import { Router } from 'express';
import axios from 'axios';

import PlanetController from './controllers/PlanetController';

const routes = Router();

const planetController = new PlanetController;

routes.post('/planets', planetController.create);

routes.get('/planets', planetController.list);
routes.get('/planets/search/:name', planetController.findByName);
routes.get('/planets/:_id', planetController.findByID);

routes.delete('/planets/:_id', planetController.remove);

export default routes;