import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import CrudContainer from './components/CRUD/CrudContainer';
import PersonTable from './components/CRUD/PersonTable';
import CreatePersonForm from './components/CRUD/CreatePerson';
import DynamicDisplayContainer from './components/DynamicForm/dDynamicContainer';

export default class App extends Component {
  displayName = App.name

  render() {
    return (
      <Layout>
        <Route exact path='/' component={Home} />
        <Route path='/counter' component={Counter} />
        <Route path='/fetchdata' component={FetchData} />
        <Route path='/getPerson' component={PersonTable}/>
        <Route path='/createPerson' component={CreatePersonForm}/>
        <Route path='/crud' component={CrudContainer}/>
        <Route path='/dynamicForm' component={DynamicDisplayContainer}/>
      </Layout>
    );
  }
}
