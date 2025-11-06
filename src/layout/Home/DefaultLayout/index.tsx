import { Outlet } from "react-router-dom";
import "./defaultLayout.css";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

export function DefaultLayout() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <div className="container">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
