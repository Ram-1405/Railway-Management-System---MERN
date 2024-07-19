const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
    required: true
  },
  trainId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trains',
    required: true
  },
  seatsBooked: {
    type: Number,
    required: true
  },
  bookingDate: {
    type: Date,
    default: Date.now
  }
}, 
{ collection: 'BookingInfo' }
);

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;
