import mongoose from "mongoose";

export const Users = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    created_Date: {
        type: Date,
        required: false,
        default: new Date()
    },

    user_name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: false
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        required: false
    },

    is_deleted: {
        type: Boolean,
        default: false,
        required: false
    },

    id_Course: [
        {
            _id: false,
            id: {
                type: String,
                required: true
            },

            name_Course: {
                type: String,
                required: false
            },

            apply_Date: {
                type: Date,
                default: new Date(),
                required: false
            }
        }
    ],

    id_Quiz: [
        {
            _id: false,
            id: {
                type: String,
                required: false
            },

            apply_Date: {
                type: Date,
                default: new Date(),
                required: false
            },

            grade: {
                type: Number,
                required: false
            }
        }
    ]
});

export default mongoose.model("Users", Users);