const { AuthenticationError } = require("apollo-server-express");
const { User, Bio, Circle } = require("../models");
const {signToken} = require('../utils/auth')

const resolvers = {
  Query: {
    allSquares: async () => {
      return User.find()
    },
    mySquare: async (parent, {user}, context) => {
      console.log(user);
        return Bio.findOne({user_id: user}).populate('user_id');
   
    },
    peerSquare: async (parent, { peerId }) => {
      const peerData = await User.findOne({ _id: peerId });
      return Bio.findOne({ user_id: peerData._id }).populate('user_id');
    },
    circleverse: async () => {
        return Circle.find().populate('squares');
      
    },
    circle: async (parent, { circle_id_code },context) => {
    
        return Circle.findOne({ circle_id_code}).populate('squares');
      
    
    },
    myCircles: async (parent, {user},context) => {
        
          return Circle.find({squares: user }).populate('squares')
     
      }
  },

  Mutation: {
    createSquare: async (parent,{ first_name, last_name, email, password }) => {
      const user = await User.create({ first_name, last_name, email, password });
      // const token = signToken(user)
      return user
    },
    login: async (parent, { email, password }) => {
      const userData = await User.findOne({ email });
      if (!userData) {
        throw new AuthenticationError('Square does not exist!')
      }
      
      const correctPw = await userData.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials!')
      }
        // const token = signToken(userData)
      return userData;
    },
    createBio: async (parent, { input }, context) => {
      
            return await Bio.create({  ...input }).populate('user_id');
        
      
    },
    createCircle: async (parent, { circle_name, circle_type },context) => {
 
            return Circle.create({ circle_name, circle_type }); 
 
    },
    joinCircle: async (parent, { square, circle_code }, context) => {
     
            return Circle.findOneAndUpdate(
                { circle_id_code: circle_code },
                {
                  $addToSet: { squares: [square] },
                },
                { new: true }
              ).populate('squares');

    },
    joinInnerCircle: async (parent, { inviter,invitee }, context) => {
        
            const peerData = await User.findOneAndUpdate(
                { _id: invitee },
                {
                  $addToSet: { innerCircle: [inviter] },
                },
                {new:true}
              ).populate('innerCircle');
              return await User.findByIdAndUpdate(
                { _id: inviter},
                {
                  $addToSet: { innerCircle: [peerData._id] },
                },
                {new: true}
              ).populate('innerCircle');

    },
  },
};

module.exports = resolvers;
