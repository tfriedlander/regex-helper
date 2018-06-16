import React from 'react'
import { genColors } from './utils/colorize'

function MatchOutput(props) {
  const { matches } = props
  const styles = {
    width: '20%',
    float: 'right',
    display: 'inline-block',
    overflowY: 'auto',
    height: '90vh',
  }
  const getColor = genColors()
  const genStyle = () => ({ color: getColor() })
  const groupList = (groups, key)  => groups.map((group, index) => (
    <li key={`${key}_${index}`}>
      <span style={ genStyle() }>{group}</span>
    </li>
  ))
  const matchList = matches.map(
    ({ matched = '', groups = [], index = 0 }, matchNum) => (
      <li key={`${matched}_${index}`}>
        <span style={ genStyle() }>{matched}</span>
        <ol>
          {groupList(groups, `${matched}_${index}`)}
        </ol>
      </li>
    )
  )
  return (
    <div style={styles}>
      <ul>
        { matchList }
      </ul>
    </div>
  )
}

export default MatchOutput
