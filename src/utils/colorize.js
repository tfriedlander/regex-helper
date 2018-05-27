const COLORS = ['#C00', '#0C0', '#00C', '#CC0', '#0CC']
const STARTING_COLOR_INDEX = -1

/**
 * Generates a thunk used to get the next color to be used
 * @param {number} [startingIndex=0] - index to start generating colors from
 * @return {Function} when called will return the next color in order
 */
function genColors({ startingIndex = STARTING_COLOR_INDEX, colors = COLORS } = {}) {
  let colorIndex = startingIndex
  const colorsLength = colors.length
  return () => {
    colorIndex = colorIndex > colorsLength - 2 ? 0 : colorIndex + 1
    return COLORS[colorIndex]
  }
}

/**
 * Generates an html string from the text string sent in
 * colorizing the matches/groups sent in
 * @param {object} match - object containing match info
 * @param {string} match.matched - full matched string within text
 * @param {Array<string>} match.groups - list of group strings
 * @param {number} match.index - index of text where the match occurs
 * @param {Function} getColor - function to generate the colors used
 * @return {string} colorized (html) string
 */
function colorizeMatch(
  { matched, groups = [] } = {},
  getColor = genColors()
) {
  const span = `<span style="color: ${getColor()};">`
  if (!groups.length) {
    return `${span}${matched}</span>`
  }
  const getStyle = () => `color: ${getColor()}; font-weight: bold;`
  const getSpan = str => `<span style="${getStyle()}">${str}</span>`

  const results = groups.reduce(
    ({ index, output }, groupStr) => {
      const str = output.substr(index)
      const nextGroupStr = getSpan(groupStr)
      const nextIndex = index + nextGroupStr.length
      const nextStr = str.replace(groupStr, nextGroupStr)
      return {
        index: nextIndex,
        output: `${output.substr(0, index)}${nextStr}`
      }
    },
    { index: 0, output: matched }
  )
  return `${span}${results.output}</span>`
}


/**
 * Colorize a string with matches
 * @param {string} text - the text to colorize
 * @param {Array<Object>} matches - list of match objects (matched, groups, index)
 * @param {Object} options - containing options for colorizing the text
 * @param {Function} options.getColor - function to generate the colors used
 * @return {string} colorized (html styled) text sent in
 */
function colorizeText(
  text,
  matches,
  {
    getColor = genColors()
  } = {}
) {
  if (!matches.length) {
    return `<span style="color: #000;">${text}</span>`
  }
  const results = matches.reduce(
    /**
     * Reduces the text into html colored based on the matches sent in
     * @param {Object} obj - the reduced object representing the final html output
     * @param {string} obj.html - the html being built (in progress of being built)
     * @param {string} obj.str - the remaining text to parse into html
     * @param {number} obj.lastIndex - index of the original string where left off
     *   used to calculate based off of the matched index against the obj.str
     * @param {Object} match - the match object
     * @param {string} match.matched - the full text of the match to colorize
     * @param {number} match.index - the index of the original string where the match occured
     * @param {Array<string>} match.groups - array of strings to colorize within the match
     * @return {Object} contains html, str, and lastIndex as above
     */
    ({ html, str, lastIndex }, { matched, index, groups }, reduceIndex) => {
      // length of the text segment that was matched
      const len = matched.length
      const nextIndex = index + len
      const inBetweenStr = str.substring(lastIndex, index)
      const colorizedMatch = colorizeMatch({ matched, groups }, getColor)
      return {
        html: `${html}${inBetweenStr}${colorizedMatch}`,
        lastIndex: nextIndex,
        str,
      }
    },
    { html: '<span style="color: #000;">', lastIndex: 0, str: text }
  )
  return `${results.html}${results.str.substring(results.lastIndex)}</span>`
}


export { colorizeMatch, genColors, colorizeText }
