"use client"
import Image from "next/image"
import styles from "./SuccessModal.module.css"
import zhCN from "@/app/translations"

type SuccessModalProps = {
  onClose: () => void
}

// const BASE = ""
const BASE = "/achi/questions"


const SuccessModal = ({ onClose }: SuccessModalProps) => {

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{zhCN.success}</h2>
          <button
                className={styles.closeBtn}
                onClick={() => {
                    onClose()
                }}
                >
                ✕
                </button>
        </div>

        <div className={styles.content}>
            <Image
            src={`${BASE}/svg/success-green.svg`}
            alt="success"
            width={100}
            height={100}
            />
            <h1>{zhCN.submitted}</h1>
            <h6>If the member who answers correctly and deposits at least 100 CNY during the activity period, freebet will be payout on next Monday before 20:00. </h6>
        </div>
        <div className={styles.footer}>
            <button
                className={styles.mainButton}
                onClick={() => {
                    onClose()
                }}
                >
                {zhCN.mainPage}
                </button>
        </div>
      </div>
    </div>
  )
}

export default SuccessModal