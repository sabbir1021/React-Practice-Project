import {Card, Col, Row, Container, Button, Carousel, Pagination} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import cover1 from '../images/HeaderCover1.jpg';
import cover2 from '../images/HeaderCover2.jpg';
import cover3 from '../images/HeaderCover3.jpg';


function Home() {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState("");

  const fetchData = async () => {
    if (!pagination) {
      setPagination("page=1&page_size=12")
    }
    console.log('-----------',pagination);
    await fetch('https://api.superpharmacycompounding.com.au/api/v1.0/products/user/products/?'+ `${pagination}`+ '&' + new URLSearchParams({
      show_in_search: false}) + `&search=${query}`
      )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [query, pagination])

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
        'category': a.category.name,
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
        'category': a.category.name,
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
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={cover1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={cover2}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={cover3}
            alt="First slide"
          />
        </Carousel.Item>

      </Carousel>
      <Container className='mt-5 mb-5'>
        <h2 className='text-center mb-3'>Product List</h2>
        <div class="row">
          <div class="col-md-5 mx-auto">
              <div class="input-group">
                  <input onChange={(e)=> setQuery(e.target.value)} class="form-control " type="text" />
                  {/* <span class="input-group-append">
                      <button class="btn btn-outline-success" type="button">
                          Search
                      </button>
                  </span> */}
              </div>
          </div>
        </div>

        <Row xs={1} md={3} className="g-4 mt-3">

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
                        <div class="d-grid mt-2">
                          <Button onClick={() => shoot(product)} variant="success">Add To Cart</Button>
                        </div>

                        <div class="d-grid mt-2">
                          <Button className='float-right' as={Link} to={`/product/${product.id}`} variant="primary">View details</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
              ))
            )}
                    
        </Row>
        <Pagination className='mt-5 justify-content-center'>
          <Pagination.First disabled/>
          <Pagination.Prev  disabled/>
          <Pagination.Ellipsis disabled />
          <Pagination.Item active>{12}</Pagination.Item>
          <Pagination.Ellipsis disabled />
          <Pagination.Next />
          <Pagination.Last />
        </Pagination>
      </Container>
    </div>
  );
}

export default Home;