import "./App.css";
import { useCallback, useEffect, useState } from "react";
import icon from "./icons/close_black_36dp.svg";

// react-redux
import { useDispatch, useSelector } from "react-redux";

// redux actions functions
import {
  importItems,
  importNextItems,
  importPrevItems,
} from "./redux/actions/itemsAction";

function App() {
  const { items: gallery, error: errorRedux } = useSelector(
    (store) => store.items
  );
  const dispacth = useDispatch();

  const [category, setCategory] = useState("work");
  const [categorySelect, setCategorySelect] = useState(false);
  const [imageSelect, setImageSelect] = useState(false);
  const [imageOnModal, setImageOnModal] = useState({});
  const [modal, setModal] = useState(false);

  const getData = useCallback(async () => {
    try {
      dispacth(importItems(category));
    } catch (error) {
      alert(errorRedux);
    }
  }, [category, dispacth, errorRedux]);

  useEffect(() => {
    getData();
  }, [getData]);

  function handleCategoryChange(event) {
    setCategory(event.target.value);
  }

  // this function responsible for opening the modal, it takes two parameters
  // one is what type of modal should it be,
  // second is that image that the modal should display if we open the image modal 
  const openModal = (param, optional) => {
    setModal(true);

    if (param === "category") {
      setCategorySelect(true);
    }
    if (param === "image") {
      setImageSelect(true);
      setImageOnModal(optional);
    }
  };

  // this function responsible on closing the modal
  // when that is happening we set the Modal state to false and both the image select and the category select
  const closeModal = () => {
    setModal(false);
    setImageSelect(false);
    setCategorySelect(false);
  };

  // function to get the next items, calling the action 
  const getNextItems = () => {
    try {
      dispacth(importNextItems(category));
    } catch (error) {
      alert(errorRedux);
    }
  };

  // function to get the previous items, calling the action 
  const getPrevItems = () => {
    try {
      dispacth(importPrevItems(category));
    } catch (error) {
      alert(errorRedux);
    }
  };

  return (
    <div className="App">
      {/* Previouse button & Next button */}
      <button className="btn btn-prev" onClick={getPrevItems}>
        prev
      </button>
      <button className="btn btn-next" onClick={getNextItems}>
        next
      </button>
      {/* Open modal to select category */}
      <button
        className="btn btn-category"
        onClick={() => openModal("category")}>
        Category
      </button>
      {/* Gallery setup */}
      <div className="gallery">
        <div className="grid-container grid-3">
          {gallery.map((item) => {
            return (
              <div
                className="grid-item"
                key={item.id}
                onClick={() => openModal("image", item)}>
                <img src={item.url} alt={`Item ${item.id}`} />
              </div>
            );
          })}
        </div>
      </div>
      {modal && (
        <div className="modal">
          <button className="close-modal" onClick={closeModal}>
            <img src={icon} alt="icon" />
          </button>
          {categorySelect && (
            /* Category Selection */
            <div className="category-select">
              <label htmlFor="category-select">Select a category:</label>
              <select
                id="category-select"
                value={category}
                onChange={handleCategoryChange}>
                <option value="">Choose a category</option>
                <option value="work">Work</option>
                <option value="sport">Sport</option>
                <option value="animals">Animals</option>
              </select>
              <p>Selected category: {category}</p>
            </div>
          )}
          {imageSelect && (
            <div>
              <img
                className="modal-image"
                src={imageOnModal.url}
                alt={`Item ${imageOnModal.id}`}
              />
              <div className="modal-image-details">
                <h5>Views: {imageOnModal.views}</h5>
                <h5>Downloads: {imageOnModal.downloads}</h5>
                <h5>Collections: {imageOnModal.collections}</h5>
                <h5>Likes: {imageOnModal.likes}</h5>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
