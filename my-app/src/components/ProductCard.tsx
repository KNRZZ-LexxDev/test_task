import React from 'react';
import '../styles/product_card_styles.scss';
interface Props {
  product: {
    id: number;
    name: string;
    image: string;
    features: Record<string, any>;
  };
  onReplace: () => void;
  showReplaceIcon: boolean;
}

const ProductCard: React.FC<Props> = ({ product, onReplace, showReplaceIcon }) => (
  <div className='product-card'>
    <div className='product-card__control-wrap'>
      <img src={product.image} alt="" className='product-card__img' />
      {showReplaceIcon && (
        <div className='product-card__button-wrap'>
          <button
            className='product-card__button'
            onClick={onReplace}
          >
          </button>
        </div>
      )}
    </div>
    <h4 className='product-card__title'>{product.name}</h4>
  </div>
);

export default ProductCard;
