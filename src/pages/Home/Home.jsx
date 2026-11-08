import Hero from '../../components/sections/Hero/Hero.jsx'
import MenuPage from '../Menu/Menu.jsx'
import './Home.css'
import Contacts from '../../components/sections/Contacts/Contacts.jsx'
export default function Home() {
 return <div id="home" className="home-scene">
  <Hero />
  <div className="home-scene__scroll-space" aria-hidden="true" />
  <div className="home-scene__menu"><MenuPage embedded /><Contacts /></div>
 </div>
}
