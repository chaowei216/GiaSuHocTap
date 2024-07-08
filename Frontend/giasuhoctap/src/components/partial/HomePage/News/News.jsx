import React from "react";
import styles from "./News.module.css";
import carousel3 from "../../../../../public/img/Carousel3.jpg";

const News = () => {
  // Dữ liệu của các tin tức (đây là ví dụ, bạn có thể thay đổi nội dung và ảnh)
  const newsData = [
    {
      title: "Top 10 phone applications and 2017 mobile design awards",
      description: "Aenean interdum arcu blandit, vehicula magna non, placerat elit. Mauris et pharetratortor.",
      category: "Gadgets",
      date: "21 July, 2017",
      author: "Matilda",
      views: 1114,
      image: carousel3,
    },
    {
      title: "New technology trends in 2023",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam accumsan eros id libero consectetur.",
      category: "Technology",
      date: "10 August, 2023",
      author: "John Doe",
      views: 865,
      image: carousel3, // Thay đổi đường dẫn ảnh cho mỗi tin tức
    },
    // Thêm các tin tức khác tương tự ở đây
  ];

  return (
    <div className="container">
      <div className={styles.pageWrapper}>
        <div className={`${styles.blogTop} clearfix`}>
          <h4 className={`${styles.pullLeft}`}>Recent News <a href="#"><i className="fa fa-rss"></i></a></h4>
        </div>

        <div className={`${styles.blogList} clearfix`}>
          {/* Sử dụng map để lặp lại các tin tức */}
          {newsData.map((news, index) => (
            <div key={index} className={`${styles.blogBox} row`}>
              <div className="col-md-4">
                <div className={styles.postMedia}>
                  <a href="tech-single.html" title="">
                    <img src={news.image} alt="Carousel Image" className="img-fluid" />
                    <div className={styles.hoverEffect}></div>
                  </a>
                </div>
              </div>
              <div className={`${styles.blogMeta} big-meta col-md-8`}>
                <h4><a href="tech-single.html" title="">{news.title}</a></h4>
                <p>{news.description}</p>
                <small className={`${styles.firstSmall}`}>
                  <a className={`${styles.bgOrange}`} href="tech-category-01.html" title="">{news.category}</a>
                </small>
                <small><a href="tech-single.html" title="">{news.date}</a></small>
                <small><a href="tech-author.html" title="">by {news.author}</a></small>
                <small><a href="tech-single.html" title=""><i className="fa fa-eye"></i> {news.views}</a></small>
              </div>
              <hr className={`${styles.invis}`} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default News;
