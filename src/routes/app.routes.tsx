import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import { DefaultLayout } from "../layout/Home/DefaultLayout";
import Results from "../pages/Results";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
      </Route>
    </Routes>
  );
}
