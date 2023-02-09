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

  const shoot = (a) => {
    let products = JSON.parse(localStorage.getItem('cart'));
    if (products) {
      for (let i = 0; i < products.length; i++) {
          if (products[i].id === a.id) {
            products[i].quantity = products[i].quantity+ 1
            const add_products = JSON.stringify(products);
            localStorage.setItem('cart', add_products);
            return
          }
      }
      const data = {
        'id': a.id,
        'name': a.name,
        'quantity': 1,
        'maxQuantity': a.quantity,
        'price': a.price,
        'image': a.thumbnail
      }
      products.push(data)
      const add_products = JSON.stringify(products);
      localStorage.setItem('cart', add_products);
      
    } else {
      const data = {
        'id': a.id,
        'name': a.name,
        'quantity': 1,
        'maxQuantity': a.quantity,
        'price': a.price,
        'image': a.thumbnail
      }
      const product = JSON.stringify([data]);
      localStorage.setItem('cart', product);
    }
  }

  return (
    <Container className='mt-3 mb-5'>
      <h2 className='text-center mb-3'>Product List</h2>
      <nav class="navbar navbar-light bg-light">
        <form >
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
          <button class="btn btn-success my-2 my-sm-0" type="submit">Search</button>
        </form>
      </nav>
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
                      <Button onClick={() => shoot(product)} variant="primary">Add To Cart</Button>
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