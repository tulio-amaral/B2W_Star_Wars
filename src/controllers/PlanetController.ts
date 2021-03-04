import axios  from 'axios';
import { Request, Response } from 'express';

import Planet from '../schema/Planet';

class PlanetController {
  async create(request: Request, response: Response) {
    const { name, climate, terrain } = request.body;

    if(!name || !climate || !terrain) {
      return response.status(400).send('Required param missing!')
    }

    const formattedName = name.charAt(0).toUpperCase() + name.slice(1);

    const alreadyCreated = await Planet.findOne({ name: formattedName });

    console.log(alreadyCreated);

    if(alreadyCreated) {
      return response.status(400).send('Planet already created!');
    };

    const { data } = await axios(`https://swapi.dev/api/planets/?search=${formattedName}`);

    const appearances = data.results[0].films.length;

    const planet = await Planet.create({
      name: formattedName, 
      climate, 
      terrain,
      appearances
    });

    return response.json(planet);
  }
  async list(request: Request, response: Response) {
    const planets = await Planet.find();

    return response.json(planets);
  }
  async findByName(request: Request, response: Response) {
    const { name } = request.query;

    const formattedName = String(name).charAt(0).toUpperCase() + String(name).slice(1);

    const planet = await Planet.findOne({ name: formattedName });

    return response.json(planet);
  }
  async findByID(request: Request, response: Response) {
    const { _id } = request.params;

    const planet = await Planet.findOne({ _id });

    return response.json(planet);
  }
  async remove(request: Request, response: Response) {
    const { _id } = request.params;

    await Planet.findOneAndDelete({ _id });

    return response.status(204).send();
  }
};

export default PlanetController;
