import { useEffect, useState } from "react";
import styles from "./MiddleContent.module.css"
import useAuth from "../../../hooks/useAuth";
import { GetPendingOnlineApi, GetRequestById, GetRequestOfflineApi, GetRequestOnlineApi } from "../../../api/RequestApi";
export default function MiddleContent({ type, setType, online, isUpdated }) {
    const { user } = useAuth()
    const [data, setData] = useState({
        All: 0,
        Pending: 0,
        Teaching: 0,
        Done: 0,
        Deny: 0
    });

    useEffect(() => {
        if (online) {
            const fetchData = async () => {
                try {
                    const allResponse = await GetRequestOnlineApi(user.userId, 1, 1000);
                    const pendingResponse = await GetPendingOnlineApi(user.userId, 1, 1000);
                    const teachingResponse = await GetRequestById(user.userId, "Online", "Đã chấp nhận", 1, 1000);
                    const doneResponse = await GetRequestById(user.userId, "Online", "Hoàn thành", 1, 1000);
                    const denyResponse = await GetRequestById(user.userId, "Online", "Từ chối", 1, 1000);

                    const json1 = await allResponse.json()
                    const json2 = await pendingResponse.json()
                    const json3 = await teachingResponse.json()
                    const json4 = await doneResponse.json()
                    const json5 = await denyResponse.json()

                    setData({
                        All: json1.data.totalCount,
                        Pending: json2.data.totalCount,
                        Teaching: json3.data.totalCount,
                        Done: json4.data.totalCount,
                        Deny: json5.data.totalCount
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        } else {
            const fetchData = async () => {
                try {
                    const allResponse = await GetRequestOfflineApi(user.userId, 1, 1000);
                    const pendingResponse = await GetRequestById(user.userId, "Offline", "Chờ xác nhận", 1, 1000);
                    const teachingResponse = await GetRequestById(user.userId, "Offline", "Đang tiến hành", 1, 1000);
                    const doneResponse = await GetRequestById(user.userId, "Offline", "Hoàn thành", 1, 1000);
                    const denyResponse = await GetRequestById(user.userId, "Offline", "Từ chối", 1, 1000);

                    const json1 = await allResponse.json()
                    const json2 = await pendingResponse.json()
                    const json3 = await teachingResponse.json()
                    const json4 = await doneResponse.json()
                    const json5 = await denyResponse.json()

                    setData({
                        All: json1.data.totalCount,
                        Pending: json2.data.totalCount,
                        Teaching: json3.data.totalCount,
                        Done: json4.data.totalCount,
                        Deny: json5.data.totalCount
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchData();
        }
    }, [user, online, isUpdated]);

    return (
        <div className={styles.container}>
            <div onClick={() => setType("All")} className={`${styles.item} ${type == "All" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Tất cả</div>
                <div className={styles.item_content}>{data.All}</div>
            </div>
            <div onClick={() => setType("Pending")} className={`${styles.item} ${type == "Pending" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Chờ xác nhận</div>
                <div className={styles.item_content}>{data.Pending}</div>
            </div>
            <div onClick={() => setType("Teaching")} className={`${styles.item} ${type == "Teaching" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Đang dạy</div>
                <div className={styles.item_content}>{data.Teaching}</div>
            </div>
            <div onClick={() => setType("Done")} className={`${styles.item} ${type == "Done" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Hoàn thành</div>
                <div className={styles.item_content}>{data.Done}</div>
            </div>
            <div onClick={() => setType("Deny")} className={`${styles.item} ${type == "Deny" ? `${styles.active}` : ""}`}>
                <div className={styles.item_header}>Từ chối</div>
                <div className={styles.item_content}>{data.Deny}</div>
            </div>
        </div>
    )
}
