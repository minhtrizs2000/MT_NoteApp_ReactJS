import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
    content: {
        type: String
    },
    folderID: {
        type: String,
        required: true
    }
}, { timestamps: true });

const NoteModel = mongoose.model('Note', noteSchema);
export default NoteModel;