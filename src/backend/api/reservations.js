const express = require ('express');
const app = express ();
const router = express.Router ();
const pool = require ('./../database');
const bodyParser = require ('body-parser');

router.use (bodyParser.json ());

// api/reservations/ - Returns all reservations
router.get ('/', (request, response) => {
  pool.query (`SELECT * FROM reservations`, function (error, results, fields) {
    if (error) {
      return response.send (error);
    }
    response.json (results);
  });
});

//Adds a new reservation
router.post ('/', (request, response) => {
  const newReservation = request.body;
  pool.query ('INSERT into reservations SET ?',newReservation,function(error, results, fields){
      if (error) {
        return response.send (error);
      }
      response.json (results);
    });
});

//Returns reservation by id
router.get ('/:id', (request, response) => {
  const id = request.params.id;
  pool.query ( `SELECT * FROM reservations WHERE id = ${id}`,function(error, results, fields){
      if (error) {
        return response.send (error);
      }
      response.json (results);
    });
});

//Update the reservation by id
router.put ('/:id', (request, response) => {
  const id = request.params.id;
  pool.query (`UPDATE reservations SET numberOfGuests = ?, meal_id = ?, createdAt = ? WHERE id = ?`,
    [
      request.body.numberOfGuests,
      request.body.meal_id,
      request.body.createdAt,
      parseInt(id),
    ],
    function (error, results, fields) {
      if (error) {
        return response.send (error);
      }
      response.send (`reservations  with id ${id} has been updated`);
    });
});

//Delete the reservation by id
router.delete ('/:id', (request, response) => {
  const id = request.params.id;
  pool.query (`DELETE FROM reservations WHERE id = ${id}`, function (error,results,fields) {
    if (error) {
      return res.send (error);
    }
    res.send (`reservations with id ${id} has been deleted!`);
  });
});

module.exports = router;
