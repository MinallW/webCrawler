import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

function App() {
  const [dataFetched, setDataFetched] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data: response} = await axios.get('http://localhost:3001/crawl');
        setDataFetched(response)
      
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
            <th>Rank</th>
            <th>Title</th>
            <th>Points</th>
            <th>NumberOfComments</th>
          </tr>
        </thead>
        <tbody>
          {dataFetched.map(item => {
            return (
              <tr key={item.rank}>
                <td>{ item.rank }</td>
                <td>{ item.title }</td>
                <td>{ item.points }</td>
                <td>{ item.comments }</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}

export default App;
