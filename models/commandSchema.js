const mongoose = require('mongoose')

const commandSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  commandName: {
    type: String,
    required: [true, 'Command name is required.']
  },
  command: {
    type: String,
    required: [true, 'Command is required.']
  }
})

module.exports = mongoose.model('Command', commandSchema)