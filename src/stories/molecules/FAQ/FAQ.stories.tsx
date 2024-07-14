import Faq from './index';

export default {
  title: 'molecules/Faq',
  component: Faq,
};

export const Demo = () => {
  return (
    <div>
      <div>
        <h1>FAQ</h1>
        <p>
          Формируется на основе массива объектов типа FAQType {`({question: string, answer: string}[])`}.
          Его пункты интерактивно открываются/закрываются по щелчку на них.
        </p>
        <Faq />
      </div>
    </div>
  );
};

Demo.parameters = {
  actions: { disabled: true },
  controls: { disabled: true }
};
