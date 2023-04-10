import Image from 'next/image';
import { useState, useEffect } from 'react';
import buildspaceLogo from '../assets/github.png';


const Home = () => {
  const [userInput, setUserInput] = useState('');
  const [apiOutput, setApiOutput] = useState('')
  const [databaseSchema, setDatabaseSchema] = useState('');
  const [testOutput, setTestOutput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isOn, setIsToggled] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  
  // Sign up button
  <a href="/signup" className="signup-button">Sign up</a>
  // Sign up page
  const SignUp = async => {
    return (
      <div>
        <h1>Sign up</h1>
        <form>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" />

          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />

          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />

          <button type="submit">Submit</button>
        </form>
      </div>
    );
  };

  let result = 'SELECT ';
  const callGenerateEndpoint = async () => {
    if (userInput === "") {
      // display error message
      alert("Please enter a query before generating.");
    } else {
      setIsGenerating(true);

      console.log("Calling OpenAI...")
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userInput, databaseSchema}),
      });

      const data = await response.json();
      const {output} = data;
      console.log("OpenAI replied...", output.text)

      setApiOutput(`${output.text}`);
      setIsGenerating(false);
    }
  }
  const onUserChangedText = (event) => {
    //console.log(event.target.value);
    setUserInput(event.target.value);
  };
  const onDatabaseChangedText = (event) => {
    //console.log(event.target.value);
    setDatabaseSchema(event.target.value);
  };
  const onTestOutputText = (event) => {
    setTestOutput(event.target.value);
  }

  function copyToClipboard(elementId) {
    // select the textarea
    var textarea = document.getElementById(elementId);
    textarea.select();

    // copy the text to the clipboard
    document.execCommand("copy");
  }
  function ToggleSwitch() {

    const handleToggle = () => {
      setIsToggled(!isOn);
    }
  }
    return (
        <div>
          <title>QueryCraft</title>
          <div className="root">
            
            <div className="container">
            <a href="https://querycraft.vercel.app/">
              <hh>🔮QueryCraft</hh>
            </a>

              <div className="prompt-container logo-container">
                <div className="logo"></div>
              </div>
              <div className="header">
                <div className="header-title">
                  <h1>English to SQL</h1>
                </div>

                <div className="header-subtitle">
                  <h2>Easily convert between English and SQL!</h2>
                  
                </div>
              </div>
              <div className="query-container">
                <textarea placeholder="state your query"
                          className="prompt-box query-box"
                          value={userInput}
                          onChange={onUserChangedText}

                />
                <div className="prompt-buttons">
                  <a className="generate-button grow" onClick={callGenerateEndpoint}>
                    <div className="generate">
                      {isGenerating ? <span className="loader"></span> : <p>Go</p>}
                    </div>
                  </a>
                </div>
              </div>
              <div className="prompt-container">
                <textarea placeholder="enter your schema"
                          className="prompt-box"
                          value={databaseSchema}
                          onChange={onDatabaseChangedText}
                />
                {apiOutput && (
                    <textarea placeholder="output..."
                              className="prompt-box grow"
                              value={result + apiOutput.replace("<code>", "")}
                              onChange={onTestOutputText}
                              readOnly={true}
                    />
                )}

                {/*New code I added here */}

              </div>
            </div>
            <div className="badge-container grow">
              <a
                  href="https://github.com/pradyutnair"
                  target="_blank"
                  rel="noreferrer"
              >
                <div className="badge">
                  <Image src={buildspaceLogo} alt="buildspace logo"/>
                  <p>GitHub</p>
                </div>
              </a>
            </div>
          </div>
        </div>
    );
};
export default Home;

