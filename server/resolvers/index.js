import { GraphQLScalarType } from 'graphql'
import { AuthorModel, FolderModel, NoteModel, NotificationModel } from "../models/index.js";
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
//parent and child is folder nested level, like this example Query is parent and Folder is child
//args in resolver contain data that we send form client to server
export const resolvers = {
    Date: new GraphQLScalarType ({
        name: 'Date',
        parseValue(value) {
            return new Date(value);
        },
        serialize(value) {
            return value.toISOString();
        }
    }),
    Query: {
        folders: async (parent, args, context) => { 
            const folders = await FolderModel.find({
                authorID: context.uid,
            }).sort({
                updatedAt: 'desc'
            });
            return folders; 
        },
        folder: async (parent, args) => {
            const folderID = args.folderID;
            const foundedFolder = await FolderModel.findById(folderID);
            return foundedFolder;
        },
        note: async (parent, args) => {
            const noteID = args.noteID;
            const note = await NoteModel.findById(noteID);
            return note;
        }
    },
    Folder: {
        author: async (parent, args, context, info) => { 
            const authorID = parent.authorID;
            const author = await AuthorModel.findOne({
                uid: authorID
            })
            return author;
        },
        notes: async (parent, args, content, info) => {
            const notes = await NoteModel.find({
                folderID: parent.id
            }).sort({
                updatedAt: 'desc'
            });
            return notes;
        }
    },
    Mutation: {
        register: async (parent, args) => {
            const foundedUser = await AuthorModel.findOne({ uid: args.uid });

            if(!foundedUser){
                const newUser = new AuthorModel(args);
                await newUser.save();
                return newUser;
            }
            return foundedUser;
        },
        addFolder: async (parent, args, context) => {
            const newFolder = new FolderModel({...args, authorID: context.uid});
            await newFolder.save();
            pubsub.publish('FOLDER_CREATED', {
                folderCreated: 'A new folder was created'
            });
            return newFolder;
        },
        addNote: async (parent, args, context) => {
            const newNote = new NoteModel({...args});
            await newNote.save();
            return newNote;
        },
        updateNote: async (parent, args, context) => {
            const noteID = args.id;
            const note = await NoteModel.findByIdAndUpdate(noteID, args);
            const newNote = new NoteModel({...args});
            await newNote.save();
            return newNote;
        },
        pushNotification: async (parent, args, context) => {
            const newNotification = new NotificationModel(args);
            pubsub.publish('PUSH_NOTIFICATION', {
                notification: {
                    message: args.content,
                },
            });
            await newNotification.save();
            return {message: 'SUCCESS'};
        },
    },
    Subscription: {
        folderCreated: {
            subscribe: () => pubsub.asyncIterator(['FOLDER_CREATED']),
        },
        notification: {
            subscribe: () => pubsub.asyncIterator(['PUSH_NOTIFICATION']),
        }
    }
};