const mongoose = require('mongoose')
const Command = require('../models/commandSchema')
const Discord = require('discord.js')
const bot = new Discord.Client()

const commandSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commandName: {
    type: String,
    unique: true,
    required: [true, 'CommandName is required.']
  },
  command: {
    type: String,
    required: [true, 'Command is required.']
  }
})

commandSchema.path('commandName').index({ unique: true })

module.exports = mongoose.model('Command', commandSchema)