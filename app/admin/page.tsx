'use client';

import { useEffect, useState } from 'react';
import styles from './admin.module.css';

const admin = () => {
  const [date, setDate] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    fetch('https://clubthreesix.com/giorgi/api-game-2/get-status.php')
      .then((r) => r.json())
      .then((d) => setIsDisabled(d?.data?.is_disabled === true))
      .finally(() => setLoading(false));
  }, []);

  const handleToggle = async () => {
    setToggling(true);
    const res = await fetch('https://clubthreesix.com/giorgi/api-game-2/toggle-status.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ disable: !isDisabled }),
    });
    const data = await res.json();
    setIsDisabled(data?.data?.is_disabled === true);
    setToggling(false);
  };

  const handleDownload = () => {
    const baseUrl = 'https://clubthreesix.com/giorgi/api-game-2/export.php';

    const url = date ? `${baseUrl}?date=${date}` : baseUrl;

    // triggers CSV download
    window.location.href = url;
  };

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <p className={styles.text}>
          Select a date to filter results. <br /> If empty, full answer's list will be downloaded.
        </p>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
          className={styles.input}
        />

        <button onClick={handleDownload} className={styles.downlaodButton}>
          Download CSV
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <button
          className={styles.downlaodButton}
          onClick={handleToggle}
          disabled={loading || toggling}
        >
          {loading
            ? 'Loading...'
            : toggling
              ? 'Updating...'
              : isDisabled
                ? 'Re-enable Game'
                : 'Disable Game'}
        </button>

        <p style={{ color: isDisabled ? 'red' : 'green', fontWeight: 'bold' }}>
          Game is currently: {loading ? '...' : isDisabled ? 'DISABLED' : 'ACTIVE'}
        </p>
      </div>
    </div>
  );
};

export default admin;
