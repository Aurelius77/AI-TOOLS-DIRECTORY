'use server'

import { MongoClient } from 'mongodb';

function getMongoUri() {
    const uri = process.env.MONGO_URI;

    if (!uri) {
        throw new Error('MONGO_URI is not configured');
    }

    return uri;
}

async function insertDocuments(collectionName, documents, successMessage) {
    let client;

    try {
        client = new MongoClient(getMongoUri());
        await client.connect();
        const collection = client.db('Resources').collection(collectionName);
        await collection.insertMany(documents);

        return { success: true, message: successMessage };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Something went wrong. Please try again.' };
    } finally {
        await client?.close();
    }
}

export async function addTools(tools) {
    const formattedTools = tools.map((tool) => ({
        title: tool.title?.trim(),
        description: tool.description?.trim(),
        visitLink: tool.visitLink?.trim(),
        imageURL: tool.imageURL?.trim(),
        categories: Array.isArray(tool.categories)
            ? tool.categories
            : String(tool.categories || '')
                .split(',')
                .map((category) => category.trim())
                .filter(Boolean),
        pricingType: tool.pricingType?.trim() || 'Contact for pricing',
        pricingPrice: tool.pricingPrice?.trim() || '',
        submittedAt: new Date(),
    }));

    return insertDocuments('Tools', formattedTools, 'Tool has been submitted.');
}

export async function addContactMessages(messages) {
    const formattedMessages = messages.map((message) => ({
        email: message.email?.trim(),
        message: message.message?.trim(),
        contact: message.contact?.trim(),
        submittedAt: new Date(),
    }));

    return insertDocuments('ContactMessages', formattedMessages, 'Message has been sent.');
}
