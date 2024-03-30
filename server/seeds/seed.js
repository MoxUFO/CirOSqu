const db = require('../config/connection')
const cleanDB = require('./cleanDB')

const bioData = require('./bioData.json');
const circleData = require('./circleData.json');
const userData = require('./userData.json');
const { Circle,User,Bio } = require('../models');

db.once('open', async () => {
    console.log('Started');
    await cleanDB('User', 'users')
    await cleanDB('Bio', 'bios')
    await cleanDB('Circle', 'circles')
    console.log('DB clean');

    const circle = await Circle.insertMany(circleData)

    console.log('circles seeded');

    const users = await User.insertMany(userData)
    // console.log(users[0]._id);
    for (let i = 0; i < users.length; i++) {
        var index = Math.floor(Math.random() * circle.length);
        let cirID = circle[index]._id
        let cir = await Circle.findOneAndUpdate({_id:cirID},{$addToSet: {squares: [users[i]._id]}})
        // console.log(cir);
    }
   
    console.log('users seeded');

    const bios = await Bio.insertMany(bioData)

    for (let i = 0; i < bios.length; i++) {
        // console.log(users[i]._id);
      let bi = await Bio.findOneAndUpdate({_id: bios[i]._id},{user_id:users[i]._id},{new: true})
        console.log(bi);
    }
    // console.log(users[0]._id);
    console.log('bios seeded');


    process.exit()
})