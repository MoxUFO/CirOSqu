const { AuthenticationError } = require("apollo-server-express");
const { User, Bio, Circle } = require("../models");

const resolvers = {
  Query: {
    mySquare: async (parent, args, context) => {
      if (context.user) {
        return Bio.findOne({ user_id: context.user._id }).populate('user_id');
      }
      throw new AuthenticationError("You need to be logged in!");
    },
    peerSquare: async (parent, { peerId }) => {
      const peerData = await User.findOne({ _id: peerId });
      return Bio.findOne({ user_id: peerData._id }).populate('user_id');
    },
    circleverse: async () => {
        return Circle.find();
      
    },
    circle: async (parent, { circle_id_code },context) => {
      if (context.user) {
        return Circle.findOne({ circle_id_code});
      }
      throw new AuthenticationError("You arent in this circle");
    },
    myCircles: async (parent, args,context) => {
        if (context.user) {
          return Circle.find({squares: { $in: [context.user._id]}  })
        }
        throw new AuthenticationError("You arent in this circle");
      }
  },

  Mutations: {
    createSquare: async (parent,{ first_name, last_name, email, password }) => {
      return User.create({ first_name, last_name, email, password });
    },
    login: async (parent, { email, password }) => {
      const userData = User.findOne({ email });
      if (!userData) {
        throw new AuthenticationError('Square does not exist!')
      }
      const correctPw = await userData.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect Credentials!')
      }

      return userData;
    },
    createBio: async (parent, { ...input }, context) => {
        if (context.user) {
            return Bio.create({ user_id: context.user._id, ...input });
        }
      throw new AuthenticationError('No user detected!')
    },
    createCircle: async (parent, { circle_name, circle_type },context) => {
        if (context.user) {
            return Circle.create({ circle_name, circle_type }); 
        }
        throw new AuthenticationError('Need to be looged in to create a circle!')
    },
    joinCircle: async (parent, { square, circle_code }, context) => {
        if (context.user) {
            return Circle.findOneAndUpdate(
                { circle_id_code: circle_code },
                {
                  $addToSet: { squares: [context.user._id] },
                },
                { new: true }
              );
        }
        throw new AuthenticationError('You need to be logged in to do that!')
    },
    joinInnerCircle: async (parent, { invitee }, context) => {
        if (context.user) {
            const peerData = await User.findOneAndUpdate(
                { _id: invitee },
                {
                  $addToSet: { innerCircle: [context.user._id] },
                }
              );
              return User.findByIdAndUpdate(
                { _id: context.user._id },
                {
                  $addToSet: { innerCircle: [peerData._id] },
                }
              );
        }
        throw new AuthenticationError('You need to be logged in to do that!')
    },
  },
};

module.exports = resolvers;
