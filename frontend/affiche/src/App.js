import './styles/app.css';
import { Main as MainView } from './views/main';
import { Auth as AuthView } from './views/auth';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "*",
    element: <MainView
      PageType="MainPage"
    />
  },
  {
    path: "/event",
    children: [
      {
        path: ":id",
        element: <MainView
          PageType="EventPage"
        />
      }
    ]
  },
  {
    path: "/favorite",
    element: <MainView
      PageType="FavoriteEvents"
    />
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
