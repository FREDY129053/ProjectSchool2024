import './header.css';
import { Logo } from './components/logo';
import { SearchBar } from './components/search-bar';
import { UserControls } from './components/user-controls';

function Header() {
    return (
        <div className='Header '>
            <Logo/>
            <SearchBar/>
            <UserControls/>
        </div>
    );
}

export { Header };