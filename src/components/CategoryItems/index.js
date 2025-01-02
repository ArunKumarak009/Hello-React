const CategoryItems = (props) =>{ 
   const {itemDetails , getProductQuantity ,addToCart , removeFromCart } = props 
   const {   addonCat,
    dishAvailability,
    dishType,
    
    dishCalories,
    
    dishCurrency,
    
    
    dishDescription,
    
    dishId,
    
    dishImage,
    
    dishName,
    
    dishPrice

   } = itemDetails 


   const getQuantity =  getProductQuantity(dishId) 
   const onClickAddToCart = () =>{
    addToCart(itemDetails)
   }
    const onClickRemoveFromCart = () =>{
        removeFromCart(itemDetails)
    }


console.log(dishName)
    return(
        <li>
            {dishName}
            {getQuantity === 0 ? <div>
                
                <button onClick={onClickAddToCart}>Add To Cart</button>
                 </div> : (<div>
                    <button onClick={onClickAddToCart} >+</button> 
                    {getQuantity}
                    <button onClick={onClickRemoveFromCart} >-</button>
                  </div>) }
            {dishName} 
            
        </li>
    )

}

export default CategoryItems