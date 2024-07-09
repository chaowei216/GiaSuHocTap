import React from "react";
import styles from "./News.module.css";
import carousel3 from "../../../../../public/img/Carousel3.jpg";
import carousel1 from "../../../../../public/img/Carousel1.jpg";
import carousel2 from "../../../../../public/img/Carousel2.jpg";

const News = () => {
  // Dữ liệu của các tin tức (đây là ví dụ, bạn có thể thay đổi nội dung và ảnh)
  const newsData = [
    {
      title: "Top 10 gia sư được nhiều người tin tưởng",
      description: "Trong thế giới hiện đại ngày nay, nhu cầu về giáo dục ngày càng tăng cao, đặc biệt là trong việc tối ưu hóa sự phát triển học tập của các em học sinh. Gia sư đóng vai trò quan trọng như một người hỗ trợ đắc lực, giúp các em vượt qua những thử thách trong học tập, củng cố kiến thức và nâng cao năng lực. Dịch vụ gia sư không chỉ đơn thuần là cung cấp kiến thức mà còn là một quá trình tương tác giữa gia sư và học sinh, được xây dựng trên nền tảng sự hiểu biết, tâm huyết và kinh nghiệm giảng dạy. Gia sư không chỉ giúp học sinh nắm bắt và áp dụng kiến thức một cách hiệu quả mà còn giúp họ phát triển các kỹ năng quan trọng như tự tin, sự tự chủ và khả năng giải quyết vấn đề.Với đội ngũ gia sư chuyên môn cao, có kinh nghiệm dạy và hướng dẫn từng học sinh theo nhu cầu cụ thể, chúng tôi cam kết mang đến cho các gia đình dịch vụ gia sư chất lượng. Chúng tôi cung cấp các môn học từ cấp tiểu học đến cấp đại học, đảm bảo đáp ứng được mọi nhu cầu học tập và rèn luyện kỹ năng của học sinh. Hãy đồng hành cùng chúng tôi để con em bạn có một môi trường học tập tối ưu, từng bước phát triển và thành công trong tương lai. Với dịch vụ gia sư chuyên nghiệp của chúng tôi, chắc chắn bạn sẽ tìm thấy sự hài lòng và niềm tin vào giáo dục của con mình.",
      date: "21 July, 2017",
      image: carousel1,
    },
    {
      title: "5 Lợi ích khi thuê gia sư cho con em bạn ",
      description: "Trong thế giới hiện đại ngày nay, nhu cầu về giáo dục ngày càng tăng cao, đặc biệt là trong việc tối ưu hóa sự phát triển học tập của các em học sinh. Gia sư đóng vai trò quan trọng như một người hỗ trợ đắc lực, giúp các em vượt qua những thử thách trong học tập, củng cố kiến thức và nâng cao năng lực. Dịch vụ gia sư không chỉ đơn thuần là cung cấp kiến thức mà còn là một quá trình tương tác giữa gia sư và học sinh, được xây dựng trên nền tảng sự hiểu biết, tâm huyết và kinh nghiệm giảng dạy. Gia sư không chỉ giúp học sinh nắm bắt và áp dụng kiến thức một cách hiệu quả mà còn giúp họ phát triển các kỹ năng quan trọng như tự tin, sự tự chủ và khả năng giải quyết vấn đề.Với đội ngũ gia sư chuyên môn cao, có kinh nghiệm dạy và hướng dẫn từng học sinh theo nhu cầu cụ thể, chúng tôi cam kết mang đến cho các gia đình dịch vụ gia sư chất lượng. Chúng tôi cung cấp các môn học từ cấp tiểu học đến cấp đại học, đảm bảo đáp ứng được mọi nhu cầu học tập và rèn luyện kỹ năng của học sinh. Hãy đồng hành cùng chúng tôi để con em bạn có một môi trường học tập tối ưu, từng bước phát triển và thành công trong tương lai. Với dịch vụ gia sư chuyên nghiệp của chúng tôi, chắc chắn bạn sẽ tìm thấy sự hài lòng và niềm tin vào giáo dục của con mình.",
      date: "21 July, 2017",
      image: carousel2,
    },
    {
      title: "Những lưu ý khi tìm gia sư online cho học sinh cấp 3",
      description: "Trong thế giới hiện đại ngày nay, nhu cầu về giáo dục ngày càng tăng cao, đặc biệt là trong việc tối ưu hóa sự phát triển học tập của các em học sinh. Gia sư đóng vai trò quan trọng như một người hỗ trợ đắc lực, giúp các em vượt qua những thử thách trong học tập, củng cố kiến thức và nâng cao năng lực. Dịch vụ gia sư không chỉ đơn thuần là cung cấp kiến thức mà còn là một quá trình tương tác giữa gia sư và học sinh, được xây dựng trên nền tảng sự hiểu biết, tâm huyết và kinh nghiệm giảng dạy. Gia sư không chỉ giúp học sinh nắm bắt và áp dụng kiến thức một cách hiệu quả mà còn giúp họ phát triển các kỹ năng quan trọng như tự tin, sự tự chủ và khả năng giải quyết vấn đề.Với đội ngũ gia sư chuyên môn cao, có kinh nghiệm dạy và hướng dẫn từng học sinh theo nhu cầu cụ thể, chúng tôi cam kết mang đến cho các gia đình dịch vụ gia sư chất lượng. Chúng tôi cung cấp các môn học từ cấp tiểu học đến cấp đại học, đảm bảo đáp ứng được mọi nhu cầu học tập và rèn luyện kỹ năng của học sinh. Hãy đồng hành cùng chúng tôi để con em bạn có một môi trường học tập tối ưu, từng bước phát triển và thành công trong tương lai. Với dịch vụ gia sư chuyên nghiệp của chúng tôi, chắc chắn bạn sẽ tìm thấy sự hài lòng và niềm tin vào giáo dục của con mình.",
      date: "21 July, 2017",
      image: carousel3,
    },
    {
      title: "Gia sư toán lý hóa giỏi giúp con em vượt khó trong học tập",
      description: "Trong thế giới hiện đại ngày nay, nhu cầu về giáo dục ngày càng tăng cao, đặc biệt là trong việc tối ưu hóa sự phát triển học tập của các em học sinh. Gia sư đóng vai trò quan trọng như một người hỗ trợ đắc lực, giúp các em vượt qua những thử thách trong học tập, củng cố kiến thức và nâng cao năng lực. Dịch vụ gia sư không chỉ đơn thuần là cung cấp kiến thức mà còn là một quá trình tương tác giữa gia sư và học sinh, được xây dựng trên nền tảng sự hiểu biết, tâm huyết và kinh nghiệm giảng dạy. Gia sư không chỉ giúp học sinh nắm bắt và áp dụng kiến thức một cách hiệu quả mà còn giúp họ phát triển các kỹ năng quan trọng như tự tin, sự tự chủ và khả năng giải quyết vấn đề.Với đội ngũ gia sư chuyên môn cao, có kinh nghiệm dạy và hướng dẫn từng học sinh theo nhu cầu cụ thể, chúng tôi cam kết mang đến cho các gia đình dịch vụ gia sư chất lượng. Chúng tôi cung cấp các môn học từ cấp tiểu học đến cấp đại học, đảm bảo đáp ứng được mọi nhu cầu học tập và rèn luyện kỹ năng của học sinh. Hãy đồng hành cùng chúng tôi để con em bạn có một môi trường học tập tối ưu, từng bước phát triển và thành công trong tương lai. Với dịch vụ gia sư chuyên nghiệp của chúng tôi, chắc chắn bạn sẽ tìm thấy sự hài lòng và niềm tin vào giáo dục của con mình.",
      date: "21 July, 2017",
      image: carousel1,
    },
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
                {/* <small><a href="tech-author.html" title="">by {news.author}</a></small>
                <small><a href="tech-single.html" title=""><i className="fa fa-eye"></i> {news.views}</a></small> */}
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
