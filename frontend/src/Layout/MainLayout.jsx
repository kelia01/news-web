import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Footer from "../components/Footer"

export const MainLayout = () => {
  return (
    <div style={{ fontFamily: "'Inter', system-ui, sans-serif", backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
