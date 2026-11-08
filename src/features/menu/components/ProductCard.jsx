import { ShoppingCart, Flame, Check, Star } from 'lucide-react'
import Motion from '../../../components/ui/Motion/Motion'
import { useCart } from '../../cart/model/useCart'

export default function ProductCard({ product, index, onAdd }) {
  const { items, add } = useCart()
  const quantity = items.find(item => item.id === product.id)?.quantity || 0
  const badge = product.isNew ? 'Новинка' : product.spicy ? 'Острый' : product.popular ? 'Популярный' : null
  const imageStyle = product.imageScale ? {
    '--product-scale': product.imageScale,
    '--product-hover-scale': product.imageScale + .05,
  } : undefined

  const addToCart = () => {
    add(product)
    onAdd(`${product.name} добавлен в корзину`)
  }

  return (
    <Motion tilt delay={Math.min(index * 65, 260)}>
      <article className="product-card">
        <div className={`product-card__visual ${product.category === 'drinks' ? 'product-card__visual--drink' : ''}`} style={imageStyle}>
          <img src={product.image} alt={product.name} />
          {badge && (
            <span className="product-card__badge">
              {product.isNew ? <Star aria-hidden="true" /> : <Flame aria-hidden="true" />}
              {badge}
            </span>
          )}
        </div>
        <div className="product-card__body">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-card__bottom">
            <strong>{product.price} <span>сом</span></strong>
            <button type="button" aria-label={`Добавить ${product.name} в корзину${quantity ? `, уже добавлено: ${quantity}` : ''}`} onClick={addToCart}>
              {quantity ? <Check aria-hidden="true" /> : <ShoppingCart aria-hidden="true" />}
              {quantity > 0 && <span className="product-card__quantity">{quantity}</span>}
            </button>
          </div>
        </div>
      </article>
    </Motion>
  )
}
