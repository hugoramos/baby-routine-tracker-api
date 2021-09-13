const env = process.env;

const config = {
    db: { /* don't expose password or any sensitive info, done only for demo */
        host: env.DB_HOST || 'palm.arvixe.com',
        user: env.DB_USER || 'raul',
        password: env.DB_PASSWORD || 'q1w2e3r4123',
        database: env.DB_NAME || 'bet',
    },
    listPerPage: env.LIST_PER_PAGE || 200,
};


module.exports = config;
