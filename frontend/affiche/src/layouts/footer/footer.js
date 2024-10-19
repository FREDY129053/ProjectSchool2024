import React from 'react';
import './footer.css';


function Footer({ afficheCategories, vlruCategories}) {
    return (
        <div className='Footer'>
            <div className='Col1'>
                <div className='Title'>
                    <b>Разделы</b>
                </div>
                <div className='Items'>
                    {afficheCategories.map((category, index) => (
                        <div className='Item' key={index}>
                            {category}
                        </div>
                    ))}
                </div>
            </div>
            <div className='Col2'>
                <div className='Title'>
                    <b>Разделы VL.RU</b>
                </div>
                <div className='Items'>
                    {vlruCategories.map((category, index) => (
                        <div className='Item' key={index}>
                            {category}
                        </div>
                    ))}
                </div>
                <div className='Title'>
                    <b>Мы в социальных сетях</b>
                </div>
                <div className='Icons'>
                    <img
                        src={'../../assets/icons/media-icons/vk.svg'}
                        alt={'vk'}
                    />
                    <img 
                        src={'../../assets/icons/media-icons/tg.svg'}
                        alt={'tg'}
                    />
                </div>
            </div>
            <div className='Col3'>
                <div className='Title'>
                    <b>Помощь с билетами</b>
                </div>
                <div className='Help'>
                    <div className='Row Buttons'>
                        <button className='HelpButton'>Вернуть билеты</button>
                        <button className='HelpButton'>Найти билеты</button>
                    </div>
                    <div className='Row Items'>
                        <div>
                            Правила возврата билетов
                        </div>
                        <div>
                            Как найти билеты
                        </div>
                        <div>
                            Вопросы по билетам
                        </div>
                    </div>
                </div>
                <div className='Title'>
                    <b>Информация</b>
                </div>
                <div className='Items'>
                    <div className='Item'>
                        Вакансии
                    </div>
                    <div className='Item'>
                        Контакты
                    </div>
                    <div className='Item'>
                        Информационное сотрудничество и продажа билетов на Афише VL.ru
                    </div>
                    <div className='Item'>
                        Правила Публикации события на Афише VL.ru
                    </div>
                </div>
                <div className='Email'>
                    По вопросам, предложениям или ошибкам пишите на почту bilet@vl.ru
                </div>
                <div className='Note'>
                    ООО "Примнет"<br />
                    При любом использовании материалов ссылка на VL.ru/AFISHA обязательна.<br />
                    Цитирование в Интернете возможно только при наличии гиперссылки.<br />
                    Все права защищены.
                </div>
            </div>

        </div>
    );
}

export { Footer };