import {Col,Form, Button, Container,Carousel,Card, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import './Style.css';
import { toast } from 'react-toastify';


function Details() {
  const token = localStorage.getItem('access_token');
  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [images, setImages] = useState([])
  const [review, setReview] = useState([])

  const [formData, setFormData] = useState({
    comment: "",
    rating: "0",
    product: `${id}`,
  });

  const fetchData = async () => {
    const data = await (
      await fetch(
        `https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product/${id}/`
      )
    ).json();
    setProduct(data.data)
    setImages(data.data.images)

    const review_data = await (
      await fetch(
        `https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product-reviews/?product=${id}`
      )
    ).json();
    setReview(review_data.data)
  }

  useEffect(() => {
    fetchData()
  },[])


  let handleSubmit = async (e) => {
    e.preventDefault();
    formData['rating'] = parseInt(formData.rating)
    try {
      let res = await fetch("https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product-reviews/", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
      let resJson = await res.json();
      if (res.status === 201) {
        toast.success("Review Added successfully");   
        setReview(prev=>[...prev, resJson.data])
        setFormData(prev=>({...prev, comment: "",rating: "0"}))
          
      } else {
        toast.error(resJson.message);
      }
      } catch (err) {
        console.log(err);
      }
    
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container className='mt-3 mb-5'>
      <Row md={12} className="g-4">
        <Col>
          <Carousel>
          {images.length > 0 && (
              images.map(image => (
                <Carousel.Item>
                  <img
                    className="w-100"
                    src={image}
                    alt="First slide"
                  />
                </Carousel.Item>
            ))
          )}
          </Carousel>
        </Col>

        <Col className='mt-5'>
          <h1 className='text-success mt-5'>${product.price}</h1>
          <h2 className=''>{product.name}</h2>
          <h6 className=''>{product.short_description}</h6>
          
        </Col>
      </Row>
      <Col>
        <Card>
          <Card.Body>
            <Card.Title>Description</Card.Title>
            <Card.Text>
            <div dangerouslySetInnerHTML={{__html: product.description}} /> 
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>  
    

    {review.length > 0 && (
      review.map(review => (
        <div class="card w-75 mt-4">
          <div class="card-body">
            <p class="card-text">{review.rating}</p>
            <p class="card-text">{review.comment}</p>
            <h5 class="card-title">{review.user.first_name} {review.user.last_name}</h5>
          </div>
        </div>  
    )))}
    
    {token ? 
      <>
      <Form onSubmit={handleSubmit} className="mt-5">
      <Row className="mb-6">
        <Form.Group as={Col} md="6" controlId="validationCustom01">
          <Form.Label>Comments</Form.Label>
          <Form.Control
            required
            as="textarea" rows={3}
            placeholder="Write your comments..."
            name="comment"
            value={formData.comment}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Review</Form.Label>
          <Form.Control
            required
            type="number"
            min="0" max="5"
            placeholder=""
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        </Row>
        <Button className='mt-2' type="submit">Submit Review</Button>
      </Form>
      </> 
      :<></>
    }
    
    </Container>
  );
}

export default Details;