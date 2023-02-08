import {Col, Container,Carousel,Card, Row} from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"
import './Style.css';

function Details() {

  const { id } = useParams()
  const [product, setProduct] = useState({})
  const [images, setImages] = useState([])

  const fetchData = () => {
    fetch(`https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProduct(data.data)
        setImages(data.data.images)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

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
    </Container>
    
    // <Card>
    //   <Card.Img width={100} height={400} variant="top" src={product.thumbnail} />
    //   <Card.Body>
    //     <Card.Title className='text-center'>{product.name}</Card.Title>
    //     <Card.Text>
    //       <div dangerouslySetInnerHTML={{__html: product.description}} /> 
    //     </Card.Text>
    //   </Card.Body>
    // </Card>
  );
}

export default Details;