import './styles/app.css';
import { Main as MainView } from './views/main';
import { Auth as AuthView } from './views/auth';
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <MainView />
  },
  {
    path: "/auth",
    element: <AuthView />
  },
])

function App() {
  return (
    <div className="App">
      <RouterProvider
        router={router}
      />
    </div>
  );
}

export default App;
