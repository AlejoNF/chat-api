const uuid = require('uuid')
const Conversations = require('../models/conversations.models')
const Participants = require('../models/participants.models')
const Users = require('../models/users.models')

const findAllConversations = async() =>{
    const data = await Conversations.findAll({
        include:{
            model: Participants,
            include:{
                model:Users
            }
        }
    })
    return data
} 

const findConversationById = async(id) => {
    const data = await Conversations.findOne({
        where:{
            id : id
        },
        include:{
            model:Participants,
            include:{
                model:Users
            }
        }
    })
    return data
}

const createConversation = async(obj) => {
    const newConversation = await Conversations.create({
        id: uuid.v4(),
        title: obj.title,
        imageUrl: obj.imageUrl,
        userId: obj.ownerId//? Creador de la conversacion
    })
    const participant1 = await Participants.create({
        id: uuid.v4(),
        userId:obj.ownerId, //? Este es el owner que viene desde el token 
        conversationId: newConversation.id
    })
    const participant2 = await Participants.create({
        id:uuid.v4(),
        userId:obj.participantId, //? Este es el otro usuario que viene desde el body
        conversationId: newConversation.id
    })
    return {
        newConversation,
        participant1,
        participant2
    }
}

const updateConversation = async(id,obj) => {
    const data = await Conversations.update(obj,{
        where:{
            id: id 
        }
    })
    return data[0]
}

const removeConversation = async (id) => {
    const data = await Conversations.destroy({
        where:{
            id: id
        }
    })
    return data
}

// createConversation ({
//     title:'Conversacion alejo - pepe',
//     ownerId:'',
//     participantId:''
// })
//     .then(data => console.log(data))
//     .catch(err => console.log(err))

module.exports = {
    findAllConversations,
    createConversation,
    findConversationById,
    updateConversation,
    removeConversation
}