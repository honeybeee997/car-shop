import React, { useState } from "react";
import { useEffect } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./form.module.css";
import { Text } from "@chakra-ui/react";

const ImageUpload = ({ max: maxImages, allImages }) => {
  const [imageFiles, setImageFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const checkImage = (e) => {
    const { files } = e.target;
    if (files.length > maxImages) {
      return setError(
        `Please upload maximum ${maxImages} ${
          maxImages > 1 ? "images" : "image"
        }`
      );
    } else {
      setError("");
    }
    const validImageFiles = [];
    for (const file of files) {
      const id = Math.floor(Math.random() * 9999);
      validImageFiles.push({ file, id });
    }
    if (validImageFiles.length) {
      setImageFiles((prevImages) => prevImages.concat(validImageFiles));
      return;
    }
  };

  useEffect(() => {
    if (images.length > maxImages) {
      return setError(
        `You've set max no. to ${maxImages} Please remove some images`
      );
    } else {
      setError("");
      allImages(imageFiles);
    }
  }, [images, imageFiles]);

  useEffect(() => {
    const newImages = [],
      fileReaders = [];
    let isCancel = false;
    if (imageFiles.length) {
      imageFiles.forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const result = e.target;

          if (result) {
            newImages.push({
              data: result.result,
              id: file.id,
            });
          }

          if (newImages.length === imageFiles.length && !isCancel) {
            setImages(newImages);
          }
        };
        fileReader.readAsDataURL(file.file);
      });
    }

    return () => {
      (isCancel = true),
        fileReaders.forEach((fileReader) => {
          if (fileReader.readyState === 1) {
            fileReader.abort();
          }
        });
    };
  }, [imageFiles]);

  const imageRemoveHandler = (e) => {
    const id = e.target.closest("button").dataset.img;
    setImages((prevImages) =>
      prevImages.filter((img) => {
        return img.id !== +id;
      })
    );
    setImageFiles((prevFile) =>
      prevFile.filter((file) => {
        return file.id !== +id;
      })
    );
  };

  const imagesPreview = images.map((image, i) => {
    return (
      <div className="image-preview-wrapper" key={i}>
        <img src={image.data} className="image-preview" />
        <div className="image-preview-overlay">
          <button
            type="button"
            data-img={image.id}
            onClick={imageRemoveHandler}
          >
            <FaTrashAlt />
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
      <div className="image-previews">
        {images.length > 0 ? imagesPreview : null}

        {images.length < maxImages ? (
          <div className={styles.ImageUpload}>
            <label htmlFor="imageUpload">
              <RiImageAddLine />
            </label>
            <input
              onChange={checkImage}
              type="file"
              name="image"
              id="imageUpload"
              accept="image/*"
              multiple
            />
          </div>
        ) : null}
      </div>
      {error && (
        <Text color="red" margin="2rem 0 1rem">
          {error}
        </Text>
      )}
    </>
  );
};

export default ImageUpload;
