export const graphQLRequest = async (payload, options = {}) => {
    if(localStorage.getItem('accessToken')){

        const respone = await fetch(`${import.meta.env.VITE_GRAPHQL_SERVER}/graphql`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                ...options,
            },
            body: JSON.stringify(payload),
        });

        if(!respone.ok){
            if(respone.status === 403){
                return null;
            }
        }
    
        const { data } = await respone.json();
        return data;
    }
    return null;
}