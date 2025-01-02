import React, { useState, useEffect } from "react";
import Category from "./components/Category"
import CategoryItems from "./components/CategoryItems";

const App = () => {
  // Static product data
  const [categoryItems , setCategoryItems] = useState([])
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [loading ,setLoading] = useState(true) 
  const [cart , setCart] = useState([]) 


  const itemDetailsConvertToCamel = (obj) =>{
    return{
      addonCat: obj.addonCat,
dishAvailability: obj.dish_Availability,
dishType: obj.dish_Type,

dishCalories: obj.dish_calories,

dishCurrency:obj.dish_currency ,


dishDescription: obj.dish_description,

dishId: obj.dish_id,

dishImage: obj.dish_image,

dishName: obj.dish_name,

dishPrice:obj.dish_price
    }
  }



  



  useEffect(   () => {
    const options = {method:"GET"}  

    
  const convertCategoryCamelCase = (obj) =>{ 
    return {
      menuCategory:obj.menu_category,
      menuCategoryId:obj.menu_category_id
    }

  }
  

 
    const fetchData = async () => {
      try {
        const response = await fetch("https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details" , options);
        const result = await response.json();
        setProducts(result);
        console.log(result) 
        const updatedCategories = result[0].table_menu_list.map(eachItem => convertCategoryCamelCase(eachItem))
        const updatedItemDetails = result[0].table_menu_list[0].category_dishes.map(eachItem=> itemDetailsConvertToCamel(eachItem))
        
        setCategories(updatedCategories) 
        setSelectedCategory(updatedCategories[0].menuCategoryId)  
        console.log(selectedCategory)
        setLoading(false) 
        setCategoryItems(updatedItemDetails)

        
        
      } catch (error) {
        console.error("Error fetching data:", error);
      } 
    };

    // Call the async function
    fetchData();
  }, []); 


  const changeCategory = (id) =>{
    const getCategory = products[0].table_menu_list.find(eachItem => eachItem.menu_category_id === id) 
    const getDetails =  getCategory.category_dishes.map(eachItem => itemDetailsConvertToCamel(eachItem))
    console.log(getDetails)
    setCategoryItems(getDetails) 
    setSelectedCategory(id)
  }


 
  

const renderCategories = () =>{ 

  

  return (
    <>
    <ul>
      {
        categories.map(eachItem => <Category categoryDetails = {eachItem} key = {eachItem.menuCategoryId} changeCategory = {changeCategory}  isActive = {eachItem.menuCategoryId === selectedCategory} />)
      }
    </ul>
    </>
  )
}
const getProductQuantity = (productId) => {
  const productInCart = cart.find((item) => item.dishId === productId);
  return productInCart ? productInCart.quantity : 0;
};

const renderItems = () =>{ 

  

  return (
    <>
    <ul>
      {
        categoryItems.map(eachItem => <CategoryItems itemDetails = {eachItem} 
          key = {eachItem.dishId} 
           getProductQuantity = {getProductQuantity} 
           addToCart = {addToCart} 
           removeFromCart = {removeFromCart} />)
      }
    </ul>
    </>
  )
}


const addToCart = (product) => {
  setCart((prevCart) => {
    const productInCart = prevCart.find((item) => item.dishId === product.dishId);

    if (productInCart) {
      // If product exists in the cart, increase quantity
      return prevCart.map((item) =>
        item.dishId === product.dishId ? { ...item, quantity: item.quantity + 1 } : item
      );
    }

    // If product is not in the cart, add it with a quantity of 1
    return [...prevCart, { ...product, quantity: 1 }];
  });
}; 

const removeFromCart = (product) => {
  setCart((prevCart) => {
    const productInCart = prevCart.find((item) => item.dishId === product.dishId);

    if (productInCart && productInCart.quantity > 1) {
      // If product exists in the cart and quantity > 1, decrease quantity
      return prevCart.map((item) =>
        item.dishId === product.dishId ? { ...item, quantity: item.quantity - 1 } : item
      );
    }

    // If quantity is 1, remove the product from the cart
    return prevCart.filter((item) => item.dishId !== product.dishId);
  });
};




 
  
  const renderProducts = () => {
    
    console.log(categoryItems)
    
    return loading? <p>loading</p> : <>
    
      {renderCategories() }
      {renderItems()}
    
    
    </>
  }

  
  
  return(
    renderProducts()
  )
 
};

export default App;

