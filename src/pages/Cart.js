import {Table, Container, Button} from 'react-bootstrap';
import React, { useEffect, useState } from "react"

function Cart() {

  const [carts, setCarts] = useState([])
  const cart = JSON.parse(localStorage.getItem('cart'));

  useEffect(() => {
    if (cart) {
      setCarts(cart)
    }
  }, [])

  return (
    <Container className='mt-3'>
      <h2 className='text-center mb-3'>Cart ({carts.length})</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
        {carts.length > 0 && (
            carts.map(cart => (
              <tr>
                <td>{cart.name}</td>
                <td>{parseFloat(cart.price * cart.quantity).toFixed(2)}</td>
                <td>{cart.quantity}</td>
              </tr>
            ))
          )}
          
        </tbody>
      </Table>
    </Container>
  );
}

export default Cart;