import styles from "./MiddleContent.module.css"
export default function MiddleContent({ type, setType, totalCount }) {
    return (
        <div className={styles.container}>
            <div onClick={() => setType("All")} className={`${styles.item} ${type == "All" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Tất cả</div>
                <div className={styles.item_content}>{totalCount}</div>
            </div>
            <div onClick={() => setType("Pending")} className={`${styles.item} ${type == "Pending" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Chờ xác nhận</div>
                <div className={styles.item_content}>26</div>
            </div>
            <div onClick={() => setType("Teaching")} className={`${styles.item} ${type == "Teaching" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Đang dạy</div>
                <div className={styles.item_content}>11</div>
            </div>
            <div onClick={() => setType("Done")} className={`${styles.item} ${type == "Done" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Hoàn thành</div>
                <div className={styles.item_content}>12</div>
            </div>
        </div>
    )
}
