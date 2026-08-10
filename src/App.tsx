import { weatherThemes } from "./themes/weatherThemes";

function App() {
  const theme = weatherThemes.sunny;

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        minHeight: "100vh",
      }}
    >
      <h1>Weather Dashboard</h1>

      <p>Sunny Theme</p>

      <div
        style={{
          backgroundColor: theme.card,
          padding: "20px",
          borderRadius: "16px",
        }}
      >
        Weather Card
      </div>
    </div>
  );
}

export default App;