import { Link } from 'react-router-dom';


import Logo from '../assets/img/pizza-logo.svg';
import Button from './Button';
import Search from './Search';

function Header() {


  return (
    <div className="header">
      <div className="container">
        <Link to="/">
          <div className="header__logo">
            <img width="38" src={Logo} alt="Pizza logo" />
            <div>
              <h1>React Pizza</h1>
              <p>самая вкусная пицца во вселенной</p>
            </div>
          </div>
        </Link>
				{location.pathname !== '/Cart' && <Search/>}
        <Button />
      </div>
    </div>
  );
}

export default Header;
