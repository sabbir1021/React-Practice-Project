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
      <div className="px-4 px-lg-0">
        <div className="pb-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">

                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col" className="border-0 bg-light">
                          <div className="p-2 px-3 text-uppercase">Product</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Price</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Quantity</div>
                        </th>
                        <th scope="col" className="border-0 bg-light">
                          <div className="py-2 text-uppercase">Remove</div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>

                      {carts.length > 0 && (
                        carts.map(cart => (
                          <tr>
                            <th scope="row" className="border-0">
                              <div className="p-2">
                                <img src={cart.image} alt="" width="70" className="img-fluid rounded shadow-sm" />
                                <div className="ml-3 d-inline-block align-middle">
                                  <h5 className="mb-0"> <a href="#" style={{marginLeft: "15px", textDecoration: "none", marginBottom: "5px"}} className="text-dark d-inline-block align-middle">{cart.name}</a></h5><span style={{marginLeft: "15px"}} className="text-muted font-weight-normal font-italic d-block">Category: {cart.category}</span>
                                </div>
                              </div>
                            </th>
                            <td className="border-0 align-middle"><strong>${parseFloat(cart.price * cart.quantity).toFixed(2)}</strong></td>
                            <td className="border-0 align-middle"><strong>{cart.quantity}</strong></td>
                            <td className="border-0 align-middle"><a href="#" class="text-dark"><i class="fa fa-trash"></i></a></td>
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