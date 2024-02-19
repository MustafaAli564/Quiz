var express = require("express");
var router = express.Router();
const Sales = require('../models/Sale');

router.post("/addsale", async(req,res) => {
    try {
        const { plates, carType, model, year, price } = req.body;
    
        const newSale = new Sales({
          plates,
          carType,
          model,
          year,
          price,
        });
    
        const savedSale = await newSale.save();
    
        res.json({ msg: "Sale added successfully", sale: savedSale });
      } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal Server Error" });
      }
});

router.get('/readSale/:plateNumber', async (req, res) => {
    try {
      const plateNumber = req.params.plateNumber;
  
      const sale = await Sales.findOne({ plates: plateNumber });
  
      if (!sale) {
        return res.status(404).json({ msg: 'Sale not found' });
      }
  
      res.json({ msg: 'Sale retrieved successfully', sale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });

  router.put('/editSale/:plateNumber', async (req, res) => {
    try {
      const plateNumber = req.params.plateNumber;
      const { carType, model, year, price } = req.body;
  
      const sale = await Sales.findOne({ plates: plateNumber });
  
      if (!sale) {
        return res.status(404).json({ msg: 'Sale not found' });
      }
      sale.plates = plateNumber;
      sale.carType = carType;
      sale.model = model;
      sale.year = year;
      sale.price = price;
  
      const updatedSale = await sale.save();
  
      res.json({ msg: 'Sale updated successfully', sale: updatedSale });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });

  router.delete('/deleteSale/:plateNumber', async (req, res) => {
    try {
      const plateNumber = req.params.plateNumber;
  
      const sale = await Sales.findOne({ plates: plateNumber });
  
      if (!sale) {
        return res.status(404).json({ msg: 'Sale not found' });
      }
  
      await Sales.deleteOne({ plates: plateNumber });
  
      res.json({ msg: 'Sale deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: 'Internal Server Error' });
    }
  });


module.exports = router;