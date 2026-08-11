import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

function App() {
  return (
    <div className="flex min-h-screen bg-[#F4FAF6]">
      <Sidebar />

      <main className="flex-1 p-8">
        <Header />

        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-800">
            Dashboard
          </h3>

          <p className="mt-2 text-gray-500">
            Your weather information will appear here.
          </p>
        </div>
      </main>
    </div>
  );
}

export default App;