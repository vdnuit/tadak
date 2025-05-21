import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/hello')  // Spring Boot에 요청
      .then(res => res.text())  // 문자열로 응답 받음
      .then(data => setMessage(data));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <p>Spring에서 온 메시지:</p>
        <p>{message}</p>
      </header>
    </div>
  );
}

export default App;
