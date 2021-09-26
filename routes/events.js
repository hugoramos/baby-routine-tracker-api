const express = require('express');
const router = express.Router();
const events = require('../services/events');

router.get('/', async function (req, res, next) {
  try {
    res.json(await events.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error getting events `, err.message);
    next(err);
  }
});

router.get('/GetByDate', async function (req, res, next) {
  try {
    res.json(await events.getByDate(req.query.date));
  } catch (err) {
    console.error(`Error getting events `, err.message);
    next(err);
  }
});

router.post('/', async function (req, res, next) {
  console.log('POST /')
  try {
    res.json(await events.create(req.body));
  } catch (err) {
    console.error(`Error creating events`, err.message);
    next(err);
  }
});

router.put('/:id', async function (req, res, next) {
  try {
    res.json(await events.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating event`, err.message);
    next(err);
  }
});

router.delete('/:id', async function (req, res, next) {
  try {
    res.json(await events.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting event`, err.message);
    next(err);
  }
});

router.post('/updateDate/:id', async function (req, res, next) {
  console.log('POST /')
  try {
    res.json(await events.updateDate(req.params.id, req.body));
  } catch (err) {
    console.error(`Error updating events`, err.message);
    next(err);
  }
});


module.exports = router;