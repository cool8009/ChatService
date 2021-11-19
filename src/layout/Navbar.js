import React from "react";
import { Container, Menu, Button, MenuItem } from "semantic-ui-react";

export default function Navbar() {

    return (
        <Menu inverted fixed='top' className='menu'>
            <Container>
                <MenuItem className='item'>
                    Backgammon
                </MenuItem>
                <MenuItem>
                    <Button to='/lobby' positive content='Lobby' />
                </MenuItem>
            </Container>
        </Menu>

    );

}