import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './FlowAccount.module.css';

const FlowAccount = () => {

    return (
        <div className='container row'>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>SỐ GIỜ ĐÃ THUÊ</h3>
                        <h1>0đ</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>TỔNG SỐ GIA SƯ ĐÃ THUÊ</h3>
                        <h1>0đ</h1>
                    </div>
                </div>
            </div>
            <div className="col-sm-4">
                <div className={styles.flowItem}>
                    <div className={styles.flowBoder}>
                        <h3>TỔNG SỐ GIA SƯ ĐÃ THUÊ</h3>
                        <h1>0đ</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlowAccount;
