import Card from 'react-bootstrap/Card';
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from "react"

function BlogDetails() {

  const { id } = useParams()
  const [blog, setBlog] = useState({})

  const fetchData = () => {
    fetch(`https://api.superpharmacycompounding.com.au/api/v1.0/blogs/user/blog/${id}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBlog(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    
    <Card>
      <Card.Img width={100} height={400} variant="top" src={blog.thumbnail} />
      <Card.Body>
        <Card.Title className='text-center'>{blog.title}</Card.Title>
        <Card.Text>
          <div dangerouslySetInnerHTML={{__html: blog.description}} /> 
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BlogDetails;