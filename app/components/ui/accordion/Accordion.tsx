'use client';
import React, { useState, useRef, useEffect } from 'react';
import styles from './Accordion.module.css';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, children = null }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [maxHeight, setMaxHeight] = useState<string>('0px');
  const contentRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = () => setIsOpen((prev) => !prev);

  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setMaxHeight(`${contentRef.current.scrollHeight}px`);
      } else {
        setMaxHeight('0px');
      }
    }
  }, [isOpen]);

  return (
    <div className={`${styles.container} ${isOpen && styles.isOpen}`}>
      <div className={styles.header} onClick={toggleAccordion}>
        <h3 className={styles.title}>{title}</h3>
        <img src="svg/arrow-icon-down.svg" className={`${isOpen && styles.icon}`} />
      </div>
      <div ref={contentRef} className={styles.contentWrapper} style={{ maxHeight }}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
