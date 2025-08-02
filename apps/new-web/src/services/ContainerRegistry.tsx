/* eslint-disable @typescript-eslint/no-explicit-any */
import { Container, ContainerOptions, ResolutionContext } from "inversify";
import type { ComponentType, ReactElement } from "react";

export type RegisterOptions<T extends (props: any)=>ReactElement> = {
  Component: T
  transformer?: (props: any, ctx: ResolutionContext) => any;
};

export class ContainerRegistry {
  private readonly registry = new Map<string, Container>();

  constructor(private readonly parent: Container) {}

  static createContinerRegistry(parent: Container) {
    return new ContainerRegistry(parent);
  }

  registerComponent<T extends (props: any)=>ReactElement, R extends string>(
    name: R,
    { Component, transformer }: RegisterOptions<T>,
    containerOptions?: ContainerOptions
  ) {
    const child = new Container({
      parent: this.parent,
      ...containerOptions
    });

    this.registry.set(name, child);
    const factory = this.createFactoryHelper(Component)

    child.bind<ReturnType<typeof factory>>("Component").toFactory(factory);
    child.bind("transformer").toConstantValue(transformer);

    return this;
  }

  get(name: string) {
    return this.registry.get(name);
  }

  getComponent<T extends boolean>(
    name: string,
    throwError: T = false as T
  ): T extends true ? ReturnType<ReturnType<typeof this.createFactoryHelper>> : ReturnType<ReturnType<typeof this.createFactoryHelper>> | null | undefined{
    const container = this.registry.get(name);

    if (throwError && !container) {
      throw new Error(`Component ${name} not found`);
    }

    return container
      ?.get<ReturnType<ReturnType<typeof this.createFactoryHelper>> | null>("Component") as any;
  }

  private createFactoryHelper(Component: ComponentType) {
    return (ctx: ResolutionContext) => {
      const transformer: (props: unknown, ctx: ResolutionContext)=> unknown = ctx
        .get("transformer") ?? ((props: unknown) => props);

      return async function CreatedComponent(rawProps: unknown){
        const props = await transformer(rawProps, ctx);

        return <Component {...props as any} />;
      };
    };
  }
}
