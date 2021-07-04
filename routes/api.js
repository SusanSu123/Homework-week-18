const router = require("express").Router();
const Workout = require("../models/Workout.js");

router.get("/api/workouts", async ({ body }, res) => {
    try {
        const workout = await Workout.find({})
        if (workout) {
            console.log(body);
            res.status(200).json(workout)
        }

    } catch (err) {
        res.status(400).json(err)
    }
});

router.post("/api/workouts", async ({ body }, res) => {
    try {
        const workout = await Workout.create(body)
        if (workout) {
            res.status(200).json(workout)
        }
    } catch (err) {
        res.status(400).json(err)
    }

});

router.put("/api/workouts/:id", async (req, res) => {
    try {
        let urlData = req.params;
        let body = req.body;
        const updateData = await Workout.updateOne({ _id: urlData.id }, {
            $push: {
                exercises: body
            }
        })
        res.status(200).json(updateData);
    } catch (err) {
        res.json(err);
    }
});



router.get("/api/workouts/range", async (req, res) => {
    try {
        const workout = await Workout.aggregate([
            {
                $addFields: {
                    totalDuration: {
                        $sum: '$exercises.duration',
                    },
                },
            }
        ])
            .sort({ _id: -1 })
            .limit(7)
            .then(dbTransaction => {
                res.json(dbTransaction);
            })
    } catch (err) {
        res.status(400).json(err);
    };
})

module.exports = router;
