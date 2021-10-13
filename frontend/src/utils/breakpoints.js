const breakpointsNames = ['xs', 'sm', 'md', 'lg', 'xl']

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const xsUp = (width) => {
  return breakpointsNames.indexOf(width) > breakpointsNames.indexOf('xs')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const smUp = (width) => {
  return breakpointsNames.indexOf(width) > breakpointsNames.indexOf('sm')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const mdUp = (width) => {
  return breakpointsNames.indexOf(width) > breakpointsNames.indexOf('md')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const lgUp = (width) => {
  return breakpointsNames.indexOf(width) > breakpointsNames.indexOf('lg')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const xlUp = (width) => {
  return breakpointsNames.indexOf(width) > breakpointsNames.indexOf('lg')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const xsDown = (width) => {
  return breakpointsNames.indexOf(width) < breakpointsNames.indexOf('xs')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const smDown = (width) => {
  return breakpointsNames.indexOf(width) < breakpointsNames.indexOf('sm')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const mdDown = (width) => {
  return breakpointsNames.indexOf(width) < breakpointsNames.indexOf('md')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const lgDown = (width) => {
  return breakpointsNames.indexOf(width) < breakpointsNames.indexOf('lg')
}

/**
 * Check if a given width is uper the breakpoint
 * @param {String} width : Current width
 */
const xlDown = (width) => {
  return breakpointsNames.indexOf(width) < breakpointsNames.indexOf('lg')
}

export { xsUp, smUp, mdUp, lgUp, xlUp, xsDown, smDown, mdDown, lgDown, xlDown }
