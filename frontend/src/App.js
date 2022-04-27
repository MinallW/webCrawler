import React, { useState } from 'react';
import './App.css';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import Button from 'react-bootstrap/Button';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, numberFilter, Comparator } from 'react-bootstrap-table2-filter';

const columns = [{
    dataField: 'rank',
    text: 'Rank',
    sort: true
  }, {
    dataField: 'title',
    text: 'Title',
    sort: true,
    sortFunc: (a, b, order) => {
      return order === 'asc' ? a.length - b.length : b.length - a.length
    },
    filter: textFilter()
  }, {
    dataField: 'points',
    text: 'Article Points',
    sort: true,
    filter: numberFilter({
      defaultValue: { number: 0, comparator: Comparator.GT }
    })
  }, {
    dataField: 'comments',
    text: 'Number of Comments',
    sort: true,
    filter: numberFilter({
      defaultValue: { number: 0, comparator: Comparator.GT }
    })
  }
];

function App() {
  const [dataFetched, setDataFetched] = useState([])

  const fetchData = async () => {
    try {
      const {data: response} = await axios.get('http://localhost:3001/crawl');
      setDataFetched(response)
    
    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <h1>Web Crawler Application</h1>
      <Button variant="outline-primary" onClick={fetchData}>Crawl Hacker News!</Button>
      <BootstrapTable keyField='rank' data={ dataFetched } 
        columns={ columns } pagination={ paginationFactory({hideSizePerPage: true}) } 
        filter={ filterFactory() } 
      />
    </>
  );
}

export default App;
