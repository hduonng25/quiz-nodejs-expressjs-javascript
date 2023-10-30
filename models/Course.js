import mongoose from "mongoose";

export const Courses = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    created_by: {
        type: String,
        required: false
    },

    id_Quiz: [
        {
            _id: false,
            id: {
                type: name,
                required: true
            },

            name: {
                type: String,
                required: false
            }
        }
    ],

    start_Date: {
        type: Date,
        required: false
    },

    end_Date: {
        type: Date,
        required: false
    }
});

export default mongoose.model("Courses", Courses);