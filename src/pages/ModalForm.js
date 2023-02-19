import React, { useEffect, useState } from "react"
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Card, Col, Row, Container, Button, Carousel, Pagination} from 'react-bootstrap';
import { Link } from "react-router-dom";



function ModalFrom() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [reCall, setReCall] = useState("");
  const [categoryfilter, setCategoryFilter] = useState('');


  const fetchData = async () => {
    const data = await (
      await fetch(
        'https://api.superpharmacycompounding.com.au/api/v1.0/products/user/products/?show_in_search=false&'+ `category=${categoryfilter}${reCall}`
      )
    ).json();
    setProducts(data.data)

    if (!reCall && !categoryfilter) {
      const cat_data = await (
        await fetch(
          'https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product-category/'
        )
      ).json();
      setCategory(cat_data.data)
      
    }
    

  }

  useEffect(() => {
    fetchData()
  }, [reCall, categoryfilter])

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      let res = await fetch("https://api.superpharmacycompounding.com.au/api/v1.0/accounts/public/login/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      let resJson = await res.json();
      console.log();
      if (res.status === 201) {
          localStorage.setItem('access_token', resJson.data.access_token);
          localStorage.setItem('refresh_token', resJson.data.refresh_token);
          toast.success("Login successfully");
          handleClose()
          setReCall("&page=1&page_size=3")
          
          // navigate("/profile");
          
          
      } else {
          toast.error(resJson.message);
      }
      } catch (err) {
          console.log(err);
      }
    };

    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };


  return (
    <>
    <Container className='mt-5'>
      <Button variant="primary" onClick={handleShow}>
        Login
      </Button>
      
      <div className="mt-3 col-3">
        <select class="form-select" aria-label="Default select example" onChange={(e) => setCategoryFilter(e.target.value)}>
          <option selected>Select Category</option>
          {category.length > 0 && (
                category.map(category => (
                  <option value={category.id}>{category.name}</option>
              )))}
        </select>
      </div>

      <Modal 
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                required
                type="email"
                name="email"
                placeholder="email"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                name="password"
                placeholder="password"
                autoFocus
                onChange={handleInputChange}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Container className='mt-5 mb-5'>
        <h2 className='text-center mb-3'>Product List</h2>
        <Row xs={1} md={3} className="g-4 mt-3">
          {products.length > 0 && (
                products.map(product => (
                  <Col>
                    <Card>
                      <Card.Body>
                        <h2 className='text-success'>${product.price}</h2>
                        <Card.Title>{product.name}</Card.Title>
                        <Card.Text>
                            {product.category.name}
                        </Card.Text>
                        <div class="d-grid mt-2">
                          <Button className='float-right' as={Link} to={`/product/${product.id}`} variant="primary">View details</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
              ))
            )}
        </Row>
      </Container>
      <ToastContainer />
      </Container>
    </>
  );
}

export default ModalFrom;