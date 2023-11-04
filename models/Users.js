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

    fieldOfStudy: [
        {
            name: {
                type: String,
                required: false
            },

            start_date: {
                type: Date,
                required: false
            },

            end_date: {
                type: Date,
                required: false
            }
        }
    ],

    year: {
        type: Number,
        required: false
    },

    id_Subject: [
        {
            _id: false,
            id: {
                type: String,
                required: true
            },

            name_Subject: {
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