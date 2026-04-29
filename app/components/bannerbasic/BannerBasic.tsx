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
import SuccessModal from '../SuccessModal/SuccessModal';
import FailureModal from '../FailureModal/FailureModal';

const BASE = '';
// const BASE = '/achi/timer';

const formatTime = (t: number): string => {
  const totalMs = Math.floor(t * 100); // hundredths, not milliseconds
  const secs = Math.floor(totalMs / 100);
  const cs = totalMs % 100;
  return `${secs}:${cs.toString().padStart(2, '0')}`;
};

const USERNAME_REGEX = /^[A-Za-z0-9]{3,16}$/;

const floorTo2 = (t: number): string => (Math.floor(t * 100) / 100).toFixed(2);

type ResultKey =
  | 'perfect timing'
  | 'well timing'
  | 'good timing'
  | 'bit fast, try again tomorrow'
  | 'bit slow, try again tomorrow'
  | 'missed it, try again tomorrow'
  | '';

interface ResultConfig {
  icon: React.ReactNode;
  color: string;
  prize: number | null;
  prizeLabel?: string;
  label: string;
}

const RESULT_CONFIG: Record<Exclude<ResultKey, ''>, ResultConfig> = {
  'perfect timing': {
    icon: <Trophy size={20} />,
    color: '#05df72',
    prize: 36,
    prizeLabel: '18 + 18',
    label: '完美卡点！',
  },
  'well timing': {
    icon: <Trophy size={20} />,
    color: '#05df72',
    prize: 18,
    label: '很棒！',
  },
  'good timing': {
    icon: <Trophy size={20} />,
    color: '#ffc74d',
    prize: 8,
    label: '还不错！',
  },
  'bit fast, try again tomorrow': {
    icon: <Clock size={20} />,
    color: '#ff4d4f',
    prize: null,
    label: '手速太快了！明天请继续挑战！',
  },
  'bit slow, try again tomorrow': {
    icon: <Clock size={20} />,
    color: '#ff4d4f',
    prize: null,
    label: '手速慢了一点！明天请继续挑战！',
  },
  'missed it, try again tomorrow': {
    icon: <CircleAlert size={20} />,
    color: '#ff4d4f',
    prize: null,
    label: '差一点点！明天请继续挑战！',
  },
};

const isWin = (result: ResultKey) =>
  result === 'perfect timing' || result === 'well timing' || result === 'good timing';

const BannerBasic = () => {
  const [loading, setLoading] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);
  const [username, setUsername] = useState<string>('');
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allowedToPlay, setAllowedToPlay] = useState<boolean | null>(null);
  const [checkingAllowence, setCheckingAllowence] = useState<boolean>(false);
  const [time, setTime] = useState<number>(0);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const timeRef = useRef<number>(0);
  const isSubmittingRef = useRef(false);

  const [errorMsg, setErrorMsg] = useState<string>('');
  const [resultMessage, setResultMessage] = useState<ResultKey>('');
  const [prize, setPrize] = useState<number | null>(null); // ← prize in CNY

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailureModal, setShowFailureModal] = useState(false);

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
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const evaluateResult = (t: number): ResultKey => {
    if (t >= 8.8 && t < 8.9) {
      if (Math.abs(t - 8.88) < 0.01) return 'perfect timing';
      return 'well timing';
    }
    if (t >= 8.9 && t < 9.0) return 'good timing';
    if (t < 8.8) return 'bit fast, try again tomorrow';
    if (t >= 9.0 && t < 10) return 'bit slow, try again tomorrow';
    if (t >= 10) return 'missed it, try again tomorrow';
    return '';
  };

  const doSubmit = async (finalTime: number) => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    if (navigator.vibrate) navigator.vibrate(50);

    const result = evaluateResult(finalTime);
    const earnedPrize = result !== '' ? RESULT_CONFIG[result].prize : null;

    setIsSubmitted(true);
    setIsSubmitting(true);
    isSubmittingRef.current = true;
    setResultMessage('');
    setPrize(null);

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
      }
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setResultMessage(result);
      setPrize(earnedPrize);

      if (isWin(result)) {
        setShowSuccessModal(true);
      } else {
        setShowFailureModal(true);
      }
    }
  };

  const startTimer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (timeRef.current > 0) return;

    startTimeRef.current = performance.now();
    timeRef.current = 0;
    setTime(0);

    const tick = (now: number) => {
      const elapsed = (now - startTimeRef.current) / 1000;
      timeRef.current = elapsed;
      setTime(elapsed);

      if (elapsed >= 10) {
        if (!isSubmittingRef.current) doSubmit(elapsed);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username?.trim() || isSubmitted || timeRef.current === 0) return;
    await doSubmit(timeRef.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter') {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'BUTTON' || (target as HTMLButtonElement).type !== 'submit') {
        e.preventDefault();
      }
    }
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const filtered = e.target.value.replace(/[^A-Za-z0-9]/g, '');
    setUsername(filtered);
  };

  const isUsernameValid = USERNAME_REGEX.test(username);
  const showUsernameError = usernameTouched && username.length > 0 && !isUsernameValid;
  const isStartDisabled =
    !isUsernameValid || allowedToPlay === false || checkingAllowence || time > 0;

  const currentConfig = resultMessage ? RESULT_CONFIG[resultMessage] : null;

  return (
    <section className={styles.bannerWrapper}>
      {showSuccessModal && (
        <SuccessModal prize={prize} onClose={() => setShowSuccessModal(false)} />
      )}
      {showFailureModal && <FailureModal onClose={() => setShowFailureModal(false)} />}

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
        <div className={styles.greetingWrapper}>
          <div className={styles.titleWrapper}>
            <h1 className={styles.title}>8.88 秒 </h1>
            <h1 className={styles.title2}>挑战赢奖金</h1>
          </div>
          <p className={styles.subtitle}>
            考验手速时刻，在 <span style={{ color: '#CAAB72', fontWeight: 700 }}>8.88</span>{' '}
            秒精准停表，解锁奖金！
          </p>
          <p className={styles.subtitleExtra}>前 888 位提交的会员，即可获得奖金！</p>
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
                <p className={styles.challenge}>8.88 秒挑战</p>
              </div>
              <div className={styles.daysWrapper}>
                <Calendar color="#caab72" size={15} />
                <p className={styles.daysTitle}>每天仅限 1 次机会</p>
              </div>
              <div className={styles.secondsWrapper}>
                {/* <h1 className={styles.seconds}>{time.toFixed(2)}</h1> */}
                <h1 className={styles.seconds}>{floorTo2(time)}</h1>

                <p className={styles.secondsText}>秒</p>
              </div>
              <div className={styles.inputWrapper}>
                <label>用户名</label>
                <input
                  type="text"
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  autoCorrect="off"
                  placeholder="请输入用户名"
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
                  <span className={styles.checkingText}>正在确认是否已参与今日挑战...</span>
                )}
                {allowedToPlay === false && (
                  <span className={styles.errorText}>今日您的次数已用完，明天请继续挑战！</span>
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
                    <p className={styles.submitText}>点击开始计时</p>
                  </button>
                  {!isUsernameValid && username.length === 0 && (
                    <p className={styles.startHint}>请输入用户名开始挑战</p>
                  )}
                </>
              )}

              {time > 0 && !isSubmitting && !isSubmitted && (
                <button type="submit" className={styles.submitButton} disabled={isSubmitted}>
                  <Square size={21} fill="#ffffff" stroke="none" />
                  <p className={styles.submitText}>停止计时</p>
                </button>
              )}

              {isSubmitting && (
                <div className={styles.submittingWrapper}>
                  <div className={styles.submittingSpinner} />
                  <p className={styles.submittingText}>正在保存成绩…</p>
                </div>
              )}

              {/* Result row — label + prize if won */}
              {resultMessage && !isSubmitting && currentConfig && (
                <div className={styles.resultWrapper} style={{ color: currentConfig.color }}>
                  {currentConfig.icon}
                  <div className={styles.resultTextWrapper}>
                    <p className={styles.resultText} style={{ color: currentConfig.color }}>
                      {currentConfig.label}
                    </p>
                    {currentConfig.prize !== null && (
                      <p className={styles.resultPrize} style={{ color: currentConfig.color }}>
                        +{currentConfig.prizeLabel ?? currentConfig.prize} 元
                      </p>
                    )}
                  </div>
                </div>
              )}
            </form>

            <div className={styles.card2}>
              <h1 className={styles.gameRulesTitle}>
                <Book size={20} color="#ffa30f" />
                玩法说明
              </h1>
              <div className={styles.gameRulesWrapper}>
                <h1 className={styles.gameRulesTitle2}>
                  <Clock size={20} color="#784ff3" />
                  <span>目标：</span> 在 8.80秒 - 9.00 秒之间，并按下停止计时器
                </h1>
                <h1 className={styles.gameRulesTitle2}>
                  <CircleCheckBig size={18} color="#15cb04" />
                  <span>奖金：</span> 8.88 秒 = 18 元 + 18 元 &nbsp;·&nbsp; 8.80 – 8.90 秒 = 18 元
                  &nbsp;·&nbsp; 8.90 – 9.00 秒 = 8 元
                </h1>
                <h1 className={styles.gameRulesTitle2}>
                  <ShieldAlert size={20} color="#fc1452" />
                  <span>活动规则：</span>用户每天仅限 1 次机会 当天至少需要存款 100 元
                  奖金需流水要求
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
