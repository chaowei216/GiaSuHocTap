import React, { useEffect, useState } from 'react';
import { GetNewsPaging } from '../../../../api/NewsApi';
import { toast } from 'react-toastify';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize'; // Ensure you import PageSize component if used
const baseUrl = import.meta.env.VITE_API_HOST;

import styles from './News.module.css';

const News = () => {
  const [totalPages, setTotalPages] = useState(1); // Initialize totalPages with 1
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await GetNewsPaging(page, pageSize);
        if (response.ok) {
          const responseData = await response.json();
          const formattedData = responseData.data.data.map((item) => ({
            ...item,
            createDate: new Date(item.createDate).toLocaleString(), // Format createDate to local string
          }));
          setData(formattedData);
          setTotalPages(responseData.data.totalPages);
        } else {
          toast.error('Error getting news');
        }
      } catch (error) {
        console.error('Error fetching news:', error);
        toast.error('Failed to fetch news');
      }
    };

    fetchNews();
  }, [page, pageSize]); // Trigger useEffect on page or pageSize change

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <div className={`${styles.blogTop} clearfix`}>
          <h4 className={`${styles.pullLeft}`}>Recent News <a href="#"><i className="fa fa-rss"></i></a></h4>
        </div>

        <div className={`${styles.blogList} clearfix`}>
          {/* Mapping through the fetched news data */}
          {data.map((news) => (
            <div key={news.newsId} className={`${styles.blogBox} row`} style={{marginBottom: '15px'}}>
              <div className="col-md-4">
                <div className={styles.postMedia}>
                    <img src={`${baseUrl}/api/Auth/user-image?fileName=${news.image}`} className="img-fluid" />
                    <div className={styles.hoverEffect}></div>
                </div>
              </div>
              <div className={`${styles.blogMeta} big-meta col-md-8`}>
                <h4>{news.title}</h4>
                <p>{news.description}</p>
                <small>{news.createDate}</small>
              </div>
              <hr className={`${styles.invis}`} />
            </div>
          ))}

          {/* Pagination and page size options */}
          <div className={styles.paginationWrapper} style={{marginTop: '20px'}}>
            <PageNavigation page={page} setPage={setPage} totalPages={totalPages} />
            {/* Include PageSize component for changing page size */}
            {/* <PageSize pageSize={pageSize} setPageSize={setPageSize} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default News;
