const { default: mongoose } = require('mongoose');

const issueSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		text: {
			type: String,
			required: [true, 'Please add a text value'],
		},
	},
	{
		timestamps: true,
	},
);

module.exports = mongoose.model('Issue', issueSchema);
