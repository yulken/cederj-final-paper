import fs from 'fs';

export default {
    key: fs.readFileSync('./cert/privkey.pem', 'utf8'),
    cert: fs.readFileSync('./cert/cert.pem', 'utf8'),
    ca: fs.readFileSync('./cert/chain.pem', 'utf8'),
};
