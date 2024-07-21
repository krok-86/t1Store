import { FC, useState } from 'react';
import { Transition } from 'react-transition-group';

import styles from './question.module.css';

export type FAQType = {
  question: string;
  answer: string;
}

interface IQuestionProps {
  faq: FAQType;
}

const Question: FC<IQuestionProps> = ({ faq }) => {
  const [opened, setOpened] = useState<boolean>(false);

  const handleClick = (): void => {
    setOpened(!opened);
  };

  return (
    <div
      className={`${styles.faq} ${opened ? styles.faqOpened : ''}`}
      onClick={handleClick}
    >
      <dt
        className={`${styles.question} ${opened ? '' : styles.questionClosed}`}
        role="term"
        aria-haspopup="true"
      >
        {faq.question}
        <div className={`${styles.buttonWrap} ${opened ? styles.buttonWrapRotated : ''}`}>
          <img
            className={styles.picture}
            src="./pictures/ButtonOpen.svg"
            alt="open"
            aria-hidden
          />
        </div>
      </dt>
      <Transition
        in={opened}
        timeout={0}
      >
        {(state: string) => (
          <dd
            className={`${styles.answer} ${state === 'entered' ? styles.answerOpened : ''}`}
            aria-expanded = {opened}
            role="definition"
          >
            {faq.answer}
          </dd>
        )}
      </Transition>
    </div>
  );
};

export default Question;