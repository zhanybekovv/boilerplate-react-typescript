import React, { useCallback, useState, useRef } from 'react';
import ProgressButton from '../ProgressButton';
import axios from 'axios';
import './index.css';
import { MAIN_API_URL } from '../constants';

interface CatalogItemProps {
  name: string;
  toggleModal: () => void;
}


const CatalogItem: React.FC<CatalogItemProps>= (props: CatalogItemProps) => {
  
  const { name, toggleModal } = props;
  const [images, setImages] = useState<string[]>([]);
  const [inProgress, setInprogress] = useState<boolean>(false);
  const controller = useRef(new AbortController());

  const getRandomImages = async (): Promise<null> => {
    const getPath = name.split(' ').join('/');
    if (inProgress) {
      controller.current.abort();
      controller.current = new AbortController();
      setInprogress(false);
      setImages(images);
    } else {
      try {
        setInprogress(true);
        const { data } = await axios.get(`${MAIN_API_URL}breed/${getPath}/images/random/3`, {
          signal: controller.current.signal,
        });
        setImages(data.message);
      } catch (e) {
        toggleModal();
      }
      setInprogress(false);
    }
    return null;
  }

  const renderImages = useCallback(() => {
    return images.map(src => <img className="dogImage" key={src} src={src} />)
  }, [images])

  return (
    <div className="catalogItem">
      <div className="nameWithButton">
        <div>
          {name}
        </div>
        <ProgressButton inProgress={inProgress} getImages={getRandomImages} nameOfTheButton={images.length > 0 ? 'Обновить' : 'Показать'}/>
      </div>
      {
        images.length > 0 ? <div className="imagesContainer">{renderImages()}</div> : null
      }
    </div>
  )
};

export default CatalogItem;