import React, { Fragment } from 'react'
import styled from 'styled-components'
import spinner from './spinner.gif'

const Spinner = () => {
	const Img = styled.img`
		width: 200px;
		margin: auto;
		display: block;
	`

	return (
		<Fragment>
			<Img src={spinner} alt="Loading..." />
		</Fragment>
	)
}

export default Spinner
