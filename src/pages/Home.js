import {Card, Col, Row, Container, Button, Carousel} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import cover1 from '../images/banner1.jpg';
import cover2 from '../images/banner2.jpg';
import cover3 from '../images/banner3.jpg';


function Home() {

  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [page_size, setPagesize] = useState(12);
  const [next_page, setNextPage] = useState(null);
  const [previous_page, setPreviousPage] = useState(null);

  const fetchData = async () => {
    await fetch('https://api.superpharmacycompounding.com.au/api/v1.0/products/user/products/?'+ `page=${page}&page_size=${page_size}`+ '&' + new URLSearchParams({
      show_in_search: false}) + `&search=${query}`
      )
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProducts(data.data)
        setNextPage(data.meta_data.next)
        setPreviousPage(data.meta_data.previous)
      })
  }

  useEffect(() => {
    fetchData()
  }, [query, page, page_size])

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
        <div className="row">
          <div className="col-md-5 mx-auto">
              <div className="input-group">
                  <input onChange={(e)=> setQuery(e.target.value)} className="form-control " type="text" />
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
                        <div className="d-grid mt-2">
                          <Button onClick={() => shoot(product)} variant="success">Add To Cart</Button>
                        </div>

                        <div className="d-grid mt-2">
                          <Button className='float-right' as={Link} to={`/product/${product.id}`} variant="primary">View details</Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                  
              ))
            )}
                    
        </Row>
          <nav className='mt-5'>
            <ul className="pagination justify-content-center">
              {previous_page 
                ?
                (<li className="page-item">
                  <button className="page-link" onClick={() => setPage(previous_page)}>Previous</button>
                </li>)  
                : (<li className="page-item disabled">
                  <button className="page-link">Previous</button>
                </li>)
              }

              <li className="page-item active" aria-current="page">
                <a className="page-link">{page}</a>
              </li>

              {next_page
                ? 
                ( <li className="page-item">
                  <button className="page-link" onClick={() => setPage(next_page)}>Next</button>
                </li>)
                : (<li className="page-item disabled">
                  <button className="page-link">Next</button>
                </li>)
              }
              
            </ul>
          </nav>
      </Container>
    </div>
  );
}

export default Home;