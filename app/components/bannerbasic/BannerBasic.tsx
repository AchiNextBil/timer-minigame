'use client';

import { Book, Calendar, CircleCheckBig, Clock, Gift, Play, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import Spinner from '../ui/spinner/Spinner';
import styles from './BannerBasic.module.css';

// const BASE = '';
const BASE = '/achi/timer';

// const GAME_END_DATE = new Date('2026-08-19T00:00:00');

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
  // const [historyModal, setHistoryModal] = useState(false);
  // const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [username, setUsername] = useState('');
  const [errors, setErrors] = useState({ username: '' });

  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  // };

  return (
    <section className={styles.bannerWrapper}>
      {/* HERO */}
      <div className={styles.hero}>
        <Image
          src={`${BASE}/banner-desk-cn.png`}
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
        <div className={styles.greetingWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>Win Your </h1>
            <h1 className={styles.title2}>Freebet!</h1>
          </div>
          <p className={styles.subtitle}>
            Test your reflexes. Stop the timer at exactly{' '}
            <span style={{ color: '#CAAB72', fontWeight: 700 }}>8.88</span> seconds to unlock a
            special casino reward and win a prize.
          </p>
        </div>
      </div>

      {loading ? (
        <div className={styles.contentWrapper}>
          <Spinner />
        </div>
      ) : gameFinished ? (
        <div>
          <div>
            <Image
              src={`${BASE}/svg/success.svg`}
              alt="finished"
              width={48}
              height={48}
              className={styles.whiteIcon}
            />
            <h2>活动已结束</h2>
          </div>
        </div>
      ) : (
        <div className={styles.gameWrapper}>
          <div className={styles.mainGameWrapper}>
            <form className={styles.card}>
              <div className={styles.titleWrapper}>
                <Gift color="#CAAB72" size={20} />
                <p className={styles.challenge}>Freebet Challenge</p>
              </div>
              <div className={styles.daysWrapper}>
                <Calendar color="#caab72" size={15} />
                <p className={styles.daysTitle}>1 try / day</p>
              </div>
              <div className={styles.secondsWrapper}>
                <h1 className={styles.seconds}>0.00</h1>
                <p className={styles.secondsText}>seconds</p>
              </div>
              <div className={styles.inputWrapper}>
                <label>username</label>
                <input
                  type="text"
                  placeholder="enter your username"
                  value={username}
                  maxLength={16}
                  className={errors.username ? styles.inputError : ''}
                />
                {errors.username && <span className={styles.errorText}>{errors.username}</span>}
              </div>
              <button className={styles.submitButton}>
                <Play size={21} fill="#ffffff" stroke="none" />
                <p className={styles.submitText}>START TIMER</p>
              </button>
            </form>
            <div className={styles.card2}>
              <h1 className={styles.gameRulesTitle}>
                <Book size={20} color="#ffa30f" />
                How to Play & Terms
              </h1>
              <div className={styles.gameRulesWrapper}>
                <h1 className={styles.gameRulesTitle2}>
                  <Clock size={20} color="#784ff3" />
                  <span>Goal:</span> Stop the timer Between 8.80 to 8.90 seconds.
                </h1>
                <h1 className={styles.gameRulesTitle2}>
                  <CircleCheckBig size={25} color="#15cb04" />
                  <span>Prize:</span> Players who land within the winning window will receive a
                  Casino Freebet credited to their account.
                </h1>
                <h1 className={styles.gameRulesTitle2}>
                  <ShieldAlert size={35} color="#fc1452" />
                  <span>Terms:</span> One prize per player. Must be 18+ to play. The prize is
                  non-transferable and subject to standard wagering requirements. Attempts are
                  unlimited!
                </h1>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default BannerBasic;
