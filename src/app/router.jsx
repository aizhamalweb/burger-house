import { createBrowserRouter } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout/MainLayout.jsx'
import Home from '../pages/Home/Home.jsx'
import MenuPage from '../pages/Menu/Menu.jsx'
import ContactsPage from '../pages/Contacts/Contacts'
import OffersPage from '../pages/Offers/Offers'
import NotFound from '../pages/NotFound/NotFound'
export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'menu', element: <MenuPage /> },
      { path: 'offers', element: <OffersPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: '*', element: <NotFound /> },
    ],
  },
])
