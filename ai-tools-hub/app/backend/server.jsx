'use server'

import { MongoClient} from 'mongodb';
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

export async function getTools(){
    try{
        await client.connect()
        let db = client.db('Resources').collection('AITools')
        const data = await db.find().toArray()
        return {success:true, data:data}
    }
    catch(err){
        console.log(err)
        return{success:false, message:'Something went wrong. Please try again'}
    }
    finally{
        await client.close()
    }
}