const { customAlphabet } = require('nanoid');
const alphabet = '23456789ABCDEFGHJKMNPQRSTUVWXYZabcdefghkmnpqrstuvwxyz-';
const nanoid = customAlphabet(alphabet, 12);

export default nanoid;