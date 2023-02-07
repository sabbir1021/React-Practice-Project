import {Table, Container, Button} from 'react-bootstrap';
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom";

function Blog() {

  const [blogs, setBlogs] = useState([])

  const fetchData = () => {
    fetch("https://api.superpharmacycompounding.com.au/api/v1.0/blogs/user/blogs/")
      .then(response => {
        return response.json()
      })
      .then(data => {
        setBlogs(data.data)
      })
  }

  useEffect(() => {
    fetchData()
  }, [])


  return (
    <Container className='mt-3'>
      <h2 className='text-center mb-3'>Blog List</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Blog Title</th>
            <th>Category</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length > 0 && (
            blogs.map(blog => (
              <tr>
                <td>{blog.title}</td>
                <td>{blog.category.name}</td>
                <td><Button  as={Link} to={`/blog/${blog.id}`}>Details</Button></td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default Blog;