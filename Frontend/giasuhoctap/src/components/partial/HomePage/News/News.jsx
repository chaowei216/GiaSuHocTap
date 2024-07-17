import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './News.module.css';
import { GetNewsPaging } from '../../../../api/NewsApi';
import { toast } from 'react-toastify';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
const baseUrl = import.meta.env.VITE_API_HOST;

const News = () => {
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await GetNewsPaging(page, pageSize);
        if (response.ok) {
          const responseData = await response.json();
          const formattedData = responseData.data.data.map((item) => ({
            ...item,
            createDate: new Date(item.createDate).toLocaleString(),
          }));
          setData(formattedData);
          setTotalPages(responseData.data.totalPages);
        } else {
          toast.error('Lỗi khi lấy tin tức');
        }
      } catch (error) {
        console.error('Lỗi khi fetch tin tức:', error);
        toast.error('Không thể lấy tin tức');
      }
    };

    fetchNews();
  }, [page, pageSize]);

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <div className={`${styles.blogTop} clearfix`}>
          <h2 className={`${styles.pullLeft}`}>TIN TỨC MỚI NHẤT</h2>
        </div>
        <div className={`${styles.blogList} clearfix`}>
          {data.map((news) => (
            <div key={news.newsId} className={`${styles.blogBox} column`}>
              <div className={styles.postMedia}>
                <Link to={`/news/${news.newsId}`}>
                  <img src={`${baseUrl}/api/Auth/user-image?fileName=${news.image}`} className="img-fluid" alt={news.title} />
                  <div className={styles.hoverEffect}></div>
                </Link>
              </div>
              <div className={styles.blogMeta}>
                <h4>
                  <Link to={`/news/${news.newsId}`}>{news.title}</Link>
                </h4>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.paginationWrapper} style={{ marginTop: '20px', display: 'flex', alignItems: 'center' }}>
          <PageNavigation page={page} setPage={setPage} totalPages={totalPages} />
          <div style={{ marginLeft: '200px' }}>
            {/* <PageSize pageSize={pageSize} setPageSize={setPageSize} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
