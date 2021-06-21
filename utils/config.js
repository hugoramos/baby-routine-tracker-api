const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'HOST...',
        user: env.DB_USER || 'USER...',
        password: env.DB_PASSWORD || 'PASSWORD...',
        database: env.DB_NAME || 'SCHEMA...',
    },
    listPerPage: env.LIST_PER_PAGE || 30,
};


module.exports = config;
