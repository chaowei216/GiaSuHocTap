import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FlowAccount.module.css';
import { GetRentInfoParent } from '../../../../api/RentInfoParentApi';
import useAuth from '../../../../hooks/useAuth';
import { toast } from 'react-toastify';

const FlowAccount = () => {
    const { user } = useAuth();
    const [rentInfo, setRentInfo] = useState({
        numOfHoursRent: 0,
        totalNumberOfTutorHiring: 0,
        totalAmountDeposited: 0
    });

    useEffect(() => {
        const fetchRentInfo = async () => {
            try {
                const userId = user?.userId; // Lấy userId từ user
                if (!userId) {
                    throw new Error("User ID is required");
                }
                console.log('Fetching rent info for userId:', userId);
                const data = await GetRentInfoParent(userId);
                console.log('Rent info data:', data);
                setRentInfo(data.data);
            } catch (error) {
                console.error('Failed to fetch rent info:', error);
                toast.error('Failed to fetch rent info');
            }
        };

        if (user?.userId) { // Kiểm tra xem user đã được load chưa
            fetchRentInfo();
        }
    }, [user]);

    return (
        <div className='container row'>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>SỐ GIỜ ĐÃ THUÊ</h3>
                        <h1>{rentInfo.numOfHoursRent}h</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>TỔNG SỐ LẦN ĐÃ THUÊ GIA SƯ</h3>
                        <h1>{rentInfo.totalNumberOfTutorHiring}</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>TỔNG SỐ TIỀN ĐÃ NẠP</h3>
                        <h1>{rentInfo.totalAmountDeposited}đ</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowAccount;

