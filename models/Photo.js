import mongoose from 'mongoose';

// Connect DB
mongoose.connect('mongodb://127.0.0.1/pcat-test-db');

// Initialize Schema
const Schema = mongoose.Schema;

// Create Schema
const PhotoSchema = new Schema({
    title: String,
    description: String,
    image: String,
    dateCreated: {
        type: Date,
        default: Date.now,
    },
});

export const Photo = mongoose.model('Photo', PhotoSchema);