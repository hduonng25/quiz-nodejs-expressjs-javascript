import mongoose from "mongoose";

export const Subject = mongoose.Schema({
    id: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: false
    },

    fieldOfStudy: [{
        type: String,
        required: false
    }],

    created_by: {
        type: String,
        required: false
    },

    start_Date: {
        type: Date,
        required: false
    },

    end_Date: {
        type: Date,
        required: false
    },

    is_deleted: {
        type: Boolean,
        default: false
    }
    
});

export default mongoose.model("Subject", Subject);