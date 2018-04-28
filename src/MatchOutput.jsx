import React from 'react'


function MatchOutput(props) {
  console.log('rendering MatchOutput')
  return (
    <div>
      Matches: { JSON.stringify(props.matches || []) }
    </div>
  )
}

export default MatchOutput
