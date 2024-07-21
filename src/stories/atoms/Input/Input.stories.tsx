import Input, { InputProps } from './index';

export default {
  title: 'atoms/Input',
  component: Input,
  argTypes: {
    disabled: { type: 'boolean' },
  }
};

export const Demo = () => {
  return (
    <div>
      <div>
        <h1>Input</h1>
          <Input
          placeholder='Placeholder'
          />
        </div>
        <div>
        <div>
          <h2>Отключенный инпут</h2>
          <p>
            Инпут можно отключить с помощью свойства <code>disabled</code>.
          </p>
          <Input
            disabled
            placeholder='disabled'
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

export const Playground = (args: InputProps) => {

  return (
    <div>
      <Input {...args} />
    </div>
  );
};