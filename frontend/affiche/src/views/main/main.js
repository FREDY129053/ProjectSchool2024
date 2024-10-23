import { useEffect } from 'react';
import './main.css';
import { Header } from '../../layouts/header';
import { Navbar } from '../../layouts/navbar';
import { Footer } from '../../layouts/footer';
import { Content } from '../../layouts/content';
import { categoryIcons } from '../../constants/images';
import { getThemes } from '../../api/affiche';

function Main({PageType}) {

  let vlruCategories = [
    "Авто",
    "Кино",
    "Недвижимость",
    "Новости",
    "Объявления",
    "Работа",
    "Справочник компаний",
  ];

  let afficheCategories = [
    // "Концерты",
    // "Театры",
    // "Детям",
    // "Стендап",
    // "Спорт",
    // "В городе",
    // "Музеи и галлереи",
    // "Кино",
    // "Экскурсии и туры",
    // "Вечеринки",
    // "Впечатления",
    // "Мастер-классы",
    // "Обучение",
  ];

  useEffect(() => {
    const categories = getThemes();

  

    console.log(categories);
  }, []);

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
