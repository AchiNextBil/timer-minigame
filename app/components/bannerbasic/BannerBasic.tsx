'use client';

import {
  Book,
  Calendar,
  CircleAlert,
  CircleCheckBig,
  Clock,
  Gift,
  Play,
  ShieldAlert,
  Square,
  Trophy,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Spinner from '../ui/spinner/Spinner';
import styles from './BannerBasic.module.css';

const BASE = '';
// const BASE = '/achi/timer';

const formatTime = (t: number): string => {
  const totalMs = Math.floor(t * 1000);
  const secs = Math.floor(totalMs / 1000);
  const ms = totalMs % 1000;
  return `${secs}:${ms.toString().padStart(3, '0')}`;
};

const USERNAME_REGEX = /^[A-Za-z0-9]{3,16}$/;

type ResultKey = 'perfect timing' | 'well timing' | 'bit fast' | 'bit slow' | 'missed it' | '';

const RESULT_CONFIG: Record<Exclude<ResultKey, ''>, { icon: React.ReactNode; color: string }> = {
  'perfect timing': { icon: <Trophy size={20} />, color: '#05df72' },
  'well timing': { icon: <Trophy size={20} />, color: '#05df72' },
  'bit fast': { icon: <Clock size={20} />, color: '#ff4d4f' },
  'bit slow': { icon: <Clock size={20} />, color: '#ff4d4f' },
  'missed it': { icon: <CircleAlert size={20} />, color: '#ff4d4f' },
};

const BannerBasic = () => {
  const [loading, setLoading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  // const [errors, setErrors] = useState({ username: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [allowedToPlay, setAllowedToPlay] = useState<boolean | null>(null);
  const [checkingAllowence, setCheckingAllowence] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<ResultKey>('');
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const isUserAllowed = setTimeout(async () => {
      try {
        if (!username?.trim()) return;
        setCheckingAllowence(true);
        const res = await fetch('https://clubthreesix.com/giorgi/api-game-2/check.php', {
          headers: { 'Content-Type': 'application/json' },
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
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const evaluateResult = (t: number): ResultKey => {
    if (t >= 8.8 && t <= 8.9) {
      if (Math.abs(t - 8.88) < 0.01) return 'perfect timing';
      return 'well timing';
    }
    if (t < 8.8) return 'bit fast';
    if (t > 8.9 && t < 10) return 'bit slow';
    if (t >= 10) return 'missed it';
    return '';
  };

  const doSubmit = async (finalTime: number) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (navigator.vibrate) navigator.vibrate(50);

    const result = evaluateResult(finalTime);
    setResultMessage(result);
    setIsSubmitted(true);

    try {
      const res = await fetch('https://clubthreesix.com/giorgi/api-game-2/submit.php', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        body: JSON.stringify({ username: username?.trim(), result: formatTime(finalTime) }),
      });
      const data = await res.json();
      console.log(data);
    } catch (error) {
      if (error instanceof Error) {
        console.log(error);
        setErrorMsg(error.message);
        setIsSubmitted(false);
      }
    }
  };

  const startTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (time > 0) return;
    setTime(0);
    timeRef.current = 0;
    const start = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      timeRef.current = elapsed;
      setTime(elapsed);

      // Auto-stop at 10 seconds
      if (elapsed >= 10) {
        doSubmit(elapsed);
      }
    }, 99);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username?.trim() || isSubmitted || time === 0) return;
    await doSubmit(timeRef.current);
  };

  // Block Enter key from triggering start or unintended submit
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      // Only allow Enter if the focused element is the stop button
      if (target.tagName !== 'BUTTON' || (target as HTMLButtonElement).type !== 'submit') {
        e.preventDefault();
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip any character that is not A-Za-z0-9
    const filtered = e.target.value.replace(/[^A-Za-z0-9]/g, '');
    setUsername(filtered);
  };

  const isUsernameValid = USERNAME_REGEX.test(username);
  const showUsernameError = usernameTouched && username.length > 0 && !isUsernameValid;
  const isStartDisabled =
    !isUsernameValid || allowedToPlay === false || checkingAllowence || time > 0;

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
            <form className={styles.card} onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
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
                  className={showUsernameError ? styles.inputError : ''}
                  onChange={handleUsernameChange}
                  onFocus={() => setUsernameTouched(true)}
                  disabled={time > 0}
                />
                {showUsernameError && (
                  <span className={styles.errorText}>
                    仅限 3-16 个字母数字（A-Z、a-z、0-9）字符。
                  </span>
                )}
                {!showUsernameError && username.length === 0 && usernameTouched && (
                  <span className={styles.errorText}>
                    仅限 3-16 个字母数字（A-Z、a-z、0-9）字符。
                  </span>
                )}
                {errorMsg && <span className={styles.errorText}>{errorMsg}</span>}
                {checkingAllowence && (
                  <span className={styles.checkingText}>checkingAllowence...</span>
                )}
                {allowedToPlay === false && (
                  <span className={styles.errorText}>you already played today</span>
                )}
              </div>

              {time === 0 && (
                <>
                  <button
                    type="button"
                    onClick={startTimer}
                    className={`${styles.startButton} ${isStartDisabled ? styles.startButtonDisabled : ''}`}
                    disabled={isStartDisabled}
                  >
                    <Play size={21} fill="#ffffff" stroke="none" />
                    <p className={styles.submitText}>START TIMER</p>
                  </button>
                  {!isUsernameValid && username.length === 0 && (
                    <p className={styles.startHint}>Enter your username to start</p>
                  )}
                </>
              )}

              {time > 0 && (
                <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
                  <Square size={21} fill="#ffffff" stroke="none" />
                  <p className={styles.submitText}>{isSubmitted ? 'SUBMITTED' : 'STOP NOW'}</p>
                </button>
              )}

              {resultMessage && (
                <div
                  className={styles.resultWrapper}
                  style={{ color: RESULT_CONFIG[resultMessage]?.color ?? '#05df72' }}
                >
                  {RESULT_CONFIG[resultMessage]?.icon}
                  <p
                    className={styles.resultText}
                    style={{ color: RESULT_CONFIG[resultMessage]?.color ?? '#05df72' }}
                  >
                    {resultMessage}
                  </p>
                </div>
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
