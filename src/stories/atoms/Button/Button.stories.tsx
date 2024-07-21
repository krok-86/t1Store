import Button, { ButtonProps } from './index';

const labels = ['Button', <img src="./pictures/plus.svg" />, <img src="./pictures/minus.svg" />];

export default {
  title: 'atoms/Button',
  component: Button,
  argTypes: {
    label: {
      options: labels,
      control: { type: 'select' },
      defaultValue: 'Button'
    },
    disabled: { type: 'boolean' },
  }
};

export const Demo = () => {
  return (
    <div>
      <div>
        <h1>Кнопки</h1>
        <p>
          Кнопки могут содержать надпись или изображение, которые  задаются с помощью свойства <code>label</code>.
          Для соответствия макету для кнпок с изображениями возможно задать свойство <code>isOnlySymbol</code>
        </p>

        <div style={{
          'display': 'flex',
          'gap': '20px',
          'flexWrap': 'wrap',
          'alignItems': 'center',
        }}>
          <Button
            label={<img src="./pictures/minus.svg" />}
          />
          <Button label='Button' />
        </div>
        <div>
          <h2>Размер</h2>
          <p>
            Стандартный размер кнопки c изображением может быть уменьшен с помощью свойства <code>isSmall</code>.
          </p>
          <Button
            label={<img src="./pictures/minus.svg" />}
            isSmall
          />
        </div>
        <div>
          <h2>Отключенная кнопка</h2>
          <p>
            Кнопку можно отключить с помощью свойства <code>disabled</code>.
          </p>
          <Button
            label='disabled'
            disabled
          />
        </div>
      </div>
    </div>
  );
};

Demo.parameters = {
  actions: { disabled: true },
  controls: { disabled: true }
};

export const Playground = (args: ButtonProps) => {

  return (
    <div>
      <Button {...args} />
    </div>
  );
};