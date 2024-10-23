import './main.css';
import { Header } from '../../layouts/header';
import { Navbar } from '../../layouts/navbar';
import { Footer } from '../../layouts/footer';
import { Content } from '../../layouts/content';
import { categoryIcons } from '../../constants/images';

function Main({PageType}) {

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
    <div className="Main">
      <Header/>
      <Navbar
        items={afficheCategories}
      />
      <Content
        PageType={PageType}
      />
      <Footer
        afficheCategories={afficheCategories}
        vlruCategories={vlruCategories}
      />
    </div>
  );
}

export { Main };
