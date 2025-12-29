import { RouterProvider } from "react-router-dom";
import router from "./router/root";          // ← root가 default export라면 이렇게


function App() {
  return (
    <>
      <RouterProvider router={router} />
      <div id="cursor" className="custom-cursor"></div>
    </>
  );
}

export default App;
