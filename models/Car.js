const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./User')
const Issue = require('./Issue')


const carSchema = new Schema (
  {
    year: {type: String, required: true},
    make: {type: String, required: true},
    model: {type: String, required: true},
    engine: {type: String, required: true},
    trim: {type: String, required: true},
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Issue'
      }
    ]
  }
)

carSchema.pre('deleteOne', async function() {
  const doc = await this.model.findOne(this.getFilter());
  const issues = []
  doc.issues.map(issue => {
    const issueString = issue.toString()
    issues.push(issueString)
  }) 
  if (issues.length > 0) {
    Issue.find({_id: {$in: doc.issues}}).then(removedIssues => {
      Promise.all(
        removedIssues.map(issue => 
          Issue.findOneAndDelete(issue._id)
        )
      )
    })
  }
})


module.exports = mongoose.model('Car', carSchema)