const Room = require('../models/room') 
const mongoose = require('mongoose')
const rooms = require('../data/rooms.json') 

mongoose.connect('mongodb+srv://abrarbackend:abrarbackend@cluster0.aekzb.mongodb.net/Bookit?retryWrites=true&w=majority')
// mongoose.connect('mongodb://localhost:27017/bookit')
    .then(con => {
    console.log('Connected to the database');
})

const seedRooms = async () => {
    try{
        await Room.deleteMany();
        console.log('Rooms are deleted');
        await Room.insertMany(rooms);
        console.log('all rooms are added');
    }catch(error){
        console.log(error.message);
        process.exit()
    }
}

seedRooms();