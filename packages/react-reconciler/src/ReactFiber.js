import { HostComponent, HostRoot, HostText, IndeterminateComponent } from './ReactWorkTags'
import { NoFlags } from './ReactFiberFlags'

/**
 * @param {*} tag
 * @param {*} pendingProps
 * @param {*} key
 */
export function FiberNode(tag, pendingProps, key) {
  this.tag = tag
  this.key = key
  this.type = null
  // 指向真实 DOM 节点（根节点则指向 FiberRootNode）
  this.stateNode = null

  /**
   * 父节点
   * @type {FiberNode}
   */
  this.return = null
  /**
   * 指向第一个子节点
   * @type {FiberNode}
   */
  this.child = null
  /**
   * 指向下一个兄弟节点
   * @type {FiberNode}
   */
  this.sibling = null
  // 作为子节点时，自身所在的索引
  this.index = 0

  // 等待生效的 props
  this.pendingProps = pendingProps
  // 已经生效的 props
  this.memoizedProps = null
  // ?
  this.memoizedState = null
  // ?
  this.updateQueue = null
  // 副作用标识，标识自己的副作用，如需要新增、修改节点等
  this.flags = NoFlags
  // 记录后代节点的副作用标识
  this.subtreeFlags = NoFlags
  /**
   * @type {FiberNode}
   */
  this.alternate = null
}

export function createFiber(tag, paddingProps, key) {
  return new FiberNode(tag, paddingProps, key)
}

export function createHostRootFiber() {
  return createFiber(HostRoot, null, null)
}

/**
 * 基于老 Fiber 和新属性来创建新的 Fiber
 * @param {FiberNode} current
 * @param {*} pendingProps
 */
export function createWorkInProgress(current, pendingProps) {
  let workInProgress = current.alternate

  if (!workInProgress) {
    workInProgress = createFiber(current.tag, pendingProps, current.key)
    workInProgress.type = current.type
    workInProgress.stateNode = current.stateNode
    workInProgress.alternate = current
    current.alternate = workInProgress
  } else {
    workInProgress.pendingProps = pendingProps
    workInProgress.type = current.type
    workInProgress.flags = NoFlags
    workInProgress.subtreeFlags = NoFlags
  }
  workInProgress.child = current.child
  workInProgress.memoizedProps = current.memoizedProps
  workInProgress.memoizedState = current.memoizedState
  workInProgress.updateQueue = current.updateQueue
  workInProgress.sibling = current.sibling
  workInProgress.index = current.index

  return workInProgress
}

export function createFiberFromElement(element) {
  const { type, key, props } = element
  return createFiberFromTypeAndProps(type, key, props)
}

function createFiberFromTypeAndProps(type, key, pendingProps) {
  let tag = IndeterminateComponent

  // 原生 DOM 节点
  if (typeof type === 'string') {
    tag = HostComponent
  }

  const fiber = createFiber(tag, pendingProps, key)
  fiber.type = type
  return fiber
}

/**
 * @param {string} content
 */
export function createFiberFromText(content) {
  return createFiber(HostText, content, null)
}