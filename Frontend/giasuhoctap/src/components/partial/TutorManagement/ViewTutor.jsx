import React from 'react'
import Container from './Container'
import Search_Input from '../../global/Search_Input'
import Header from './Header'
import Body from './Body'
import TableList from './TableList'

export default function ViewTutor() {
    return (
        <div>
            <Container>
                <Header>
                    <Search_Input />
                </Header>
                <Body>
                    <TableList/>
                </Body>
            </Container>
        </div>
    )
}
