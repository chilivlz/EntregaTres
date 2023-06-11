


//Arreglar esto//

import express from 'express';
import { UserModel } from '../models/users.model.js';
export const routerUser = express.Router();

routerUser.get('/', async (req, res) => {
  try {
    const users = await UserModel.find({});
    return res.status(200).json({
      status: 'success',
      msg: 'listado de usuarios',
      data: users,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

routerUser.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const userCreated = await UserModel.createUser(firstName, lastName, email);

    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

routerUser.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { firstName, lastName, email } = req.body;

    const userUptaded = await UserModel.updateUser(id, firstName, lastName, email);
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: userUptaded,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

//BIEN!!! RUTEAR!!!
routerUser.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserModel.deleteUser(id);
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});