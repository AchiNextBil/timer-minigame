"use client"

import { useState } from "react"
import styles from "./HistoryModal.module.css"
import zhCN from "@/app/translations"

type HistoryRow = {
  question_date: string
  question_text: string
  answer_text: string
}
type HistoryModalProps = {
  onClose: () => void
}

const HistoryModal = ({ onClose }: HistoryModalProps) => {
  const [usernameInput, setUsernameInput] = useState("")
  const [rows, setRows] = useState<HistoryRow[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!usernameInput.trim()) return

    setLoading(true)
    setErrorMsg(null)
    setRows(null)

    try {
      const res = await fetch(
        "https://clubthreesix.com/giorgi/api/get-history.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: usernameInput.trim() }),
        }
      )

      const data = await res.json()

      if (!res.ok) {
          setErrorMsg(data?.message || "Something went wrong.")
        } else if (!data?.data || data.data.length === 0) {
          setErrorMsg("No data found for this username.")
        } else {
          setRows(data.data)
        }
    } catch {
      setErrorMsg("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  console.log(rows);
  

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        {/* HEADER */}
        <div className={styles.header}>
          <h2 className={styles.title}>{zhCN.answerHistory}</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {/* SEARCH */}
        <div className={styles.searchRow}>
          <input
            className={styles.searchInput}
            type="text"
            placeholder={zhCN.usernamePlaceholder}
            value={usernameInput}
            onChange={(e) => setUsernameInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            className={styles.searchBtn}
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? "..." : zhCN.search}
          </button>
        </div>

        {/* RESULTS */}
        <div className={styles.tableWrapper}>

          {errorMsg && <div className={styles.emptyState}>{errorMsg.includes("No data found for this username") ? zhCN.noData : "something went wrong"}</div>}

        

          {rows && rows.length > 0 && (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th className={styles.colDate}>{zhCN.date}</th>
                  <th className={styles.colQuestion}>{zhCN.question}</th>
                  <th className={styles.colAnswer}>{zhCN.answer}</th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={i}
                    className={i % 2 === 0 ? styles.rowDark : styles.rowLight}
                  >
                    <td className={styles.colDate}>{row.question_date}</td>
                    <td className={styles.colQuestion}>{row.question_text}</td>
                    <td className={styles.colAnswer}>{row.answer_text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  )
}

export default HistoryModal