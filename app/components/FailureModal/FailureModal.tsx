'use client';
import Image from 'next/image';
import styles from './FailureModal.module.css';
import zhCN from '@/app/translations';

type SuccessModalProps = {
  onClose: () => void;
};

// const BASE = '';
const BASE = '/achi/timer';

const FailureModal = ({ onClose }: SuccessModalProps) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{zhCN.success}</h2>
          <button
            className={styles.closeBtn}
            onClick={() => {
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        <div className={styles.content}>
          <Image src={`${BASE}/svg/error-red.svg`} alt="failure" width={100} height={100} />
          <h1>{zhCN.submitted}</h1>
          <h6>You have won no points today. Come back tomorrow and try again</h6>
        </div>
        <div className={styles.footer}>
          <button
            className={styles.mainButton}
            onClick={() => {
              onClose();
            }}
          >
            {zhCN.mainPage}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureModal;
