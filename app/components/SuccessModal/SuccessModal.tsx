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
            恭喜获得 <span style={{ fontWeight: 900 }}>{prize ?? '—'} 元</span>
          </h6>
          <p className={styles.additionalText}>
            前 888 位提交的会员，并完成当日存款至少 100 元，经审核通过后，奖金将在每日审核后 3
            天内派发。
          </p>
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
