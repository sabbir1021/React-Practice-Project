import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"

function Details() {

  const { id } = useParams()
  const [product, setProduct] = useState({})

  const fetchData = () => {
    fetch(`https://api.superpharmacycompounding.com.au/api/v1.0/products/user/product/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setProduct(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    
    <Card>
      <Card.Img width={100} height={400} variant="top" src={product.thumbnail} />
      <Card.Body>
        <Card.Title className='text-center'>{product.name}</Card.Title>
        <Card.Text>
          <div dangerouslySetInnerHTML={{__html: product.description}} /> 
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Details;