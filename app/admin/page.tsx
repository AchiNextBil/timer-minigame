'use client';

import { useState } from 'react';
import styles from './admin.module.css';

const admin = () => {
  const [date, setDate] = useState('');

  const handleDownload = () => {
    const baseUrl = 'http://clubthreesix.com/giorgi/api-game-2/export.php';

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
    </div>
  );
};

export default admin;
