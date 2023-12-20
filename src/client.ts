import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
// const sanityClient = require('@sanity/client');

export const client = sanityClient({
    projectId: process.env.REACT_APP_SANITY_PROJECT_ID,
    dataset: 'production',
    apiVersion: '2022-02-01',
    useCdn: true,
    token: process.env.REACT_APP_SANITY_TOKEN,
});

const builder = imageUrlBuilder(client);

//export const urlFor = (source: any) => builder.image(source);
export const urlFor = (source: any) => source ? builder.image(source).url() : '';
