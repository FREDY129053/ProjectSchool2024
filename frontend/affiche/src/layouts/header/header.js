import './header.css';
import { Logo } from './components/logo';
import { SearchBar } from './components/search-bar';
import { UserControls } from './components/user-controls';

function Header({ logo=true, searchBar=true, userControls=true }) {
    const components = [
        logo && <Logo key="logo" />,
        searchBar && <SearchBar key="searchBar" />,
        userControls && <UserControls key="userControls" />
    ].filter(Boolean);

    return (
        <div className={'Header ' + (components.length === 1 ? 'Center' : '')}>
            {components}
        </div>
    );
}

export { Header };