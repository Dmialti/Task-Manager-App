import "./App.css";
import TaskManagerPage from "./pages/TaskManagerPage";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Task Manager App
        </h1>
        <TaskManagerPage />
      </div>
    </div>
  );
}

export default App;
