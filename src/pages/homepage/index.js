import React from 'react';
import './style.css';
import {Button, Icon, Header, Container, Segment, Image} from "semantic-ui-react";
import logoimage from '../../assets/logo.png';
import {Link} from 'react-router-dom';


export default function Homepage() {
    return (
        <>
            <Segment className='masthead' textAlign='center' vertical inverted>
                <Container>
                    <Header as="h1" inverted>
                        <Image size='massive' src={logoimage}/>
                        First Project
                    </Header>
                    <Button size='huge' as={Link} to='/events'>
                        Get Started
                        <Icon name="arrow right"/>
                    </Button>
                </Container>
            </Segment>
        </>
    )
}