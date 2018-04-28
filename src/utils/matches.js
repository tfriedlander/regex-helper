/**
 * Generates an array of matches
 *
 * @example
 *
 * const str = 'The Quick Brown Fox Jumps Over The Lazy Dog'
 * const regex = /quick\s(brown).+?(jumps)/ig
 * > getMatches(str, regex)
 * [ { matched: 'Quick Brown Fox Jumps',
 *       groups: [ 'Brown', 'Jumps' ],
 *       index: 4 } ]
 *
 * const str2 = 'table football, foosball'
 * const regex2 = /o(.)(.)(.)/gi
 * > getMatches(str2, r)
 * [ { matched: 'ootb', groups: [ 'o', 't', 'b' ], index: 7 },
 *   { matched: 'oosb', groups: [ 'o', 's', 'b' ], index: 17 } ]
 *
 * const regex3 = /o(.)(.)(.)/i
 * > getMatches(str2, regex3)
 * [ { matched: 'ootb', groups: [ 'o', 't', 'b' ], index: 7 } ]
 *
 * @param {string} text - the input string to match against
 * @param {RegExp} regex - regex to match with
 * @return {Array<*>} a list of matches,
 */
const getMatches = (text, regex) => {
  const match = regex.exec(text)
  if (!match) {
    return []
  }
  const { lastIndex, global } = regex
  const matchObj = {
    matched: match[0],
    groups: match.slice(1, match.length),
    index: match.index,
  }
  // as to why we aren't changing the input
  // see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec
  // using recursion just so we don't have to do a while loop
  const others = global ? getMatches(text, regex) : []
  const result = [matchObj, ...others]
  return result
}

export default getMatches
export { getMatches }
