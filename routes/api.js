const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.post("/api/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.post("/api/workouts/bulk", ({ body }, res) => {
    Workout.insertMany(body)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts", (req, res) => {
    Workout.find({})
        .sort({ date: -1 })
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate(
        [{
            $addFields: {
                totalDuration: {
                    $sum: '$exercises.duration',
                },
            },
        }]
    )
        .sort({ _id: -1 })
        .limit(7)
        .then(dbTransaction => {
            res.json(dbTransaction);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = router;
