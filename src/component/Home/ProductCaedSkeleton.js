import "./ProductCardSkeleton.css"

const ProductCardSkeleton = () => {
  return (
    <div className="product-card-skeleton">
      <div className="skeleton-image-wrapper">
        <div className="skeleton-image"></div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-brand"></div>
        <div className="skeleton-name"></div>
        <div className="skeleton-rating">
          <div className="skeleton-stars"></div>
          <div className="skeleton-reviews"></div>
        </div>
        <div className="skeleton-price"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  )
}

export default ProductCardSkeleton
