const config = {
    db: {
        host: "localhost",
        user: "root",
        password: "7YkECdk=dhhk",
        database: "gintasticDB"
    },
    app: {
        port: 3001
    },
    auth0: {
        config: {
            authRequired: false,
            auth0Logout: true,
            secret: 'b9bbf8a653f454e405561c19f05aeaf225047281f4c18c6075c36b5c9591b72a',
            baseURL: 'https://localhost:3001',
            clientID: 'OqK5TRVotZoNPcAglnsV9gYgnDVF19ku',
            issuerBaseURL: 'https://dev-hpjmu40q3skwwl8h.eu.auth0.com'
        }
    }
};
   
module.exports = config;