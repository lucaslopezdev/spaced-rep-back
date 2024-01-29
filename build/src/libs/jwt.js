import jwt from 'jsonwebtoken';
const confidentialPassword = process.env.MYPLAINTEXTPASSWORD;
export const createAccessToken = (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, confidentialPassword, {
            expiresIn: '1d'
        }, (err, token) => {
            if (err)
                reject(err);
            resolve(token);
        });
    });
};
