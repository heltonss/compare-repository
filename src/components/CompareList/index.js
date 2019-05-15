import PropTypes from 'prop-types';
import React from 'react';
import { Container, Repository } from './style';

const CompareList = ({ repositories }) => {
  return (
    <Container>
      {
        repositories.map(repository => (
          <Repository key={repository.id}>
            <header>
              <img src={repository.owner.avatar_url} alt={repository.owner.login} />
              <strong>{repository.name}</strong>
              <small>{repository.owner.login}</small>
            </header>

            <ul>
              <li>
                {repository.stargazers_count} <small>stars</small>
              </li>
              <li>
                {repository.forks_count}  <small>forks</small>
              </li>
              <li>
                {repository.open_issues_count}  <small>issues</small>
              </li>
              <li>
                {repository.lastCommit}  <small>last commit</small>
              </li>
              <li>
                {/* <button onClick={() => repository.update(repository.termSearch)}>update</button> */}
                {/* <button>remover</button> */}
              </li>
            </ul>
          </Repository>
        ))
      }
    </Container>
  )
}

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.shape({
      login: PropTypes.string,
      avatar_url: PropTypes.string
    }),
    stargazers_count: PropTypes.number,
    forks_count: PropTypes.number,
    open_issues_count: PropTypes.number,
    lastCommit: PropTypes.string,
    termSearch: PropTypes.string,
    update: PropTypes.func
  })).isRequired
}

export default CompareList
