import { REACT_ELEMENT_TYPE } from 'shared/ReactSymbols'
import hasOwnProperty from 'shared/hasOwnProperty'

const RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
}

function hasValidKey(config) {
  return config.key !== undefined
}

function hasValidRef(config) {
  return config.ref !== undefined
}

export function ReactElement(type, key, ref, props) {
  return {
    $$typeof: REACT_ELEMENT_TYPE,
    type,
    key,
    ref,
    props
  }
}

/**
 * @param {string} type
 * @param {Record<string, any>} config
 * @param {string | undefined} maybeKey
 */
export function jsxDEV(type, config, maybeKey) {
  const props = {}
  let key = null
  let ref = null

  if (typeof maybeKey !== 'undefined') {
    key = maybeKey
  }

  if (hasValidKey(config)) {
    key = config.key
  }

  if (hasValidRef(config)) {
    ref = config.ref
  }

  for (let propName in config) {
    if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
      props[propName] = config[propName]
    }
  }

  return ReactElement(type, key, ref, props)
}
