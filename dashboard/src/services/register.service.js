import { handleResponse } from '../helpers/handle-response';


export const registerService = {
    signup
};

function signup(firstName, lastName, email, password) {
    const query = JSON.stringify({
        query: `
            mutation signupFromReact{
                createUser(email: "${email}", password: "${password}", firstName: "${firstName}", lastName: "${lastName}"){
                    user{
                        username
                        firstName
                        lastName
                    }
                }
            }`
    });

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: query
    };

    return fetch("http://localhost:8000/graphql/", requestOptions)
    .then(handleResponse)
    .then(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        console.log(user);
        return user;
    });
}