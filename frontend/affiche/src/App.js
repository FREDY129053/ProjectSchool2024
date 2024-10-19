import './styles/app.css';
import { Header } from './layouts/header';
import { Navbar } from './layouts/navbar';
import { EventCard } from './сomponents/common/event-card'; // временно для верстки без лайаута контента
import { EventCarousel } from './layouts/content/event-carousel'; // временно для верстки без лайаута контента

function App() {

  const navbarItems = [
    "Концерты",
    "Театры",
    "Детям",
    "Стендап",
    "Спорт",
    "В городе",
    "Музеи и галлереи",
    "Ещё",
    // "Кино",
    // "Экскурсии и туры",
    // "Вечеринки",
    // "Впечатления",
    // "Мастер-классы",
    // "Обучение",
  ]

  const eventData = {
    img: "./assets/examples/event-image.png",
    title: "Мюзикл \"Холодное сердце. Замороженные\"", 
    datetime: "3 ноября, 18:00",
    location: "концерт холл",
    price: "0"
  }

  const eventsData = Array.from({length: 15}, () => eventData);

  return (
    <div className="App">
      <Header/>
      <Navbar
        items={navbarItems}
      />
      <EventCarousel
        eventsData={eventsData}
      />
    </div>
  );
}

export default App;
