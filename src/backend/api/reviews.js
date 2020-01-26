const express = require ('express');
const app = express ();
const router = express.Router ();
const pool = require ('./../database');
const bodyParser = require ('body-parser');

router.use (bodyParser.json ());

// api/reviews/ - Returns all reviews
router.get ('/', (request, response) => {
  pool.query (`SELECT * FROM reviews`, function (error, results, fields) {
    if (error) {
      return response.send (error);
    }
    response.json (results);
  });
});

//Adds a new review
router.post ('/', (request, response) => {
  const newReview = request.body;
  pool.query ('INSERT into reviews SET ?',newReview,function(error, results, fields){
      if (error) {
        return response.send (error);
      }
      response.json (results);
    }
  );
});

//Returns reviews by id
router.get ('/:id', (request,response) => {
  const id = request.params.id;
  pool.query (`SELECT * FROM reviews WHERE id = ${id}`,function(error, results, fields) {
      if (error) {
        return response.send (error);
      }
      response.json (results);
    }
  );
});

//Updates the reviews by id
router.put ('/:id', (request, response) => {
  const id = request.params.id;
  pool.query (`UPDATE reviews SET title = ?, description = ?, meal_id = ?, stars = ?, createdAt= ? WHERE id = ?`,
    [
      request.body.title,
      request.body.description,
      request.body.meal_id,
      request.body.stars,
      request.body.createdAt,
      parseInt (id),
    ],
    function (error, results, fields) {
      if (error) {
        return response.send (error);
      }
      response.send (`Reviews with id ${id} has been updated`);
    });
});

//Delete the review by id
router.delete ('/:id', (request, response) => {
  const id = request.params.id;
  pool.query (`DELETE FROM reviews WHERE id = ${id}`, function ( error, results, fields) {
    if (error) {
      return response.send (error);
    }
    response.send (`Reviews with id ${id} has been deleted!`);
  });
});

module.exports = router;
