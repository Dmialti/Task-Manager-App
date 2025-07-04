import { useState } from "react";
import "./App.css";
import TaskManagerPage from "./pages/TaskManagerPage";
import CategoryManagerPage from "./pages/CategoryManagerPage";
import TagManagerPage from "./pages/TagManagerPage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [currentPage, setCurrentPage] = useState("tasks");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case "tasks":
        return <TaskManagerPage />;
      case "categories":
        return <CategoryManagerPage />;
      case "tags":
        return <TagManagerPage />;
      default:
        return <TaskManagerPage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      <div className="container mx-auto py-8">{renderCurrentPage()}</div>
    </div>
  );
}

export default App;
