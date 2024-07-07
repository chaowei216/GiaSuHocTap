import styles from "./MiddleContent.module.css"
export default function MiddleContent({ type, setType, totalCount }) {
    return (
        <div className={styles.container}>
            <div onClick={() => setType("All")} className={`${styles.item} ${type == "All" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>All</div>
                <div className={styles.item_content}>{totalCount}</div>
            </div>
            <div onClick={() => setType("Pending")} className={`${styles.item} ${type == "Pending" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Pending Request</div>
                <div className={styles.item_content}>26</div>
            </div>
            <div onClick={() => setType("Deny")} className={`${styles.item} ${type == "Deny" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Deny</div>
                <div className={styles.item_content}>11</div>
            </div>
            <div onClick={() => setType("Approved")} className={`${styles.item} ${type == "Approved" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Approved</div>
                <div className={styles.item_content}>12</div>
            </div>
        </div>
    )
}
