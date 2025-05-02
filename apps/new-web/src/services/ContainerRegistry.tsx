import { Container, ResolutionContext } from "inversify";
import type { ComponentType, ReactElement } from "react";

export type RegisterOptions<T extends (props: unknown)=>ReactElement> = {
  Component: T
  transformer: (props: unknown) => unknown;
};

export class ContainerRegistry {
  private readonly registry = new Map<string, Container>();

  constructor(private readonly parent: Container) {}

  static createContinerRegistry(parent: Container) {
    return new ContainerRegistry(parent);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerComponent<T extends (props: any)=>ReactElement>(name: string, { Component, transformer }: RegisterOptions<T>) {
    const child = new Container({
      parent: this.parent,
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

  private createFactoryHelper(Component: ComponentType) {
    return (ctx: ResolutionContext) => {
      const transformer: (props: unknown)=> unknown = ctx
        .get("transformer") ?? ((props: unknown) => props);

      return function CreatedComponent(rawProps: unknown){
        const props = transformer(rawProps);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return <Component {...props as any} />;
      };
    };
  }
}
