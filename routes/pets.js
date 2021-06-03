const express = require('express');
const Joi = require('@hapi/joi');

const Pets = require('../models/pets');
const { validateBody } = require('../middlewares/route');

const router = express.Router();

router.post(
  '/',
  validateBody(Joi.object().keys({
    name: Joi.string().required().description('Pets name'),
    colour: Joi.string().required().description('Pets coloyr'),
    age: Joi.number().integer().required().description('Pets age')
  }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {
      const pet = new Pets(req.body);
      await pet.save();
      res.status(201).json(pet);
    } catch (e) {
      next(e);
    }
  }
)
.get(
  '/',
    async (req, res, next) => {
    try {

     const allPets =  await Pets.find({});
      res.status(200).json(allPets);
    } catch (e) {
      next(e);
    }
  }
)
.delete(
  '/',
  validateBody(Joi.object().keys({
      name: Joi.string().required().description('Pet name'),
      }),
  {
    stripUnknown: true,
  }),
  async (req, res, next) => {
    try {   
     await Pets.deleteOne({name:req.body.name})
     .then(res=>{
      res.status(200).json({"message":"Pet data deleted successfully"});
     })
     .catch(err =>{
       console.log(err);
       res.send(err);
     });
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;