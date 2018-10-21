export function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val >= 0) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
