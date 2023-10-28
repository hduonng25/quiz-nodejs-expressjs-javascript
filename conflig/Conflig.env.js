import dotenv from 'dotenv';

dotenv.config();

export const conflig = {
    dbname: process.env.DATABASE_NAME,
    hostdb: process.env.HOST_DATABASE,
    portdb: process.env.PORT_DATABASE,
    user: process.env.USER_DATABASE,
    password: process.env.PASSWORD_DATABASE,
    portNode: process.env.PORT_NODE
};

export default conflig;