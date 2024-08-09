'use server'

import { MongoClient} from 'mongodb';
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

export async function addTools(formData){
    try{
        await client.connect()
        let db = client.db('Resources').collection('Tools')
        await db.insertMany(formData)
        return {success:true, message:'Tool has been submitted'}
    }
    catch(err){
        console.log(err)
        return{success:false, message:'Something went wrong. Please try again'}
    }
    finally{
        await client.close()
    }
}