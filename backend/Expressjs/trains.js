const express=require('express');
const route = express.Router();
const Train=require('../mongoSchema/trains_info');

route.get('/trains',async(req,res)=>{
    try{
    const allTrains=await Train.find();
    res.json(allTrains);
    }catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
      }
});
route.get('/trains/:origin/:destination/:date', async (req, res) => {
  try {
      const trains = await Train.find({
        origin: req.params.origin,
        destination: req.params.destination,
        departureDate:req.params.date
    });
    

      if (trains.length === 0) {
          return res.status(404).json({ msg: 'Train not found' });
      }
      res.json(trains);
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
  }
});

  
  module.exports = route;