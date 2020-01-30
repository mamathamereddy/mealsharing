const express = require('express');
const app = express();
const router = express.Router();
const pool = require('./../database');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
// api/meals/ - Returns all meals
router.get("/", (request, response) => {
    pool.query(`SELECT * FROM meals`, function(error, results, fields) {
        if (error) {
            return response.send(error);
        }

        response.json(results);
    });
});

//Adds a new meal
router.post('/', (request, response) => {
    const meal = request.body;
    pool.query('INSERT into meals SET ?', meal, function(error, results, fields) {
        if (error) {
            return response.send(error);
        }
        response.json(results);
    });
});

//Returns meal by id
router.get('/:id', (request, response) => {
    const id = request.params.id;
    pool.query(`SELECT * FROM meals WHERE id = ${id}`, function(error, results, fields) {
        if (error) {
            return response.send(error);
        }
        response.json(results);
    });
});

//Updates the meal by id
router.put('/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE `meals` SET `title`=?,`description`=?,`price`=? where `id`=?', [
            request.body.title,
            request.body.description,
            request.body.price,
            parseInt(id)
        ],
        function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.send(`Meal with id ${id} has been updated`);
        });
});

//Delete the meal by id
router.delete('/:id', (request, response) => {
    const id = request.params.id;
    pool.query(`DELETE FROM meals WHERE id = ${id}`, function(error, results, fields) {
        if (error) {
            return response.send(error);
        }
        response.send(`Meal with id ${id} has been deleted!`);
    });
});

//GET api/meals/ query parameters
router.get('/', (request, response) => {
    const { maxPrice } = request.query;
    const { availableReservations } = request.query;
    const { title } = request.query;
    const { createdAfter } = request.query;
    const { limit } = request.query;
    if (maxPrice) {
        pool.query(`SELECT * FROM meals WHERE price >= ${maxPrice}`, function(error, results, fields) {
            response.json(results);
        });
    }
    if (availableReservations) {
        pool.query(
            `SELECT meals.id AS id, meals.title AS title,  
        SUM(reservations.numberOfGuests), 
        meals.maxReservations
        FROM meals 
        JOIN reservations ON reservations.meal_id = meals.id
        WHERE reservations.numberOfGuests < meals.maxReservations
        GROUP BY reservations.meal_id`,
            function(error, results, fields) {
                if (error) {
                    return response.send(error);
                }
                response.json(results);
            });
    }
    if (title) {
        const Title = title.trim().replace(/[^\w\s]/gi, "");
        pool.query(`SELECT * FROM meals WHERE title LIKE '%${Title}%'`, function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.json(results);
        });
    }
    if (createdAfter) {
        pool.query(`SELECT * FROM meals WHERE createdAt >= '${createdAfter}'`, function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.json(results);
        });
    }
    if (limit) {
        pool.query(`SELECT * FROM meals LIMIT ${limit}`, function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.json(results);
        });
    } else {
        pool.query('SELECT * FROM meals', function(error, results, fields) {
            if (error) {
                return response.send(error);
            }
            response.json(results);
        });
    }
});

module.exports = router;