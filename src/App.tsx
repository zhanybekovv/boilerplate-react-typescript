import React, { useEffect, useState } from 'react';
import './App.css';
import CatalogItem from './CatalogItem';
import Modal from 'react-modal';
import axios from 'axios';
import { GET_ALL_CATEGORIES_URL } from './constants';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};


const App = () => {
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const flattenCategories = (categories: Record <string, string[] | []>) => {
    const objKeys = Object.keys(categories);
    const categoriesWithSubCat = [...objKeys];
    for (let i = 0; i < objKeys.length; i++ ) {
      if (categories[objKeys[i]].length > 0) {
        categories[objKeys[i]].forEach(subCategory => categoriesWithSubCat.push(`${objKeys[i]} ${subCategory}`))
      }
    }
    setAllCategories(categoriesWithSubCat);
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  useEffect(() => {
    const getAllCategories = async () => {
      const { data } = await axios.get(GET_ALL_CATEGORIES_URL);
      flattenCategories(data.message);
    };
    getAllCategories().catch(console.error);
  }, [])

  console.log('isOpen', isOpen);

  return (
    <div className="App">
      {
        allCategories.map(category => (
          <CatalogItem key={category} name={category} toggleModal={toggleModal}/>
        ))
      }
      <Modal isOpen={isOpen} style={customStyles}>
        <button onClick={toggleModal} style={{float: 'right'}}>закрыть</button>
        <div>Упс! Что-то пошло не так!</div>
      </Modal>
    </div>
  );
}

export default App;