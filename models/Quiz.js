import mongoose from "mongoose";

export const Quizs = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    questions: [
        {
            _id: false,
            id: {
                type: String,
                required: false
            },

            name: {
                type: String,
                required: false
            },

            option: [
                {
                    _id: false,
                    id: {
                        type: String,
                        required: true
                    },

                    name: {
                        type: String,
                        required: false
                    },

                    correct: {
                        type: Boolean,
                        required: false
                    }
                }
            ]
        }
    ]
});

export default mongoose.model("Quizs", Quizs);