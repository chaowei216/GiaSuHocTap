import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChalkboardUser, faUserGraduate, faMoneyBillTransfer, faCommentMedical, faStar, faStarHalfAlt, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarEmpty } from '@fortawesome/free-regular-svg-icons';
import styles from './appView.module.css';
import AppWidgetSummary from '../app-widget-summary';
import { GetStatisticSystem } from '../../../../api/StatisticSystemApi';
import { GetAllTopTutor } from '../../../../api/TopTutorApi';
import { GetNewsPaging } from '../../../../api/NewsApi';
import { toast } from 'react-toastify';
import PageNavigation from '../../TutorManagement/PageNavigation';
import PageSize from '../../TutorManagement/PageSize';
<i class="fa-solid "></i>

const baseUrl = import.meta.env.VITE_API_HOST;

const AppView = () => {
  const [statistics, setStatistics] = useState({
    tutor: 0,
    student: 0,
    transaction: 0,
    revenue: 1
  });

  const [topTutors, setTopTutors] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await GetStatisticSystem();
        if (!response.error) {
          setStatistics({
            tutor: response.data.tutor || 0,
            student: response.data.student || 0,
            transaction: response.data.transaction || 0,
            revenue: response.data.revenue || 0
          });
          console.log('Statistics:', response.data);
        } else {
          console.error(response.error);
        }
      } catch (error) {
        console.error('Error fetching statistics:', error);
        toast.error('Không thể lấy dữ liệu thống kê');
      }
    };

    const fetchTopTutors = async () => {
      try {
        const response = await GetAllTopTutor();
        if (!response.error) {
          // Sắp xếp topTutors theo averageRating từ cao đến thấp
          const sortedTopTutors = response.data.sort((a, b) => b.averageRating - a.averageRating);
          setTopTutors(sortedTopTutors);
        } else {
          console.error(response.error);
          toast.error('Không thể lấy danh sách top gia sư');
        }
      } catch (error) {
        console.error('Error fetching top tutors:', error);
        toast.error('Không thể lấy danh sách top gia sư');
      }
    };

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
        console.error('Error fetching news:', error);
        toast.error('Không thể lấy tin tức');
      }
    };

    fetchStatistics();
    fetchTopTutors();
    fetchNews();
  }, [page, pageSize]);

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={`star-${i}`} icon={faStar} color="gold" />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half-star" icon={faStarHalfAlt} color="gold" />);
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-star-${i}`} icon={faStarEmpty} className={styles.emptyStar} />);
    }

    return (
      <div className={styles.ratingStars}>
        {stars.map((star, index) => (
          <span key={index}>{star}</span>
        ))}
        <span className={styles.ratingValue}>{rating}</span>
      </div>
    );
  };

  return (
    <Container maxWidth="xl" className='mt-2'>
      <Typography variant="h4" sx={{ mb: 5 }}>
        Chào mừng bạn đã quay lại 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Gia Sư"
            total={statistics.tutor}
            color="success"
            icon={<FontAwesomeIcon icon={faChalkboardUser} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Học Viên"
            total={statistics.student}
            color="info"
            icon={<FontAwesomeIcon icon={faUserGraduate} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Giao Dịch"
            total={statistics.transaction}
            color="warning"
            icon={<FontAwesomeIcon icon={faMoneyBillTransfer} />}
          />
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Thu Nhập"
            content="VND"
            total={statistics.revenue} VND
            color="error"
            icon={<FontAwesomeIcon icon={faMoneyBillTrendUp} />}
            
          />
        </Grid>

        <Grid item xs={12} md={6} lg={8}>
          <div className='container' style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2)', height: '680px', position: 'relative' }}>
            <div className={styles.lastNews}>
              <h1>Tin tức mới</h1>
            </div>
            {data.map((news) => (
              <div key={news.newsId} className='container'>
                <div className={styles.container}>
                  <div className={styles.newsBox}>
                    <img
                      src={`${baseUrl}/api/Auth/user-image?fileName=${news.image}`}
                      className={styles.newsImage}
                    />
                    <div className={styles.newsContent}>
                      <h3>{news.title}</h3>
                      <p>Người đăng: {news.authorName}</p>
                      <p>Ngày đăng: {news.createDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className={styles.paginationWrapper} style={{ display: 'flex', alignItems: 'center' }}>
              <PageNavigation page={page} setPage={setPage} totalPages={totalPages} />
            </div>
          </div>
        </Grid>

        <Grid item xs={12} md={6} lg={4}>
          <div className='container' style={{ backgroundColor: '#fff', borderRadius: '4px', boxShadow: '0px 2px 1px -1px rgba(0, 0, 0, 0.2)', height: '680px' }}>
            <div className={styles.topTutor}>
              <h1>Top gia sư</h1>
            </div>
            {topTutors.map((tutor, index) => (
              <div key={index} className={styles.boxTopTutor}>
                <div className={styles.boxInfo}>
                  <div className={styles.boxImg}>
                    <img
                      src={`${baseUrl}/api/Auth/user-image?fileName=${tutor.userImage}`}
                      className={styles.carouselImage}
                    />
                  </div>
                  <div className={styles.boxName}>
                    <h2>{tutor.fullName}</h2>
                    <div className={styles.boxRating}>
                      {renderStars(tutor.averageRating)}

                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppView;
