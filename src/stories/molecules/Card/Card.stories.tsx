import Card from './index';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'molecules/Card',
  component: Card,
};

const DEMO_DATA = {
  id: 1,
  title: 'Essence Mascara Lash  Princess',
  thumbnail: '/pictures/image.png',
  price: 110
}

export const Demo = () => {
  return (
    <div>
      <div>
        <h1>Карточка товара</h1>
        <p>
          Используется для демонстрации товара в каталоге. Имеет свойства <code>cardData</code> типа CatalogItemType ( id: number,
          title: string, price: number, thumbnail: string) и defaultCounter типа number. Если defaultCounter = 0, то карточка имеет
          кнопку добавления в корзину. Если он больше 0, то кнопка добавления в корзину сменяется счетчиком таких товаров в корзине.
          По щелчку на карточке осуществлется переход на страницу товара.
        </p>
        <BrowserRouter>
        <div style={{
          'display': 'grid',
          'gap': '20px',
          'gridTemplateColumns': 'repeat(2, 370px)',
          'justifyItems': 'flex-start',
          'width': 'max-content'
        }}>
          <Card cardData={DEMO_DATA} defaultCounter={0} />
          <Card cardData={DEMO_DATA} defaultCounter={1} />
        </div>
        </BrowserRouter>
      </div>
    </div>
  );
};

Demo.parameters = {
  actions: { disabled: true },
  controls: { disabled: true }
};
