import { graphQLRequest } from "./request";

export const notesLoader = async ({params: { folderID }}) => {
    const query = ` query Query($folderID: String!) {
        folder(folderID: $folderID) {
            id
            name
            notes {
                id
                content
                updatedAt
            }
        }
    }`;

    const data = await graphQLRequest({
        query,
        variables: {
            folderID: folderID
        }
    });
    return data;
}

export const noteLoader = async ({params: { noteID }}) => {
    const query = ` query Note($noteID: String) {
        note(noteID: $noteID) {
            id
            content
        }
    }`;

    const data = await graphQLRequest({
        query,
        variables: {
            noteID: noteID
        }
    });
    return data;
}

export const addNewNote = async ({ params, request }) => {
    //get newnote from submit func in NewNote component
    const newNote = await request.formData();
    const formDataObj = {};

    //convert newnote to form data (object)
    newNote.forEach((value, key)=> (formDataObj[key] = value));

    const query = ` mutation Mutation($content: String!, $folderID: ID!) {
        addNote(content: $content, folderID: $folderID) {
            id
            content
        }
    }`;

    const { addNote } = await graphQLRequest({
        query,
        variables: formDataObj,
    });
    return addNote;
}

export const updateNote = async ({ params, request }) => {
    const updatedNote = await request.formData();
    const formDataObj = {};

    //convert newnote to form data (object)
    updatedNote.forEach((value, key)=> (formDataObj[key] = value));

    const query = ` mutation Mutation($id: String!, $content: String!) {
        updateNote(id: $id, content: $content) {
            id
            content
        }
    }`;

    const { updateNote } = await graphQLRequest({
        query,
        variables: formDataObj,
    });
    return updateNote;
}