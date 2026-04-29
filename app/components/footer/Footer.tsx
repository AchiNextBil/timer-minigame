import { Trans, useTranslation } from 'react-i18next';
import svg18 from '../../../public/footer/18.svg';
import acm from '../../../public/footer/acm.svg';
import afc from '../../../public/footer/afc.svg';
import cp from '../../../public/footer/cp.svg';
import fwm from '../../../public/footer/fly-with-me.svg';
import ga from '../../../public/footer/ga.svg';
import itech from '../../../public/footer/itech.svg';
import laLiga from '../../../public/footer/la-liga.svg';
import man from '../../../public/footer/man.svg';
import th from '../../../public/footer/th.svg';
import vanuatu from '../../../public/footer/vanuatu.svg';
import styles from './Footer.module.css';

// Define language-specific links
const termsLinks = {
  en: 'https://help.m88.com/terms-of-use/terms-conditions.en-US.asp',
  cn: 'https://help.m88.com/terms-of-use/terms-conditions.zh-CN.asp',
  th: 'https://help.m88.com/terms-of-use/terms-conditions.th-TH.asp',
  id: 'https://help.m88.com/terms-of-use/terms-conditions.id-ID.asp',
  vn: 'https://help.m88.com/terms-of-use/terms-conditions.vn-VN.asp',
};

const responsibleGamilgLink = {
  en: 'https://help.mstyvp.com/responsible-gaming/responsibleGaming.en-US.asp',
  cn: 'https://help.mstyvp.com/responsible-gaming/responsibleGaming.zh-CN.asp',
  th: 'https://help.mstyvp.com/responsible-gaming/responsibleGaming.th-TH.asp',
  id: 'https://help.mstyvp.com/responsible-gaming/responsibleGaming.id-ID.asp',
  vn: 'https://help.mstyvp.com/responsible-gaming/responsibleGaming.vn-VN.asp',
};

const mariaOzawaLink = {
  en: 'https://www.m88.com/maria-ozawa?lang=en-US',
  cn: 'https://www.m88.com/maria-ozawa?lang=zh-CN',
  th: 'https://www.m88.com/maria-ozawa?lang=th-TH',
  id: 'https://www.m88.com/maria-ozawa?lang=id-ID',
  vn: 'https://www.m88.com/maria-ozawa?lang=vn-VN',
};

const Footer = () => {
  const { t, i18n } = useTranslation();

  type LanguageKey = keyof typeof termsLinks;
  const currentLang: LanguageKey = (i18n.language as LanguageKey) || 'en';

  const link = termsLinks[currentLang] || termsLinks.en;
  const link2 = responsibleGamilgLink[currentLang] || responsibleGamilgLink.en;

  const mariaLink = mariaOzawaLink[currentLang] || mariaOzawaLink.en;

  const currentSponsors = {
    title: t('aProudPartnerOf'),
    sponsors: [
      // {
      //   image: mariaOzawa.src,
      //   text1: t("m88CelebrityPartner"),
      //   text2: t("2021-Present"),
      //   link: mariaLink,
      // },
      {
        image: fwm.src,
        text1: t('officialEntertainmentPartner'),
        text2: t('2025-Present'),
        link: 'https://www.m88.com/fwm',
      },
    ],
  };

  const previousSponsors = {
    title: t('ourPreviousSponsorships'),
    sponsors: [
      {
        image: laLiga.src,
        name: 'LaLiga',
        date: '2020 - 2024',
      },
      {
        image: acm.src,
        name: 'AC Milan',
        date: '2022 - 2024',
      },
      {
        image: afc.src,
        name: 'AFC Bournemount',
        date: '2016 - 2020',
      },
      {
        image: cp.src,
        name: 'Crystal Palace',
        date: '2015 - 2017',
      },
      {
        image: man.src,
        name: 'Manchester City',
        date: '2011 - 2012',
      },
      {
        image: th.src,
        name: 'Tottemham Hotspurs',
        date: '2006 - 2010',
      },
    ],
  };

  return (
    <footer className={styles.footer} role="contentinfo" id="footer">
      <div className={styles.footerWrapper}>
        {/* Current Sponsors */}
        <section
          aria-labelledby="current-sponsors-heading"
          className={`${styles.currentSponsorsSection}`}
        >
          <h2 id="current-sponsors-heading">{currentSponsors.title}</h2>
          <ul className={styles.sponsorsWrapper}>
            {currentSponsors.sponsors.map((sponsor) => (
              <li key={sponsor.text1} className={styles.currentSponsor}>
                <a href={sponsor.link} target="_blank" rel="noopener noreferrer">
                  <img
                    src={sponsor.image}
                    className={styles.currentSponsorImage}
                    alt={`${sponsor.text1} logo`}
                  />
                  <div className={styles.currentSponsorText1}>{sponsor.text1}</div>
                  <div className={styles.currentSponsorText2}>{sponsor.text2}</div>
                </a>
              </li>
            ))}
          </ul>
        </section>
        {/* Previous Sponsors */}
        <section
          aria-labelledby="previous-sponsors-heading"
          className={styles.previousSponsorsSection}
        >
          <h2 id="previous-sponsors-heading">{previousSponsors.title}</h2>
          <ul className={styles.previousSponsorsList}>
            {previousSponsors.sponsors.map((sponsor) => (
              <li key={sponsor.name} className={styles.previousSponsor}>
                <img
                  src={sponsor.image}
                  className={styles.previousSponsorImage}
                  alt={`${sponsor.name} icon`}
                />
                <span className={styles.previousSponsorTexts}>
                  <span className={styles.sponsorText}>{sponsor.name}</span>
                  <span>{sponsor.date}</span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Disclaimer */}
        <section className={styles.disclaimer}>
          <div className={styles.responsibleGaming}>
            <span className={styles.responsibleGamingText}>
              {/* {disclaimer.responsibleGambling} */}
              <Trans
                i18nKey="responsibleGambling"
                components={{
                  1: (
                    <a
                      href={link2}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ textDecoration: 'underline' }}
                    />
                  ),
                }}
              />
            </span>
            <span className={styles.responsibleGamingIcons}>
              <img src={vanuatu.src} alt="vanuatu logo" />
              <img src={ga.src} alt="ga logo" />
              <img src={itech.src} alt="iTech Labs logo" />
              <img src={svg18.src} alt="18+ logo" />
              <address>M88.com 2026</address>
            </span>
          </div>

          <p className={styles.cookieNotice}>
            <Trans i18nKey="cookieNotice">
              <br />
              <span>
                For more information, please refer to the{' '}
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    textDecoration: 'underline',
                  }}
                >
                  Terms of Use of M88
                </a>
                .
              </span>
            </Trans>
          </p>
        </section>
      </div>
    </footer>
  );
};

export default Footer;
