import moment from 'moment';
import React, { Component } from 'react';
import logo from '../../assets/logo.png';
import CompareList from '../../components/CompareList';
import api from '../../services/api';
import { Container, Form } from './style';

class Main extends Component {

  state = {
    repositoryInput: '',
    loading: false,
    repositories: [],
    repositoryError: false,
    termSearch: ''
  }

  componentDidMount() {
    const session = localStorage.getItem('repositories');
    if (session) {
      this.setState({ repositories: JSON.parse(session) })
    }
  }


  handleAddRepository = (e) => {
    e.preventDefault();

    this.setState({ loading: true })
    this.getRepository(this.state.repositoryInput)

  }

  handleUpdateRepository = (search) => {
    console.log('atualizado')
    this.getRepository(search)
  }

  async getRepository(search) {
    try {
      const { data: repository } = await api.get(`/repos/${search}`)

      repository.lastCommit = moment(repository.pushed_at).fromNow();
      repository.termSearch = this.state.repositoryInput;
      repository.update = this.handleUpdateRepository;
      console.log(this.handleUpdateRepository)

      this.setState(
        {
          repositoryInput: '',
          repositories: [...this.state.repositories, repository],
          repositoryError: false,
        })
    } catch (error) {
      this.setState({ repositoryError: true })
    }
    finally {
      localStorage.setItem('repositories', JSON.stringify(this.state.repositories))
      this.setState({ loading: false })
    }
  }


  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={this.state.repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{this.state.loading ? <i className="fa fa-spinner fa-pulse" /> : 'OK'}</button>
        </Form>
        <CompareList repositories={this.state.repositories} />
      </Container>
    )
  }
}

export default Main;
