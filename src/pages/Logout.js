import {Form, Container, Button, Row} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


function Logout() {

    
    const navigate = useNavigate();

    useEffect(() => {
        window.localStorage.clear();
        navigate('/login')
        window.location.reload();
      }, [])

    return (
        <Container className='mt-3 mb-5'>
            
            <h2 className='text-center mb-3'>Logging out</h2>
           
        </Container>
    );
}

export default Logout;