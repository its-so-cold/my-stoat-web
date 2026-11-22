import { JSX } from "solid-js";

const spooky = (localStorage.getItem('SpOwOky OwOky') === 'Pumpkin Song');
// NOTE: This is magical scary stuff and wastes memory when un-used, so you have to manually enable it.
if (spooky) {
  (globalThis as Record<string, unknown>).disableSpOwOkyOwOkyDeveloper = () => {
    localStorage.removeItem('SpOwOky OwOky');
    try {
      document.location.reload();
    } catch(_: unknown) {}
    return '[disabled] reload to apply the changes.';
  };
} else {
  console.log('%cIf you are making a userscript or userstyle, or are trying to use one I recommend running "enableSpOwOkyOwOkyDeveloper" for dev features.%c', 'font-weight: bold; font-size: 64pt; background: black; color: white;');
  (globalThis as Record<string, unknown>).enableSpOwOkyOwOkyDeveloper = () => {
    localStorage.setItem('SpOwOky OwOky', 'Pumpkin Song');
    try {
      document.location.reload();
    } catch(_: unknown) {}
    return '[enabled] reload to apply the changes.';
  };
}

function DevelopingWrappedComponent(props: { componentId: string, children: JSX.Element }) {
  return (
    <div style={{ display: 'contents' }} role="presentation" data-component-id={props.componentId}>
      {props.children}
    </div>
  );
}

export const wrapComponent = (componentId: string, component: JSX.Element): JSX.Element => {
  if (!spooky) {
    return component;
  }
  return (
    <DevelopingWrappedComponent componentId={componentId}>
      {component}
    </DevelopingWrappedComponent>
  );
};

export const wrapLazyComponent = <LazyComponent extends (...args: any) => JSX.Element>(componentId: string, lazyComponent: LazyComponent) => {
  if (!spooky) {
    return lazyComponent;
  }
  return function lazyComponentWrapper(this: unknown, ...lazyComponentArguments: Parameters<LazyComponent>): ReturnType<LazyComponent> {
    return wrapComponent(componentId, lazyComponent(...lazyComponentArguments)) as ReturnType<LazyComponent>;
  };
};
