import {Card, Col, Row, Container, Button} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Home() {

  const [products, setProducts] = useState([])

  const fetchData = () => {
    fetch('https://api.superpharmacycompounding.com.au/api/v1.0/products/user/products/?'+ new URLSearchParams({
      show_in_search: false
  }))
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Container className='mt-3 mb-5'>
      <h2 className='text-center mb-3'>Product List</h2>
      <Row xs={1} md={3} className="g-4">

        {products.length > 0 && (
              products.map(product => (
                <Col>
                  <Card>
                    <Card.Img variant="top" src={product.thumbnail} />
                    <Card.Body>
                      <h2 className='text-success'>${product.price}</h2>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>
                          {product.category.name}
                      </Card.Text>
                      
                      <Button as={Link} to={`/product/${product.id}`} variant="primary">View details</Button>
                    </Card.Body>
                  </Card>
                </Col>
                
            ))
          )}
                  
    </Row>
    </Container>
  );
}

export default Home;