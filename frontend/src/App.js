import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

const columns = [{
    dataField: 'rank',
    text: 'Rank',
    sort: true
  }, {
    dataField: 'title',
    text: 'Title',
    sort: true
  }, {
    dataField: 'points',
    text: 'Article Points',
    sort: true
  }, {
    dataField: 'comments',
    text: 'Number of Comments',
    sort: true
  }
];

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
      <BootstrapTable keyField='rank' data={ dataFetched } columns={ columns } pagination={ paginationFactory({hideSizePerPage: true}) } />
    </>
  );
}

export default App;
