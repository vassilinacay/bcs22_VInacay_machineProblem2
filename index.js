// ITCS227 source code Template for 2T AY 2022-2023
// bcs22_VInacay_machineProblem2
/*
	Program:	Computation of Grades using Function
	Programmer:	INACAY, Vassili L.
	Section:	BSCS - AN22
	Start Date:	July 15, 2023
	End Date:	July 17, 2023
*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express();

mongoose.connect('mongodb+srv://admin:inacay123@sandbox.hvn1x6n.mongodb.net/an22_sample_database?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.'));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRoutes);
app.use('/products', productRoutes);

app.listen(process.env.PORT || 7000, () => {
    console.log(`API is now online on port ${process.env.PORT || 7000}`)
});