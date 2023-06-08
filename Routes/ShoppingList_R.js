const express = require('express');
const router = express.Router();

const listDB = require('../Models/ShoppingList_M');

router.get('/', async (req, res) => {
    try {
        const shoppingListData = await listDB.find();
        res.status(200).json(shoppingListData);

    } catch (error) {
        console.log(error);
    }
});

router.post('/Add', (req,res) => {
    try {
        const { Item, Amount, Category, User } = req.body;
        const modeldata = new listDB({
            item: Item,
            Amount: Amount,
            category: Category,
            user: User,
            item_purchased: false
        });
        modeldata.save();
    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit', async (req,res) => {
    try {
        const { ID, Item, Amount, Category, User } = req.body;
        const modeldata ={
            item: Item,
            Amount: Amount,
            category: Category,
            user: User,
            item_purchased: false
        };
       await listDB.findByIdAndUpdate(ID, modeldata);
    } catch (error) {
        console.log(error);
    }
});

router.patch('/Edit/:ID', async (req,res) => {
    try {
       const modeldata = {
            item_purchased: true
        }
        await listDB.findByIdAndUpdate(req.params.ID, modeldata);
    } catch (error) {
        console.log(error);
    }
});

router.delete('/Delete', async (req, res) => {
    try {
        const { ID } = req.body;
        await listDB.findByIdAndDelete(ID);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;