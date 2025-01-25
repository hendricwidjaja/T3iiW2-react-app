import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useUserAuthContext } from './contexts/UserAuthContextProvider';

function App() {
  const [count, setCount] = useState(0);

  const [token, setToken] = useUserAuthContext();

  useEffect(() => {
    console.log(import.meta.env.VITE_AUTH_API_URL)
  }, []);

  // This should be in its own file/folder
  const connectToAPI = async () => {
    // Make API requests to "/" - the default route
    let response = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/`);

    let data = await response.json();
    console.log(data);
  }

  // This should be in its own file/folder
  const postUserLogin = async () => {
    let userDetails = {
      username: "Somename", // Should be retrieved from frontend
      password: "asdfasdf" // Should be retrieved from frontend
    };

    let response = await fetch(
      `${import.meta.env.VITE_AUTH_API_URL}/api/auth/login`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userDetails)
      }
    );

    let data = await response.json();
    console.log(data)

    setToken(data.token)
  }

  return (
    <>
      <div>
        {/* If we get a value here, means we correctly made the API request */}
        <h1 data-testId="jwt-header">{token}</h1>
        <button onClick={connectToAPI}>
          API Connection Check
        </button>
        <button data-testId="login-button" onClick={postUserLogin}>
          Login User
        </button>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button data-testid="counterButton" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
