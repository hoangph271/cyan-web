import React from 'react'
import styled from 'styled-components'

import CenterText from '../../components/center-text'

const MemberHome = (props = {}) => {
  const { className }= props

  return (
    <CenterText className={className} text={`Wellcome, member...! :"}`} />
  )
}

export default styled(MemberHome)`
`
