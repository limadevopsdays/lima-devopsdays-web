import "reflect-metadata";

import { ContentDataContenful } from "@/services/ContentDataContenful";
import { Container } from "inversify";

import { createClient } from "contentful"
import { ContainerIdentifiers } from "./identifiers";
import { LocalGlobalConfigService } from "@/services/LocalGlobalConfigService";
import { CachedGlobalConfigProxy, ContentfulGlobalConfigService } from "@/services/ContentfulGlobalConfigService";
import { CustomTemplateParser } from "react-utils";


const container = new Container();

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID ?? "",
  accessToken: process.env.CONTENTFUL_API_KEY ?? "",
  environment: process.env.CONTENTFUL_ENVIRONMENT ?? "master",
})

container
  .bind(CustomTemplateParser)
  .toSelf()

container
  .bind(ContainerIdentifiers.IContentfulClient)
  .toConstantValue(client)

container
  .bind(ContainerIdentifiers.IContentData)
  .to(ContentDataContenful)
  .inSingletonScope();

container
  .bind(ContentfulGlobalConfigService)
  .toSelf()

container
  .bind(ContainerIdentifiers.IGlobalConfig)
  .to(process.env.GLOBAL_CONFIG_SERVICE === 'local'
    ? LocalGlobalConfigService
    : CachedGlobalConfigProxy
  )
  .inSingletonScope();

export default container
