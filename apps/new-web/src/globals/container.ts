import { ContentDataContenful } from "@/services/ContentDataContenful";
import { Container } from "inversify";

import { createClient } from "contentful"

export const enum ContainerIdentifiers {
  IContentfulClient = "IContentfulClient",
  IContentData = "IContentData",
}


export const container = new Container();

container
  .bind(ContainerIdentifiers.IContentfulClient)
  .toConstantValue(createClient({
    space: process.env.CONTENTFUL_SPACE_ID ?? "",
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN ?? "",
  }))

container
  .bind(ContainerIdentifiers.IContentData)
  .to(ContentDataContenful)
  .inSingletonScope();
