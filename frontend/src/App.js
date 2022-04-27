import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function App() {
  const [articleTitle, setArticleTitle] = useState("") 
  const [articleCommentsNumber, setArticleCommentsNumber] = useState(0)
  const [articleOrderNumber, srticleOrderNumber] = useState(0)
  const [articlePoints, setArticlePoints] = useState(0)
  const [dataFetched, setDataFetched] = useState(0)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://localhost:3001');
        console.log(response)
      } catch (error) {
        console.error(error.message)
      }
    }
    fetchData()
  }, [])

  return (
    <>
      <h1>Web Crawler Application</h1>
      <Button variant="outline-primary">Primary</Button>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
}

export default App;
