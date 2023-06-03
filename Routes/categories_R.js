const express = require('express');
const router = express.Router();

const categories = require('../Models/categories_M');

router.get('/',async (req, res) => {
    try {
        const categoriesData = await categories.find();
        res.status(200).json(categoriesData);
        
    } catch (error) {
        console.log(error);
    }
})

router.post('/Add', (req, res) => {
    try {
        const { Category } = req.body;
        const modeldata = new categories({
            category: Category
        });
        modeldata.save();
    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit',async (req, res) => {
    try {
        const { Category , ID } = req.body;
        const modeldata = {
            category: Category
        };
        await categories.findByIdAndUpdate(ID, modeldata); 
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;