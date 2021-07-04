const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises: [
    {
      type: {
        type: String,
        trim: true,
        required: "Type is Required"
      },
      name: {
        type: String,
        trim: true,
        required: "Name is Required"
      },
      duration: {
        type: Number,
        required: "Duration is Required"
      },
      weight: {
        type: Number,
        required: "Weight is Required"
      },
      reps: {
        type: Number,
        required: "Reps is Required"
      },
      sets: {
        type: Number,
        required: "Sets is Required"
      },
    }
  ]
})

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;