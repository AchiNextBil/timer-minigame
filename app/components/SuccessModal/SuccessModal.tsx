'use client';
import Image from 'next/image';
import styles from './SuccessModal.module.css';
import zhCN from '@/app/translations';

type SuccessModalProps = {
  onClose: () => void;
  prize?: number | null;
};

// const BASE = '';
const BASE = '/achi/timer';

const SuccessModal = ({ onClose, prize }: SuccessModalProps) => {
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
          <Image src={`${BASE}/svg/success-green.svg`} alt="success" width={100} height={100} />
          <h1>{zhCN.submitted}</h1>
          <h6 className={styles.winnedPrize}>
            You have won <span style={{ fontWeight: 900 }}>{prize ?? '—'} CNY</span>
          </h6>
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

export default SuccessModal;
