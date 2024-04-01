const typeDefs = `
scalar Date

type User {
    _id: ID
    password: String
    first_name: String!
    last_name: String!
    email: String!
    innerCircle: [User]
}

type Bio {
    _id: ID
    user_id : User
    birthday: Date!
    fav_color: String!
    fav_food:String!
    fav_quote:String!
    fav_movie:String!
    fav_tv_show:String!
    fav_music_artist: String!
    fav_song:String!
    hobby:String!
    github:String
    linkedin:String
    twitter:String
}

type Circle {
    _id: ID
    circle_name: String!
    circle_type: String
    circle_id_code: String!
    squares: [User]

}
type Auth{
    token: ID
    user: User
}

type Query {
    allSquares:[User]
    mySquare(user: ID!) : Bio
    peerSquare(peerId: ID!) : Bio
    circleverse:[Circle]
    circle(circle_id_code: String!): Circle
    myCircles(user: ID!): [Circle]
}

input BioInput{
    birthday: String!
    fav_color: String!
    fav_food:String!
    fav_quote:String!
    fav_movie:String!
    fav_tv_show:String!
    fav_music_artist: String!
    fav_song:String!
    hobby:String!
    github:String
    linked_in:String
    twitter:String
    user_id: String
}

type Mutation {
    createSquare(first_name: String!, last_name: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    createBio(input : BioInput): Bio
    createCircle( circle_name: String!, circle_type: String! ): Circle
    joinCircle(square : ID!, circle_code: String!): Circle
    joinInnerCircle(inviter: ID!, invitee: ID! ) : User
    
}

`

module.exports = typeDefs