import { RouterProvider } from "react-router-dom";
import { router } from "./routes/index";
import ToastWrapper from "./routes/ToastWrapper"

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastWrapper/>
    </>
  )
}
export default App;

