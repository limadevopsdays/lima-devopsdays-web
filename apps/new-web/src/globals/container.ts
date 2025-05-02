import "reflect-metadata";

import { ContentDataContenful } from "@/services/ContentDataContenful";
import { Container } from "inversify";

import { createClient } from "contentful"
import { ContainerIdentifiers } from "./identifiers";


const container = new Container();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_API_KEY ?? "",
})

container
  .bind(ContainerIdentifiers.IContentfulClient)
  .toConstantValue(client)

container
  .bind(ContainerIdentifiers.IContentData)
  .to(ContentDataContenful)
  .inSingletonScope();

export default container
