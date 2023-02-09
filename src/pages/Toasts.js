import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function Toasts(props) {
    const [show, setShow] = useState(true);
    return (
        <Row>
        <Col xs={6}>
            <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
            <Toast.Header>               
            </Toast.Header>
            <Toast.Body>{props.message}</Toast.Body>
            </Toast>
        </Col>
        </Row>
    );
}

export default Toasts;