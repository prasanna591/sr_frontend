import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [goal, setGoal] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const handleRecommend = async () => {
    setError("");
    setResult(null);
    try {
      const res = await axios.get(
        `http://localhost:5000/recommend?goal=${goal}`
      );
      setResult(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "something went wrong");
    }
  };
  return (
    <div className="container">
      <h1>Skill Recommendation System</h1>
      <input
        type="text"
        placeholder="Enter your career goal..."
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      />
      <button onClick={handleRecommend}> Get recommendation</button>

      {result && (
        <div className="result">
          <h2>Matched Goal : {result.match}</h2>
          <p>
            <strong>Skills:</strong>
            {result.recommended_skills}
          </p>
          <p>
            <strong>Project:</strong>
            {result.recommended_projects}
          </p>
        </div>
      )}

      {error && <p className="error">error:{error}</p>}
    </div>
  );
}

export default App;
