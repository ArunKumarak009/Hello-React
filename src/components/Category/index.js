const Category = (props) =>{
    const {categoryDetails , changeCategory  } = props  
    const {menuCategory , menuCategoryId} = categoryDetails

    const onClickChange = () =>{
        changeCategory(menuCategoryId)
    }

    return(
        <li key = {menuCategoryId} onClick={onClickChange}>
            <button>
            {
                menuCategory
            }
            </button>
            
         
        </li>
    )
}

export default Category