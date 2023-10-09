import AddToCart from './AddToCart'
import styles from './ProductCard.module.css' // replaced with TW-CSS utilities
// styles is a JS object and .card{} will become its property and .card's property become sub-properties
// so, have to follow the naming convention of JS while naming the CSS class in .module.css
// no hyphen, camel Casing

const ProductCard = () => {
  return (
    // <div className="p-5 my-5 bg-sky-400 text-white text-xl hover:bg-sky-600"> -> TW-CSS classes/utilities
    <div>
      <AddToCart />
    </div>
  )
}
export default ProductCard
