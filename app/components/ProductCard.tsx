import AddToCart from './AddToCart'
import styles from './ProductCard.module.css'
// styles is a JS object and .card{} will become its property and .card's property become sub-properties
// so, have to follow the naming convention of JS while naming the CSS class in .module.css
// no hyphen, camel Casing

const ProductCard = () => {
  return (
    <div className={styles.card}>
      <AddToCart />
    </div>
  )
}
export default ProductCard
