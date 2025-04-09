import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
  // const url = 'http://localhost:4000';
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Cow',
  });

  const onChangeHandeler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandeler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);

    try {
      const response = await axios.post(`${url}/api/livestocks/add`, formData);
      if (response.data.success) {
        setData({
          name: '',
          description: '',
          price: '',
          category: 'Cow',
        });
        setImage(false);
        toast.success(response.data.message);
      } else {
        // Handle errors from the server
        toast.error(response.data.message || 'An error occurred'); // Display generic error if no message provided
      }
    } catch (error) {
      console.error('Error submitting data:', error);
      toast.error('An error occurred while submitting data'); // Display generic error message
    }
  };


  return (
    <div className='add'>
        <form className='flex-col' onSubmit={onSubmitHandeler}>
            <div className="add-img-upload flex-col">
                <p>Upload Image</p>
                <label htmlFor="image">
                    <img src={image?URL.createObjectURL(image):assets.upload_area} alt="" />
                </label>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" hidden required id='image' />
            </div>
            <div className="add-product-name flex-col">
                <p>Product Name</p>
                <input onChange={onChangeHandeler} value={data.name} type="text" name='name' placeholder='Type Here'/>

            </div>
            <div className="add-description-name flex-col">
                <p>Product description</p>
                <textarea onChange={onChangeHandeler} value={data.description} name='description' rows="6" placeholder='Write Discrption here'></textarea>
            </div>
            <div className="add-category-price">
                <div className="add-category flex-col">
                    <p>Production Category</p>
                    <select onChange={onChangeHandeler}  name="category" >
                        <option value="Ox">Ox</option>
                        <option value="Cow">Cow</option>
                        <option value="Sheep">Sheep</option>
                        <option value="Goat">Goat</option>
                        <option value="Camel">Camel</option>
                        <option value="Hens">Hens</option>
                        <option value="Donkes">Donkes</option>
                        <option value="Products">Products</option>
                        <option value="Foods">Foods</option>
                        
                        {/* <option value="Mana">Mana</option>
                        <option value="Elektroniksii">Elektroniksii</option> */}
                    </select>
                </div>
                <div className="add-price flex-col">
                <p>Add Price</p>
                <input onChange={onChangeHandeler} value={data.price} type="Number" name='price' placeholder='birr:20000'/>

            </div>
            </div>
            <button type='submit' className='add-btn'>ADD TO PRODUCT</button>
        </form>
    </div>
  )
}

export default Add
