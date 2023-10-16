import HomeScreen from '../src/HomeScreen';
import DetailsScreen from '../src/DetailsScreen';
import LoginScreen from '../src/LoginScreen';
import CadastroScreen from '../src/CadastroScreen';
import PaymentScreen from '../src/PaymentScreen';
const iconHome = require('../../../assets/images/tabbar/home.png');
const iconCalendar = require('../../../assets/images/tabbar/calendar.png');
const iconGrids = require('../../../assets/images/tabbar/grids.png');
const iconPages = require('../../../assets/images/tabbar/pages.png');
const iconComponents = require('../../../assets/images/tabbar/components.png');

const TabNavigationData = [
  {
    name: 'Details',
    component: DetailsScreen,
    icon: iconHome,
  },
  {
    name: 'Home',
    component: HomeScreen,
    icon: iconHome,
  },
  {
    name: 'Login',
    component: LoginScreen,
    icon: iconHome,
  },
  {
    name: 'Cadastro',
    component: CadastroScreen,
    icon: iconHome,
  },
  {
    name: 'PaymentScreen',
    component: PaymentScreen,
    icon: iconHome,
  },

];

export default TabNavigationData;