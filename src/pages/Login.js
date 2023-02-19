import {Form, Container, Button, Row} from 'react-bootstrap';
import React, { useState } from "react"
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await fetch("https://api.superpharmacycompounding.com.au/api/v1.0/accounts/public/login/", {
              method: "POST",
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: email,
                password: password
              }),
            });
            let resJson = await res.json();
            console.log();
            if (res.status === 201) {
                localStorage.setItem('access_token', resJson.data.access_token);
                localStorage.setItem('refresh_token', resJson.data.refresh_token);
                toast.success("Login successfully");
                navigate("/profile");
                
                
            } else {
                toast.error(resJson.message);
            }
        } catch (err) {
            console.log(err);
        }
      };

    return (
        <Container className='mt-3 mb-5'>

            <h2 className='text-center mb-3'>Login</h2>
            <Row xs={1} md={3} className="g-4 justify-content-center">
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
            </Form.Group>
        
            <Button variant="primary" type="submit">
                Login
            </Button>
            </Form>
            </Row>
        <ToastContainer />
        </Container>
    );
}

export default Login;