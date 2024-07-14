import { useState } from 'react';
import styles from './ImagePreview.module.css';
import emptyPicture from "/img/empty.png";
const baseUrl = import.meta.env.VITE_API_HOST;

const ImageWithPreview = ({ imageList }) => {
    const [showPreviewButton, setShowPreviewButton] = useState(false);
    const [showFullImage, setShowFullImage] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    const togglePreviewButton = () => {
        setShowPreviewButton(!showPreviewButton);
    };

    const toggleFullImage = (imageSrc) => {
        setShowFullImage(!showFullImage);
        setSelectedImage(imageSrc);
    };

    return (
        <div className={styles.imageContainer}>
            {imageList && imageList.map((imageSrc, index) => (
                <div
                    key={index}
                    className={styles.imageWrapper}
                    onMouseEnter={togglePreviewButton}
                    onMouseLeave={togglePreviewButton}
                    onClick={() => toggleFullImage(imageSrc)}
                >
                    <img className={styles.image} src={`${baseUrl}/api/Auth/user-image?fileName=${imageSrc}`} alt={`Preview ${index}`}
                        onError={(e) => {
                            e.currentTarget.src = emptyPicture;
                        }} />
                    {showPreviewButton && (
                        <div className={styles.previewButton}>
                            <span className={styles.eyeIcon}>👁️</span>
                            <span className={styles.previewText}>Preview</span>
                        </div>
                    )}
                </div>
            ))}
            {showFullImage && (
                <div className={styles.fullImageOverlay} onClick={() => toggleFullImage('')}>
                    <img className={styles.fullImage} src={`${baseUrl}/api/Auth/user-image?fileName=${selectedImage}`} alt="Full Preview"
                        onError={(e) => {
                            e.currentTarget.src = emptyPicture;
                        }} />
                </div>
            )}
        </div>
    );
};

export default ImageWithPreview;
