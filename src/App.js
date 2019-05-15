import React from 'react';
import logo from './logo.svg';
import './App.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import { getUserPlaylists } from './spotify';

// TODO: Refactor function to class for needed components
function App() {

  // TODO: Constructor for setting up didAuthenticate variable
  // TODO: Add Button `login` UI element to ask the user to login if didAuthenicate is false
  // TODO: componentDidMount for redirecting to spotify for authentication

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Download songs for offline use!
        </p>
        <a
          className="App-link"
          href="https://github.com/vcvuramdev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Check out more apps made by RamDev!
        </a>

        <button onClick={ (e) => { alert('Log in user!') } } >
          login with spotify
        </button>

        {/*
        <DropdownButton
            title='playlists'
            id='dropdown-playlists'
        >
          <Dropdown.Item eventKey="Title">Playlists</Dropdown.Item>
          <Dropdown.Divider />
          {
            getUserPlaylists().map(playlist => (
              <Dropdown.Item eventKey={playlist}>{playlist}</Dropdown.Item>
            ))
          }
        </DropdownButton>
        */}
      </header>
    </div>
  );
}

export default App;
