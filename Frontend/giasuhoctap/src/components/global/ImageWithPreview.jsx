import React, { useState } from 'react';
import styles from './ImagePreview.module.css';

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
            {imageList.map((imageSrc, index) => (
                <div
                    key={index}
                    className={styles.imageWrapper}
                    onMouseEnter={togglePreviewButton}
                    onMouseLeave={togglePreviewButton}
                    onClick={() => toggleFullImage(imageSrc)}
                >
                    <img className={styles.image} src={imageSrc} alt={`Preview ${index}`} />
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
                    <img className={styles.fullImage} src={selectedImage} alt="Full Preview" />
                </div>
            )}
        </div>
    );
};

export default ImageWithPreview;
