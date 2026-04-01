'use client';

import {
  Book,
  Calendar,
  CircleCheckBig,
  Clock,
  Gift,
  Play,
  ShieldAlert,
  Square,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../ui/spinner/Spinner';
import styles from './BannerBasic.module.css';

const BASE = '';
// const BASE = '/achi/timer';

// const GAME_END_DATE = new Date('2026-08-19T00:00:00');

// const formatDate = (d: Date): string => {
//   const day = String(d.getDate()).padStart(2, "0")
//   const month = MONTHS[d.getMonth()]
//   const year = d.getFullYear()
//   return `${day} ${month} ${year}`
// }

const formatTime = (t: number): string => {
  const totalMs = Math.floor(t * 1000);
  const secs = Math.floor(totalMs / 1000);
  const ms = totalMs % 1000;

  return `${secs}:${ms.toString().padStart(3, '0')}`;
};

// const formatDate = (d: Date): string => {
//   return new Intl.DateTimeFormat('zh-CN', {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//   })
//     .format(d)
//     .replace(/\//g, ' 年')
//     .replace(/(\d{2})$/, ' $1日');
// };

const BannerBasic = () => {
  const [loading, setLoading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  // const [historyModal, setHistoryModal] = useState(false);
  // const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [errors, setErrors] = useState({ username: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allowedToPlay, setAllowedToPlay] = useState<boolean | null>(null);
  const [checkingAllowence, setCheckingAllowence] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    const isUserAllowed = setTimeout(async () => {
      try {
        if (!username?.trim()) return;
        setCheckingAllowence(true);
        const res = await fetch('https://clubthreesix.com/giorgi/api-game-2/check.php', {
          headers: {
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({ username: username.trim() }),
        });
        const data = await res.json();
        setCheckingAllowence(false);
        setAllowedToPlay(data.can_play);
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
          setErrorMsg(error.message);
        }
      } finally {
        setCheckingAllowence(false);
      }
    }, 300);

    return () => clearTimeout(isUserAllowed);
  }, [username]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (time > 0) return;
    setTime(0);
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setTime(elapsed);
    }, 99);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username?.trim() || isSubmitted) return;
    setIsSubmitted(true);

    // Stop the timer first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }

    try {
      const res = await fetch('https://clubthreesix.com/giorgi/api-game-2/submit.php', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ username: username?.trim(), result: formatTime(time) }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setErrorMsg(error.message);
        setIsSubmitted(false); // allow retry if failed
      }
    }
  };

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
            <form className={styles.card} onSubmit={handleSubmit}>
              <div className={styles.titleWrapper}>
                <Gift color="#CAAB72" size={20} />
                <p className={styles.challenge}>Freebet Challenge</p>
              </div>
              <div className={styles.daysWrapper}>
                <Calendar color="#caab72" size={15} />
                <p className={styles.daysTitle}>1 try / day</p>
              </div>
              <div className={styles.secondsWrapper}>
                <h1 className={styles.seconds}>{time?.toFixed(2)}</h1>
                <p className={styles.secondsText}>seconds</p>
              </div>
              <div className={styles.inputWrapper}>
                <label>username</label>
                <input
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="enter your username"
                  value={username || ''}
                  maxLength={16}
                  className={errors.username ? styles.inputError : ''}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <span className={styles.errorText}>{errors.username}</span>}
                {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
                {checkingAllowence && (
                  <span className={styles.checkingText}>checkingAllowence...</span>
                )}
                {allowedToPlay === false && (
                  <span className={styles.errorText}>you already played today</span>
                )}
              </div>
              {time === 0 && (
                <button
                  type="button"
                  onClick={startTimer}
                  className={styles.startButton}
                  disabled={
                    allowedToPlay === false || !username?.trim() || checkingAllowence || time > 0
                  }
                >
                  <Play size={21} fill="#ffffff" stroke="none" />
                  <p className={styles.submitText}>START TIMER</p>
                </button>
              )}
              {time > 0 && (
                <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
                  <Square size={21} fill="#ffffff" stroke="none" />
                  <p className={styles.submitText}>{isSubmitted ? 'SUBMITTED' : 'STOP NOW'}</p>
                </button>
              )}
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
