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
    <Container className='mt-5'>
      <h2 className='text-center mb-1'>Shopping Cart</h2>
      <h6 className='text-center mt-3 mb-1'>{carts.length} items In Your Cart</h6>
      <div class="px-4 px-lg-0">
        <div class="pb-5">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                <div class="table-responsive">
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col" class="border-0 bg-light">
                          <div class="p-2 px-3 text-uppercase">Product</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Quantity</div>
                        </th>
                        <th scope="col" class="border-0 bg-light">
                          <div class="py-2 text-uppercase">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {carts.length > 0 && (
                        carts.map(cart => (
                          <tr>
                            <th scope="row" class="border-0">
                              <div class="p-2">
                                <img src={cart.image} alt="" width="70" class="img-fluid rounded shadow-sm" />
                                <div class="ml-3 d-inline-block align-middle">
                                  <h5 class="mb-0"> <a href="#" style={{marginLeft: "15px", textDecoration: "none", marginBottom: "5px"}} class="text-dark d-inline-block align-middle">{cart.name}</a></h5><span style={{marginLeft: "15px"}} class="text-muted font-weight-normal font-italic d-block">Category: {cart.category}</span>
                                </div>
                              </div>
                            </th>
                            <td class="border-0 align-middle"><strong>${parseFloat(cart.price * cart.quantity).toFixed(2)}</strong></td>
                            <td class="border-0 align-middle"><strong>{cart.quantity}</strong></td>
                            <td class="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
                          </tr>
                        ))
                      )}                      
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </Container>
  );
}

export default Cart;