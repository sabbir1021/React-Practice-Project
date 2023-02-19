import {Card, Col, Row, Container, Button, Carousel, Pagination} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import ReactDOM from 'react-dom/client';


function Invoice() {

  const [price, setPrice] = useState("0");
  const [quantity, setQuantity] = useState("0");
  const [total, setTotal] = useState("0");

  const calculation = (a, type) => {
    if (type === "quant") {
      setTotal(a*price)
    } else {
      setTotal(a*quantity)
    }
    
  }

  const quantitySet = (a) => {
    setQuantity(a)
    calculation(a,'quant')
  }

  const priceSet = (a) => {
    setPrice(a)
    calculation(a,'price')
  }

  const newrow = () => {
    const root = ReactDOM.createRoot(
      document.getElementById('addnew')
    );
    const element = <h1>Hello, world</h1>;
    root.render(element);
  }
  

  return (
    <div>
      <Container className='mt-5 mb-5'>
        <h2 className='text-center mb-3'>Invoice List</h2>
        
        <div class="row g-2 " id="addnew">
          <div class="col-md-3">
            <label class="form-label">Product</label>
            <select class="form-select" aria-label="Floating label select example">
              <option selected>Select product</option>
              <option value="1">HP</option>
              <option value="2">Dell</option>
              <option value="3">Vivo</option>
            </select>
          </div>
          <div class="col-md-3">
            <label class="form-label">Price</label>
            <input type="text" class="form-control" onChange={(e)=> priceSet(e.target.value)} placeholder="0" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Quantity</label>
            <input type="text" class="form-control" onChange={(e)=> quantitySet(e.target.value)} placeholder="0" />
          </div>
          <div class="col-md-3">
            <label class="form-label">Total</label>
            <input type="text" class="form-control" placeholder="0" value={total} disabled />
          </div>
        </div>
        <Button onClick={()=> newrow()}>+</Button>
         
      </Container>
    </div>
  );
}

export default Invoice;