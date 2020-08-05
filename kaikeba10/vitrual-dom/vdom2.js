const vnodeType = {
  HTML: 'HTML',
  TEXT: 'TEXT',
  COMPONENT: 'COMPONENT',
  CLASS_COMPONENT: 'CLASS_COMPONENT'
}

const childType = {
  EMPTY: 'EMPTY',
  SINGLE: 'SINGLE',
  MULTIPLE: 'MULTIPLE'
}

function createElement(tag, data, children) {
  let flag
  if (typeof tag === 'string') {
    flag = vnodeType.HTML
  } else if (typeof tag === 'function') {
    console.log('vnodeType is COMPONENT')
    flag = vnodeType.COMPONENT
  } else {
    flag = vnodeType.TEXT
  }
  let childrenFlag
  if (children === null) {
    childrenFlag = childType.EMPTY
  } else if (Array.isArray(children)) {
    let length = children.length
    if (length === 0) {
      childrenFlag = childType.EMPTY
    } else {
      childrenFlag = childType.MULTIPLE
    }
  } else {
    childrenFlag = childType.SINGLE
    children = createTextVnode(children + '')
  }

  return {
    tag, // 标签
    flag, // vnode类型
    data,
    key: data && data.key,
    children,
    childrenFlag,
    el: null
  }
}

function render(vnode, container) {
  // 区分首次渲染还是再次渲染
  if (container.vnode) {
    patch(container.vnode, vnode, container)
  } else {
    mount(vnode, container)
  }
  container.vnode = vnode
}

function patch(prev, next, container) {
  let prevFlag = prev.flag
  let nextFlag = next.flag
  if (nextFlag !== prevFlag) {
    replaceVnode(prev, next, container)
  } else if (nextFlag === vnodeType.HTML) {
    patchElement(prev, next, container)
  } else if (nextFlag === vnodeType.TEXT) {
    patchText(prev, next)
  }
}

function patchElement(prev, next, container) {
  if (prev.tag !== next.tag) {
    replaceVnode(prev, next, container)
    return
  }
  let el = (next.el = prev.el)
  let prevData = prev.data
  let nextData = next.data
  if (nextData) {
    for (let key in nextData) {
      let prevVal = prevData[key]
      let nextVal = nextData[key]
      patchData(el, key, prevVal, nextVal)
    }
  }
  if (prevData) {
    for (let key in prevData) {
      let prevVal = prevData[key]
      if (prevVal && !nextData.hasOwnProperty(key)) {
        patchData(el, key, prevVal, null)
      }
    }
  }
  patchChildren(prev.childrenFlag, prev.children, next.childrenFlag, next.children, el)
}

function patchChildren(prevChildrenFlag, prevChildren, nextChildrenFlag, nextChildren, container) {
  switch (prevChildrenFlag) {
    case childType.SINGLE:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          patch(prevChildren, nextChildren, container)
          break
        case childType.EMPTY:
          container.removeChild(prevChildren.el)
          break
        case childType.MULTIPLE:
          container.removeChild(prevChildren.el)
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break
      }
      break
    case childType.EMPTY:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          mount(nextChildren[i], container)
          break
        case childType.EMPTY:
          break
        case childType.MULTIPLE:
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break
      }
      break
    case childType.MULTIPLE:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          for (let i = 0; i < nextChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          mount(nextChildren, container)
          break
        case childType.EMPTY:
          for (let i = 0; i < nextChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          break
        case childType.MULTIPLE:
          let lastIndex = 0
          for (let i = 0; i < nextChildren.length; i++) {
            let nextVnode = nextChildren[i]
            let j = 0
            let find = false
            for (j; j < prevChildren.length; j++) {
              let prevVnode = prevChildren[j]
              if (prevVnode.key === nextVnode.key) {
                find = true
                patch(prevVnode, nextVnode, container)
                if (j < lastIndex) {
                  // [axbc] [cba] a j=2
                  let flagNode = nextChildren[i - 1].el.nextSibling
                  container.insertBefore(prevVnode.el, flagNode)
                  break
                } else {
                  lastIndex = j
                }
              }
            }
            if (!find) {
              let flagNode = i === 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
              mount(nextVnode, container, flagNode)
            }
          }
          for (let i = 0; i < prevChildren.length; i++) {
            const prevVnode = prevChildren[i]
            const has = nextChildren.find(next => next.key === prevVnode.key)
            if (!has) {
              container.removeChild(prevVnode.el)
            }
          }
          break
      }
      break
  }
}

function patchText(prev, next) {
  let el = (next.el = prev.el)
  if (next.children !== prev.children) {
    el.nodeValue = next.children
  }
}

function replaceVnode(prev, next, container) {
  container.removeChild(prev.el)
  mount(next, container)
}

function mount(vnode, container, flagNode) {
  let { flag } = vnode
  if (flag === vnodeType.HTML) {
    mountElement(vnode, container, flagNode)
  } else if (flag === vnodeType.TEXT) {
    mountText(vnode, container)
  }
}

function mountElement(vnode, container, flagNode) {
  let dom = document.createElement(vnode.tag)
  vnode.el = dom
  let { data, children, childrenFlag } = vnode
  if (data) {
    for (let key in data) {
      patchData(dom, key, null, data[key])
    }
  }
  if (childrenFlag !== childType.EMPTY) {
    if (childrenFlag === childType.SINGLE) {
      mount(children, dom)
    } else if (childrenFlag === childType.MULTIPLE) {
      for (let i = 0; i < children.length; i++) {
        mount(children[i], dom)
      }
    }
  }
  flagNode ? container.insertBefore(dom, flagNode) : container.appendChild(dom)
}

function mountText(vnode, container) {
  let dom = document.createTextNode(vnode.children)
  container.appendChild(dom)
}

function patchData(el, key, prev, next) {
  switch (key) {
    case 'style':
      for (let k in next) {
        el.style[k] = next[k]
      }
      for (let k in prev) {
        if (next && !next.hasOwnProperty(k)) {
          el.style[k] = null
        }
      }
      break
    case 'class':
      el.className = next
      break
    default:
      if (key[0] === '@') {
        if (next) {
          el.addEventListener(key.slice(1), next)
        }
        if (prev) {
          el.removeEventListener(key.slice(1), prev)
        }
      } else {
        el.setAttribute = (key, next)
      }
      break
  }
}

function createTextVnode(text) {
  return {
    flag: vnodeType.TEXT,
    tag: null,
    data: null,
    children: text,
    childrenFlag: childType.EMPTY,
  }
}