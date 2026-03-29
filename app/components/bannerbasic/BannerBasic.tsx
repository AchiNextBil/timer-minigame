'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './BannerBasic.module.css';
import Image from 'next/image';
import HistoryModal from '../historyModal/HistoryModal';
import { useRouter } from 'next/navigation';
import zhCN from '@/app/translations';
import Spinner from '../ui/spinner/Spinner';
import SuccessModal from '../SuccessModal/SuccessModal';

const BASE = ""
// const BASE = '/achi/questions';

const GAME_END_DATE = new Date('2026-08-19T00:00:00');

type TQuestion = {
  id: number | string;
  question_date: string;
  question_text: string;
};





// const formatDate = (d: Date): string => {
//   const day = String(d.getDate()).padStart(2, "0")
//   const month = MONTHS[d.getMonth()]
//   const year = d.getFullYear()
//   return `${day} ${month} ${year}`
// }

const formatDate = (d: Date): string => {
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
    .format(d)
    .replace(/\//g, ' 年')
    .replace(/(\d{2})$/, ' $1日');
};



const BannerBasic = () => {
  const [loading, setLoading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [historyModal, setHistoryModal] = useState(false);
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const router = useRouter();





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

 


 
  };


  return (
    <section className={styles.bannerWrapper}>
      {/* HERO */}
      <div className={styles.hero}>
        <Image
          src={`${BASE}/banner-desk-cn.webp`}
          alt="banner"
          fill
          priority
          className={styles.heroImgDesk}
        />
        <Image
          src={`${BASE}/banner-mobi-cn.webp`}
          alt="banner"
          fill
          priority
          className={styles.heroImgMobi}
        />
        <div className={styles.logoWrapper}>
          <Image src={`${BASE}/m88-logo-cn-desk.svg`} alt="logo" width={100} height={40} />
        </div>
      </div>

      {loading ? (
        <div className={styles.contentWrapper}>
          <Spinner />
        </div>
      ) : gameFinished ? (
        <div className={styles.content}>
          <div className={styles.gameFinishedBlock}>
            <Image
              src={`${BASE}/svg/success.svg`}
              alt="finished"
              width={48}
              height={48}
              className={styles.whiteIcon}
            />
            <h2 className={styles.gameFinishedTitle}>活动已结束</h2>
          </div>
        </div>
      ) : (
        <div className={styles.content}>



          {historyModal && <HistoryModal onClose={() => setHistoryModal(false)} />}
          {isSuccessModal && (
            <SuccessModal
              onClose={() => {
                setIsSuccessModal(false);
                router.refresh();
              }}
            />
          )}
        </div>
      )}
    </section>
  );
};

export default BannerBasic;
