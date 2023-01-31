import React,{useEffect} from 'react'
import {CgMouse} from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../layout/MetaData';
import {clearErrors, getProduct} from "../../actions/productAction";
import{useSelector, useDispatch} from "react-redux";
import Loader from '../layout/Loader/Loader';
import {useAlert} from "react-alert"

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const {loading,error,products} = useSelector((state)=>state.products)
  
  useEffect(() => {
    
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error,alert]);
  
  
  return (
   <>
    {loading ? <Loader/> :  <>
    <MetaData title="Shop Studio" />
        <div className='banner'>
            <p>WELCOME TO SHOP STUDIO</p>
            <h1>Selling only the best things online</h1>

            <a href="#container">
                <button>
                Explore <CgMouse />
                </button>
            </a>
        </div>

        <h2 className='homeHeading'>Featured Products</h2>
        <div className="container" id="container">
            {products && products.map((product)=>
              <ProductCard key={product._id} product={product} />
            )}

          </div>
    </>}
   </>
  )
}

export default Home;