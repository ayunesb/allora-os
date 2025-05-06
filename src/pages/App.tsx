import { Suspense } from "react";
import { BrowserRouter, useRoutes } from "react-router-dom";
import { appRoutes } from "./routes"; // your full route array
function AppRoutes() {
  return (
    <Suspense fallback={<div className="p-6">Loading...</div>}>
      {useRoutes(appRoutes)}
    </Suspense>
  );
}
export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
