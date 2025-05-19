import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { store } from "./store"
import Layout from "./components/Layout"
import Dashboard from "./pages/Dashboard"
import Leads from "./pages/Leads"
import LeadDetail from "./pages/Leads/LeadDetail"
import Projects from "./pages/Projects"
import ProjectDetail from "./pages/Projects/ProjectDetail"
import Users from "./pages/Users"
import Calendar from "./pages/Calendar"
import Settings from "./pages/Settings"
import Documents from "./pages/Documents"
import Integrations from "./pages/Integrations"
import SiteVisits from "./pages/SiteVisits"

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/leads" element={<Leads />} />
            <Route path="/leads/:id" element={<LeadDetail />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:id" element={<ProjectDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/site-visits" element={<SiteVisits />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Layout>
        <ToastContainer position="top-right" autoClose={3000} />
      </Router>
    </Provider>
  )
}

export default App
