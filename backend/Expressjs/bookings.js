const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth=require('./auth');
const Booking=require('../mongoSchema/booking_info');
const Trains=require('../mongoSchema/trains_info');

router.get('/bookings',auth,async(req,res)=>{
    try{
            if (!req.user || !req.user.id) {
      return res.status(401).json({ msg: 'User not authenticated' });
    }
    const result=await Booking.find({userId:req.user.id}).populate({
        path:'trainId'
    });
    if (!result) {
        console.log('No trains found');
      }
      res.json(result);

    }catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }

});

router.put('/newbooking',auth,async(req,res)=>{
    const { trainNumber, seatsBooked } = req.body;
    try{
        const train = await Trains.findOne({ trainNumber });
    if (!train) {
      return res.status(404).json({ msg: 'Train not found' });
    }

    const totalPrice = seatsBooked * train.price;

    const newBooking = new Booking({
        userId: req.user.id,
        trainId: train._id,
        seatsBooked,
        totalPrice
      });

      const savedBooking=await newBooking.save();
      const endResult=await savedBooking.populate('trainId');

      res.json(endResult);

    }catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Server Error' });
      }
});
router.delete('/bookings/:id', auth, async (req, res) => {
    try {
      const booking = await Booking.findOne({ _id: req.params.id });
  
      if (!booking) {
        return res.status(404).json({ msg: 'Booking not found' });
      }
  
      if (booking.userId.toString() !== req.user.id) {
        return res.status(401).json({ msg: 'User not authorized' });
      }
  
      await booking.deleteOne();
  
      res.json({ msg: 'Booking removed' });
    } catch (err) {
      console.error(err.message);
      if (err.kind === 'ObjectId') {
        return res.status(404).json({ msg: 'Booking not found' });
      }
      res.status(500).json({ msg: 'Server Error' });
    }
  });

module.exports=router;