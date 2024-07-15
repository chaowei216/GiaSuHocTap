import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetNewsById } from '../../../../api/NewsApi';
import { toast } from 'react-toastify';
import styles from './News.module.css'; // Import CSS module

const baseUrl = import.meta.env.VITE_API_HOST;

const NewsDetail = () => {
  const { newsId } = useParams();
  const [news, setNews] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const fetchedNews = await GetNewsById(newsId);
        setNews(fetchedNews);
      } catch (error) {
        console.error('Error fetching news detail:', error);
        toast.error('Failed to fetch news detail');
      }
    };

    fetchNewsDetail();
  }, [newsId]);

  if (!news) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <h2>{news.title}</h2>
      <small>Nguời đăng: {news.authorName}</small>
      <small>Ngày đăng: {new Date(news.createDate).toLocaleString()}</small>
      <img src={`${baseUrl}/api/Auth/user-image?fileName=${news.image}`} className={styles.imgFluid} alt={news.title} />
      <p>{news.description}</p>
    </div>
  );
};

export default NewsDetail;
