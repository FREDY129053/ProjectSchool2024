import './styles/app.css';
import { Header } from './layouts/header';
import { Navbar } from './layouts/navbar';

function App() {

  const navbarItems = [
    "Концерты",
    "Театры",
    "Детям",
    "Стендап",
    "Спорт",
    "В городе",
    "Музеи и галлереи",
    "еще",
    // "Кино",
    // "Экскурсии и туры",
    // "Вечеринки",
    // "Впечатления",
    // "Мастер-классы",
    // "Обучение",
  ]

  return (
    <div className="App">
      <Header/>
      <Navbar
        items={navbarItems}
      />
    </div>
  );
}

export default App;
