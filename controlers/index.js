import { promisify } from 'util';

import { redisClient as client } from "../index.js";

export async function add(data, key){
    client.del(key);
    data.forEach((item) => {
        client.sadd(key, JSON.stringify(item));
    })
}

export async function get(key){
    const getAsync = promisify(client.smembers).bind(client); 
    try {
        const data = await getAsync(key);
        const res = data.map(item => (
            JSON.parse(item)
        ));
        return res;
    } catch (error) {
        console.log(error);
    }
}

