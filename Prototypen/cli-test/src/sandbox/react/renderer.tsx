import React, {
  Component as ReactComponent,
  FC,
  ReactElement,
  StrictMode,
  Fragment,
  useLayoutEffect,
  useRef,
} from "react";
import ReactDOM, { version as reactDomVersion } from "react-dom";
import type { Root as ReactRoot } from "react-dom/client";

const nodes = new Map<Element, ReactRoot>();

export async function renderToDom(
  reactElement: ReactElement,
  domElement: Element,
  forceRemount: boolean
) {
  if (forceRemount) {
    unmountElement(domElement);
  }

  await renderElement(reactElement, domElement);
}

export const renderElement = async (node: ReactElement, el: Element) => {
  const root = await getReactRoot(el);

  return new Promise((resolve) => {
    if (root) {
      root.render(node);
    } else {
      ReactDOM.render(node, el, () => resolve(null));
    }
  });
};

const canUseNewReactRootApi =
  reactDomVersion &&
  (reactDomVersion.startsWith("18") || reactDomVersion.startsWith("0.0.0"));

const isUsingNewReactRootApi = canUseNewReactRootApi;

const getReactRoot = async (el: Element): Promise<ReactRoot | null> => {
  if (!isUsingNewReactRootApi) {
    return null;
  }

  let root = nodes.get(el);

  if (!root) {
    const reactDomClient = (await import("react-dom/client")).default;
    root = reactDomClient.createRoot(el);

    nodes.set(el, root);
  }

  return root;
};

/**
 * Unmounts the element from the render tree
 *
 * @param el The element that gets unmounted from the render tree
 */
const unmountElement = (el: Element) => {
  // Get the root
  const root = nodes.get(el);

  if (root && isUsingNewReactRootApi) {
    root.unmount();
    nodes.delete(el);
  } else {
    ReactDOM.unmountComponentAtNode(el);
  }
};
