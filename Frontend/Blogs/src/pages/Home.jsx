import { Button, Card } from "react-bootstrap"
import Navbars from "../components/Navbars"
import axios from "axios"
import { useEffect, useState } from "react"


const Home = () => {
    const [blogs, setBlogs]=useState([]);
    const getBlogs = async()=>{
        try {
            const res = axios.get('http://localhost:5000/api/blogs')
            console.log(res.data)
            setBlogs(res.data)
        } catch(err)  {
          console.log(err)  
        }
    }

    useEffect(()=>{
        getBlogs()
    },[])
  return (
    <>
    <Navbars/>
    <div style={{ padding:10}}>
        <h2>Blogs</h2>
        <p>Here are all the Blogs</p>
    </div>

    <div style={{padding:5, display:"flex", flex:"wrap", gap:10}}>
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Blog title</Card.Title>
        <Card.Text>
          Some quick example text to build on the Blog title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Blog</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Blog title</Card.Title>
        <Card.Text>
          Some quick example text to build on the Blog title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Blog</Button>
      </Card.Body>
    </Card>
    <Card style={{ width: '18rem' }}>
      
      <Card.Body>
        <Card.Title>Blog title</Card.Title>
        <Card.Text>
          Some quick example text to build on the Blog title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">View Blog</Button>
      </Card.Body>
    </Card>
    </div>
    </>
  )
}

export default Home