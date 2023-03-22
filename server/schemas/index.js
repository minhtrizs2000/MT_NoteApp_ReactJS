export const typeDefs = `#graphql
    scalar Date

    type Folder {
        id: String!,
        name: String,
        createdAt: String,
        author: Author,
        notes: [Note]
    }

    type Note {
        id: String!,
        content: String
        updatedAt: Date
    }

    type Author {
        uid: String!,
        name: String!
    }

    type Query {
        folders: [Folder],
        folder(folderID: String!): Folder,
        note(noteID: String): Note
    }

    type Mutation {
        register(uid: String!, name: String!): Author,
        addFolder(name: String!): Folder,
        addNote(content: String!, folderID: ID!): Note,
        updateNote(id: String!, content: String!): Note,
        pushNotification(content: String): Message,
    }
    type Subscription {
        folderCreated: Message,
        notification: Message,
    }
    type Message {
        message: String,
    }
`;