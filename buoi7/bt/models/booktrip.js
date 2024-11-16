import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const TravelSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Pending', 'Confirmed', 'Cancelled'],
        default: 'Pending'
    }
}, { timestamps: true });

const Travel = mongoose.model('Travel', TravelSchema);
export default Travel;
