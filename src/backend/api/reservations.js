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

///Adds a new reservation
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

//post
/*
class Reservation {
  constructor(reservationObj) {
    if(!reservationObj.name)
      throw "reservation need to have name";
       else 
      this.name = reservationObj.name;
    if(!reservationObj.phone)
      throw "reservation need to have phone number";
      else
      this.phone = reservationObj.phone;
    if(!reservationObj.email)
      throw "reservation need to have email";
      else
      this.email = reservationObj.email;
  if(!reservationObj.mealId)
      throw "reservation need to have mealId";
      else
      this.mealId = reservationObj.mealId;

  if(!reservationObj.numberOfGuests)
      throw "reservation need to have numberOfGuest";
      else
      this.numberOfGuests = reservationObj.numberOfGuests;
  } 
}

router.post('/add-reservation', (req, res) => {
  let reservation;
   try {
      reservation = new Reservation (req.body);
      console.log(reservation);
    } catch (e) {
      return res.json(e);
    }
  pool.query("INSERT INTO reservation SET ?", reservation, (error, results, fields) => {
    if(error) {
        return res.send(error)
    } else {
        res.json("Reservation added successfully")
    }
  })
}) 
*/


module.exports = router;