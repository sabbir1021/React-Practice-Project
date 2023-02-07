import {Table, Container, Button} from 'react-bootstrap';
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
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 && (
            products.map(product => (
              <tr>
                <td>{product.name}</td>
                <td>{product.category.name}</td>
                <td><Button  as={Link} to={`/product/${product.id}`}>Details</Button></td>
              </tr>
            ))
          )}
          
        </tbody>
      </Table>
    </Container>
  );
}

export default Home;