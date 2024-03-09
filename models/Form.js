const dataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true // Ensure uniqueness of email addresses
    },
    hobbies: String
});
const Data=mongoose.model("form",dataSchema);

module.exports={Data}