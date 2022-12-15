const Users = require('./users.models')
const RecoveryPasswords = require('./recoveryPasswords.models')
const Conversations = require('./conversations.models')
const Messages = require('./messages.models')
const Participants = require('./participants.models')

const initModels = () => {
    //? FK = RecoveryPasswords
    Users.hasMany(RecoveryPasswords)
    RecoveryPasswords.belongsTo(Users)

    //? Relacion entre users - messages
    Users.hasMany(Messages)
    Messages.belongsTo(Users)

    //? Realcion entre users - conversations
    Users.hasMany(Conversations)
    Conversations.belongsTo(Users)

    //? Relacion entre users - participants
    Users.hasMany(Participants)
    Participants.belongsTo(Users)

    //? Relacion entre conversations - messages
    Conversations.hasMany(Messages)
    Messages.belongsTo(Conversations)

    //? RElacion entre conversations - participants
    Conversations.hasMany(Participants)
    Participants.belongsTo(Conversations)
}

module.exports = initModels