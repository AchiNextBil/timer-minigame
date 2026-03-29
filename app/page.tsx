'use client';

import BannerBasic from './components/bannerbasic/BannerBasic';
import Footer from './components/footer/Footer';
import Accordion from './components/ui/accordion/Accordion';
import TncCN from './components/ui/tnc/TncCN';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.body}>
      <BannerBasic />
      <Accordion title="规则与条款">
        <TncCN />
      </Accordion>
      <Footer />
    </div>
  );
}
