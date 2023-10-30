import fs from "fs";

export const private_key = fs.readFileSync('./conflig/private.key', 'utf8')
export const public_key = fs.readFileSync('./conflig/public.key', 'utf8')