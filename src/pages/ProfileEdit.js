import {Card, Form, Row, Container, Button} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import './Style.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";


function ProfileEdit() {

  const [loading, setLoading] = useState(false)
  const token = localStorage.getItem('access_token');
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      let res = await fetch("https://api.superpharmacycompounding.com.au/api/v1.0/accounts/admin/profile/", {
        method: "GET",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });
      let data = await res.json();
      if (res.status === 401) {
          navigate("/login");
          setLoading(true)
      } else {
          setFName(data.data.first_name)
          setLName(data.data.last_name)
          setPhone(data.data.phone_number)
          setLoading(true)
          }
      } catch (err) {
          console.log(err);
    }
  }

  useEffect(() => {
    fetchData()
  }, [])


  const [first_name, setFName] = useState("");
  const [last_name, setLName] = useState("");
  const [phone, setPhone] = useState("");

  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("https://api.superpharmacycompounding.com.au/api/v1.0/accounts/admin/profile/", {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          phone_number: phone
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
          navigate("/profile");
          toast.success("Update successfully");
      } else {
          toast.error(resJson.message);
      }
  } catch (err) {
      console.log(err);
  }
  }

  return (
    <Container className='mt-3 mb-5'>
      {!loading? 
      <>
        <div class="loader-circle">
          <p class="loader-content">LOADING</p>
          <div class="loader-line-mask">
            <div class="loader-line"></div>
          </div>
        </div>
      </>
      :
      <>
      <h2 className='text-center mb-3'>Profile Edit</h2>
      <Row xs={1} md={3} className="g-4 justify-content-center">
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control onChange={(e) => setFName(e.target.value)} type="text" defaultValue={first_name} placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control onChange={(e) => setLName(e.target.value)} type="text" value={last_name} placeholder="Enter your name" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Phone</Form.Label>
              <Form.Control onChange={(e) => setPhone(e.target.value)} type="text" value={phone} placeholder="phone number" />
          </Form.Group>
      
          <Button variant="primary" type="submit">
              Submit 
          </Button>
        </Form>
      </Row>
      </>}
    </Container>
  );
}

export default ProfileEdit;