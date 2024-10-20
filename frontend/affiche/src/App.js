import './styles/app.css';
import { Header } from './layouts/header';
import { Navbar } from './layouts/navbar';
import { Footer } from './layouts/footer';
import { Content } from './layouts/content';
import { EventPage } from './event-page';

import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Content />
  },
  {
    path: "/event",
    element: <EventPage />
  },
])

function App() {

  const vlruCategories = [
    "Авто",
    "Кино",
    "Недвижимость",
    "Новости",
    "Объявления",
    "Работа",
    "Справочник компаний",
  ]

  const afficheCategories = [
    "Концерты",
    "Театры",
    "Детям",
    "Стендап",
    "Спорт",
    "В городе",
    "Музеи и галлереи",
    "Кино",
    "Экскурсии и туры",
    "Вечеринки",
    "Впечатления",
    "Мастер-классы",
    "Обучение",
  ]

  return (
    <div className="App">
      <Header/>
      <Navbar
        items={afficheCategories}
      />
      <RouterProvider router={router} />
      <Footer
        afficheCategories={afficheCategories}
        vlruCategories={vlruCategories}
      />
    </div>
  );
}

export default App;
