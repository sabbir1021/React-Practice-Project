import {Card, Col, Row, Container, Button} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './Style.css';

function Profile() {

  const [user, setUser] = useState([])
  const token = localStorage.getItem('access_token');

  const fetchData = () => {
    fetch('https://api.superpharmacycompounding.com.au/api/v1.0/accounts/admin/profile/' , {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        return response.json()
      })
      .then(data => {
        setUser(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className='mt-3 mb-5'>
      <h2 className='text-center mb-3'>Profile</h2>
        <Row className="justify-content-center mt-2">
            <Col md={4}>
                <Card>
                <img className='profile rounded-circle mx-auto mt-3' src={user.profile_pic_url} />
                <Card.Body>
                    <Card.Title className='text-center'>Name: {user.first_name} {user.last_name}</Card.Title>
                    <Card.Title className='text-center'>Phone: {user.phone_number}</Card.Title>
                    
                </Card.Body>
                <div className=" mt-2 mb-2 text-center">
                  <Button className='mx-auto' as={Link} to={'/profile-edit'} variant="primary">Edit Profile</Button>
                </div>
                </Card>
            </Col>
        </Row>
    </Container>
  );
}

export default Profile;