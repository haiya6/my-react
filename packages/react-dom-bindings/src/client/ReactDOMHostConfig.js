import { setInitialProperties } from './ReactDOMComponent'

export function shouldSetTextContent(type, props) {
  return /string|number/.test(props)
}

export function createTextInstance(content) {
  return window.document.createTextNode(content)
}

/**
 *
 * @param {string} type
 * @param {*} newProps
 * @param {import('react-reconciler/src/ReactFiber').FiberNode} workInProgress
 */
export function createInstance(type, newProps, workInProgress) {
  const domElement = window.document.createElement(type)
  return domElement
}

export function appendInitialChild(parent, child) {
  parent.appendChild(child)
}

/**
 * @param {HTMLElement} domElement
 * @param {string} type
 * @param {*} props
 */
export function finalizeInitialChildren(domElement, type, props) {
  setInitialProperties(domElement, type, props)
}