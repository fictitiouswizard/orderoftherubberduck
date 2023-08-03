import { customAlphabet } from "nanoid";
const alphabet = '23456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghkmnopqrstuvwxyz';
const nanoid = customAlphabet(alphabet, 15);

export default nanoid;