import mongoose from "mongoose";

const Schema = mongoose.Schema;

const leadSchema = new Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    phone: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },

    source: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        enum: ['New', 'Contacted', 'Qualified', 'Lost'],
        default: 'New',
    }
}, {
    timestamps: true,
});

const Lead = mongoose.model('Lead', leadSchema);
export default Lead;