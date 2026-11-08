import classic from '../../../assets/images/products/classic_burger.png'
import double from '../../../assets/images/products/double_cheeseburger.png'
import spicy from '../../../assets/images/products/spicy_burger.png'
import chicken from '../../../assets/images/products/chicken_burger.png'
import fries from '../../../assets/images/products/french-fries.png'
import cheeseFries from '../../../assets/images/products/French-fries_with_cheese.png'
import cola from '../../../assets/images/products/cola.png'
import lemonade from '../../../assets/images/products/lemonade.png'
import icedTea from '../../../assets/images/products/iced-tea.png'
import cocktail from '../../../assets/images/products/cocktail.png'

export const menuProducts = [
 { id: 'classic', category: 'burgers', name: 'Классический бургер', description: 'Сочная говядина, сыр, свежие овощи и фирменный соус.', price: 340, image: classic },
 { id: 'double', category: 'burgers', name: 'Двойной чизбургер', description: 'Две котлеты, двойной сыр, хрустящий бекон и фирменный соус.', price: 480, image: double },
 { id: 'spicy', category: 'burgers', name: 'Острый бургер', description: 'Сочная говядина, сыр, халапеньо, острый соус и свежие овощи.', price: 420, image: spicy, spicy: true },
 { id: 'chicken', category: 'burgers', name: 'Чикен бургер', description: 'Хрустящая курица, свежие овощи и нежный соус.', price: 370, image: chicken },
 { id: 'fries-small', category: 'fries', name: 'Картофель фри Маленький', description: 'Классический хрустящий картофель.', price: 160, image: fries, imageScale: .8 },
 { id: 'fries-standard', category: 'fries', name: 'Картофель фри Стандартный', description: 'Золотистый картофель фри с лёгкой солью.', price: 220, image: fries, imageScale: .93 },
 { id: 'fries-large', category: 'fries', name: 'Картофель фри Большой', description: 'Большая порция хрустящего картофеля фри.', price: 290, image: fries, imageScale: 1.06, popular: true },
 { id: 'fries-cheese', category: 'fries', name: 'Картофель фри с сыром', description: 'Хрустящий картофель фри с нежным сырным соусом.', price: 320, image: cheeseFries, imageScale: 1.01 },
 { id: 'cola', category: 'drinks', name: 'Кола', description: 'Освежающий газированный напиток.', price: 150, image: cola, imageScale: 1.02 },
 { id: 'lemonade', category: 'drinks', name: 'Лимонад', description: 'Натуральный освежающий напиток с лимоном.', price: 180, image: lemonade, imageScale: 1.02 },
 { id: 'iced-tea', category: 'drinks', name: 'Холодный чай', description: 'Освежающий чай с натуральными вкусами.', price: 170, image: icedTea, imageScale: 1.02 },
 { id: 'cocktail', category: 'drinks', name: 'Молочный коктейль', description: 'Нежный коктейль с насыщенным вкусом.', price: 250, image: cocktail, imageScale: 1.02, isNew: true },
]
