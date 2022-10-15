import sanityClient from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const client = sanityClient({
  projectId: process.env.REACT_APP_SANITY_PROJECT_ID, // you can find this in sanity.json
  dataset: "production",
  useCdn: true, // `false` if you want to ensure fresh data
  token: process.env.REACT_APP_SANITY_TOKEN,
  apiVersion: "2021-08-31",
});

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => builder.image(source);
