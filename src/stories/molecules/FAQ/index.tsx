import Question from '../../../components/atoms/Question';
import { arrFAQ } from '../../../mocks';

import styles from './FAQ.module.css';

export type FAQType = {
  question: string;
  answer: string;
}

const Faq = () => {
  return (
    <section className={styles.FAQ}>
      <div
        className={styles.info}
        tabIndex={4}
      >
        <h2
          id='faq'
          className={styles.title}
        >
          FAQ
        </h2>
        <div className={styles.list}>
          {arrFAQ.map((item, index) => (
            <Question
              key={index}
              faq={item}
              />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
