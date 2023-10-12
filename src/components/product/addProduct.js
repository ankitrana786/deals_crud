import React, {useRef, useMemo} from 'react';
import cn from "classnames";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom';
import image1 from '../../images/img1.png';
import { IoIosSearch } from "react-icons/io";
import OverlayLabel  from "../Ui/labels/overlaylabel";
import { useForm } from "react-hook-form";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NavigationAPI from "../../API/LoadMenuItems.php";
import FetchProducts from "../../API/getAllProducts.php";
import axios from "axios";
import {
  IoAddCircleOutline,
} from "react-icons/io5";
import { useParams } from "react-router-dom";
import ListDropdown from "../Ui/list-dropdown";
import { Combobox } from '@headlessui/react'
import JoditEditor from 'jodit-react';
import LoadingSpinner from "../Ui/loaders/loadingSpinner";
import SeoForm from '../common/seoform';

const apiUrl = "https://dev.ceramicarts.com/"; 

let tabInfoPrefill;
let initData = '0';

const AddProduct = ({ placeholder }) => {
  const imgPath = apiUrl+"categoryBanners/";
  const params = useParams();
  const editor = useRef(null);
  const [seojson,setSeoJson] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [content, setContent] = React.useState('');
  // const editorRef = useRef(null);
  const [message, setMessage] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [inputList,setInputList] = React.useState([]);
  const [categChain, setCategChain] = React.useState([]);
  const [selectedProduct, setSelectedProduct] = React.useState([]);
  const [subCategList, setSubCategList] = React.useState(null);
  const { register, handleSubmit,setValue } = useForm({ shouldUseNativeValidation: true });
  const [selectedFile, setSelectedFile] = React.useState();
  const [fileType, setFileType] = React.useState();
  const [imgSRC, setImageSrc] = React.useState('');
  const [productList, setProductList] = React.useState(null);
  const [categoryList, setCategoryList] = React.useState(null);
  const [activeData, setActiveData] = React.useState([]);
    
  const config = useMemo(() => (
    {
      readonly: false, // all options from https://xdsoft.net/jodit/doc/,
      placeholder: placeholder || 'Start typings...',
      uploader: {
        "insertImageAsBase64URI": true
      }
    }),
    [placeholder]
  );


  React.useEffect(() => {
      let menuArray = [];
        const fetchCategList = async () =>{
          // let obj ={
          //     "BISQUE": {
          //         "CODE": "BISQUE",
          //         "PRD_DESC": "Bisque",
          //         "WBISQUE": {
          //             "CODE": "WBISQUE",
          //             "PRD_DESC": "Best Sellers In Stock",
          //             "WBISQUE30": {
          //                 "CODE": "WBISQUE30",
          //                 "PRD_DESC": "Bisque Catalogues"
          //             },
          //             "WBISQUE40": {
          //                 "CODE": "WBISQUE40",
          //                 "PRD_DESC": "Bisque Prep Tools"
          //             },
          //             "WBISQUE10": {
          //                 "CODE": "WBISQUE10",
          //                 "PRD_DESC": "All"
          //             },
          //             "WBISQUE20": {
          //                 "CODE": "WBISQUE20",
          //                 "PRD_DESC": "Banks"
          //             },
          //             "WBISQUE50": {
          //                 "CODE": "WBISQUE50",
          //                 "PRD_DESC": "Boxes"
          //             },
          //             "WBISQUE60": {
          //                 "CODE": "WBISQUE60",
          //                 "PRD_DESC": "Camp & Party"
          //             },
          //             "WBISQUE70": {
          //                 "CODE": "WBISQUE70",
          //                 "PRD_DESC": "Drinkware"
          //             },
          //             "WBISQUE80": {
          //                 "CODE": "WBISQUE80",
          //                 "PRD_DESC": "License Characters"
          //             },
          //             "WBISQUE90": {
          //                 "CODE": "WBISQUE90",
          //                 "PRD_DESC": "Plates"
          //             },
          //             "WBISQUE110": {
          //                 "CODE": "WBISQUE110",
          //                 "PRD_DESC": "Tiles"
          //             },
          //             "WBISQUE100": {
          //                 "CODE": "WBISQUE100",
          //                 "PRD_DESC": "Stoneware"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "WBISQUE30",
          //                         "PRD_DESC": "Bisque Catalogues"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE40",
          //                         "PRD_DESC": "Bisque Prep Tools"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE10",
          //                         "PRD_DESC": "All"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE20",
          //                         "PRD_DESC": "Banks"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE50",
          //                         "PRD_DESC": "Boxes"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE60",
          //                         "PRD_DESC": "Camp & Party"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE70",
          //                         "PRD_DESC": "Drinkware"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE80",
          //                         "PRD_DESC": "License Characters"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE90",
          //                         "PRD_DESC": "Plates"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE110",
          //                         "PRD_DESC": "Tiles"
          //                     },
          //                     {
          //                         "CODE": "WBISQUE100",
          //                         "PRD_DESC": "Stoneware"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS100": {
          //             "CODE": "WBIS100",
          //             "PRD_DESC": "Add-ons & Tag Alongs",
          //             "XADDG": {
          //                 "CODE": "XADDG",
          //                 "PRD_DESC": "Bisquies by Gare"
          //             },
          //             "WTINYTOPPR": {
          //                 "CODE": "WTINYTOPPR",
          //                 "PRD_DESC": "Tiny Toppers"
          //             },
          //             "XBBTAG010": {
          //                 "CODE": "XBBTAG010",
          //                 "PRD_DESC": "Tag-Alongs"
          //             },
          //             "XBBTAG140": {
          //                 "CODE": "XBBTAG140",
          //                 "PRD_DESC": "Tag-Along Letters"
          //             },
          //             "XBBTAG145": {
          //                 "CODE": "XBBTAG145",
          //                 "PRD_DESC": "Tag-Along Numbers"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XADDG",
          //                         "PRD_DESC": "Bisquies by Gare"
          //                     },
          //                     {
          //                         "CODE": "WTINYTOPPR",
          //                         "PRD_DESC": "Tiny Toppers"
          //                     },
          //                     {
          //                         "CODE": "XBBTAG010",
          //                         "PRD_DESC": "Tag-Alongs"
          //                     },
          //                     {
          //                         "CODE": "XBBTAG140",
          //                         "PRD_DESC": "Tag-Along Letters"
          //                     },
          //                     {
          //                         "CODE": "XBBTAG145",
          //                         "PRD_DESC": "Tag-Along Numbers"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WAMMIEW": {
          //             "CODE": "WAMMIEW",
          //             "PRD_DESC": "Ammie Williams Collection"
          //         },
          //         "WBIS110": {
          //             "CODE": "WBIS110",
          //             "PRD_DESC": "Banks",
          //             "WBIS110AN": {
          //                 "CODE": "WBIS110AN",
          //                 "PRD_DESC": "Animal",
          //                 "XBANKA100": {
          //                     "CODE": "XBANKA100",
          //                     "PRD_DESC": "African"
          //                 },
          //                 "XBANKA110": {
          //                     "CODE": "XBANKA110",
          //                     "PRD_DESC": "Birds"
          //                 },
          //                 "XBANKA120": {
          //                     "CODE": "XBANKA120",
          //                     "PRD_DESC": "Cats"
          //                 },
          //                 "XBANKA130": {
          //                     "CODE": "XBANKA130",
          //                     "PRD_DESC": "Dinos & Dragons"
          //                 },
          //                 "XBANKA140": {
          //                     "CODE": "XBANKA140",
          //                     "PRD_DESC": "Dogs"
          //                 },
          //                 "XBANKA150": {
          //                     "CODE": "XBANKA150",
          //                     "PRD_DESC": "Farm"
          //                 },
          //                 "XBANKA160": {
          //                     "CODE": "XBANKA160",
          //                     "PRD_DESC": "Sea Life"
          //                 },
          //                 "XBANKA170": {
          //                     "CODE": "XBANKA170",
          //                     "PRD_DESC": "Horses & Unicorns"
          //                 },
          //                 "XBANKA180": {
          //                     "CODE": "XBANKA180",
          //                     "PRD_DESC": "Penguins"
          //                 },
          //                 "XBANKA190": {
          //                     "CODE": "XBANKA190",
          //                     "PRD_DESC": "Piggy Banks"
          //                 },
          //                 "XBANKA200": {
          //                     "CODE": "XBANKA200",
          //                     "PRD_DESC": "Turtles, Frogs, Insects"
          //                 },
          //                 "XBANKA210": {
          //                     "CODE": "XBANKA210",
          //                     "PRD_DESC": "Other"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "XBANKA100",
          //                             "PRD_DESC": "African"
          //                         },
          //                         {
          //                             "CODE": "XBANKA110",
          //                             "PRD_DESC": "Birds"
          //                         },
          //                         {
          //                             "CODE": "XBANKA120",
          //                             "PRD_DESC": "Cats"
          //                         },
          //                         {
          //                             "CODE": "XBANKA130",
          //                             "PRD_DESC": "Dinos & Dragons"
          //                         },
          //                         {
          //                             "CODE": "XBANKA140",
          //                             "PRD_DESC": "Dogs"
          //                         },
          //                         {
          //                             "CODE": "XBANKA150",
          //                             "PRD_DESC": "Farm"
          //                         },
          //                         {
          //                             "CODE": "XBANKA160",
          //                             "PRD_DESC": "Sea Life"
          //                         },
          //                         {
          //                             "CODE": "XBANKA170",
          //                             "PRD_DESC": "Horses & Unicorns"
          //                         },
          //                         {
          //                             "CODE": "XBANKA180",
          //                             "PRD_DESC": "Penguins"
          //                         },
          //                         {
          //                             "CODE": "XBANKA190",
          //                             "PRD_DESC": "Piggy Banks"
          //                         },
          //                         {
          //                             "CODE": "XBANKA200",
          //                             "PRD_DESC": "Turtles, Frogs, Insects"
          //                         },
          //                         {
          //                             "CODE": "XBANKA210",
          //                             "PRD_DESC": "Other"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "XBANK40": {
          //                 "CODE": "XBANK40",
          //                 "PRD_DESC": "Food Banks"
          //             },
          //             "XBANK95": {
          //                 "CODE": "XBANK95",
          //                 "PRD_DESC": "Miscellaneous Banks"
          //             },
          //             "XBANK25": {
          //                 "CODE": "XBANK25",
          //                 "PRD_DESC": "Monsters, Characters & Friends"
          //             },
          //             "XBANK30": {
          //                 "CODE": "XBANK30",
          //                 "PRD_DESC": "Princess, Castle & Hand Bags"
          //             },
          //             "XBANK50": {
          //                 "CODE": "XBANK50",
          //                 "PRD_DESC": "Sport"
          //             },
          //             "XBANK20": {
          //                 "CODE": "XBANK20",
          //                 "PRD_DESC": "Transportation"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "WBIS110AN",
          //                         "PRD_DESC": "Animal",
          //                         "XBANKA100": {
          //                             "CODE": "XBANKA100",
          //                             "PRD_DESC": "African"
          //                         },
          //                         "XBANKA110": {
          //                             "CODE": "XBANKA110",
          //                             "PRD_DESC": "Birds"
          //                         },
          //                         "XBANKA120": {
          //                             "CODE": "XBANKA120",
          //                             "PRD_DESC": "Cats"
          //                         },
          //                         "XBANKA130": {
          //                             "CODE": "XBANKA130",
          //                             "PRD_DESC": "Dinos & Dragons"
          //                         },
          //                         "XBANKA140": {
          //                             "CODE": "XBANKA140",
          //                             "PRD_DESC": "Dogs"
          //                         },
          //                         "XBANKA150": {
          //                             "CODE": "XBANKA150",
          //                             "PRD_DESC": "Farm"
          //                         },
          //                         "XBANKA160": {
          //                             "CODE": "XBANKA160",
          //                             "PRD_DESC": "Sea Life"
          //                         },
          //                         "XBANKA170": {
          //                             "CODE": "XBANKA170",
          //                             "PRD_DESC": "Horses & Unicorns"
          //                         },
          //                         "XBANKA180": {
          //                             "CODE": "XBANKA180",
          //                             "PRD_DESC": "Penguins"
          //                         },
          //                         "XBANKA190": {
          //                             "CODE": "XBANKA190",
          //                             "PRD_DESC": "Piggy Banks"
          //                         },
          //                         "XBANKA200": {
          //                             "CODE": "XBANKA200",
          //                             "PRD_DESC": "Turtles, Frogs, Insects"
          //                         },
          //                         "XBANKA210": {
          //                             "CODE": "XBANKA210",
          //                             "PRD_DESC": "Other"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XBANKA100",
          //                                     "PRD_DESC": "African"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA110",
          //                                     "PRD_DESC": "Birds"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA120",
          //                                     "PRD_DESC": "Cats"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA130",
          //                                     "PRD_DESC": "Dinos & Dragons"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA140",
          //                                     "PRD_DESC": "Dogs"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA150",
          //                                     "PRD_DESC": "Farm"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA160",
          //                                     "PRD_DESC": "Sea Life"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA170",
          //                                     "PRD_DESC": "Horses & Unicorns"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA180",
          //                                     "PRD_DESC": "Penguins"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA190",
          //                                     "PRD_DESC": "Piggy Banks"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA200",
          //                                     "PRD_DESC": "Turtles, Frogs, Insects"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA210",
          //                                     "PRD_DESC": "Other"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "XBANK40",
          //                         "PRD_DESC": "Food Banks"
          //                     },
          //                     {
          //                         "CODE": "XBANK95",
          //                         "PRD_DESC": "Miscellaneous Banks"
          //                     },
          //                     {
          //                         "CODE": "XBANK25",
          //                         "PRD_DESC": "Monsters, Characters & Friends"
          //                     },
          //                     {
          //                         "CODE": "XBANK30",
          //                         "PRD_DESC": "Princess, Castle & Hand Bags"
          //                     },
          //                     {
          //                         "CODE": "XBANK50",
          //                         "PRD_DESC": "Sport"
          //                     },
          //                     {
          //                         "CODE": "XBANK20",
          //                         "PRD_DESC": "Transportation"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS120": {
          //             "CODE": "WBIS120",
          //             "PRD_DESC": "Bowls",
          //             "XBOWL10": {
          //                 "CODE": "XBOWL10",
          //                 "PRD_DESC": "Animal Bowls And/Or For Your Pet"
          //             },
          //             "XBOWL95": {
          //                 "CODE": "XBOWL95",
          //                 "PRD_DESC": "Miscellaneous Bowls"
          //             },
          //             "XBOWL60": {
          //                 "CODE": "XBOWL60",
          //                 "PRD_DESC": "Oval"
          //             },
          //             "XBOWL40": {
          //                 "CODE": "XBOWL40",
          //                 "PRD_DESC": "Round Individual"
          //             },
          //             "XBOWL42": {
          //                 "CODE": "XBOWL42",
          //                 "PRD_DESC": "Round Service"
          //             },
          //             "XBOWL50": {
          //                 "CODE": "XBOWL50",
          //                 "PRD_DESC": "Round Embossed"
          //             },
          //             "XBOWL88": {
          //                 "CODE": "XBOWL88",
          //                 "PRD_DESC": "Ruffles & Waves & Angles"
          //             },
          //             "XBOWL85": {
          //                 "CODE": "XBOWL85",
          //                 "PRD_DESC": "Square & Rectangular"
          //             },
          //             "XBOWL90": {
          //                 "CODE": "XBOWL90",
          //                 "PRD_DESC": "Yarn Bowls"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XBOWL10",
          //                         "PRD_DESC": "Animal Bowls And/Or For Your Pet"
          //                     },
          //                     {
          //                         "CODE": "XBOWL95",
          //                         "PRD_DESC": "Miscellaneous Bowls"
          //                     },
          //                     {
          //                         "CODE": "XBOWL60",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     {
          //                         "CODE": "XBOWL40",
          //                         "PRD_DESC": "Round Individual"
          //                     },
          //                     {
          //                         "CODE": "XBOWL42",
          //                         "PRD_DESC": "Round Service"
          //                     },
          //                     {
          //                         "CODE": "XBOWL50",
          //                         "PRD_DESC": "Round Embossed"
          //                     },
          //                     {
          //                         "CODE": "XBOWL88",
          //                         "PRD_DESC": "Ruffles & Waves & Angles"
          //                     },
          //                     {
          //                         "CODE": "XBOWL85",
          //                         "PRD_DESC": "Square & Rectangular"
          //                     },
          //                     {
          //                         "CODE": "XBOWL90",
          //                         "PRD_DESC": "Yarn Bowls"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS130": {
          //             "CODE": "WBIS130",
          //             "PRD_DESC": "Boxes",
          //             "XBOXE20": {
          //                 "CODE": "XBOXE20",
          //                 "PRD_DESC": "Angels, Fairies, Princess & Hand Bags"
          //             },
          //             "XBOXE10": {
          //                 "CODE": "XBOXE10",
          //                 "PRD_DESC": "Animal Boxes Flat"
          //             },
          //             "XBOXE15": {
          //                 "CODE": "XBOXE15",
          //                 "PRD_DESC": "Animal Boxes and Jars"
          //             },
          //             "XBOXE25": {
          //                 "CODE": "XBOXE25",
          //                 "PRD_DESC": "Floral, Peace, Love and Gift"
          //             },
          //             "XBOXE95": {
          //                 "CODE": "XBOXE95",
          //                 "PRD_DESC": "Food"
          //             },
          //             "XBOXE30": {
          //                 "CODE": "XBOXE30",
          //                 "PRD_DESC": "Miscellaneous Boxes"
          //             },
          //             "XBOXE40": {
          //                 "CODE": "XBOXE40",
          //                 "PRD_DESC": "Plain Boxes"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XBOXE20",
          //                         "PRD_DESC": "Angels, Fairies, Princess & Hand Bags"
          //                     },
          //                     {
          //                         "CODE": "XBOXE10",
          //                         "PRD_DESC": "Animal Boxes Flat"
          //                     },
          //                     {
          //                         "CODE": "XBOXE15",
          //                         "PRD_DESC": "Animal Boxes and Jars"
          //                     },
          //                     {
          //                         "CODE": "XBOXE25",
          //                         "PRD_DESC": "Floral, Peace, Love and Gift"
          //                     },
          //                     {
          //                         "CODE": "XBOXE95",
          //                         "PRD_DESC": "Food"
          //                     },
          //                     {
          //                         "CODE": "XBOXE30",
          //                         "PRD_DESC": "Miscellaneous Boxes"
          //                     },
          //                     {
          //                         "CODE": "XBOXE40",
          //                         "PRD_DESC": "Plain Boxes"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS140": {
          //             "CODE": "WBIS140",
          //             "PRD_DESC": "Colouring Book",
          //             "WBIS140MU": {
          //                 "CODE": "WBIS140MU",
          //                 "PRD_DESC": "Mugs"
          //             },
          //             "WBIS140OR": {
          //                 "CODE": "WBIS140OR",
          //                 "PRD_DESC": "Ornaments"
          //             },
          //             "WBIS140PL": {
          //                 "CODE": "WBIS140PL",
          //                 "PRD_DESC": "Plates"
          //             },
          //             "WBIS140TI": {
          //                 "CODE": "WBIS140TI",
          //                 "PRD_DESC": "Tiles, Plaques & Boxes"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "WBIS140MU",
          //                         "PRD_DESC": "Mugs"
          //                     },
          //                     {
          //                         "CODE": "WBIS140OR",
          //                         "PRD_DESC": "Ornaments"
          //                     },
          //                     {
          //                         "CODE": "WBIS140PL",
          //                         "PRD_DESC": "Plates"
          //                     },
          //                     {
          //                         "CODE": "WBIS140TI",
          //                         "PRD_DESC": "Tiles, Plaques & Boxes"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS150": {
          //             "CODE": "WBIS150",
          //             "PRD_DESC": "Drinkware",
          //             "XMUGS20": {
          //                 "CODE": "XMUGS20",
          //                 "PRD_DESC": "Basic Mugs"
          //             },
          //             "XMUGS15": {
          //                 "CODE": "XMUGS15",
          //                 "PRD_DESC": "Drink Glass Plain"
          //             },
          //             "XMUGS16": {
          //                 "CODE": "XMUGS16",
          //                 "PRD_DESC": "Drink Glass Embossed"
          //             },
          //             "XMUGS28": {
          //                 "CODE": "XMUGS28",
          //                 "PRD_DESC": "Mugs Of All Kinds"
          //             },
          //             "XMUGS29": {
          //                 "CODE": "XMUGS29",
          //                 "PRD_DESC": "Short Mugs - :Less than 3.5\" Tall"
          //             },
          //             "XMUGS30": {
          //                 "CODE": "XMUGS30",
          //                 "PRD_DESC": "Tall Mugs - More than 4.75\" Tall"
          //             },
          //             "XMUGS31": {
          //                 "CODE": "XMUGS31",
          //                 "PRD_DESC": "Latte Mugs"
          //             },
          //             "XMUGS50": {
          //                 "CODE": "XMUGS50",
          //                 "PRD_DESC": "Travel Mugs"
          //             },
          //             "XMUGS10": {
          //                 "CODE": "XMUGS10",
          //                 "PRD_DESC": "Mugs with Saucers"
          //             },
          //             "XMUGS27": {
          //                 "CODE": "XMUGS27",
          //                 "PRD_DESC": "Embossed ANIMALS"
          //             },
          //             "XMUGS21": {
          //                 "CODE": "XMUGS21",
          //                 "PRD_DESC": "Embossed FACES & FACIAL EXPRESSIONS"
          //             },
          //             "XMUGS26": {
          //                 "CODE": "XMUGS26",
          //                 "PRD_DESC": "Embossed PEACE & LOVE"
          //             },
          //             "XMUGS25": {
          //                 "CODE": "XMUGS25",
          //                 "PRD_DESC": "Embossed MUGS OF ALL KINDS"
          //             },
          //             "XMUGS40": {
          //                 "CODE": "XMUGS40",
          //                 "PRD_DESC": "Stemware"
          //             },
          //             "XMUGS60": {
          //                 "CODE": "XMUGS60",
          //                 "PRD_DESC": "Mug Accessories"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XMUGS20",
          //                         "PRD_DESC": "Basic Mugs"
          //                     },
          //                     {
          //                         "CODE": "XMUGS15",
          //                         "PRD_DESC": "Drink Glass Plain"
          //                     },
          //                     {
          //                         "CODE": "XMUGS16",
          //                         "PRD_DESC": "Drink Glass Embossed"
          //                     },
          //                     {
          //                         "CODE": "XMUGS28",
          //                         "PRD_DESC": "Mugs Of All Kinds"
          //                     },
          //                     {
          //                         "CODE": "XMUGS29",
          //                         "PRD_DESC": "Short Mugs - :Less than 3.5\" Tall"
          //                     },
          //                     {
          //                         "CODE": "XMUGS30",
          //                         "PRD_DESC": "Tall Mugs - More than 4.75\" Tall"
          //                     },
          //                     {
          //                         "CODE": "XMUGS31",
          //                         "PRD_DESC": "Latte Mugs"
          //                     },
          //                     {
          //                         "CODE": "XMUGS50",
          //                         "PRD_DESC": "Travel Mugs"
          //                     },
          //                     {
          //                         "CODE": "XMUGS10",
          //                         "PRD_DESC": "Mugs with Saucers"
          //                     },
          //                     {
          //                         "CODE": "XMUGS27",
          //                         "PRD_DESC": "Embossed ANIMALS"
          //                     },
          //                     {
          //                         "CODE": "XMUGS21",
          //                         "PRD_DESC": "Embossed FACES & FACIAL EXPRESSIONS"
          //                     },
          //                     {
          //                         "CODE": "XMUGS26",
          //                         "PRD_DESC": "Embossed PEACE & LOVE"
          //                     },
          //                     {
          //                         "CODE": "XMUGS25",
          //                         "PRD_DESC": "Embossed MUGS OF ALL KINDS"
          //                     },
          //                     {
          //                         "CODE": "XMUGS40",
          //                         "PRD_DESC": "Stemware"
          //                     },
          //                     {
          //                         "CODE": "XMUGS60",
          //                         "PRD_DESC": "Mug Accessories"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS160": {
          //             "CODE": "WBIS160",
          //             "PRD_DESC": "Faceted Designs"
          //         },
          //         "WBIS170": {
          //             "CODE": "WBIS170",
          //             "PRD_DESC": "Home Decor",
          //             "XHOME60": {
          //                 "CODE": "XHOME60",
          //                 "PRD_DESC": "Bath"
          //             },
          //             "XHOME81": {
          //                 "CODE": "XHOME81",
          //                 "PRD_DESC": "Business Card Holder"
          //             },
          //             "XHOME10": {
          //                 "CODE": "XHOME10",
          //                 "PRD_DESC": "Candles"
          //             },
          //             "XHOME65": {
          //                 "CODE": "XHOME65",
          //                 "PRD_DESC": "Flower Pots"
          //             },
          //             "XHOME70": {
          //                 "CODE": "XHOME70",
          //                 "PRD_DESC": "Garden Accessories"
          //             },
          //             "XHOME75": {
          //                 "CODE": "XHOME75",
          //                 "PRD_DESC": "Light Ups"
          //             },
          //             "XHOME90": {
          //                 "CODE": "XHOME90",
          //                 "PRD_DESC": "Masks"
          //             },
          //             "XHOME95": {
          //                 "CODE": "XHOME95",
          //                 "PRD_DESC": "Home Miscellaneous"
          //             },
          //             "XHOME80": {
          //                 "CODE": "XHOME80",
          //                 "PRD_DESC": "Office"
          //             },
          //             "XHOME40": {
          //                 "CODE": "XHOME40",
          //                 "PRD_DESC": "Photo Frames"
          //             },
          //             "XHOME82": {
          //                 "CODE": "XHOME82",
          //                 "PRD_DESC": "Postcard Stand"
          //             },
          //             "XHOME83": {
          //                 "CODE": "XHOME83",
          //                 "PRD_DESC": "Trophies"
          //             },
          //             "XHOME50": {
          //                 "CODE": "XHOME50",
          //                 "PRD_DESC": "Vases"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XHOME60",
          //                         "PRD_DESC": "Bath"
          //                     },
          //                     {
          //                         "CODE": "XHOME81",
          //                         "PRD_DESC": "Business Card Holder"
          //                     },
          //                     {
          //                         "CODE": "XHOME10",
          //                         "PRD_DESC": "Candles"
          //                     },
          //                     {
          //                         "CODE": "XHOME65",
          //                         "PRD_DESC": "Flower Pots"
          //                     },
          //                     {
          //                         "CODE": "XHOME70",
          //                         "PRD_DESC": "Garden Accessories"
          //                     },
          //                     {
          //                         "CODE": "XHOME75",
          //                         "PRD_DESC": "Light Ups"
          //                     },
          //                     {
          //                         "CODE": "XHOME90",
          //                         "PRD_DESC": "Masks"
          //                     },
          //                     {
          //                         "CODE": "XHOME95",
          //                         "PRD_DESC": "Home Miscellaneous"
          //                     },
          //                     {
          //                         "CODE": "XHOME80",
          //                         "PRD_DESC": "Office"
          //                     },
          //                     {
          //                         "CODE": "XHOME40",
          //                         "PRD_DESC": "Photo Frames"
          //                     },
          //                     {
          //                         "CODE": "XHOME82",
          //                         "PRD_DESC": "Postcard Stand"
          //                     },
          //                     {
          //                         "CODE": "XHOME83",
          //                         "PRD_DESC": "Trophies"
          //                     },
          //                     {
          //                         "CODE": "XHOME50",
          //                         "PRD_DESC": "Vases"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS180": {
          //             "CODE": "WBIS180",
          //             "PRD_DESC": "Kids",
          //             "XKIDS85": {
          //                 "CODE": "XKIDS85",
          //                 "PRD_DESC": "Buddha"
          //             },
          //             "XKIDS35": {
          //                 "CODE": "XKIDS35",
          //                 "PRD_DESC": "Cats"
          //             },
          //             "XKIDS55": {
          //                 "CODE": "XKIDS55",
          //                 "PRD_DESC": "Dinosaurs & Dragons"
          //             },
          //             "XKIDS65": {
          //                 "CODE": "XKIDS65",
          //                 "PRD_DESC": "Dogs"
          //             },
          //             "WKIDS10": {
          //                 "CODE": "WKIDS10",
          //                 "PRD_DESC": "Faceted Animals"
          //             },
          //             "XKIDS20": {
          //                 "CODE": "XKIDS20",
          //                 "PRD_DESC": "Fairies, Angels & Princess"
          //             },
          //             "XKIDS602": {
          //                 "CODE": "XKIDS602",
          //                 "PRD_DESC": "Fishes & other Sea Life"
          //             },
          //             "WBIS180FIG": {
          //                 "CODE": "WBIS180FIG",
          //                 "PRD_DESC": "Figurines - Most Popular",
          //                 "XKIDS72": {
          //                     "CODE": "XKIDS72",
          //                     "PRD_DESC": "Figurine \"Party\""
          //                 },
          //                 "XKIDS33": {
          //                     "CODE": "XKIDS33",
          //                     "PRD_DESC": "Duncan \"Tiny Tots\""
          //                 },
          //                 "XKIDS74": {
          //                     "CODE": "XKIDS74",
          //                     "PRD_DESC": "Figurine \"Pal\""
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "XKIDS72",
          //                             "PRD_DESC": "Figurine \"Party\""
          //                         },
          //                         {
          //                             "CODE": "XKIDS33",
          //                             "PRD_DESC": "Duncan \"Tiny Tots\""
          //                         },
          //                         {
          //                             "CODE": "XKIDS74",
          //                             "PRD_DESC": "Figurine \"Pal\""
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "XKIDS80": {
          //                 "CODE": "XKIDS80",
          //                 "PRD_DESC": "Frogs & Insects"
          //             },
          //             "XKIDS60": {
          //                 "CODE": "XKIDS60",
          //                 "PRD_DESC": "Garden Gnomes"
          //             },
          //             "XKIDS70": {
          //                 "CODE": "XKIDS70",
          //                 "PRD_DESC": "Girly Objects"
          //             },
          //             "XKIDS90": {
          //                 "CODE": "XKIDS90",
          //                 "PRD_DESC": "Horses & Unicorns"
          //             },
          //             "WBIS180TOT": {
          //                 "CODE": "WBIS180TOT",
          //                 "PRD_DESC": "Minature Tots & Pals",
          //                 "XKIDSBBMT": {
          //                     "CODE": "XKIDSBBMT",
          //                     "PRD_DESC": "Might Tots \"BB\""
          //                 },
          //                 "XKIDSBBT": {
          //                     "CODE": "XKIDSBBT",
          //                     "PRD_DESC": "Tots \"BB\""
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "XKIDSBBMT",
          //                             "PRD_DESC": "Might Tots \"BB\""
          //                         },
          //                         {
          //                             "CODE": "XKIDSBBT",
          //                             "PRD_DESC": "Tots \"BB\""
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "XKIDS10": {
          //                 "CODE": "XKIDS10",
          //                 "PRD_DESC": "Other Animals"
          //             },
          //             "XKIDS95": {
          //                 "CODE": "XKIDS95",
          //                 "PRD_DESC": "Miscellaneous Kid Objects"
          //             },
          //             "XKIDS40": {
          //                 "CODE": "XKIDS40",
          //                 "PRD_DESC": "Penguins"
          //             },
          //             "XKIDS42": {
          //                 "CODE": "XKIDS42",
          //                 "PRD_DESC": "Rabbits & Bunnies"
          //             },
          //             "XKIDS30": {
          //                 "CODE": "XKIDS30",
          //                 "PRD_DESC": "Robots, Characters, Gargoyles, Monster & Friends"
          //             },
          //             "XKIDS44": {
          //                 "CODE": "XKIDS44",
          //                 "PRD_DESC": "Snakes, Aligators & Friends"
          //             },
          //             "XKIDS45": {
          //                 "CODE": "XKIDS45",
          //                 "PRD_DESC": "Turtles"
          //             },
          //             "XKIDS50": {
          //                 "CODE": "XKIDS50",
          //                 "PRD_DESC": "Sports"
          //             },
          //             "XKIDS15": {
          //                 "CODE": "XKIDS15",
          //                 "PRD_DESC": "Transportation"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XKIDS85",
          //                         "PRD_DESC": "Buddha"
          //                     },
          //                     {
          //                         "CODE": "XKIDS35",
          //                         "PRD_DESC": "Cats"
          //                     },
          //                     {
          //                         "CODE": "XKIDS55",
          //                         "PRD_DESC": "Dinosaurs & Dragons"
          //                     },
          //                     {
          //                         "CODE": "XKIDS65",
          //                         "PRD_DESC": "Dogs"
          //                     },
          //                     {
          //                         "CODE": "WKIDS10",
          //                         "PRD_DESC": "Faceted Animals"
          //                     },
          //                     {
          //                         "CODE": "XKIDS20",
          //                         "PRD_DESC": "Fairies, Angels & Princess"
          //                     },
          //                     {
          //                         "CODE": "XKIDS602",
          //                         "PRD_DESC": "Fishes & other Sea Life"
          //                     },
          //                     {
          //                         "CODE": "WBIS180FIG",
          //                         "PRD_DESC": "Figurines - Most Popular",
          //                         "XKIDS72": {
          //                             "CODE": "XKIDS72",
          //                             "PRD_DESC": "Figurine \"Party\""
          //                         },
          //                         "XKIDS33": {
          //                             "CODE": "XKIDS33",
          //                             "PRD_DESC": "Duncan \"Tiny Tots\""
          //                         },
          //                         "XKIDS74": {
          //                             "CODE": "XKIDS74",
          //                             "PRD_DESC": "Figurine \"Pal\""
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XKIDS72",
          //                                     "PRD_DESC": "Figurine \"Party\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDS33",
          //                                     "PRD_DESC": "Duncan \"Tiny Tots\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDS74",
          //                                     "PRD_DESC": "Figurine \"Pal\""
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "XKIDS80",
          //                         "PRD_DESC": "Frogs & Insects"
          //                     },
          //                     {
          //                         "CODE": "XKIDS60",
          //                         "PRD_DESC": "Garden Gnomes"
          //                     },
          //                     {
          //                         "CODE": "XKIDS70",
          //                         "PRD_DESC": "Girly Objects"
          //                     },
          //                     {
          //                         "CODE": "XKIDS90",
          //                         "PRD_DESC": "Horses & Unicorns"
          //                     },
          //                     {
          //                         "CODE": "WBIS180TOT",
          //                         "PRD_DESC": "Minature Tots & Pals",
          //                         "XKIDSBBMT": {
          //                             "CODE": "XKIDSBBMT",
          //                             "PRD_DESC": "Might Tots \"BB\""
          //                         },
          //                         "XKIDSBBT": {
          //                             "CODE": "XKIDSBBT",
          //                             "PRD_DESC": "Tots \"BB\""
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XKIDSBBMT",
          //                                     "PRD_DESC": "Might Tots \"BB\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDSBBT",
          //                                     "PRD_DESC": "Tots \"BB\""
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "XKIDS10",
          //                         "PRD_DESC": "Other Animals"
          //                     },
          //                     {
          //                         "CODE": "XKIDS95",
          //                         "PRD_DESC": "Miscellaneous Kid Objects"
          //                     },
          //                     {
          //                         "CODE": "XKIDS40",
          //                         "PRD_DESC": "Penguins"
          //                     },
          //                     {
          //                         "CODE": "XKIDS42",
          //                         "PRD_DESC": "Rabbits & Bunnies"
          //                     },
          //                     {
          //                         "CODE": "XKIDS30",
          //                         "PRD_DESC": "Robots, Characters, Gargoyles, Monster & Friends"
          //                     },
          //                     {
          //                         "CODE": "XKIDS44",
          //                         "PRD_DESC": "Snakes, Aligators & Friends"
          //                     },
          //                     {
          //                         "CODE": "XKIDS45",
          //                         "PRD_DESC": "Turtles"
          //                     },
          //                     {
          //                         "CODE": "XKIDS50",
          //                         "PRD_DESC": "Sports"
          //                     },
          //                     {
          //                         "CODE": "XKIDS15",
          //                         "PRD_DESC": "Transportation"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS190": {
          //             "CODE": "WBIS190",
          //             "PRD_DESC": "Kitchen",
          //             "XKITC56": {
          //                 "CODE": "XKITC56",
          //                 "PRD_DESC": "Bottles"
          //             },
          //             "XKITC15": {
          //                 "CODE": "XKITC15",
          //                 "PRD_DESC": "Butter Dish"
          //             },
          //             "XKITC20": {
          //                 "CODE": "XKITC20",
          //                 "PRD_DESC": "Chip & Dip"
          //             },
          //             "XKITC83": {
          //                 "CODE": "XKITC83",
          //                 "PRD_DESC": "Colanders & Berry Baskets"
          //             },
          //             "XKITC50": {
          //                 "CODE": "XKITC50",
          //                 "PRD_DESC": "Cookie Jars & Canisters"
          //             },
          //             "XKITC77": {
          //                 "CODE": "XKITC77",
          //                 "PRD_DESC": "Egg Trays & Cups"
          //             },
          //             "XKITC84": {
          //                 "CODE": "XKITC84",
          //                 "PRD_DESC": "Measuring Cups & Spoons"
          //             },
          //             "XKITC80": {
          //                 "CODE": "XKITC80",
          //                 "PRD_DESC": "Kitchen Misc"
          //             },
          //             "XKITC81": {
          //                 "CODE": "XKITC81",
          //                 "PRD_DESC": "Napkin Holders"
          //             },
          //             "XKITC40": {
          //                 "CODE": "XKITC40",
          //                 "PRD_DESC": "Pedestal Cake/Fruit Platter"
          //             },
          //             "XKITC55": {
          //                 "CODE": "XKITC55",
          //                 "PRD_DESC": "Pitchers"
          //             },
          //             "XKITC60": {
          //                 "CODE": "XKITC60",
          //                 "PRD_DESC": "Salt & Pepper"
          //             },
          //             "XKITC82": {
          //                 "CODE": "XKITC82",
          //                 "PRD_DESC": "Scrubbie"
          //             },
          //             "XKITC65": {
          //                 "CODE": "XKITC65",
          //                 "PRD_DESC": "Spoon Rest"
          //             },
          //             "XKITC70": {
          //                 "CODE": "XKITC70",
          //                 "PRD_DESC": "Sugar & Creamer"
          //             },
          //             "XKITC85": {
          //                 "CODE": "XKITC85",
          //                 "PRD_DESC": "Tea & Coffee Pots"
          //             },
          //             "XKITC86": {
          //                 "CODE": "XKITC86",
          //                 "PRD_DESC": "Tea Sets"
          //             },
          //             "XKITC93": {
          //                 "CODE": "XKITC93",
          //                 "PRD_DESC": "Tiny Toppers"
          //             },
          //             "XKITC75": {
          //                 "CODE": "XKITC75",
          //                 "PRD_DESC": "Trays with and without Handles"
          //             },
          //             "XKITC91": {
          //                 "CODE": "XKITC91",
          //                 "PRD_DESC": "Wine Accessories"
          //             },
          //             "XKITC90": {
          //                 "CODE": "XKITC90",
          //                 "PRD_DESC": "Wine Cooler & Caddy"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XKITC56",
          //                         "PRD_DESC": "Bottles"
          //                     },
          //                     {
          //                         "CODE": "XKITC15",
          //                         "PRD_DESC": "Butter Dish"
          //                     },
          //                     {
          //                         "CODE": "XKITC20",
          //                         "PRD_DESC": "Chip & Dip"
          //                     },
          //                     {
          //                         "CODE": "XKITC83",
          //                         "PRD_DESC": "Colanders & Berry Baskets"
          //                     },
          //                     {
          //                         "CODE": "XKITC50",
          //                         "PRD_DESC": "Cookie Jars & Canisters"
          //                     },
          //                     {
          //                         "CODE": "XKITC77",
          //                         "PRD_DESC": "Egg Trays & Cups"
          //                     },
          //                     {
          //                         "CODE": "XKITC84",
          //                         "PRD_DESC": "Measuring Cups & Spoons"
          //                     },
          //                     {
          //                         "CODE": "XKITC80",
          //                         "PRD_DESC": "Kitchen Misc"
          //                     },
          //                     {
          //                         "CODE": "XKITC81",
          //                         "PRD_DESC": "Napkin Holders"
          //                     },
          //                     {
          //                         "CODE": "XKITC40",
          //                         "PRD_DESC": "Pedestal Cake/Fruit Platter"
          //                     },
          //                     {
          //                         "CODE": "XKITC55",
          //                         "PRD_DESC": "Pitchers"
          //                     },
          //                     {
          //                         "CODE": "XKITC60",
          //                         "PRD_DESC": "Salt & Pepper"
          //                     },
          //                     {
          //                         "CODE": "XKITC82",
          //                         "PRD_DESC": "Scrubbie"
          //                     },
          //                     {
          //                         "CODE": "XKITC65",
          //                         "PRD_DESC": "Spoon Rest"
          //                     },
          //                     {
          //                         "CODE": "XKITC70",
          //                         "PRD_DESC": "Sugar & Creamer"
          //                     },
          //                     {
          //                         "CODE": "XKITC85",
          //                         "PRD_DESC": "Tea & Coffee Pots"
          //                     },
          //                     {
          //                         "CODE": "XKITC86",
          //                         "PRD_DESC": "Tea Sets"
          //                     },
          //                     {
          //                         "CODE": "XKITC93",
          //                         "PRD_DESC": "Tiny Toppers"
          //                     },
          //                     {
          //                         "CODE": "XKITC75",
          //                         "PRD_DESC": "Trays with and without Handles"
          //                     },
          //                     {
          //                         "CODE": "XKITC91",
          //                         "PRD_DESC": "Wine Accessories"
          //                     },
          //                     {
          //                         "CODE": "XKITC90",
          //                         "PRD_DESC": "Wine Cooler & Caddy"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS200": {
          //             "CODE": "WBIS200",
          //             "PRD_DESC": "Letters & Numbers",
          //             "XADDB40E": {
          //                 "CODE": "XADDB40E",
          //                 "PRD_DESC": "1.5\" Letters Greek/Roman"
          //             },
          //             "XTILE60": {
          //                 "CODE": "XTILE60",
          //                 "PRD_DESC": "5\" Bold Numbers"
          //             },
          //             "XTILE25": {
          //                 "CODE": "XTILE25",
          //                 "PRD_DESC": "5\" Thin Letters"
          //             },
          //             "XADDB40C": {
          //                 "CODE": "XADDB40C",
          //                 "PRD_DESC": "6\" Curly Letters & Numbers"
          //             },
          //             "XTILE55": {
          //                 "CODE": "XTILE55",
          //                 "PRD_DESC": "6\" Groovy Letters"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XADDB40E",
          //                         "PRD_DESC": "1.5\" Letters Greek/Roman"
          //                     },
          //                     {
          //                         "CODE": "XTILE60",
          //                         "PRD_DESC": "5\" Bold Numbers"
          //                     },
          //                     {
          //                         "CODE": "XTILE25",
          //                         "PRD_DESC": "5\" Thin Letters"
          //                     },
          //                     {
          //                         "CODE": "XADDB40C",
          //                         "PRD_DESC": "6\" Curly Letters & Numbers"
          //                     },
          //                     {
          //                         "CODE": "XTILE55",
          //                         "PRD_DESC": "6\" Groovy Letters"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS210": {
          //             "CODE": "WBIS210",
          //             "PRD_DESC": "Plates",
          //             "XDINN15": {
          //                 "CODE": "XDINN15",
          //                 "PRD_DESC": "Animal Plates"
          //             },
          //             "XDINN25": {
          //                 "CODE": "XDINN25",
          //                 "PRD_DESC": "Round & Embossed"
          //             },
          //             "XDINN26": {
          //                 "CODE": "XDINN26",
          //                 "PRD_DESC": "Embossed Plates"
          //             },
          //             "XDINN70": {
          //                 "CODE": "XDINN70",
          //                 "PRD_DESC": "Florals & Petal Plates"
          //             },
          //             "XDINN50": {
          //                 "CODE": "XDINN50",
          //                 "PRD_DESC": "Oval"
          //             },
          //             "XDINN27": {
          //                 "CODE": "XDINN27",
          //                 "PRD_DESC": "Rectangular"
          //             },
          //             "XDINN30": {
          //                 "CODE": "XDINN30",
          //                 "PRD_DESC": "Round Coupe"
          //             },
          //             "XDINN80": {
          //                 "CODE": "XDINN80",
          //                 "PRD_DESC": "Round Rim"
          //             },
          //             "XDINN75": {
          //                 "CODE": "XDINN75",
          //                 "PRD_DESC": "Round Ruffles & Waves"
          //             },
          //             "XDINN20": {
          //                 "CODE": "XDINN20",
          //                 "PRD_DESC": "Square"
          //             },
          //             "XDINN22": {
          //                 "CODE": "XDINN22",
          //                 "PRD_DESC": "T.V. Dinner"
          //             },
          //             "XDINN40": {
          //                 "CODE": "XDINN40",
          //                 "PRD_DESC": "Triangular"
          //             },
          //             "XDINN95": {
          //                 "CODE": "XDINN95",
          //                 "PRD_DESC": "Miscellaneous Shaped Plates"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XDINN15",
          //                         "PRD_DESC": "Animal Plates"
          //                     },
          //                     {
          //                         "CODE": "XDINN25",
          //                         "PRD_DESC": "Round & Embossed"
          //                     },
          //                     {
          //                         "CODE": "XDINN26",
          //                         "PRD_DESC": "Embossed Plates"
          //                     },
          //                     {
          //                         "CODE": "XDINN70",
          //                         "PRD_DESC": "Florals & Petal Plates"
          //                     },
          //                     {
          //                         "CODE": "XDINN50",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     {
          //                         "CODE": "XDINN27",
          //                         "PRD_DESC": "Rectangular"
          //                     },
          //                     {
          //                         "CODE": "XDINN30",
          //                         "PRD_DESC": "Round Coupe"
          //                     },
          //                     {
          //                         "CODE": "XDINN80",
          //                         "PRD_DESC": "Round Rim"
          //                     },
          //                     {
          //                         "CODE": "XDINN75",
          //                         "PRD_DESC": "Round Ruffles & Waves"
          //                     },
          //                     {
          //                         "CODE": "XDINN20",
          //                         "PRD_DESC": "Square"
          //                     },
          //                     {
          //                         "CODE": "XDINN22",
          //                         "PRD_DESC": "T.V. Dinner"
          //                     },
          //                     {
          //                         "CODE": "XDINN40",
          //                         "PRD_DESC": "Triangular"
          //                     },
          //                     {
          //                         "CODE": "XDINN95",
          //                         "PRD_DESC": "Miscellaneous Shaped Plates"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS220": {
          //             "CODE": "WBIS220",
          //             "PRD_DESC": "Seasonal",
          //             "XEASTER": {
          //                 "CODE": "XEASTER",
          //                 "PRD_DESC": "Easter"
          //             },
          //             "XHALL": {
          //                 "CODE": "XHALL",
          //                 "PRD_DESC": "Halloween"
          //             },
          //             "XJUDAIC": {
          //                 "CODE": "XJUDAIC",
          //                 "PRD_DESC": "Judaic"
          //             },
          //             "XPATRICK": {
          //                 "CODE": "XPATRICK",
          //                 "PRD_DESC": "St. Patrick's Day"
          //             },
          //             "XVALENTINE": {
          //                 "CODE": "XVALENTINE",
          //                 "PRD_DESC": "Valentine's Day"
          //             },
          //             "XWINT": {
          //                 "CODE": "XWINT",
          //                 "PRD_DESC": "Winter",
          //                 "XWINT10": {
          //                     "CODE": "XWINT10",
          //                     "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                 },
          //                 "XWINT60": {
          //                     "CODE": "XWINT60",
          //                     "PRD_DESC": "Nativity"
          //                 },
          //                 "XWINT20": {
          //                     "CODE": "XWINT20",
          //                     "PRD_DESC": "Christmas Ornaments Flat"
          //                 },
          //                 "XWINT35": {
          //                     "CODE": "XWINT35",
          //                     "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                 },
          //                 "XWINT40": {
          //                     "CODE": "XWINT40",
          //                     "PRD_DESC": "Christmas Trees & Wreathes"
          //                 },
          //                 "XWINT30": {
          //                     "CODE": "XWINT30",
          //                     "PRD_DESC": "Winter Miscellaneous"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "XWINT10",
          //                             "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                         },
          //                         {
          //                             "CODE": "XWINT60",
          //                             "PRD_DESC": "Nativity"
          //                         },
          //                         {
          //                             "CODE": "XWINT20",
          //                             "PRD_DESC": "Christmas Ornaments Flat"
          //                         },
          //                         {
          //                             "CODE": "XWINT35",
          //                             "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                         },
          //                         {
          //                             "CODE": "XWINT40",
          //                             "PRD_DESC": "Christmas Trees & Wreathes"
          //                         },
          //                         {
          //                             "CODE": "XWINT30",
          //                             "PRD_DESC": "Winter Miscellaneous"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XEASTER",
          //                         "PRD_DESC": "Easter"
          //                     },
          //                     {
          //                         "CODE": "XHALL",
          //                         "PRD_DESC": "Halloween"
          //                     },
          //                     {
          //                         "CODE": "XJUDAIC",
          //                         "PRD_DESC": "Judaic"
          //                     },
          //                     {
          //                         "CODE": "XPATRICK",
          //                         "PRD_DESC": "St. Patrick's Day"
          //                     },
          //                     {
          //                         "CODE": "XVALENTINE",
          //                         "PRD_DESC": "Valentine's Day"
          //                     },
          //                     {
          //                         "CODE": "XWINT",
          //                         "PRD_DESC": "Winter",
          //                         "XWINT10": {
          //                             "CODE": "XWINT10",
          //                             "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                         },
          //                         "XWINT60": {
          //                             "CODE": "XWINT60",
          //                             "PRD_DESC": "Nativity"
          //                         },
          //                         "XWINT20": {
          //                             "CODE": "XWINT20",
          //                             "PRD_DESC": "Christmas Ornaments Flat"
          //                         },
          //                         "XWINT35": {
          //                             "CODE": "XWINT35",
          //                             "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                         },
          //                         "XWINT40": {
          //                             "CODE": "XWINT40",
          //                             "PRD_DESC": "Christmas Trees & Wreathes"
          //                         },
          //                         "XWINT30": {
          //                             "CODE": "XWINT30",
          //                             "PRD_DESC": "Winter Miscellaneous"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XWINT10",
          //                                     "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT60",
          //                                     "PRD_DESC": "Nativity"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT20",
          //                                     "PRD_DESC": "Christmas Ornaments Flat"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT35",
          //                                     "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT40",
          //                                     "PRD_DESC": "Christmas Trees & Wreathes"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT30",
          //                                     "PRD_DESC": "Winter Miscellaneous"
          //                                 }
          //                             ]
          //                         ]
          //                     }
          //                 ]
          //             ]
          //         },
          //         "XWAVE": {
          //             "CODE": "XWAVE",
          //             "PRD_DESC": "Smokeware Themed"
          //         },
          //         "WBIS230": {
          //             "CODE": "WBIS230",
          //             "PRD_DESC": "Talavera"
          //         },
          //         "WBIS240": {
          //             "CODE": "WBIS240",
          //             "PRD_DESC": "Themed Bisque",
          //             "WBIS240010": {
          //                 "CODE": "WBIS240010",
          //                 "PRD_DESC": "Gail & Jackie Show"
          //             },
          //             "WBIS240011": {
          //                 "CODE": "WBIS240011",
          //                 "PRD_DESC": "Emoji"
          //             },
          //             "WBIS240012": {
          //                 "CODE": "WBIS240012",
          //                 "PRD_DESC": "Empty Bowls"
          //             },
          //             "WBIS240013": {
          //                 "CODE": "WBIS240013",
          //                 "PRD_DESC": "Fairies & Gnomes"
          //             },
          //             "WBIS240014": {
          //                 "CODE": "WBIS240014",
          //                 "PRD_DESC": "Farm To Table"
          //             },
          //             "WBIS240015": {
          //                 "CODE": "WBIS240015",
          //                 "PRD_DESC": "Fundraising"
          //             },
          //             "WBIS240016": {
          //                 "CODE": "WBIS240016",
          //                 "PRD_DESC": "Harry Potter"
          //             },
          //             "WBIS240017": {
          //                 "CODE": "WBIS240017",
          //                 "PRD_DESC": "Pop Art"
          //             },
          //             "WBIS240018": {
          //                 "CODE": "WBIS240018",
          //                 "PRD_DESC": "Pottery For The Planet"
          //             },
          //             "WBIS240019": {
          //                 "CODE": "WBIS240019",
          //                 "PRD_DESC": "Robots"
          //             },
          //             "WBIS240020": {
          //                 "CODE": "WBIS240020",
          //                 "PRD_DESC": "Shark Week"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "WBIS240010",
          //                         "PRD_DESC": "Gail & Jackie Show"
          //                     },
          //                     {
          //                         "CODE": "WBIS240011",
          //                         "PRD_DESC": "Emoji"
          //                     },
          //                     {
          //                         "CODE": "WBIS240012",
          //                         "PRD_DESC": "Empty Bowls"
          //                     },
          //                     {
          //                         "CODE": "WBIS240013",
          //                         "PRD_DESC": "Fairies & Gnomes"
          //                     },
          //                     {
          //                         "CODE": "WBIS240014",
          //                         "PRD_DESC": "Farm To Table"
          //                     },
          //                     {
          //                         "CODE": "WBIS240015",
          //                         "PRD_DESC": "Fundraising"
          //                     },
          //                     {
          //                         "CODE": "WBIS240016",
          //                         "PRD_DESC": "Harry Potter"
          //                     },
          //                     {
          //                         "CODE": "WBIS240017",
          //                         "PRD_DESC": "Pop Art"
          //                     },
          //                     {
          //                         "CODE": "WBIS240018",
          //                         "PRD_DESC": "Pottery For The Planet"
          //                     },
          //                     {
          //                         "CODE": "WBIS240019",
          //                         "PRD_DESC": "Robots"
          //                     },
          //                     {
          //                         "CODE": "WBIS240020",
          //                         "PRD_DESC": "Shark Week"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "WBIS250": {
          //             "CODE": "WBIS250",
          //             "PRD_DESC": "Tiles & Plaques",
          //             "XTILE45": {
          //                 "CODE": "XTILE45",
          //                 "PRD_DESC": "Coaster, Palette Tray + Tile Accessories"
          //             },
          //             "XTILE30": {
          //                 "CODE": "XTILE30",
          //                 "PRD_DESC": "Switch & Outlet Covers"
          //             },
          //             "XTILE10": {
          //                 "CODE": "XTILE10",
          //                 "PRD_DESC": "Tiles Plain"
          //             },
          //             "XTILE15": {
          //                 "CODE": "XTILE15",
          //                 "PRD_DESC": "Tiles & Coasters Embossed"
          //             },
          //             "XTILE46": {
          //                 "CODE": "XTILE46",
          //                 "PRD_DESC": "Trivets"
          //             },
          //             "XTILE50": {
          //                 "CODE": "XTILE50",
          //                 "PRD_DESC": "Wall Plaques"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "XTILE45",
          //                         "PRD_DESC": "Coaster, Palette Tray + Tile Accessories"
          //                     },
          //                     {
          //                         "CODE": "XTILE30",
          //                         "PRD_DESC": "Switch & Outlet Covers"
          //                     },
          //                     {
          //                         "CODE": "XTILE10",
          //                         "PRD_DESC": "Tiles Plain"
          //                     },
          //                     {
          //                         "CODE": "XTILE15",
          //                         "PRD_DESC": "Tiles & Coasters Embossed"
          //                     },
          //                     {
          //                         "CODE": "XTILE46",
          //                         "PRD_DESC": "Trivets"
          //                     },
          //                     {
          //                         "CODE": "XTILE50",
          //                         "PRD_DESC": "Wall Plaques"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "XSTONE": {
          //             "CODE": "XSTONE",
          //             "PRD_DESC": "Stoneware"
          //         },
          //         "subMenu": [
          //             [
          //                 {
          //                     "CODE": "WBISQUE",
          //                     "PRD_DESC": "Best Sellers In Stock",
          //                     "WBISQUE30": {
          //                         "CODE": "WBISQUE30",
          //                         "PRD_DESC": "Bisque Catalogues"
          //                     },
          //                     "WBISQUE40": {
          //                         "CODE": "WBISQUE40",
          //                         "PRD_DESC": "Bisque Prep Tools"
          //                     },
          //                     "WBISQUE10": {
          //                         "CODE": "WBISQUE10",
          //                         "PRD_DESC": "All"
          //                     },
          //                     "WBISQUE20": {
          //                         "CODE": "WBISQUE20",
          //                         "PRD_DESC": "Banks"
          //                     },
          //                     "WBISQUE50": {
          //                         "CODE": "WBISQUE50",
          //                         "PRD_DESC": "Boxes"
          //                     },
          //                     "WBISQUE60": {
          //                         "CODE": "WBISQUE60",
          //                         "PRD_DESC": "Camp & Party"
          //                     },
          //                     "WBISQUE70": {
          //                         "CODE": "WBISQUE70",
          //                         "PRD_DESC": "Drinkware"
          //                     },
          //                     "WBISQUE80": {
          //                         "CODE": "WBISQUE80",
          //                         "PRD_DESC": "License Characters"
          //                     },
          //                     "WBISQUE90": {
          //                         "CODE": "WBISQUE90",
          //                         "PRD_DESC": "Plates"
          //                     },
          //                     "WBISQUE110": {
          //                         "CODE": "WBISQUE110",
          //                         "PRD_DESC": "Tiles"
          //                     },
          //                     "WBISQUE100": {
          //                         "CODE": "WBISQUE100",
          //                         "PRD_DESC": "Stoneware"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "WBISQUE30",
          //                                 "PRD_DESC": "Bisque Catalogues"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE40",
          //                                 "PRD_DESC": "Bisque Prep Tools"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE10",
          //                                 "PRD_DESC": "All"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE20",
          //                                 "PRD_DESC": "Banks"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE50",
          //                                 "PRD_DESC": "Boxes"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE60",
          //                                 "PRD_DESC": "Camp & Party"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE70",
          //                                 "PRD_DESC": "Drinkware"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE80",
          //                                 "PRD_DESC": "License Characters"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE90",
          //                                 "PRD_DESC": "Plates"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE110",
          //                                 "PRD_DESC": "Tiles"
          //                             },
          //                             {
          //                                 "CODE": "WBISQUE100",
          //                                 "PRD_DESC": "Stoneware"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS100",
          //                     "PRD_DESC": "Add-ons & Tag Alongs",
          //                     "XADDG": {
          //                         "CODE": "XADDG",
          //                         "PRD_DESC": "Bisquies by Gare"
          //                     },
          //                     "WTINYTOPPR": {
          //                         "CODE": "WTINYTOPPR",
          //                         "PRD_DESC": "Tiny Toppers"
          //                     },
          //                     "XBBTAG010": {
          //                         "CODE": "XBBTAG010",
          //                         "PRD_DESC": "Tag-Alongs"
          //                     },
          //                     "XBBTAG140": {
          //                         "CODE": "XBBTAG140",
          //                         "PRD_DESC": "Tag-Along Letters"
          //                     },
          //                     "XBBTAG145": {
          //                         "CODE": "XBBTAG145",
          //                         "PRD_DESC": "Tag-Along Numbers"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XADDG",
          //                                 "PRD_DESC": "Bisquies by Gare"
          //                             },
          //                             {
          //                                 "CODE": "WTINYTOPPR",
          //                                 "PRD_DESC": "Tiny Toppers"
          //                             },
          //                             {
          //                                 "CODE": "XBBTAG010",
          //                                 "PRD_DESC": "Tag-Alongs"
          //                             },
          //                             {
          //                                 "CODE": "XBBTAG140",
          //                                 "PRD_DESC": "Tag-Along Letters"
          //                             },
          //                             {
          //                                 "CODE": "XBBTAG145",
          //                                 "PRD_DESC": "Tag-Along Numbers"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WAMMIEW",
          //                     "PRD_DESC": "Ammie Williams Collection"
          //                 },
          //                 {
          //                     "CODE": "WBIS110",
          //                     "PRD_DESC": "Banks",
          //                     "WBIS110AN": {
          //                         "CODE": "WBIS110AN",
          //                         "PRD_DESC": "Animal",
          //                         "XBANKA100": {
          //                             "CODE": "XBANKA100",
          //                             "PRD_DESC": "African"
          //                         },
          //                         "XBANKA110": {
          //                             "CODE": "XBANKA110",
          //                             "PRD_DESC": "Birds"
          //                         },
          //                         "XBANKA120": {
          //                             "CODE": "XBANKA120",
          //                             "PRD_DESC": "Cats"
          //                         },
          //                         "XBANKA130": {
          //                             "CODE": "XBANKA130",
          //                             "PRD_DESC": "Dinos & Dragons"
          //                         },
          //                         "XBANKA140": {
          //                             "CODE": "XBANKA140",
          //                             "PRD_DESC": "Dogs"
          //                         },
          //                         "XBANKA150": {
          //                             "CODE": "XBANKA150",
          //                             "PRD_DESC": "Farm"
          //                         },
          //                         "XBANKA160": {
          //                             "CODE": "XBANKA160",
          //                             "PRD_DESC": "Sea Life"
          //                         },
          //                         "XBANKA170": {
          //                             "CODE": "XBANKA170",
          //                             "PRD_DESC": "Horses & Unicorns"
          //                         },
          //                         "XBANKA180": {
          //                             "CODE": "XBANKA180",
          //                             "PRD_DESC": "Penguins"
          //                         },
          //                         "XBANKA190": {
          //                             "CODE": "XBANKA190",
          //                             "PRD_DESC": "Piggy Banks"
          //                         },
          //                         "XBANKA200": {
          //                             "CODE": "XBANKA200",
          //                             "PRD_DESC": "Turtles, Frogs, Insects"
          //                         },
          //                         "XBANKA210": {
          //                             "CODE": "XBANKA210",
          //                             "PRD_DESC": "Other"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XBANKA100",
          //                                     "PRD_DESC": "African"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA110",
          //                                     "PRD_DESC": "Birds"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA120",
          //                                     "PRD_DESC": "Cats"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA130",
          //                                     "PRD_DESC": "Dinos & Dragons"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA140",
          //                                     "PRD_DESC": "Dogs"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA150",
          //                                     "PRD_DESC": "Farm"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA160",
          //                                     "PRD_DESC": "Sea Life"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA170",
          //                                     "PRD_DESC": "Horses & Unicorns"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA180",
          //                                     "PRD_DESC": "Penguins"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA190",
          //                                     "PRD_DESC": "Piggy Banks"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA200",
          //                                     "PRD_DESC": "Turtles, Frogs, Insects"
          //                                 },
          //                                 {
          //                                     "CODE": "XBANKA210",
          //                                     "PRD_DESC": "Other"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "XBANK40": {
          //                         "CODE": "XBANK40",
          //                         "PRD_DESC": "Food Banks"
          //                     },
          //                     "XBANK95": {
          //                         "CODE": "XBANK95",
          //                         "PRD_DESC": "Miscellaneous Banks"
          //                     },
          //                     "XBANK25": {
          //                         "CODE": "XBANK25",
          //                         "PRD_DESC": "Monsters, Characters & Friends"
          //                     },
          //                     "XBANK30": {
          //                         "CODE": "XBANK30",
          //                         "PRD_DESC": "Princess, Castle & Hand Bags"
          //                     },
          //                     "XBANK50": {
          //                         "CODE": "XBANK50",
          //                         "PRD_DESC": "Sport"
          //                     },
          //                     "XBANK20": {
          //                         "CODE": "XBANK20",
          //                         "PRD_DESC": "Transportation"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "WBIS110AN",
          //                                 "PRD_DESC": "Animal",
          //                                 "XBANKA100": {
          //                                     "CODE": "XBANKA100",
          //                                     "PRD_DESC": "African"
          //                                 },
          //                                 "XBANKA110": {
          //                                     "CODE": "XBANKA110",
          //                                     "PRD_DESC": "Birds"
          //                                 },
          //                                 "XBANKA120": {
          //                                     "CODE": "XBANKA120",
          //                                     "PRD_DESC": "Cats"
          //                                 },
          //                                 "XBANKA130": {
          //                                     "CODE": "XBANKA130",
          //                                     "PRD_DESC": "Dinos & Dragons"
          //                                 },
          //                                 "XBANKA140": {
          //                                     "CODE": "XBANKA140",
          //                                     "PRD_DESC": "Dogs"
          //                                 },
          //                                 "XBANKA150": {
          //                                     "CODE": "XBANKA150",
          //                                     "PRD_DESC": "Farm"
          //                                 },
          //                                 "XBANKA160": {
          //                                     "CODE": "XBANKA160",
          //                                     "PRD_DESC": "Sea Life"
          //                                 },
          //                                 "XBANKA170": {
          //                                     "CODE": "XBANKA170",
          //                                     "PRD_DESC": "Horses & Unicorns"
          //                                 },
          //                                 "XBANKA180": {
          //                                     "CODE": "XBANKA180",
          //                                     "PRD_DESC": "Penguins"
          //                                 },
          //                                 "XBANKA190": {
          //                                     "CODE": "XBANKA190",
          //                                     "PRD_DESC": "Piggy Banks"
          //                                 },
          //                                 "XBANKA200": {
          //                                     "CODE": "XBANKA200",
          //                                     "PRD_DESC": "Turtles, Frogs, Insects"
          //                                 },
          //                                 "XBANKA210": {
          //                                     "CODE": "XBANKA210",
          //                                     "PRD_DESC": "Other"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "XBANKA100",
          //                                             "PRD_DESC": "African"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA110",
          //                                             "PRD_DESC": "Birds"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA120",
          //                                             "PRD_DESC": "Cats"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA130",
          //                                             "PRD_DESC": "Dinos & Dragons"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA140",
          //                                             "PRD_DESC": "Dogs"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA150",
          //                                             "PRD_DESC": "Farm"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA160",
          //                                             "PRD_DESC": "Sea Life"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA170",
          //                                             "PRD_DESC": "Horses & Unicorns"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA180",
          //                                             "PRD_DESC": "Penguins"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA190",
          //                                             "PRD_DESC": "Piggy Banks"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA200",
          //                                             "PRD_DESC": "Turtles, Frogs, Insects"
          //                                         },
          //                                         {
          //                                             "CODE": "XBANKA210",
          //                                             "PRD_DESC": "Other"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "XBANK40",
          //                                 "PRD_DESC": "Food Banks"
          //                             },
          //                             {
          //                                 "CODE": "XBANK95",
          //                                 "PRD_DESC": "Miscellaneous Banks"
          //                             },
          //                             {
          //                                 "CODE": "XBANK25",
          //                                 "PRD_DESC": "Monsters, Characters & Friends"
          //                             },
          //                             {
          //                                 "CODE": "XBANK30",
          //                                 "PRD_DESC": "Princess, Castle & Hand Bags"
          //                             },
          //                             {
          //                                 "CODE": "XBANK50",
          //                                 "PRD_DESC": "Sport"
          //                             },
          //                             {
          //                                 "CODE": "XBANK20",
          //                                 "PRD_DESC": "Transportation"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS120",
          //                     "PRD_DESC": "Bowls",
          //                     "XBOWL10": {
          //                         "CODE": "XBOWL10",
          //                         "PRD_DESC": "Animal Bowls And/Or For Your Pet"
          //                     },
          //                     "XBOWL95": {
          //                         "CODE": "XBOWL95",
          //                         "PRD_DESC": "Miscellaneous Bowls"
          //                     },
          //                     "XBOWL60": {
          //                         "CODE": "XBOWL60",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     "XBOWL40": {
          //                         "CODE": "XBOWL40",
          //                         "PRD_DESC": "Round Individual"
          //                     },
          //                     "XBOWL42": {
          //                         "CODE": "XBOWL42",
          //                         "PRD_DESC": "Round Service"
          //                     },
          //                     "XBOWL50": {
          //                         "CODE": "XBOWL50",
          //                         "PRD_DESC": "Round Embossed"
          //                     },
          //                     "XBOWL88": {
          //                         "CODE": "XBOWL88",
          //                         "PRD_DESC": "Ruffles & Waves & Angles"
          //                     },
          //                     "XBOWL85": {
          //                         "CODE": "XBOWL85",
          //                         "PRD_DESC": "Square & Rectangular"
          //                     },
          //                     "XBOWL90": {
          //                         "CODE": "XBOWL90",
          //                         "PRD_DESC": "Yarn Bowls"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XBOWL10",
          //                                 "PRD_DESC": "Animal Bowls And/Or For Your Pet"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL95",
          //                                 "PRD_DESC": "Miscellaneous Bowls"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL60",
          //                                 "PRD_DESC": "Oval"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL40",
          //                                 "PRD_DESC": "Round Individual"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL42",
          //                                 "PRD_DESC": "Round Service"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL50",
          //                                 "PRD_DESC": "Round Embossed"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL88",
          //                                 "PRD_DESC": "Ruffles & Waves & Angles"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL85",
          //                                 "PRD_DESC": "Square & Rectangular"
          //                             },
          //                             {
          //                                 "CODE": "XBOWL90",
          //                                 "PRD_DESC": "Yarn Bowls"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS130",
          //                     "PRD_DESC": "Boxes",
          //                     "XBOXE20": {
          //                         "CODE": "XBOXE20",
          //                         "PRD_DESC": "Angels, Fairies, Princess & Hand Bags"
          //                     },
          //                     "XBOXE10": {
          //                         "CODE": "XBOXE10",
          //                         "PRD_DESC": "Animal Boxes Flat"
          //                     },
          //                     "XBOXE15": {
          //                         "CODE": "XBOXE15",
          //                         "PRD_DESC": "Animal Boxes and Jars"
          //                     },
          //                     "XBOXE25": {
          //                         "CODE": "XBOXE25",
          //                         "PRD_DESC": "Floral, Peace, Love and Gift"
          //                     },
          //                     "XBOXE95": {
          //                         "CODE": "XBOXE95",
          //                         "PRD_DESC": "Food"
          //                     },
          //                     "XBOXE30": {
          //                         "CODE": "XBOXE30",
          //                         "PRD_DESC": "Miscellaneous Boxes"
          //                     },
          //                     "XBOXE40": {
          //                         "CODE": "XBOXE40",
          //                         "PRD_DESC": "Plain Boxes"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XBOXE20",
          //                                 "PRD_DESC": "Angels, Fairies, Princess & Hand Bags"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE10",
          //                                 "PRD_DESC": "Animal Boxes Flat"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE15",
          //                                 "PRD_DESC": "Animal Boxes and Jars"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE25",
          //                                 "PRD_DESC": "Floral, Peace, Love and Gift"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE95",
          //                                 "PRD_DESC": "Food"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE30",
          //                                 "PRD_DESC": "Miscellaneous Boxes"
          //                             },
          //                             {
          //                                 "CODE": "XBOXE40",
          //                                 "PRD_DESC": "Plain Boxes"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS140",
          //                     "PRD_DESC": "Colouring Book",
          //                     "WBIS140MU": {
          //                         "CODE": "WBIS140MU",
          //                         "PRD_DESC": "Mugs"
          //                     },
          //                     "WBIS140OR": {
          //                         "CODE": "WBIS140OR",
          //                         "PRD_DESC": "Ornaments"
          //                     },
          //                     "WBIS140PL": {
          //                         "CODE": "WBIS140PL",
          //                         "PRD_DESC": "Plates"
          //                     },
          //                     "WBIS140TI": {
          //                         "CODE": "WBIS140TI",
          //                         "PRD_DESC": "Tiles, Plaques & Boxes"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "WBIS140MU",
          //                                 "PRD_DESC": "Mugs"
          //                             },
          //                             {
          //                                 "CODE": "WBIS140OR",
          //                                 "PRD_DESC": "Ornaments"
          //                             },
          //                             {
          //                                 "CODE": "WBIS140PL",
          //                                 "PRD_DESC": "Plates"
          //                             },
          //                             {
          //                                 "CODE": "WBIS140TI",
          //                                 "PRD_DESC": "Tiles, Plaques & Boxes"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS150",
          //                     "PRD_DESC": "Drinkware",
          //                     "XMUGS20": {
          //                         "CODE": "XMUGS20",
          //                         "PRD_DESC": "Basic Mugs"
          //                     },
          //                     "XMUGS15": {
          //                         "CODE": "XMUGS15",
          //                         "PRD_DESC": "Drink Glass Plain"
          //                     },
          //                     "XMUGS16": {
          //                         "CODE": "XMUGS16",
          //                         "PRD_DESC": "Drink Glass Embossed"
          //                     },
          //                     "XMUGS28": {
          //                         "CODE": "XMUGS28",
          //                         "PRD_DESC": "Mugs Of All Kinds"
          //                     },
          //                     "XMUGS29": {
          //                         "CODE": "XMUGS29",
          //                         "PRD_DESC": "Short Mugs - :Less than 3.5\" Tall"
          //                     },
          //                     "XMUGS30": {
          //                         "CODE": "XMUGS30",
          //                         "PRD_DESC": "Tall Mugs - More than 4.75\" Tall"
          //                     },
          //                     "XMUGS31": {
          //                         "CODE": "XMUGS31",
          //                         "PRD_DESC": "Latte Mugs"
          //                     },
          //                     "XMUGS50": {
          //                         "CODE": "XMUGS50",
          //                         "PRD_DESC": "Travel Mugs"
          //                     },
          //                     "XMUGS10": {
          //                         "CODE": "XMUGS10",
          //                         "PRD_DESC": "Mugs with Saucers"
          //                     },
          //                     "XMUGS27": {
          //                         "CODE": "XMUGS27",
          //                         "PRD_DESC": "Embossed ANIMALS"
          //                     },
          //                     "XMUGS21": {
          //                         "CODE": "XMUGS21",
          //                         "PRD_DESC": "Embossed FACES & FACIAL EXPRESSIONS"
          //                     },
          //                     "XMUGS26": {
          //                         "CODE": "XMUGS26",
          //                         "PRD_DESC": "Embossed PEACE & LOVE"
          //                     },
          //                     "XMUGS25": {
          //                         "CODE": "XMUGS25",
          //                         "PRD_DESC": "Embossed MUGS OF ALL KINDS"
          //                     },
          //                     "XMUGS40": {
          //                         "CODE": "XMUGS40",
          //                         "PRD_DESC": "Stemware"
          //                     },
          //                     "XMUGS60": {
          //                         "CODE": "XMUGS60",
          //                         "PRD_DESC": "Mug Accessories"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XMUGS20",
          //                                 "PRD_DESC": "Basic Mugs"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS15",
          //                                 "PRD_DESC": "Drink Glass Plain"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS16",
          //                                 "PRD_DESC": "Drink Glass Embossed"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS28",
          //                                 "PRD_DESC": "Mugs Of All Kinds"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS29",
          //                                 "PRD_DESC": "Short Mugs - :Less than 3.5\" Tall"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS30",
          //                                 "PRD_DESC": "Tall Mugs - More than 4.75\" Tall"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS31",
          //                                 "PRD_DESC": "Latte Mugs"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS50",
          //                                 "PRD_DESC": "Travel Mugs"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS10",
          //                                 "PRD_DESC": "Mugs with Saucers"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS27",
          //                                 "PRD_DESC": "Embossed ANIMALS"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS21",
          //                                 "PRD_DESC": "Embossed FACES & FACIAL EXPRESSIONS"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS26",
          //                                 "PRD_DESC": "Embossed PEACE & LOVE"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS25",
          //                                 "PRD_DESC": "Embossed MUGS OF ALL KINDS"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS40",
          //                                 "PRD_DESC": "Stemware"
          //                             },
          //                             {
          //                                 "CODE": "XMUGS60",
          //                                 "PRD_DESC": "Mug Accessories"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS160",
          //                     "PRD_DESC": "Faceted Designs"
          //                 },
          //                 {
          //                     "CODE": "WBIS170",
          //                     "PRD_DESC": "Home Decor",
          //                     "XHOME60": {
          //                         "CODE": "XHOME60",
          //                         "PRD_DESC": "Bath"
          //                     },
          //                     "XHOME81": {
          //                         "CODE": "XHOME81",
          //                         "PRD_DESC": "Business Card Holder"
          //                     },
          //                     "XHOME10": {
          //                         "CODE": "XHOME10",
          //                         "PRD_DESC": "Candles"
          //                     },
          //                     "XHOME65": {
          //                         "CODE": "XHOME65",
          //                         "PRD_DESC": "Flower Pots"
          //                     },
          //                     "XHOME70": {
          //                         "CODE": "XHOME70",
          //                         "PRD_DESC": "Garden Accessories"
          //                     },
          //                     "XHOME75": {
          //                         "CODE": "XHOME75",
          //                         "PRD_DESC": "Light Ups"
          //                     },
          //                     "XHOME90": {
          //                         "CODE": "XHOME90",
          //                         "PRD_DESC": "Masks"
          //                     },
          //                     "XHOME95": {
          //                         "CODE": "XHOME95",
          //                         "PRD_DESC": "Home Miscellaneous"
          //                     },
          //                     "XHOME80": {
          //                         "CODE": "XHOME80",
          //                         "PRD_DESC": "Office"
          //                     },
          //                     "XHOME40": {
          //                         "CODE": "XHOME40",
          //                         "PRD_DESC": "Photo Frames"
          //                     },
          //                     "XHOME82": {
          //                         "CODE": "XHOME82",
          //                         "PRD_DESC": "Postcard Stand"
          //                     },
          //                     "XHOME83": {
          //                         "CODE": "XHOME83",
          //                         "PRD_DESC": "Trophies"
          //                     },
          //                     "XHOME50": {
          //                         "CODE": "XHOME50",
          //                         "PRD_DESC": "Vases"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XHOME60",
          //                                 "PRD_DESC": "Bath"
          //                             },
          //                             {
          //                                 "CODE": "XHOME81",
          //                                 "PRD_DESC": "Business Card Holder"
          //                             },
          //                             {
          //                                 "CODE": "XHOME10",
          //                                 "PRD_DESC": "Candles"
          //                             },
          //                             {
          //                                 "CODE": "XHOME65",
          //                                 "PRD_DESC": "Flower Pots"
          //                             },
          //                             {
          //                                 "CODE": "XHOME70",
          //                                 "PRD_DESC": "Garden Accessories"
          //                             },
          //                             {
          //                                 "CODE": "XHOME75",
          //                                 "PRD_DESC": "Light Ups"
          //                             },
          //                             {
          //                                 "CODE": "XHOME90",
          //                                 "PRD_DESC": "Masks"
          //                             },
          //                             {
          //                                 "CODE": "XHOME95",
          //                                 "PRD_DESC": "Home Miscellaneous"
          //                             },
          //                             {
          //                                 "CODE": "XHOME80",
          //                                 "PRD_DESC": "Office"
          //                             },
          //                             {
          //                                 "CODE": "XHOME40",
          //                                 "PRD_DESC": "Photo Frames"
          //                             },
          //                             {
          //                                 "CODE": "XHOME82",
          //                                 "PRD_DESC": "Postcard Stand"
          //                             },
          //                             {
          //                                 "CODE": "XHOME83",
          //                                 "PRD_DESC": "Trophies"
          //                             },
          //                             {
          //                                 "CODE": "XHOME50",
          //                                 "PRD_DESC": "Vases"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS180",
          //                     "PRD_DESC": "Kids",
          //                     "XKIDS85": {
          //                         "CODE": "XKIDS85",
          //                         "PRD_DESC": "Buddha"
          //                     },
          //                     "XKIDS35": {
          //                         "CODE": "XKIDS35",
          //                         "PRD_DESC": "Cats"
          //                     },
          //                     "XKIDS55": {
          //                         "CODE": "XKIDS55",
          //                         "PRD_DESC": "Dinosaurs & Dragons"
          //                     },
          //                     "XKIDS65": {
          //                         "CODE": "XKIDS65",
          //                         "PRD_DESC": "Dogs"
          //                     },
          //                     "WKIDS10": {
          //                         "CODE": "WKIDS10",
          //                         "PRD_DESC": "Faceted Animals"
          //                     },
          //                     "XKIDS20": {
          //                         "CODE": "XKIDS20",
          //                         "PRD_DESC": "Fairies, Angels & Princess"
          //                     },
          //                     "XKIDS602": {
          //                         "CODE": "XKIDS602",
          //                         "PRD_DESC": "Fishes & other Sea Life"
          //                     },
          //                     "WBIS180FIG": {
          //                         "CODE": "WBIS180FIG",
          //                         "PRD_DESC": "Figurines - Most Popular",
          //                         "XKIDS72": {
          //                             "CODE": "XKIDS72",
          //                             "PRD_DESC": "Figurine \"Party\""
          //                         },
          //                         "XKIDS33": {
          //                             "CODE": "XKIDS33",
          //                             "PRD_DESC": "Duncan \"Tiny Tots\""
          //                         },
          //                         "XKIDS74": {
          //                             "CODE": "XKIDS74",
          //                             "PRD_DESC": "Figurine \"Pal\""
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XKIDS72",
          //                                     "PRD_DESC": "Figurine \"Party\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDS33",
          //                                     "PRD_DESC": "Duncan \"Tiny Tots\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDS74",
          //                                     "PRD_DESC": "Figurine \"Pal\""
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "XKIDS80": {
          //                         "CODE": "XKIDS80",
          //                         "PRD_DESC": "Frogs & Insects"
          //                     },
          //                     "XKIDS60": {
          //                         "CODE": "XKIDS60",
          //                         "PRD_DESC": "Garden Gnomes"
          //                     },
          //                     "XKIDS70": {
          //                         "CODE": "XKIDS70",
          //                         "PRD_DESC": "Girly Objects"
          //                     },
          //                     "XKIDS90": {
          //                         "CODE": "XKIDS90",
          //                         "PRD_DESC": "Horses & Unicorns"
          //                     },
          //                     "WBIS180TOT": {
          //                         "CODE": "WBIS180TOT",
          //                         "PRD_DESC": "Minature Tots & Pals",
          //                         "XKIDSBBMT": {
          //                             "CODE": "XKIDSBBMT",
          //                             "PRD_DESC": "Might Tots \"BB\""
          //                         },
          //                         "XKIDSBBT": {
          //                             "CODE": "XKIDSBBT",
          //                             "PRD_DESC": "Tots \"BB\""
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XKIDSBBMT",
          //                                     "PRD_DESC": "Might Tots \"BB\""
          //                                 },
          //                                 {
          //                                     "CODE": "XKIDSBBT",
          //                                     "PRD_DESC": "Tots \"BB\""
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "XKIDS10": {
          //                         "CODE": "XKIDS10",
          //                         "PRD_DESC": "Other Animals"
          //                     },
          //                     "XKIDS95": {
          //                         "CODE": "XKIDS95",
          //                         "PRD_DESC": "Miscellaneous Kid Objects"
          //                     },
          //                     "XKIDS40": {
          //                         "CODE": "XKIDS40",
          //                         "PRD_DESC": "Penguins"
          //                     },
          //                     "XKIDS42": {
          //                         "CODE": "XKIDS42",
          //                         "PRD_DESC": "Rabbits & Bunnies"
          //                     },
          //                     "XKIDS30": {
          //                         "CODE": "XKIDS30",
          //                         "PRD_DESC": "Robots, Characters, Gargoyles, Monster & Friends"
          //                     },
          //                     "XKIDS44": {
          //                         "CODE": "XKIDS44",
          //                         "PRD_DESC": "Snakes, Aligators & Friends"
          //                     },
          //                     "XKIDS45": {
          //                         "CODE": "XKIDS45",
          //                         "PRD_DESC": "Turtles"
          //                     },
          //                     "XKIDS50": {
          //                         "CODE": "XKIDS50",
          //                         "PRD_DESC": "Sports"
          //                     },
          //                     "XKIDS15": {
          //                         "CODE": "XKIDS15",
          //                         "PRD_DESC": "Transportation"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XKIDS85",
          //                                 "PRD_DESC": "Buddha"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS35",
          //                                 "PRD_DESC": "Cats"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS55",
          //                                 "PRD_DESC": "Dinosaurs & Dragons"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS65",
          //                                 "PRD_DESC": "Dogs"
          //                             },
          //                             {
          //                                 "CODE": "WKIDS10",
          //                                 "PRD_DESC": "Faceted Animals"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS20",
          //                                 "PRD_DESC": "Fairies, Angels & Princess"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS602",
          //                                 "PRD_DESC": "Fishes & other Sea Life"
          //                             },
          //                             {
          //                                 "CODE": "WBIS180FIG",
          //                                 "PRD_DESC": "Figurines - Most Popular",
          //                                 "XKIDS72": {
          //                                     "CODE": "XKIDS72",
          //                                     "PRD_DESC": "Figurine \"Party\""
          //                                 },
          //                                 "XKIDS33": {
          //                                     "CODE": "XKIDS33",
          //                                     "PRD_DESC": "Duncan \"Tiny Tots\""
          //                                 },
          //                                 "XKIDS74": {
          //                                     "CODE": "XKIDS74",
          //                                     "PRD_DESC": "Figurine \"Pal\""
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "XKIDS72",
          //                                             "PRD_DESC": "Figurine \"Party\""
          //                                         },
          //                                         {
          //                                             "CODE": "XKIDS33",
          //                                             "PRD_DESC": "Duncan \"Tiny Tots\""
          //                                         },
          //                                         {
          //                                             "CODE": "XKIDS74",
          //                                             "PRD_DESC": "Figurine \"Pal\""
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "XKIDS80",
          //                                 "PRD_DESC": "Frogs & Insects"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS60",
          //                                 "PRD_DESC": "Garden Gnomes"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS70",
          //                                 "PRD_DESC": "Girly Objects"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS90",
          //                                 "PRD_DESC": "Horses & Unicorns"
          //                             },
          //                             {
          //                                 "CODE": "WBIS180TOT",
          //                                 "PRD_DESC": "Minature Tots & Pals",
          //                                 "XKIDSBBMT": {
          //                                     "CODE": "XKIDSBBMT",
          //                                     "PRD_DESC": "Might Tots \"BB\""
          //                                 },
          //                                 "XKIDSBBT": {
          //                                     "CODE": "XKIDSBBT",
          //                                     "PRD_DESC": "Tots \"BB\""
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "XKIDSBBMT",
          //                                             "PRD_DESC": "Might Tots \"BB\""
          //                                         },
          //                                         {
          //                                             "CODE": "XKIDSBBT",
          //                                             "PRD_DESC": "Tots \"BB\""
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "XKIDS10",
          //                                 "PRD_DESC": "Other Animals"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS95",
          //                                 "PRD_DESC": "Miscellaneous Kid Objects"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS40",
          //                                 "PRD_DESC": "Penguins"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS42",
          //                                 "PRD_DESC": "Rabbits & Bunnies"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS30",
          //                                 "PRD_DESC": "Robots, Characters, Gargoyles, Monster & Friends"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS44",
          //                                 "PRD_DESC": "Snakes, Aligators & Friends"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS45",
          //                                 "PRD_DESC": "Turtles"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS50",
          //                                 "PRD_DESC": "Sports"
          //                             },
          //                             {
          //                                 "CODE": "XKIDS15",
          //                                 "PRD_DESC": "Transportation"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS190",
          //                     "PRD_DESC": "Kitchen",
          //                     "XKITC56": {
          //                         "CODE": "XKITC56",
          //                         "PRD_DESC": "Bottles"
          //                     },
          //                     "XKITC15": {
          //                         "CODE": "XKITC15",
          //                         "PRD_DESC": "Butter Dish"
          //                     },
          //                     "XKITC20": {
          //                         "CODE": "XKITC20",
          //                         "PRD_DESC": "Chip & Dip"
          //                     },
          //                     "XKITC83": {
          //                         "CODE": "XKITC83",
          //                         "PRD_DESC": "Colanders & Berry Baskets"
          //                     },
          //                     "XKITC50": {
          //                         "CODE": "XKITC50",
          //                         "PRD_DESC": "Cookie Jars & Canisters"
          //                     },
          //                     "XKITC77": {
          //                         "CODE": "XKITC77",
          //                         "PRD_DESC": "Egg Trays & Cups"
          //                     },
          //                     "XKITC84": {
          //                         "CODE": "XKITC84",
          //                         "PRD_DESC": "Measuring Cups & Spoons"
          //                     },
          //                     "XKITC80": {
          //                         "CODE": "XKITC80",
          //                         "PRD_DESC": "Kitchen Misc"
          //                     },
          //                     "XKITC81": {
          //                         "CODE": "XKITC81",
          //                         "PRD_DESC": "Napkin Holders"
          //                     },
          //                     "XKITC40": {
          //                         "CODE": "XKITC40",
          //                         "PRD_DESC": "Pedestal Cake/Fruit Platter"
          //                     },
          //                     "XKITC55": {
          //                         "CODE": "XKITC55",
          //                         "PRD_DESC": "Pitchers"
          //                     },
          //                     "XKITC60": {
          //                         "CODE": "XKITC60",
          //                         "PRD_DESC": "Salt & Pepper"
          //                     },
          //                     "XKITC82": {
          //                         "CODE": "XKITC82",
          //                         "PRD_DESC": "Scrubbie"
          //                     },
          //                     "XKITC65": {
          //                         "CODE": "XKITC65",
          //                         "PRD_DESC": "Spoon Rest"
          //                     },
          //                     "XKITC70": {
          //                         "CODE": "XKITC70",
          //                         "PRD_DESC": "Sugar & Creamer"
          //                     },
          //                     "XKITC85": {
          //                         "CODE": "XKITC85",
          //                         "PRD_DESC": "Tea & Coffee Pots"
          //                     },
          //                     "XKITC86": {
          //                         "CODE": "XKITC86",
          //                         "PRD_DESC": "Tea Sets"
          //                     },
          //                     "XKITC93": {
          //                         "CODE": "XKITC93",
          //                         "PRD_DESC": "Tiny Toppers"
          //                     },
          //                     "XKITC75": {
          //                         "CODE": "XKITC75",
          //                         "PRD_DESC": "Trays with and without Handles"
          //                     },
          //                     "XKITC91": {
          //                         "CODE": "XKITC91",
          //                         "PRD_DESC": "Wine Accessories"
          //                     },
          //                     "XKITC90": {
          //                         "CODE": "XKITC90",
          //                         "PRD_DESC": "Wine Cooler & Caddy"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XKITC56",
          //                                 "PRD_DESC": "Bottles"
          //                             },
          //                             {
          //                                 "CODE": "XKITC15",
          //                                 "PRD_DESC": "Butter Dish"
          //                             },
          //                             {
          //                                 "CODE": "XKITC20",
          //                                 "PRD_DESC": "Chip & Dip"
          //                             },
          //                             {
          //                                 "CODE": "XKITC83",
          //                                 "PRD_DESC": "Colanders & Berry Baskets"
          //                             },
          //                             {
          //                                 "CODE": "XKITC50",
          //                                 "PRD_DESC": "Cookie Jars & Canisters"
          //                             },
          //                             {
          //                                 "CODE": "XKITC77",
          //                                 "PRD_DESC": "Egg Trays & Cups"
          //                             },
          //                             {
          //                                 "CODE": "XKITC84",
          //                                 "PRD_DESC": "Measuring Cups & Spoons"
          //                             },
          //                             {
          //                                 "CODE": "XKITC80",
          //                                 "PRD_DESC": "Kitchen Misc"
          //                             },
          //                             {
          //                                 "CODE": "XKITC81",
          //                                 "PRD_DESC": "Napkin Holders"
          //                             },
          //                             {
          //                                 "CODE": "XKITC40",
          //                                 "PRD_DESC": "Pedestal Cake/Fruit Platter"
          //                             },
          //                             {
          //                                 "CODE": "XKITC55",
          //                                 "PRD_DESC": "Pitchers"
          //                             },
          //                             {
          //                                 "CODE": "XKITC60",
          //                                 "PRD_DESC": "Salt & Pepper"
          //                             },
          //                             {
          //                                 "CODE": "XKITC82",
          //                                 "PRD_DESC": "Scrubbie"
          //                             },
          //                             {
          //                                 "CODE": "XKITC65",
          //                                 "PRD_DESC": "Spoon Rest"
          //                             },
          //                             {
          //                                 "CODE": "XKITC70",
          //                                 "PRD_DESC": "Sugar & Creamer"
          //                             },
          //                             {
          //                                 "CODE": "XKITC85",
          //                                 "PRD_DESC": "Tea & Coffee Pots"
          //                             },
          //                             {
          //                                 "CODE": "XKITC86",
          //                                 "PRD_DESC": "Tea Sets"
          //                             },
          //                             {
          //                                 "CODE": "XKITC93",
          //                                 "PRD_DESC": "Tiny Toppers"
          //                             },
          //                             {
          //                                 "CODE": "XKITC75",
          //                                 "PRD_DESC": "Trays with and without Handles"
          //                             },
          //                             {
          //                                 "CODE": "XKITC91",
          //                                 "PRD_DESC": "Wine Accessories"
          //                             },
          //                             {
          //                                 "CODE": "XKITC90",
          //                                 "PRD_DESC": "Wine Cooler & Caddy"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS200",
          //                     "PRD_DESC": "Letters & Numbers",
          //                     "XADDB40E": {
          //                         "CODE": "XADDB40E",
          //                         "PRD_DESC": "1.5\" Letters Greek/Roman"
          //                     },
          //                     "XTILE60": {
          //                         "CODE": "XTILE60",
          //                         "PRD_DESC": "5\" Bold Numbers"
          //                     },
          //                     "XTILE25": {
          //                         "CODE": "XTILE25",
          //                         "PRD_DESC": "5\" Thin Letters"
          //                     },
          //                     "XADDB40C": {
          //                         "CODE": "XADDB40C",
          //                         "PRD_DESC": "6\" Curly Letters & Numbers"
          //                     },
          //                     "XTILE55": {
          //                         "CODE": "XTILE55",
          //                         "PRD_DESC": "6\" Groovy Letters"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XADDB40E",
          //                                 "PRD_DESC": "1.5\" Letters Greek/Roman"
          //                             },
          //                             {
          //                                 "CODE": "XTILE60",
          //                                 "PRD_DESC": "5\" Bold Numbers"
          //                             },
          //                             {
          //                                 "CODE": "XTILE25",
          //                                 "PRD_DESC": "5\" Thin Letters"
          //                             },
          //                             {
          //                                 "CODE": "XADDB40C",
          //                                 "PRD_DESC": "6\" Curly Letters & Numbers"
          //                             },
          //                             {
          //                                 "CODE": "XTILE55",
          //                                 "PRD_DESC": "6\" Groovy Letters"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS210",
          //                     "PRD_DESC": "Plates",
          //                     "XDINN15": {
          //                         "CODE": "XDINN15",
          //                         "PRD_DESC": "Animal Plates"
          //                     },
          //                     "XDINN25": {
          //                         "CODE": "XDINN25",
          //                         "PRD_DESC": "Round & Embossed"
          //                     },
          //                     "XDINN26": {
          //                         "CODE": "XDINN26",
          //                         "PRD_DESC": "Embossed Plates"
          //                     },
          //                     "XDINN70": {
          //                         "CODE": "XDINN70",
          //                         "PRD_DESC": "Florals & Petal Plates"
          //                     },
          //                     "XDINN50": {
          //                         "CODE": "XDINN50",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     "XDINN27": {
          //                         "CODE": "XDINN27",
          //                         "PRD_DESC": "Rectangular"
          //                     },
          //                     "XDINN30": {
          //                         "CODE": "XDINN30",
          //                         "PRD_DESC": "Round Coupe"
          //                     },
          //                     "XDINN80": {
          //                         "CODE": "XDINN80",
          //                         "PRD_DESC": "Round Rim"
          //                     },
          //                     "XDINN75": {
          //                         "CODE": "XDINN75",
          //                         "PRD_DESC": "Round Ruffles & Waves"
          //                     },
          //                     "XDINN20": {
          //                         "CODE": "XDINN20",
          //                         "PRD_DESC": "Square"
          //                     },
          //                     "XDINN22": {
          //                         "CODE": "XDINN22",
          //                         "PRD_DESC": "T.V. Dinner"
          //                     },
          //                     "XDINN40": {
          //                         "CODE": "XDINN40",
          //                         "PRD_DESC": "Triangular"
          //                     },
          //                     "XDINN95": {
          //                         "CODE": "XDINN95",
          //                         "PRD_DESC": "Miscellaneous Shaped Plates"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XDINN15",
          //                                 "PRD_DESC": "Animal Plates"
          //                             },
          //                             {
          //                                 "CODE": "XDINN25",
          //                                 "PRD_DESC": "Round & Embossed"
          //                             },
          //                             {
          //                                 "CODE": "XDINN26",
          //                                 "PRD_DESC": "Embossed Plates"
          //                             },
          //                             {
          //                                 "CODE": "XDINN70",
          //                                 "PRD_DESC": "Florals & Petal Plates"
          //                             },
          //                             {
          //                                 "CODE": "XDINN50",
          //                                 "PRD_DESC": "Oval"
          //                             },
          //                             {
          //                                 "CODE": "XDINN27",
          //                                 "PRD_DESC": "Rectangular"
          //                             },
          //                             {
          //                                 "CODE": "XDINN30",
          //                                 "PRD_DESC": "Round Coupe"
          //                             },
          //                             {
          //                                 "CODE": "XDINN80",
          //                                 "PRD_DESC": "Round Rim"
          //                             },
          //                             {
          //                                 "CODE": "XDINN75",
          //                                 "PRD_DESC": "Round Ruffles & Waves"
          //                             },
          //                             {
          //                                 "CODE": "XDINN20",
          //                                 "PRD_DESC": "Square"
          //                             },
          //                             {
          //                                 "CODE": "XDINN22",
          //                                 "PRD_DESC": "T.V. Dinner"
          //                             },
          //                             {
          //                                 "CODE": "XDINN40",
          //                                 "PRD_DESC": "Triangular"
          //                             },
          //                             {
          //                                 "CODE": "XDINN95",
          //                                 "PRD_DESC": "Miscellaneous Shaped Plates"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS220",
          //                     "PRD_DESC": "Seasonal",
          //                     "XEASTER": {
          //                         "CODE": "XEASTER",
          //                         "PRD_DESC": "Easter"
          //                     },
          //                     "XHALL": {
          //                         "CODE": "XHALL",
          //                         "PRD_DESC": "Halloween"
          //                     },
          //                     "XJUDAIC": {
          //                         "CODE": "XJUDAIC",
          //                         "PRD_DESC": "Judaic"
          //                     },
          //                     "XPATRICK": {
          //                         "CODE": "XPATRICK",
          //                         "PRD_DESC": "St. Patrick's Day"
          //                     },
          //                     "XVALENTINE": {
          //                         "CODE": "XVALENTINE",
          //                         "PRD_DESC": "Valentine's Day"
          //                     },
          //                     "XWINT": {
          //                         "CODE": "XWINT",
          //                         "PRD_DESC": "Winter",
          //                         "XWINT10": {
          //                             "CODE": "XWINT10",
          //                             "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                         },
          //                         "XWINT60": {
          //                             "CODE": "XWINT60",
          //                             "PRD_DESC": "Nativity"
          //                         },
          //                         "XWINT20": {
          //                             "CODE": "XWINT20",
          //                             "PRD_DESC": "Christmas Ornaments Flat"
          //                         },
          //                         "XWINT35": {
          //                             "CODE": "XWINT35",
          //                             "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                         },
          //                         "XWINT40": {
          //                             "CODE": "XWINT40",
          //                             "PRD_DESC": "Christmas Trees & Wreathes"
          //                         },
          //                         "XWINT30": {
          //                             "CODE": "XWINT30",
          //                             "PRD_DESC": "Winter Miscellaneous"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "XWINT10",
          //                                     "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT60",
          //                                     "PRD_DESC": "Nativity"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT20",
          //                                     "PRD_DESC": "Christmas Ornaments Flat"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT35",
          //                                     "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT40",
          //                                     "PRD_DESC": "Christmas Trees & Wreathes"
          //                                 },
          //                                 {
          //                                     "CODE": "XWINT30",
          //                                     "PRD_DESC": "Winter Miscellaneous"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XEASTER",
          //                                 "PRD_DESC": "Easter"
          //                             },
          //                             {
          //                                 "CODE": "XHALL",
          //                                 "PRD_DESC": "Halloween"
          //                             },
          //                             {
          //                                 "CODE": "XJUDAIC",
          //                                 "PRD_DESC": "Judaic"
          //                             },
          //                             {
          //                                 "CODE": "XPATRICK",
          //                                 "PRD_DESC": "St. Patrick's Day"
          //                             },
          //                             {
          //                                 "CODE": "XVALENTINE",
          //                                 "PRD_DESC": "Valentine's Day"
          //                             },
          //                             {
          //                                 "CODE": "XWINT",
          //                                 "PRD_DESC": "Winter",
          //                                 "XWINT10": {
          //                                     "CODE": "XWINT10",
          //                                     "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                                 },
          //                                 "XWINT60": {
          //                                     "CODE": "XWINT60",
          //                                     "PRD_DESC": "Nativity"
          //                                 },
          //                                 "XWINT20": {
          //                                     "CODE": "XWINT20",
          //                                     "PRD_DESC": "Christmas Ornaments Flat"
          //                                 },
          //                                 "XWINT35": {
          //                                     "CODE": "XWINT35",
          //                                     "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                                 },
          //                                 "XWINT40": {
          //                                     "CODE": "XWINT40",
          //                                     "PRD_DESC": "Christmas Trees & Wreathes"
          //                                 },
          //                                 "XWINT30": {
          //                                     "CODE": "XWINT30",
          //                                     "PRD_DESC": "Winter Miscellaneous"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "XWINT10",
          //                                             "PRD_DESC": "Kitchen, Plates, Bowls, etc."
          //                                         },
          //                                         {
          //                                             "CODE": "XWINT60",
          //                                             "PRD_DESC": "Nativity"
          //                                         },
          //                                         {
          //                                             "CODE": "XWINT20",
          //                                             "PRD_DESC": "Christmas Ornaments Flat"
          //                                         },
          //                                         {
          //                                             "CODE": "XWINT35",
          //                                             "PRD_DESC": "Christmas Ornaments 3 Dimensional"
          //                                         },
          //                                         {
          //                                             "CODE": "XWINT40",
          //                                             "PRD_DESC": "Christmas Trees & Wreathes"
          //                                         },
          //                                         {
          //                                             "CODE": "XWINT30",
          //                                             "PRD_DESC": "Winter Miscellaneous"
          //                                         }
          //                                     ]
          //                                 ]
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "XWAVE",
          //                     "PRD_DESC": "Smokeware Themed"
          //                 },
          //                 {
          //                     "CODE": "WBIS230",
          //                     "PRD_DESC": "Talavera"
          //                 },
          //                 {
          //                     "CODE": "WBIS240",
          //                     "PRD_DESC": "Themed Bisque",
          //                     "WBIS240010": {
          //                         "CODE": "WBIS240010",
          //                         "PRD_DESC": "Gail & Jackie Show"
          //                     },
          //                     "WBIS240011": {
          //                         "CODE": "WBIS240011",
          //                         "PRD_DESC": "Emoji"
          //                     },
          //                     "WBIS240012": {
          //                         "CODE": "WBIS240012",
          //                         "PRD_DESC": "Empty Bowls"
          //                     },
          //                     "WBIS240013": {
          //                         "CODE": "WBIS240013",
          //                         "PRD_DESC": "Fairies & Gnomes"
          //                     },
          //                     "WBIS240014": {
          //                         "CODE": "WBIS240014",
          //                         "PRD_DESC": "Farm To Table"
          //                     },
          //                     "WBIS240015": {
          //                         "CODE": "WBIS240015",
          //                         "PRD_DESC": "Fundraising"
          //                     },
          //                     "WBIS240016": {
          //                         "CODE": "WBIS240016",
          //                         "PRD_DESC": "Harry Potter"
          //                     },
          //                     "WBIS240017": {
          //                         "CODE": "WBIS240017",
          //                         "PRD_DESC": "Pop Art"
          //                     },
          //                     "WBIS240018": {
          //                         "CODE": "WBIS240018",
          //                         "PRD_DESC": "Pottery For The Planet"
          //                     },
          //                     "WBIS240019": {
          //                         "CODE": "WBIS240019",
          //                         "PRD_DESC": "Robots"
          //                     },
          //                     "WBIS240020": {
          //                         "CODE": "WBIS240020",
          //                         "PRD_DESC": "Shark Week"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "WBIS240010",
          //                                 "PRD_DESC": "Gail & Jackie Show"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240011",
          //                                 "PRD_DESC": "Emoji"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240012",
          //                                 "PRD_DESC": "Empty Bowls"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240013",
          //                                 "PRD_DESC": "Fairies & Gnomes"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240014",
          //                                 "PRD_DESC": "Farm To Table"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240015",
          //                                 "PRD_DESC": "Fundraising"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240016",
          //                                 "PRD_DESC": "Harry Potter"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240017",
          //                                 "PRD_DESC": "Pop Art"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240018",
          //                                 "PRD_DESC": "Pottery For The Planet"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240019",
          //                                 "PRD_DESC": "Robots"
          //                             },
          //                             {
          //                                 "CODE": "WBIS240020",
          //                                 "PRD_DESC": "Shark Week"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "WBIS250",
          //                     "PRD_DESC": "Tiles & Plaques",
          //                     "XTILE45": {
          //                         "CODE": "XTILE45",
          //                         "PRD_DESC": "Coaster, Palette Tray + Tile Accessories"
          //                     },
          //                     "XTILE30": {
          //                         "CODE": "XTILE30",
          //                         "PRD_DESC": "Switch & Outlet Covers"
          //                     },
          //                     "XTILE10": {
          //                         "CODE": "XTILE10",
          //                         "PRD_DESC": "Tiles Plain"
          //                     },
          //                     "XTILE15": {
          //                         "CODE": "XTILE15",
          //                         "PRD_DESC": "Tiles & Coasters Embossed"
          //                     },
          //                     "XTILE46": {
          //                         "CODE": "XTILE46",
          //                         "PRD_DESC": "Trivets"
          //                     },
          //                     "XTILE50": {
          //                         "CODE": "XTILE50",
          //                         "PRD_DESC": "Wall Plaques"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "XTILE45",
          //                                 "PRD_DESC": "Coaster, Palette Tray + Tile Accessories"
          //                             },
          //                             {
          //                                 "CODE": "XTILE30",
          //                                 "PRD_DESC": "Switch & Outlet Covers"
          //                             },
          //                             {
          //                                 "CODE": "XTILE10",
          //                                 "PRD_DESC": "Tiles Plain"
          //                             },
          //                             {
          //                                 "CODE": "XTILE15",
          //                                 "PRD_DESC": "Tiles & Coasters Embossed"
          //                             },
          //                             {
          //                                 "CODE": "XTILE46",
          //                                 "PRD_DESC": "Trivets"
          //                             },
          //                             {
          //                                 "CODE": "XTILE50",
          //                                 "PRD_DESC": "Wall Plaques"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "XSTONE",
          //                     "PRD_DESC": "Stoneware"
          //                 }
          //             ]
          //         ]
          //     },
          //     "PAINTS": {
          //         "CODE": "PAINTS",
          //         "PRD_DESC": "Paints/Glazes",
          //         "MAYPAINT": {
          //             "CODE": "MAYPAINT",
          //             "PRD_DESC": "Mayco",
          //             "MAYLIT": {
          //                 "CODE": "MAYLIT",
          //                 "PRD_DESC": "Mayco Literature & Fired Charts"
          //             },
          //             "MAYFICHIP": {
          //                 "CODE": "MAYFICHIP",
          //                 "PRD_DESC": "Mayco Tile Charts"
          //             },
          //             "MAYFI": {
          //                 "CODE": "MAYFI",
          //                 "PRD_DESC": "Fired",
          //                 "MAYLF": {
          //                     "CODE": "MAYLF",
          //                     "PRD_DESC": "Cone 04-06 Glazes",
          //                     "MAYFIAC": {
          //                         "CODE": "MAYFIAC",
          //                         "PRD_DESC": "Accessories"
          //                     },
          //                     "MAYFIAS4": {
          //                         "CODE": "MAYFIAS4",
          //                         "PRD_DESC": "Astro Gem, 4oz."
          //                     },
          //                     "MAYFICLBR": {
          //                         "CODE": "MAYFICLBR",
          //                         "PRD_DESC": "Clear Brushing"
          //                     },
          //                     "MAYFIDI": {
          //                         "CODE": "MAYFIDI",
          //                         "PRD_DESC": "Clear Dipping"
          //                     },
          //                     "MAYFICC5": {
          //                         "CODE": "MAYFICC5",
          //                         "PRD_DESC": "Classic Crackles"
          //                     },
          //                     "MAYFIDL1": {
          //                         "CODE": "MAYFIDL1",
          //                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                     },
          //                     "MAYFIEL5": {
          //                         "CODE": "MAYFIEL5",
          //                         "PRD_DESC": "Elements"
          //                     },
          //                     "MAYFIFN5": {
          //                         "CODE": "MAYFIFN5",
          //                         "PRD_DESC": "Foundations Opaques"
          //                     },
          //                     "MAYFIFN52": {
          //                         "CODE": "MAYFIFN52",
          //                         "PRD_DESC": "Foundations Matte"
          //                     },
          //                     "MAYFIFN51": {
          //                         "CODE": "MAYFIFN51",
          //                         "PRD_DESC": "Foundations Sheer"
          //                     },
          //                     "MAYFIJG5": {
          //                         "CODE": "MAYFIJG5",
          //                         "PRD_DESC": "Jungle Gems"
          //                     },
          //                     "MAYFIPCA5": {
          //                         "CODE": "MAYFIPCA5",
          //                         "PRD_DESC": "Pottery Cascades"
          //                     },
          //                     "MAYHFRK5": {
          //                         "CODE": "MAYHFRK5",
          //                         "PRD_DESC": "Raku Glazes, Pints"
          //                     },
          //                     "MAYFISG4": {
          //                         "CODE": "MAYFISG4",
          //                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                     },
          //                     "MAYFISC8": {
          //                         "CODE": "MAYFISC8",
          //                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                     },
          //                     "MAYFISC5": {
          //                         "CODE": "MAYFISC5",
          //                         "PRD_DESC": "Stroke N Coat, Pints"
          //                     },
          //                     "MAYFISCG": {
          //                         "CODE": "MAYFISCG",
          //                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                     },
          //                     "MAYFISP8": {
          //                         "CODE": "MAYFISP8",
          //                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                     },
          //                     "MAYFISP5": {
          //                         "CODE": "MAYFISP5",
          //                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                     },
          //                     "MAYFIUG5": {
          //                         "CODE": "MAYFIUG5",
          //                         "PRD_DESC": "Underglazes, Pints"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "MAYFIAC",
          //                                 "PRD_DESC": "Accessories"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIAS4",
          //                                 "PRD_DESC": "Astro Gem, 4oz."
          //                             },
          //                             {
          //                                 "CODE": "MAYFICLBR",
          //                                 "PRD_DESC": "Clear Brushing"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIDI",
          //                                 "PRD_DESC": "Clear Dipping"
          //                             },
          //                             {
          //                                 "CODE": "MAYFICC5",
          //                                 "PRD_DESC": "Classic Crackles"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIDL1",
          //                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                             },
          //                             {
          //                                 "CODE": "MAYFIEL5",
          //                                 "PRD_DESC": "Elements"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIFN5",
          //                                 "PRD_DESC": "Foundations Opaques"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIFN52",
          //                                 "PRD_DESC": "Foundations Matte"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIFN51",
          //                                 "PRD_DESC": "Foundations Sheer"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIJG5",
          //                                 "PRD_DESC": "Jungle Gems"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIPCA5",
          //                                 "PRD_DESC": "Pottery Cascades"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFRK5",
          //                                 "PRD_DESC": "Raku Glazes, Pints"
          //                             },
          //                             {
          //                                 "CODE": "MAYFISG4",
          //                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                             },
          //                             {
          //                                 "CODE": "MAYFISC8",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             {
          //                                 "CODE": "MAYFISC5",
          //                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                             },
          //                             {
          //                                 "CODE": "MAYFISCG",
          //                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                             },
          //                             {
          //                                 "CODE": "MAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             {
          //                                 "CODE": "MAYFISP5",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                             },
          //                             {
          //                                 "CODE": "MAYFIUG5",
          //                                 "PRD_DESC": "Underglazes, Pints"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 "MAYHF": {
          //                     "CODE": "MAYHF",
          //                     "PRD_DESC": "Cone 5-6 Glazes",
          //                     "WMAYHFFN": {
          //                         "CODE": "WMAYHFFN",
          //                         "PRD_DESC": "Foundations"
          //                     },
          //                     "MAYHFSCL": {
          //                         "CODE": "MAYHFSCL",
          //                         "PRD_DESC": "Stoneware Classics"
          //                     },
          //                     "MAYHFSCLEA": {
          //                         "CODE": "MAYHFSCLEA",
          //                         "PRD_DESC": "Stoneware Clear"
          //                     },
          //                     "MAYHFCRYST": {
          //                         "CODE": "MAYHFCRYST",
          //                         "PRD_DESC": "Stoneware Crystal"
          //                     },
          //                     "MAYHFSD10": {
          //                         "CODE": "MAYHFSD10",
          //                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                     },
          //                     "MAYHFGLOSS": {
          //                         "CODE": "MAYHFGLOSS",
          //                         "PRD_DESC": "Stoneware Gloss"
          //                     },
          //                     "MAYHFMATT": {
          //                         "CODE": "MAYHFMATT",
          //                         "PRD_DESC": "Stoneware Matte"
          //                     },
          //                     "MAYHFSPEC": {
          //                         "CODE": "MAYHFSPEC",
          //                         "PRD_DESC": "Stoneware Specialty"
          //                     },
          //                     "MAYHFSW4": {
          //                         "CODE": "MAYHFSW4",
          //                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                     },
          //                     "WMAYHFSC": {
          //                         "CODE": "WMAYHFSC",
          //                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                     },
          //                     "WMAYFISP8": {
          //                         "CODE": "WMAYFISP8",
          //                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                     },
          //                     "WMAYWAX": {
          //                         "CODE": "WMAYWAX",
          //                         "PRD_DESC": "Wax Resist"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "WMAYHFFN",
          //                                 "PRD_DESC": "Foundations"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFSCL",
          //                                 "PRD_DESC": "Stoneware Classics"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFSCLEA",
          //                                 "PRD_DESC": "Stoneware Clear"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFCRYST",
          //                                 "PRD_DESC": "Stoneware Crystal"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFSD10",
          //                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFGLOSS",
          //                                 "PRD_DESC": "Stoneware Gloss"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFMATT",
          //                                 "PRD_DESC": "Stoneware Matte"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFSPEC",
          //                                 "PRD_DESC": "Stoneware Specialty"
          //                             },
          //                             {
          //                                 "CODE": "MAYHFSW4",
          //                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                             },
          //                             {
          //                                 "CODE": "WMAYHFSC",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             {
          //                                 "CODE": "WMAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             {
          //                                 "CODE": "WMAYWAX",
          //                                 "PRD_DESC": "Wax Resist"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "MAYLF",
          //                             "PRD_DESC": "Cone 04-06 Glazes",
          //                             "MAYFIAC": {
          //                                 "CODE": "MAYFIAC",
          //                                 "PRD_DESC": "Accessories"
          //                             },
          //                             "MAYFIAS4": {
          //                                 "CODE": "MAYFIAS4",
          //                                 "PRD_DESC": "Astro Gem, 4oz."
          //                             },
          //                             "MAYFICLBR": {
          //                                 "CODE": "MAYFICLBR",
          //                                 "PRD_DESC": "Clear Brushing"
          //                             },
          //                             "MAYFIDI": {
          //                                 "CODE": "MAYFIDI",
          //                                 "PRD_DESC": "Clear Dipping"
          //                             },
          //                             "MAYFICC5": {
          //                                 "CODE": "MAYFICC5",
          //                                 "PRD_DESC": "Classic Crackles"
          //                             },
          //                             "MAYFIDL1": {
          //                                 "CODE": "MAYFIDL1",
          //                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                             },
          //                             "MAYFIEL5": {
          //                                 "CODE": "MAYFIEL5",
          //                                 "PRD_DESC": "Elements"
          //                             },
          //                             "MAYFIFN5": {
          //                                 "CODE": "MAYFIFN5",
          //                                 "PRD_DESC": "Foundations Opaques"
          //                             },
          //                             "MAYFIFN52": {
          //                                 "CODE": "MAYFIFN52",
          //                                 "PRD_DESC": "Foundations Matte"
          //                             },
          //                             "MAYFIFN51": {
          //                                 "CODE": "MAYFIFN51",
          //                                 "PRD_DESC": "Foundations Sheer"
          //                             },
          //                             "MAYFIJG5": {
          //                                 "CODE": "MAYFIJG5",
          //                                 "PRD_DESC": "Jungle Gems"
          //                             },
          //                             "MAYFIPCA5": {
          //                                 "CODE": "MAYFIPCA5",
          //                                 "PRD_DESC": "Pottery Cascades"
          //                             },
          //                             "MAYHFRK5": {
          //                                 "CODE": "MAYHFRK5",
          //                                 "PRD_DESC": "Raku Glazes, Pints"
          //                             },
          //                             "MAYFISG4": {
          //                                 "CODE": "MAYFISG4",
          //                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                             },
          //                             "MAYFISC8": {
          //                                 "CODE": "MAYFISC8",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "MAYFISC5": {
          //                                 "CODE": "MAYFISC5",
          //                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                             },
          //                             "MAYFISCG": {
          //                                 "CODE": "MAYFISCG",
          //                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                             },
          //                             "MAYFISP8": {
          //                                 "CODE": "MAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "MAYFISP5": {
          //                                 "CODE": "MAYFISP5",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                             },
          //                             "MAYFIUG5": {
          //                                 "CODE": "MAYFIUG5",
          //                                 "PRD_DESC": "Underglazes, Pints"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     }
          //                                 ]
          //                             ]
          //                         },
          //                         {
          //                             "CODE": "MAYHF",
          //                             "PRD_DESC": "Cone 5-6 Glazes",
          //                             "WMAYHFFN": {
          //                                 "CODE": "WMAYHFFN",
          //                                 "PRD_DESC": "Foundations"
          //                             },
          //                             "MAYHFSCL": {
          //                                 "CODE": "MAYHFSCL",
          //                                 "PRD_DESC": "Stoneware Classics"
          //                             },
          //                             "MAYHFSCLEA": {
          //                                 "CODE": "MAYHFSCLEA",
          //                                 "PRD_DESC": "Stoneware Clear"
          //                             },
          //                             "MAYHFCRYST": {
          //                                 "CODE": "MAYHFCRYST",
          //                                 "PRD_DESC": "Stoneware Crystal"
          //                             },
          //                             "MAYHFSD10": {
          //                                 "CODE": "MAYHFSD10",
          //                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                             },
          //                             "MAYHFGLOSS": {
          //                                 "CODE": "MAYHFGLOSS",
          //                                 "PRD_DESC": "Stoneware Gloss"
          //                             },
          //                             "MAYHFMATT": {
          //                                 "CODE": "MAYHFMATT",
          //                                 "PRD_DESC": "Stoneware Matte"
          //                             },
          //                             "MAYHFSPEC": {
          //                                 "CODE": "MAYHFSPEC",
          //                                 "PRD_DESC": "Stoneware Specialty"
          //                             },
          //                             "MAYHFSW4": {
          //                                 "CODE": "MAYHFSW4",
          //                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                             },
          //                             "WMAYHFSC": {
          //                                 "CODE": "WMAYHFSC",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "WMAYFISP8": {
          //                                 "CODE": "WMAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "WMAYWAX": {
          //                                 "CODE": "WMAYWAX",
          //                                 "PRD_DESC": "Wax Resist"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     }
          //                                 ]
          //                             ]
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "MAYNF": {
          //                 "CODE": "MAYNF",
          //                 "PRD_DESC": "Non-Fired",
          //                 "MAYNFSEAL": {
          //                     "CODE": "MAYNFSEAL",
          //                     "PRD_DESC": "Brush On Sealers"
          //                 },
          //                 "MAYNFDM2": {
          //                     "CODE": "MAYNFDM2",
          //                     "PRD_DESC": "Dazzling Metallics, 2oz."
          //                 },
          //                 "MAYNFMM2": {
          //                     "CODE": "MAYNFMM2",
          //                     "PRD_DESC": "Magic Metallics"
          //                 },
          //                 "MAYNFSNOW": {
          //                     "CODE": "MAYNFSNOW",
          //                     "PRD_DESC": "No Fire Snow"
          //                 },
          //                 "MAYNFSS2": {
          //                     "CODE": "MAYNFSS2",
          //                     "PRD_DESC": "Softee Arcylic Stains"
          //                 },
          //                 "MAYNFSP2": {
          //                     "CODE": "MAYNFSP2",
          //                     "PRD_DESC": "Softee Pearls"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "MAYNFSEAL",
          //                             "PRD_DESC": "Brush On Sealers"
          //                         },
          //                         {
          //                             "CODE": "MAYNFDM2",
          //                             "PRD_DESC": "Dazzling Metallics, 2oz."
          //                         },
          //                         {
          //                             "CODE": "MAYNFMM2",
          //                             "PRD_DESC": "Magic Metallics"
          //                         },
          //                         {
          //                             "CODE": "MAYNFSNOW",
          //                             "PRD_DESC": "No Fire Snow"
          //                         },
          //                         {
          //                             "CODE": "MAYNFSS2",
          //                             "PRD_DESC": "Softee Arcylic Stains"
          //                         },
          //                         {
          //                             "CODE": "MAYNFSP2",
          //                             "PRD_DESC": "Softee Pearls"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "MAYLIT",
          //                         "PRD_DESC": "Mayco Literature & Fired Charts"
          //                     },
          //                     {
          //                         "CODE": "MAYFICHIP",
          //                         "PRD_DESC": "Mayco Tile Charts"
          //                     },
          //                     {
          //                         "CODE": "MAYFI",
          //                         "PRD_DESC": "Fired",
          //                         "MAYLF": {
          //                             "CODE": "MAYLF",
          //                             "PRD_DESC": "Cone 04-06 Glazes",
          //                             "MAYFIAC": {
          //                                 "CODE": "MAYFIAC",
          //                                 "PRD_DESC": "Accessories"
          //                             },
          //                             "MAYFIAS4": {
          //                                 "CODE": "MAYFIAS4",
          //                                 "PRD_DESC": "Astro Gem, 4oz."
          //                             },
          //                             "MAYFICLBR": {
          //                                 "CODE": "MAYFICLBR",
          //                                 "PRD_DESC": "Clear Brushing"
          //                             },
          //                             "MAYFIDI": {
          //                                 "CODE": "MAYFIDI",
          //                                 "PRD_DESC": "Clear Dipping"
          //                             },
          //                             "MAYFICC5": {
          //                                 "CODE": "MAYFICC5",
          //                                 "PRD_DESC": "Classic Crackles"
          //                             },
          //                             "MAYFIDL1": {
          //                                 "CODE": "MAYFIDL1",
          //                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                             },
          //                             "MAYFIEL5": {
          //                                 "CODE": "MAYFIEL5",
          //                                 "PRD_DESC": "Elements"
          //                             },
          //                             "MAYFIFN5": {
          //                                 "CODE": "MAYFIFN5",
          //                                 "PRD_DESC": "Foundations Opaques"
          //                             },
          //                             "MAYFIFN52": {
          //                                 "CODE": "MAYFIFN52",
          //                                 "PRD_DESC": "Foundations Matte"
          //                             },
          //                             "MAYFIFN51": {
          //                                 "CODE": "MAYFIFN51",
          //                                 "PRD_DESC": "Foundations Sheer"
          //                             },
          //                             "MAYFIJG5": {
          //                                 "CODE": "MAYFIJG5",
          //                                 "PRD_DESC": "Jungle Gems"
          //                             },
          //                             "MAYFIPCA5": {
          //                                 "CODE": "MAYFIPCA5",
          //                                 "PRD_DESC": "Pottery Cascades"
          //                             },
          //                             "MAYHFRK5": {
          //                                 "CODE": "MAYHFRK5",
          //                                 "PRD_DESC": "Raku Glazes, Pints"
          //                             },
          //                             "MAYFISG4": {
          //                                 "CODE": "MAYFISG4",
          //                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                             },
          //                             "MAYFISC8": {
          //                                 "CODE": "MAYFISC8",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "MAYFISC5": {
          //                                 "CODE": "MAYFISC5",
          //                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                             },
          //                             "MAYFISCG": {
          //                                 "CODE": "MAYFISCG",
          //                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                             },
          //                             "MAYFISP8": {
          //                                 "CODE": "MAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "MAYFISP5": {
          //                                 "CODE": "MAYFISP5",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                             },
          //                             "MAYFIUG5": {
          //                                 "CODE": "MAYFIUG5",
          //                                 "PRD_DESC": "Underglazes, Pints"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     }
          //                                 ]
          //                             ]
          //                         },
          //                         "MAYHF": {
          //                             "CODE": "MAYHF",
          //                             "PRD_DESC": "Cone 5-6 Glazes",
          //                             "WMAYHFFN": {
          //                                 "CODE": "WMAYHFFN",
          //                                 "PRD_DESC": "Foundations"
          //                             },
          //                             "MAYHFSCL": {
          //                                 "CODE": "MAYHFSCL",
          //                                 "PRD_DESC": "Stoneware Classics"
          //                             },
          //                             "MAYHFSCLEA": {
          //                                 "CODE": "MAYHFSCLEA",
          //                                 "PRD_DESC": "Stoneware Clear"
          //                             },
          //                             "MAYHFCRYST": {
          //                                 "CODE": "MAYHFCRYST",
          //                                 "PRD_DESC": "Stoneware Crystal"
          //                             },
          //                             "MAYHFSD10": {
          //                                 "CODE": "MAYHFSD10",
          //                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                             },
          //                             "MAYHFGLOSS": {
          //                                 "CODE": "MAYHFGLOSS",
          //                                 "PRD_DESC": "Stoneware Gloss"
          //                             },
          //                             "MAYHFMATT": {
          //                                 "CODE": "MAYHFMATT",
          //                                 "PRD_DESC": "Stoneware Matte"
          //                             },
          //                             "MAYHFSPEC": {
          //                                 "CODE": "MAYHFSPEC",
          //                                 "PRD_DESC": "Stoneware Specialty"
          //                             },
          //                             "MAYHFSW4": {
          //                                 "CODE": "MAYHFSW4",
          //                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                             },
          //                             "WMAYHFSC": {
          //                                 "CODE": "WMAYHFSC",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "WMAYFISP8": {
          //                                 "CODE": "WMAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "WMAYWAX": {
          //                                 "CODE": "WMAYWAX",
          //                                 "PRD_DESC": "Wax Resist"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     }
          //                                 ]
          //                             ]
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "MAYLF",
          //                                     "PRD_DESC": "Cone 04-06 Glazes",
          //                                     "MAYFIAC": {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     "MAYFIAS4": {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     "MAYFICLBR": {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     "MAYFIDI": {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     "MAYFICC5": {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     "MAYFIDL1": {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     "MAYFIEL5": {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     "MAYFIFN5": {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     "MAYFIFN52": {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     "MAYFIFN51": {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     "MAYFIJG5": {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     "MAYFIPCA5": {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     "MAYHFRK5": {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     "MAYFISG4": {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     "MAYFISC8": {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "MAYFISC5": {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     "MAYFISCG": {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     "MAYFISP8": {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "MAYFISP5": {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     "MAYFIUG5": {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "MAYFIAC",
          //                                                 "PRD_DESC": "Accessories"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIAS4",
          //                                                 "PRD_DESC": "Astro Gem, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICLBR",
          //                                                 "PRD_DESC": "Clear Brushing"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDI",
          //                                                 "PRD_DESC": "Clear Dipping"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICC5",
          //                                                 "PRD_DESC": "Classic Crackles"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDL1",
          //                                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIEL5",
          //                                                 "PRD_DESC": "Elements"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN5",
          //                                                 "PRD_DESC": "Foundations Opaques"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN52",
          //                                                 "PRD_DESC": "Foundations Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN51",
          //                                                 "PRD_DESC": "Foundations Sheer"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIJG5",
          //                                                 "PRD_DESC": "Jungle Gems"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIPCA5",
          //                                                 "PRD_DESC": "Pottery Cascades"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFRK5",
          //                                                 "PRD_DESC": "Raku Glazes, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISG4",
          //                                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC8",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC5",
          //                                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISCG",
          //                                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP5",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIUG5",
          //                                                 "PRD_DESC": "Underglazes, Pints"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 },
          //                                 {
          //                                     "CODE": "MAYHF",
          //                                     "PRD_DESC": "Cone 5-6 Glazes",
          //                                     "WMAYHFFN": {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     "MAYHFSCL": {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     "MAYHFSCLEA": {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     "MAYHFCRYST": {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     "MAYHFSD10": {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     "MAYHFGLOSS": {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     "MAYHFMATT": {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     "MAYHFSPEC": {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     "MAYHFSW4": {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     "WMAYHFSC": {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "WMAYFISP8": {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "WMAYWAX": {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "WMAYHFFN",
          //                                                 "PRD_DESC": "Foundations"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCL",
          //                                                 "PRD_DESC": "Stoneware Classics"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCLEA",
          //                                                 "PRD_DESC": "Stoneware Clear"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFCRYST",
          //                                                 "PRD_DESC": "Stoneware Crystal"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSD10",
          //                                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFGLOSS",
          //                                                 "PRD_DESC": "Stoneware Gloss"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFMATT",
          //                                                 "PRD_DESC": "Stoneware Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSPEC",
          //                                                 "PRD_DESC": "Stoneware Specialty"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSW4",
          //                                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYHFSC",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYWAX",
          //                                                 "PRD_DESC": "Wax Resist"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "MAYNF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "MAYNFSEAL": {
          //                             "CODE": "MAYNFSEAL",
          //                             "PRD_DESC": "Brush On Sealers"
          //                         },
          //                         "MAYNFDM2": {
          //                             "CODE": "MAYNFDM2",
          //                             "PRD_DESC": "Dazzling Metallics, 2oz."
          //                         },
          //                         "MAYNFMM2": {
          //                             "CODE": "MAYNFMM2",
          //                             "PRD_DESC": "Magic Metallics"
          //                         },
          //                         "MAYNFSNOW": {
          //                             "CODE": "MAYNFSNOW",
          //                             "PRD_DESC": "No Fire Snow"
          //                         },
          //                         "MAYNFSS2": {
          //                             "CODE": "MAYNFSS2",
          //                             "PRD_DESC": "Softee Arcylic Stains"
          //                         },
          //                         "MAYNFSP2": {
          //                             "CODE": "MAYNFSP2",
          //                             "PRD_DESC": "Softee Pearls"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "MAYNFSEAL",
          //                                     "PRD_DESC": "Brush On Sealers"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFDM2",
          //                                     "PRD_DESC": "Dazzling Metallics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFMM2",
          //                                     "PRD_DESC": "Magic Metallics"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSNOW",
          //                                     "PRD_DESC": "No Fire Snow"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSS2",
          //                                     "PRD_DESC": "Softee Arcylic Stains"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSP2",
          //                                     "PRD_DESC": "Softee Pearls"
          //                                 }
          //                             ]
          //                         ]
          //                     }
          //                 ]
          //             ]
          //         },
          //         "GAREPAINT": {
          //             "CODE": "GAREPAINT",
          //             "PRD_DESC": "Gare",
          //             "GARELF": {
          //                 "CODE": "GARELF",
          //                 "PRD_DESC": "Cone 04-06 Glazes",
          //                 "GARFIBD2": {
          //                     "CODE": "GARFIBD2",
          //                     "PRD_DESC": "Bumpy Doodles, 2oz."
          //                 },
          //                 "GARFICLBR": {
          //                     "CODE": "GARFICLBR",
          //                     "PRD_DESC": "Clear Brushing"
          //                 },
          //                 "GARFIGL7": {
          //                     "CODE": "GARFIGL7",
          //                     "PRD_DESC": "Clear Dipping"
          //                 },
          //                 "GARFIFSF5": {
          //                     "CODE": "GARFIFSF5",
          //                     "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                 },
          //                 "GARFIFS5": {
          //                     "CODE": "GARFIFS5",
          //                     "PRD_DESC": "Funstroke Underglazes, Pints"
          //                 },
          //                 "GARFIPG5": {
          //                     "CODE": "GARFIPG5",
          //                     "PRD_DESC": "Pottery Glazes, Pints"
          //                 },
          //                 "GARFISP5": {
          //                     "CODE": "GARFISP5",
          //                     "PRD_DESC": "Specialty Glazes"
          //                 },
          //                 "GAFFISC": {
          //                     "CODE": "GAFFISC",
          //                     "PRD_DESC": "Surface Coats, Pints"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "GARFIBD2",
          //                             "PRD_DESC": "Bumpy Doodles, 2oz."
          //                         },
          //                         {
          //                             "CODE": "GARFICLBR",
          //                             "PRD_DESC": "Clear Brushing"
          //                         },
          //                         {
          //                             "CODE": "GARFIGL7",
          //                             "PRD_DESC": "Clear Dipping"
          //                         },
          //                         {
          //                             "CODE": "GARFIFSF5",
          //                             "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                         },
          //                         {
          //                             "CODE": "GARFIFS5",
          //                             "PRD_DESC": "Funstroke Underglazes, Pints"
          //                         },
          //                         {
          //                             "CODE": "GARFIPG5",
          //                             "PRD_DESC": "Pottery Glazes, Pints"
          //                         },
          //                         {
          //                             "CODE": "GARFISP5",
          //                             "PRD_DESC": "Specialty Glazes"
          //                         },
          //                         {
          //                             "CODE": "GAFFISC",
          //                             "PRD_DESC": "Surface Coats, Pints"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "GARENF": {
          //                 "CODE": "GARENF",
          //                 "PRD_DESC": "Non-Fired",
          //                 "GARNFPP5": {
          //                     "CODE": "GARNFPP5",
          //                     "PRD_DESC": "Party Paint Acrylics, Pints"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "GARNFPP5",
          //                             "PRD_DESC": "Party Paint Acrylics, Pints"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "GARELF",
          //                         "PRD_DESC": "Cone 04-06 Glazes",
          //                         "GARFIBD2": {
          //                             "CODE": "GARFIBD2",
          //                             "PRD_DESC": "Bumpy Doodles, 2oz."
          //                         },
          //                         "GARFICLBR": {
          //                             "CODE": "GARFICLBR",
          //                             "PRD_DESC": "Clear Brushing"
          //                         },
          //                         "GARFIGL7": {
          //                             "CODE": "GARFIGL7",
          //                             "PRD_DESC": "Clear Dipping"
          //                         },
          //                         "GARFIFSF5": {
          //                             "CODE": "GARFIFSF5",
          //                             "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                         },
          //                         "GARFIFS5": {
          //                             "CODE": "GARFIFS5",
          //                             "PRD_DESC": "Funstroke Underglazes, Pints"
          //                         },
          //                         "GARFIPG5": {
          //                             "CODE": "GARFIPG5",
          //                             "PRD_DESC": "Pottery Glazes, Pints"
          //                         },
          //                         "GARFISP5": {
          //                             "CODE": "GARFISP5",
          //                             "PRD_DESC": "Specialty Glazes"
          //                         },
          //                         "GAFFISC": {
          //                             "CODE": "GAFFISC",
          //                             "PRD_DESC": "Surface Coats, Pints"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GARFIBD2",
          //                                     "PRD_DESC": "Bumpy Doodles, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GARFICLBR",
          //                                     "PRD_DESC": "Clear Brushing"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIGL7",
          //                                     "PRD_DESC": "Clear Dipping"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIFSF5",
          //                                     "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIFS5",
          //                                     "PRD_DESC": "Funstroke Underglazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIPG5",
          //                                     "PRD_DESC": "Pottery Glazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFISP5",
          //                                     "PRD_DESC": "Specialty Glazes"
          //                                 },
          //                                 {
          //                                     "CODE": "GAFFISC",
          //                                     "PRD_DESC": "Surface Coats, Pints"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "GARENF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "GARNFPP5": {
          //                             "CODE": "GARNFPP5",
          //                             "PRD_DESC": "Party Paint Acrylics, Pints"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GARNFPP5",
          //                                     "PRD_DESC": "Party Paint Acrylics, Pints"
          //                                 }
          //                             ]
          //                         ]
          //                     }
          //                 ]
          //             ]
          //         },
          //         "DUNPAINT": {
          //             "CODE": "DUNPAINT",
          //             "PRD_DESC": "Duncan",
          //             "DUNFI": {
          //                 "CODE": "DUNFI",
          //                 "PRD_DESC": "Fired",
          //                 "DUNFICLBR": {
          //                     "CODE": "DUNFICLBR",
          //                     "PRD_DESC": "Clear Brushing Glaze"
          //                 },
          //                 "DUNFIPBD35": {
          //                     "CODE": "DUNFIPBD35",
          //                     "PRD_DESC": "Pure Brilliance"
          //                 },
          //                 "DUNFICN8": {
          //                     "CODE": "DUNFICN8",
          //                     "PRD_DESC": "Concepts, 8oz."
          //                 },
          //                 "DUNFIIN5": {
          //                     "CODE": "DUNFIIN5",
          //                     "PRD_DESC": "Envision Glazes"
          //                 },
          //                 "DUNFIEZ1": {
          //                     "CODE": "DUNFIEZ1",
          //                     "PRD_DESC": "EZ Strokes, 1oz."
          //                 },
          //                 "DUNFIFD1": {
          //                     "CODE": "DUNFIFD1",
          //                     "PRD_DESC": "French Dimensions, 1oz."
          //                 },
          //                 "DUNFIOG": {
          //                     "CODE": "DUNFIOG",
          //                     "PRD_DESC": "Overglazes and Accessories"
          //                 },
          //                 "DUNFISY": {
          //                     "CODE": "DUNFISY",
          //                     "PRD_DESC": "Specialty Fired Products"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "DUNFICLBR",
          //                             "PRD_DESC": "Clear Brushing Glaze"
          //                         },
          //                         {
          //                             "CODE": "DUNFIPBD35",
          //                             "PRD_DESC": "Pure Brilliance"
          //                         },
          //                         {
          //                             "CODE": "DUNFICN8",
          //                             "PRD_DESC": "Concepts, 8oz."
          //                         },
          //                         {
          //                             "CODE": "DUNFIIN5",
          //                             "PRD_DESC": "Envision Glazes"
          //                         },
          //                         {
          //                             "CODE": "DUNFIEZ1",
          //                             "PRD_DESC": "EZ Strokes, 1oz."
          //                         },
          //                         {
          //                             "CODE": "DUNFIFD1",
          //                             "PRD_DESC": "French Dimensions, 1oz."
          //                         },
          //                         {
          //                             "CODE": "DUNFIOG",
          //                             "PRD_DESC": "Overglazes and Accessories"
          //                         },
          //                         {
          //                             "CODE": "DUNFISY",
          //                             "PRD_DESC": "Specialty Fired Products"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "DUNNF": {
          //                 "CODE": "DUNNF",
          //                 "PRD_DESC": "Non-Fired",
          //                 "DUNNFOS2": {
          //                     "CODE": "DUNNFOS2",
          //                     "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                 },
          //                 "DUNNFSG2": {
          //                     "CODE": "DUNNFSG2",
          //                     "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                 },
          //                 "DUNNFAS": {
          //                     "CODE": "DUNNFAS",
          //                     "PRD_DESC": "\"AS\" Specialty Products"
          //                 },
          //                 "DUNNFUM2": {
          //                     "CODE": "DUNNFUM2",
          //                     "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                 },
          //                 "DUNNFSP": {
          //                     "CODE": "DUNNFSP",
          //                     "PRD_DESC": "\"SS\" Duncan Sprays"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "DUNNFOS2",
          //                             "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                         },
          //                         {
          //                             "CODE": "DUNNFSG2",
          //                             "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                         },
          //                         {
          //                             "CODE": "DUNNFAS",
          //                             "PRD_DESC": "\"AS\" Specialty Products"
          //                         },
          //                         {
          //                             "CODE": "DUNNFUM2",
          //                             "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                         },
          //                         {
          //                             "CODE": "DUNNFSP",
          //                             "PRD_DESC": "\"SS\" Duncan Sprays"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "DUNFI",
          //                         "PRD_DESC": "Fired",
          //                         "DUNFICLBR": {
          //                             "CODE": "DUNFICLBR",
          //                             "PRD_DESC": "Clear Brushing Glaze"
          //                         },
          //                         "DUNFIPBD35": {
          //                             "CODE": "DUNFIPBD35",
          //                             "PRD_DESC": "Pure Brilliance"
          //                         },
          //                         "DUNFICN8": {
          //                             "CODE": "DUNFICN8",
          //                             "PRD_DESC": "Concepts, 8oz."
          //                         },
          //                         "DUNFIIN5": {
          //                             "CODE": "DUNFIIN5",
          //                             "PRD_DESC": "Envision Glazes"
          //                         },
          //                         "DUNFIEZ1": {
          //                             "CODE": "DUNFIEZ1",
          //                             "PRD_DESC": "EZ Strokes, 1oz."
          //                         },
          //                         "DUNFIFD1": {
          //                             "CODE": "DUNFIFD1",
          //                             "PRD_DESC": "French Dimensions, 1oz."
          //                         },
          //                         "DUNFIOG": {
          //                             "CODE": "DUNFIOG",
          //                             "PRD_DESC": "Overglazes and Accessories"
          //                         },
          //                         "DUNFISY": {
          //                             "CODE": "DUNFISY",
          //                             "PRD_DESC": "Specialty Fired Products"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "DUNFICLBR",
          //                                     "PRD_DESC": "Clear Brushing Glaze"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIPBD35",
          //                                     "PRD_DESC": "Pure Brilliance"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFICN8",
          //                                     "PRD_DESC": "Concepts, 8oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIIN5",
          //                                     "PRD_DESC": "Envision Glazes"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIEZ1",
          //                                     "PRD_DESC": "EZ Strokes, 1oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIFD1",
          //                                     "PRD_DESC": "French Dimensions, 1oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIOG",
          //                                     "PRD_DESC": "Overglazes and Accessories"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFISY",
          //                                     "PRD_DESC": "Specialty Fired Products"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "DUNNF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "DUNNFOS2": {
          //                             "CODE": "DUNNFOS2",
          //                             "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                         },
          //                         "DUNNFSG2": {
          //                             "CODE": "DUNNFSG2",
          //                             "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                         },
          //                         "DUNNFAS": {
          //                             "CODE": "DUNNFAS",
          //                             "PRD_DESC": "\"AS\" Specialty Products"
          //                         },
          //                         "DUNNFUM2": {
          //                             "CODE": "DUNNFUM2",
          //                             "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                         },
          //                         "DUNNFSP": {
          //                             "CODE": "DUNNFSP",
          //                             "PRD_DESC": "\"SS\" Duncan Sprays"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "DUNNFOS2",
          //                                     "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFSG2",
          //                                     "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFAS",
          //                                     "PRD_DESC": "\"AS\" Specialty Products"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFUM2",
          //                                     "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFSP",
          //                                     "PRD_DESC": "\"SS\" Duncan Sprays"
          //                                 }
          //                             ]
          //                         ]
          //                     }
          //                 ]
          //             ]
          //         },
          //         "AMACOPAINT": {
          //             "CODE": "AMACOPAINT",
          //             "PRD_DESC": "Amaco Glazes & Underglazes",
          //             "AMACOLF": {
          //                 "CODE": "AMACOLF",
          //                 "PRD_DESC": "Cone 04-06",
          //                 "AMACO70": {
          //                     "CODE": "AMACO70",
          //                     "PRD_DESC": "Velvet Underglazes"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "AMACO70",
          //                             "PRD_DESC": "Velvet Underglazes"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "AMACOHIFI": {
          //                 "CODE": "AMACOHIFI",
          //                 "PRD_DESC": "High Fire Cone 5-10 Glazes",
          //                 "AMACO30": {
          //                     "CODE": "AMACO30",
          //                     "PRD_DESC": "Potter's Choice (PC)"
          //                 },
          //                 "AMACO10": {
          //                     "CODE": "AMACO10",
          //                     "PRD_DESC": "Celedons (C)"
          //                 },
          //                 "AMACO40": {
          //                     "CODE": "AMACO40",
          //                     "PRD_DESC": "Shino (SH)"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "AMACO30",
          //                             "PRD_DESC": "Potter's Choice (PC)"
          //                         },
          //                         {
          //                             "CODE": "AMACO10",
          //                             "PRD_DESC": "Celedons (C)"
          //                         },
          //                         {
          //                             "CODE": "AMACO40",
          //                             "PRD_DESC": "Shino (SH)"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "AMACOLF",
          //                         "PRD_DESC": "Cone 04-06",
          //                         "AMACO70": {
          //                             "CODE": "AMACO70",
          //                             "PRD_DESC": "Velvet Underglazes"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "AMACO70",
          //                                     "PRD_DESC": "Velvet Underglazes"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "AMACOHIFI",
          //                         "PRD_DESC": "High Fire Cone 5-10 Glazes",
          //                         "AMACO30": {
          //                             "CODE": "AMACO30",
          //                             "PRD_DESC": "Potter's Choice (PC)"
          //                         },
          //                         "AMACO10": {
          //                             "CODE": "AMACO10",
          //                             "PRD_DESC": "Celedons (C)"
          //                         },
          //                         "AMACO40": {
          //                             "CODE": "AMACO40",
          //                             "PRD_DESC": "Shino (SH)"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "AMACO30",
          //                                     "PRD_DESC": "Potter's Choice (PC)"
          //                                 },
          //                                 {
          //                                     "CODE": "AMACO10",
          //                                     "PRD_DESC": "Celedons (C)"
          //                                 },
          //                                 {
          //                                     "CODE": "AMACO40",
          //                                     "PRD_DESC": "Shino (SH)"
          //                                 }
          //                             ]
          //                         ]
          //                     }
          //                 ]
          //             ]
          //         },
          //         "FASHENHUES": {
          //             "CODE": "FASHENHUES",
          //             "PRD_DESC": "FashenHues"
          //         },
          //         "subMenu": [
          //             [
          //                 {
          //                     "CODE": "MAYPAINT",
          //                     "PRD_DESC": "Mayco",
          //                     "MAYLIT": {
          //                         "CODE": "MAYLIT",
          //                         "PRD_DESC": "Mayco Literature & Fired Charts"
          //                     },
          //                     "MAYFICHIP": {
          //                         "CODE": "MAYFICHIP",
          //                         "PRD_DESC": "Mayco Tile Charts"
          //                     },
          //                     "MAYFI": {
          //                         "CODE": "MAYFI",
          //                         "PRD_DESC": "Fired",
          //                         "MAYLF": {
          //                             "CODE": "MAYLF",
          //                             "PRD_DESC": "Cone 04-06 Glazes",
          //                             "MAYFIAC": {
          //                                 "CODE": "MAYFIAC",
          //                                 "PRD_DESC": "Accessories"
          //                             },
          //                             "MAYFIAS4": {
          //                                 "CODE": "MAYFIAS4",
          //                                 "PRD_DESC": "Astro Gem, 4oz."
          //                             },
          //                             "MAYFICLBR": {
          //                                 "CODE": "MAYFICLBR",
          //                                 "PRD_DESC": "Clear Brushing"
          //                             },
          //                             "MAYFIDI": {
          //                                 "CODE": "MAYFIDI",
          //                                 "PRD_DESC": "Clear Dipping"
          //                             },
          //                             "MAYFICC5": {
          //                                 "CODE": "MAYFICC5",
          //                                 "PRD_DESC": "Classic Crackles"
          //                             },
          //                             "MAYFIDL1": {
          //                                 "CODE": "MAYFIDL1",
          //                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                             },
          //                             "MAYFIEL5": {
          //                                 "CODE": "MAYFIEL5",
          //                                 "PRD_DESC": "Elements"
          //                             },
          //                             "MAYFIFN5": {
          //                                 "CODE": "MAYFIFN5",
          //                                 "PRD_DESC": "Foundations Opaques"
          //                             },
          //                             "MAYFIFN52": {
          //                                 "CODE": "MAYFIFN52",
          //                                 "PRD_DESC": "Foundations Matte"
          //                             },
          //                             "MAYFIFN51": {
          //                                 "CODE": "MAYFIFN51",
          //                                 "PRD_DESC": "Foundations Sheer"
          //                             },
          //                             "MAYFIJG5": {
          //                                 "CODE": "MAYFIJG5",
          //                                 "PRD_DESC": "Jungle Gems"
          //                             },
          //                             "MAYFIPCA5": {
          //                                 "CODE": "MAYFIPCA5",
          //                                 "PRD_DESC": "Pottery Cascades"
          //                             },
          //                             "MAYHFRK5": {
          //                                 "CODE": "MAYHFRK5",
          //                                 "PRD_DESC": "Raku Glazes, Pints"
          //                             },
          //                             "MAYFISG4": {
          //                                 "CODE": "MAYFISG4",
          //                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                             },
          //                             "MAYFISC8": {
          //                                 "CODE": "MAYFISC8",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "MAYFISC5": {
          //                                 "CODE": "MAYFISC5",
          //                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                             },
          //                             "MAYFISCG": {
          //                                 "CODE": "MAYFISCG",
          //                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                             },
          //                             "MAYFISP8": {
          //                                 "CODE": "MAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "MAYFISP5": {
          //                                 "CODE": "MAYFISP5",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                             },
          //                             "MAYFIUG5": {
          //                                 "CODE": "MAYFIUG5",
          //                                 "PRD_DESC": "Underglazes, Pints"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     }
          //                                 ]
          //                             ]
          //                         },
          //                         "MAYHF": {
          //                             "CODE": "MAYHF",
          //                             "PRD_DESC": "Cone 5-6 Glazes",
          //                             "WMAYHFFN": {
          //                                 "CODE": "WMAYHFFN",
          //                                 "PRD_DESC": "Foundations"
          //                             },
          //                             "MAYHFSCL": {
          //                                 "CODE": "MAYHFSCL",
          //                                 "PRD_DESC": "Stoneware Classics"
          //                             },
          //                             "MAYHFSCLEA": {
          //                                 "CODE": "MAYHFSCLEA",
          //                                 "PRD_DESC": "Stoneware Clear"
          //                             },
          //                             "MAYHFCRYST": {
          //                                 "CODE": "MAYHFCRYST",
          //                                 "PRD_DESC": "Stoneware Crystal"
          //                             },
          //                             "MAYHFSD10": {
          //                                 "CODE": "MAYHFSD10",
          //                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                             },
          //                             "MAYHFGLOSS": {
          //                                 "CODE": "MAYHFGLOSS",
          //                                 "PRD_DESC": "Stoneware Gloss"
          //                             },
          //                             "MAYHFMATT": {
          //                                 "CODE": "MAYHFMATT",
          //                                 "PRD_DESC": "Stoneware Matte"
          //                             },
          //                             "MAYHFSPEC": {
          //                                 "CODE": "MAYHFSPEC",
          //                                 "PRD_DESC": "Stoneware Specialty"
          //                             },
          //                             "MAYHFSW4": {
          //                                 "CODE": "MAYHFSW4",
          //                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                             },
          //                             "WMAYHFSC": {
          //                                 "CODE": "WMAYHFSC",
          //                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                             },
          //                             "WMAYFISP8": {
          //                                 "CODE": "WMAYFISP8",
          //                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                             },
          //                             "WMAYWAX": {
          //                                 "CODE": "WMAYWAX",
          //                                 "PRD_DESC": "Wax Resist"
          //                             },
          //                             "subMenu": [
          //                                 [
          //                                     {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     }
          //                                 ]
          //                             ]
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "MAYLF",
          //                                     "PRD_DESC": "Cone 04-06 Glazes",
          //                                     "MAYFIAC": {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     "MAYFIAS4": {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     "MAYFICLBR": {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     "MAYFIDI": {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     "MAYFICC5": {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     "MAYFIDL1": {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     "MAYFIEL5": {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     "MAYFIFN5": {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     "MAYFIFN52": {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     "MAYFIFN51": {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     "MAYFIJG5": {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     "MAYFIPCA5": {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     "MAYHFRK5": {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     "MAYFISG4": {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     "MAYFISC8": {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "MAYFISC5": {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     "MAYFISCG": {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     "MAYFISP8": {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "MAYFISP5": {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     "MAYFIUG5": {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "MAYFIAC",
          //                                                 "PRD_DESC": "Accessories"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIAS4",
          //                                                 "PRD_DESC": "Astro Gem, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICLBR",
          //                                                 "PRD_DESC": "Clear Brushing"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDI",
          //                                                 "PRD_DESC": "Clear Dipping"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICC5",
          //                                                 "PRD_DESC": "Classic Crackles"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDL1",
          //                                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIEL5",
          //                                                 "PRD_DESC": "Elements"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN5",
          //                                                 "PRD_DESC": "Foundations Opaques"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN52",
          //                                                 "PRD_DESC": "Foundations Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN51",
          //                                                 "PRD_DESC": "Foundations Sheer"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIJG5",
          //                                                 "PRD_DESC": "Jungle Gems"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIPCA5",
          //                                                 "PRD_DESC": "Pottery Cascades"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFRK5",
          //                                                 "PRD_DESC": "Raku Glazes, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISG4",
          //                                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC8",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC5",
          //                                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISCG",
          //                                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP5",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIUG5",
          //                                                 "PRD_DESC": "Underglazes, Pints"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 },
          //                                 {
          //                                     "CODE": "MAYHF",
          //                                     "PRD_DESC": "Cone 5-6 Glazes",
          //                                     "WMAYHFFN": {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     "MAYHFSCL": {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     "MAYHFSCLEA": {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     "MAYHFCRYST": {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     "MAYHFSD10": {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     "MAYHFGLOSS": {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     "MAYHFMATT": {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     "MAYHFSPEC": {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     "MAYHFSW4": {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     "WMAYHFSC": {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "WMAYFISP8": {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "WMAYWAX": {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "WMAYHFFN",
          //                                                 "PRD_DESC": "Foundations"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCL",
          //                                                 "PRD_DESC": "Stoneware Classics"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCLEA",
          //                                                 "PRD_DESC": "Stoneware Clear"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFCRYST",
          //                                                 "PRD_DESC": "Stoneware Crystal"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSD10",
          //                                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFGLOSS",
          //                                                 "PRD_DESC": "Stoneware Gloss"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFMATT",
          //                                                 "PRD_DESC": "Stoneware Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSPEC",
          //                                                 "PRD_DESC": "Stoneware Specialty"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSW4",
          //                                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYHFSC",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYWAX",
          //                                                 "PRD_DESC": "Wax Resist"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "MAYNF": {
          //                         "CODE": "MAYNF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "MAYNFSEAL": {
          //                             "CODE": "MAYNFSEAL",
          //                             "PRD_DESC": "Brush On Sealers"
          //                         },
          //                         "MAYNFDM2": {
          //                             "CODE": "MAYNFDM2",
          //                             "PRD_DESC": "Dazzling Metallics, 2oz."
          //                         },
          //                         "MAYNFMM2": {
          //                             "CODE": "MAYNFMM2",
          //                             "PRD_DESC": "Magic Metallics"
          //                         },
          //                         "MAYNFSNOW": {
          //                             "CODE": "MAYNFSNOW",
          //                             "PRD_DESC": "No Fire Snow"
          //                         },
          //                         "MAYNFSS2": {
          //                             "CODE": "MAYNFSS2",
          //                             "PRD_DESC": "Softee Arcylic Stains"
          //                         },
          //                         "MAYNFSP2": {
          //                             "CODE": "MAYNFSP2",
          //                             "PRD_DESC": "Softee Pearls"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "MAYNFSEAL",
          //                                     "PRD_DESC": "Brush On Sealers"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFDM2",
          //                                     "PRD_DESC": "Dazzling Metallics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFMM2",
          //                                     "PRD_DESC": "Magic Metallics"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSNOW",
          //                                     "PRD_DESC": "No Fire Snow"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSS2",
          //                                     "PRD_DESC": "Softee Arcylic Stains"
          //                                 },
          //                                 {
          //                                     "CODE": "MAYNFSP2",
          //                                     "PRD_DESC": "Softee Pearls"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "MAYLIT",
          //                                 "PRD_DESC": "Mayco Literature & Fired Charts"
          //                             },
          //                             {
          //                                 "CODE": "MAYFICHIP",
          //                                 "PRD_DESC": "Mayco Tile Charts"
          //                             },
          //                             {
          //                                 "CODE": "MAYFI",
          //                                 "PRD_DESC": "Fired",
          //                                 "MAYLF": {
          //                                     "CODE": "MAYLF",
          //                                     "PRD_DESC": "Cone 04-06 Glazes",
          //                                     "MAYFIAC": {
          //                                         "CODE": "MAYFIAC",
          //                                         "PRD_DESC": "Accessories"
          //                                     },
          //                                     "MAYFIAS4": {
          //                                         "CODE": "MAYFIAS4",
          //                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                     },
          //                                     "MAYFICLBR": {
          //                                         "CODE": "MAYFICLBR",
          //                                         "PRD_DESC": "Clear Brushing"
          //                                     },
          //                                     "MAYFIDI": {
          //                                         "CODE": "MAYFIDI",
          //                                         "PRD_DESC": "Clear Dipping"
          //                                     },
          //                                     "MAYFICC5": {
          //                                         "CODE": "MAYFICC5",
          //                                         "PRD_DESC": "Classic Crackles"
          //                                     },
          //                                     "MAYFIDL1": {
          //                                         "CODE": "MAYFIDL1",
          //                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                     },
          //                                     "MAYFIEL5": {
          //                                         "CODE": "MAYFIEL5",
          //                                         "PRD_DESC": "Elements"
          //                                     },
          //                                     "MAYFIFN5": {
          //                                         "CODE": "MAYFIFN5",
          //                                         "PRD_DESC": "Foundations Opaques"
          //                                     },
          //                                     "MAYFIFN52": {
          //                                         "CODE": "MAYFIFN52",
          //                                         "PRD_DESC": "Foundations Matte"
          //                                     },
          //                                     "MAYFIFN51": {
          //                                         "CODE": "MAYFIFN51",
          //                                         "PRD_DESC": "Foundations Sheer"
          //                                     },
          //                                     "MAYFIJG5": {
          //                                         "CODE": "MAYFIJG5",
          //                                         "PRD_DESC": "Jungle Gems"
          //                                     },
          //                                     "MAYFIPCA5": {
          //                                         "CODE": "MAYFIPCA5",
          //                                         "PRD_DESC": "Pottery Cascades"
          //                                     },
          //                                     "MAYHFRK5": {
          //                                         "CODE": "MAYHFRK5",
          //                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                     },
          //                                     "MAYFISG4": {
          //                                         "CODE": "MAYFISG4",
          //                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                     },
          //                                     "MAYFISC8": {
          //                                         "CODE": "MAYFISC8",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "MAYFISC5": {
          //                                         "CODE": "MAYFISC5",
          //                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                     },
          //                                     "MAYFISCG": {
          //                                         "CODE": "MAYFISCG",
          //                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                     },
          //                                     "MAYFISP8": {
          //                                         "CODE": "MAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "MAYFISP5": {
          //                                         "CODE": "MAYFISP5",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                     },
          //                                     "MAYFIUG5": {
          //                                         "CODE": "MAYFIUG5",
          //                                         "PRD_DESC": "Underglazes, Pints"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "MAYFIAC",
          //                                                 "PRD_DESC": "Accessories"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIAS4",
          //                                                 "PRD_DESC": "Astro Gem, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICLBR",
          //                                                 "PRD_DESC": "Clear Brushing"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDI",
          //                                                 "PRD_DESC": "Clear Dipping"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFICC5",
          //                                                 "PRD_DESC": "Classic Crackles"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIDL1",
          //                                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIEL5",
          //                                                 "PRD_DESC": "Elements"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN5",
          //                                                 "PRD_DESC": "Foundations Opaques"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN52",
          //                                                 "PRD_DESC": "Foundations Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIFN51",
          //                                                 "PRD_DESC": "Foundations Sheer"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIJG5",
          //                                                 "PRD_DESC": "Jungle Gems"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIPCA5",
          //                                                 "PRD_DESC": "Pottery Cascades"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFRK5",
          //                                                 "PRD_DESC": "Raku Glazes, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISG4",
          //                                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC8",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISC5",
          //                                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISCG",
          //                                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFISP5",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYFIUG5",
          //                                                 "PRD_DESC": "Underglazes, Pints"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 },
          //                                 "MAYHF": {
          //                                     "CODE": "MAYHF",
          //                                     "PRD_DESC": "Cone 5-6 Glazes",
          //                                     "WMAYHFFN": {
          //                                         "CODE": "WMAYHFFN",
          //                                         "PRD_DESC": "Foundations"
          //                                     },
          //                                     "MAYHFSCL": {
          //                                         "CODE": "MAYHFSCL",
          //                                         "PRD_DESC": "Stoneware Classics"
          //                                     },
          //                                     "MAYHFSCLEA": {
          //                                         "CODE": "MAYHFSCLEA",
          //                                         "PRD_DESC": "Stoneware Clear"
          //                                     },
          //                                     "MAYHFCRYST": {
          //                                         "CODE": "MAYHFCRYST",
          //                                         "PRD_DESC": "Stoneware Crystal"
          //                                     },
          //                                     "MAYHFSD10": {
          //                                         "CODE": "MAYHFSD10",
          //                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                     },
          //                                     "MAYHFGLOSS": {
          //                                         "CODE": "MAYHFGLOSS",
          //                                         "PRD_DESC": "Stoneware Gloss"
          //                                     },
          //                                     "MAYHFMATT": {
          //                                         "CODE": "MAYHFMATT",
          //                                         "PRD_DESC": "Stoneware Matte"
          //                                     },
          //                                     "MAYHFSPEC": {
          //                                         "CODE": "MAYHFSPEC",
          //                                         "PRD_DESC": "Stoneware Specialty"
          //                                     },
          //                                     "MAYHFSW4": {
          //                                         "CODE": "MAYHFSW4",
          //                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                     },
          //                                     "WMAYHFSC": {
          //                                         "CODE": "WMAYHFSC",
          //                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                     },
          //                                     "WMAYFISP8": {
          //                                         "CODE": "WMAYFISP8",
          //                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                     },
          //                                     "WMAYWAX": {
          //                                         "CODE": "WMAYWAX",
          //                                         "PRD_DESC": "Wax Resist"
          //                                     },
          //                                     "subMenu": [
          //                                         [
          //                                             {
          //                                                 "CODE": "WMAYHFFN",
          //                                                 "PRD_DESC": "Foundations"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCL",
          //                                                 "PRD_DESC": "Stoneware Classics"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSCLEA",
          //                                                 "PRD_DESC": "Stoneware Clear"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFCRYST",
          //                                                 "PRD_DESC": "Stoneware Crystal"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSD10",
          //                                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFGLOSS",
          //                                                 "PRD_DESC": "Stoneware Gloss"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFMATT",
          //                                                 "PRD_DESC": "Stoneware Matte"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSPEC",
          //                                                 "PRD_DESC": "Stoneware Specialty"
          //                                             },
          //                                             {
          //                                                 "CODE": "MAYHFSW4",
          //                                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYHFSC",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             {
          //                                                 "CODE": "WMAYWAX",
          //                                                 "PRD_DESC": "Wax Resist"
          //                                             }
          //                                         ]
          //                                     ]
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "MAYLF",
          //                                             "PRD_DESC": "Cone 04-06 Glazes",
          //                                             "MAYFIAC": {
          //                                                 "CODE": "MAYFIAC",
          //                                                 "PRD_DESC": "Accessories"
          //                                             },
          //                                             "MAYFIAS4": {
          //                                                 "CODE": "MAYFIAS4",
          //                                                 "PRD_DESC": "Astro Gem, 4oz."
          //                                             },
          //                                             "MAYFICLBR": {
          //                                                 "CODE": "MAYFICLBR",
          //                                                 "PRD_DESC": "Clear Brushing"
          //                                             },
          //                                             "MAYFIDI": {
          //                                                 "CODE": "MAYFIDI",
          //                                                 "PRD_DESC": "Clear Dipping"
          //                                             },
          //                                             "MAYFICC5": {
          //                                                 "CODE": "MAYFICC5",
          //                                                 "PRD_DESC": "Classic Crackles"
          //                                             },
          //                                             "MAYFIDL1": {
          //                                                 "CODE": "MAYFIDL1",
          //                                                 "PRD_DESC": "Designer Liners, 1.25oz."
          //                                             },
          //                                             "MAYFIEL5": {
          //                                                 "CODE": "MAYFIEL5",
          //                                                 "PRD_DESC": "Elements"
          //                                             },
          //                                             "MAYFIFN5": {
          //                                                 "CODE": "MAYFIFN5",
          //                                                 "PRD_DESC": "Foundations Opaques"
          //                                             },
          //                                             "MAYFIFN52": {
          //                                                 "CODE": "MAYFIFN52",
          //                                                 "PRD_DESC": "Foundations Matte"
          //                                             },
          //                                             "MAYFIFN51": {
          //                                                 "CODE": "MAYFIFN51",
          //                                                 "PRD_DESC": "Foundations Sheer"
          //                                             },
          //                                             "MAYFIJG5": {
          //                                                 "CODE": "MAYFIJG5",
          //                                                 "PRD_DESC": "Jungle Gems"
          //                                             },
          //                                             "MAYFIPCA5": {
          //                                                 "CODE": "MAYFIPCA5",
          //                                                 "PRD_DESC": "Pottery Cascades"
          //                                             },
          //                                             "MAYHFRK5": {
          //                                                 "CODE": "MAYHFRK5",
          //                                                 "PRD_DESC": "Raku Glazes, Pints"
          //                                             },
          //                                             "MAYFISG4": {
          //                                                 "CODE": "MAYFISG4",
          //                                                 "PRD_DESC": "Specialty Glazes, 4oz."
          //                                             },
          //                                             "MAYFISC8": {
          //                                                 "CODE": "MAYFISC8",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             "MAYFISC5": {
          //                                                 "CODE": "MAYFISC5",
          //                                                 "PRD_DESC": "Stroke N Coat, Pints"
          //                                             },
          //                                             "MAYFISCG": {
          //                                                 "CODE": "MAYFISCG",
          //                                                 "PRD_DESC": "Stroke N Coat, Gallons"
          //                                             },
          //                                             "MAYFISP8": {
          //                                                 "CODE": "MAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             "MAYFISP5": {
          //                                                 "CODE": "MAYFISP5",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                             },
          //                                             "MAYFIUG5": {
          //                                                 "CODE": "MAYFIUG5",
          //                                                 "PRD_DESC": "Underglazes, Pints"
          //                                             },
          //                                             "subMenu": [
          //                                                 [
          //                                                     {
          //                                                         "CODE": "MAYFIAC",
          //                                                         "PRD_DESC": "Accessories"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIAS4",
          //                                                         "PRD_DESC": "Astro Gem, 4oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFICLBR",
          //                                                         "PRD_DESC": "Clear Brushing"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIDI",
          //                                                         "PRD_DESC": "Clear Dipping"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFICC5",
          //                                                         "PRD_DESC": "Classic Crackles"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIDL1",
          //                                                         "PRD_DESC": "Designer Liners, 1.25oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIEL5",
          //                                                         "PRD_DESC": "Elements"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIFN5",
          //                                                         "PRD_DESC": "Foundations Opaques"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIFN52",
          //                                                         "PRD_DESC": "Foundations Matte"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIFN51",
          //                                                         "PRD_DESC": "Foundations Sheer"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIJG5",
          //                                                         "PRD_DESC": "Jungle Gems"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIPCA5",
          //                                                         "PRD_DESC": "Pottery Cascades"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFRK5",
          //                                                         "PRD_DESC": "Raku Glazes, Pints"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISG4",
          //                                                         "PRD_DESC": "Specialty Glazes, 4oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISC8",
          //                                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISC5",
          //                                                         "PRD_DESC": "Stroke N Coat, Pints"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISCG",
          //                                                         "PRD_DESC": "Stroke N Coat, Gallons"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISP8",
          //                                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFISP5",
          //                                                         "PRD_DESC": "Speckled Stroke N Coats - Pints"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYFIUG5",
          //                                                         "PRD_DESC": "Underglazes, Pints"
          //                                                     }
          //                                                 ]
          //                                             ]
          //                                         },
          //                                         {
          //                                             "CODE": "MAYHF",
          //                                             "PRD_DESC": "Cone 5-6 Glazes",
          //                                             "WMAYHFFN": {
          //                                                 "CODE": "WMAYHFFN",
          //                                                 "PRD_DESC": "Foundations"
          //                                             },
          //                                             "MAYHFSCL": {
          //                                                 "CODE": "MAYHFSCL",
          //                                                 "PRD_DESC": "Stoneware Classics"
          //                                             },
          //                                             "MAYHFSCLEA": {
          //                                                 "CODE": "MAYHFSCLEA",
          //                                                 "PRD_DESC": "Stoneware Clear"
          //                                             },
          //                                             "MAYHFCRYST": {
          //                                                 "CODE": "MAYHFCRYST",
          //                                                 "PRD_DESC": "Stoneware Crystal"
          //                                             },
          //                                             "MAYHFSD10": {
          //                                                 "CODE": "MAYHFSD10",
          //                                                 "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                             },
          //                                             "MAYHFGLOSS": {
          //                                                 "CODE": "MAYHFGLOSS",
          //                                                 "PRD_DESC": "Stoneware Gloss"
          //                                             },
          //                                             "MAYHFMATT": {
          //                                                 "CODE": "MAYHFMATT",
          //                                                 "PRD_DESC": "Stoneware Matte"
          //                                             },
          //                                             "MAYHFSPEC": {
          //                                                 "CODE": "MAYHFSPEC",
          //                                                 "PRD_DESC": "Stoneware Specialty"
          //                                             },
          //                                             "MAYHFSW4": {
          //                                                 "CODE": "MAYHFSW4",
          //                                                 "PRD_DESC": "Stoneware Washes, 4oz"
          //                                             },
          //                                             "WMAYHFSC": {
          //                                                 "CODE": "WMAYHFSC",
          //                                                 "PRD_DESC": "Stroke N Coat, 8oz."
          //                                             },
          //                                             "WMAYFISP8": {
          //                                                 "CODE": "WMAYFISP8",
          //                                                 "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                             },
          //                                             "WMAYWAX": {
          //                                                 "CODE": "WMAYWAX",
          //                                                 "PRD_DESC": "Wax Resist"
          //                                             },
          //                                             "subMenu": [
          //                                                 [
          //                                                     {
          //                                                         "CODE": "WMAYHFFN",
          //                                                         "PRD_DESC": "Foundations"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFSCL",
          //                                                         "PRD_DESC": "Stoneware Classics"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFSCLEA",
          //                                                         "PRD_DESC": "Stoneware Clear"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFCRYST",
          //                                                         "PRD_DESC": "Stoneware Crystal"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFSD10",
          //                                                         "PRD_DESC": "Stoneware Dry 10 lbs"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFGLOSS",
          //                                                         "PRD_DESC": "Stoneware Gloss"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFMATT",
          //                                                         "PRD_DESC": "Stoneware Matte"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFSPEC",
          //                                                         "PRD_DESC": "Stoneware Specialty"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "MAYHFSW4",
          //                                                         "PRD_DESC": "Stoneware Washes, 4oz"
          //                                                     },
          //                                                     {
          //                                                         "CODE": "WMAYHFSC",
          //                                                         "PRD_DESC": "Stroke N Coat, 8oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "WMAYFISP8",
          //                                                         "PRD_DESC": "Speckled Stroke N Coats - 8oz."
          //                                                     },
          //                                                     {
          //                                                         "CODE": "WMAYWAX",
          //                                                         "PRD_DESC": "Wax Resist"
          //                                                     }
          //                                                 ]
          //                                             ]
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "MAYNF",
          //                                 "PRD_DESC": "Non-Fired",
          //                                 "MAYNFSEAL": {
          //                                     "CODE": "MAYNFSEAL",
          //                                     "PRD_DESC": "Brush On Sealers"
          //                                 },
          //                                 "MAYNFDM2": {
          //                                     "CODE": "MAYNFDM2",
          //                                     "PRD_DESC": "Dazzling Metallics, 2oz."
          //                                 },
          //                                 "MAYNFMM2": {
          //                                     "CODE": "MAYNFMM2",
          //                                     "PRD_DESC": "Magic Metallics"
          //                                 },
          //                                 "MAYNFSNOW": {
          //                                     "CODE": "MAYNFSNOW",
          //                                     "PRD_DESC": "No Fire Snow"
          //                                 },
          //                                 "MAYNFSS2": {
          //                                     "CODE": "MAYNFSS2",
          //                                     "PRD_DESC": "Softee Arcylic Stains"
          //                                 },
          //                                 "MAYNFSP2": {
          //                                     "CODE": "MAYNFSP2",
          //                                     "PRD_DESC": "Softee Pearls"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "MAYNFSEAL",
          //                                             "PRD_DESC": "Brush On Sealers"
          //                                         },
          //                                         {
          //                                             "CODE": "MAYNFDM2",
          //                                             "PRD_DESC": "Dazzling Metallics, 2oz."
          //                                         },
          //                                         {
          //                                             "CODE": "MAYNFMM2",
          //                                             "PRD_DESC": "Magic Metallics"
          //                                         },
          //                                         {
          //                                             "CODE": "MAYNFSNOW",
          //                                             "PRD_DESC": "No Fire Snow"
          //                                         },
          //                                         {
          //                                             "CODE": "MAYNFSS2",
          //                                             "PRD_DESC": "Softee Arcylic Stains"
          //                                         },
          //                                         {
          //                                             "CODE": "MAYNFSP2",
          //                                             "PRD_DESC": "Softee Pearls"
          //                                         }
          //                                     ]
          //                                 ]
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "GAREPAINT",
          //                     "PRD_DESC": "Gare",
          //                     "GARELF": {
          //                         "CODE": "GARELF",
          //                         "PRD_DESC": "Cone 04-06 Glazes",
          //                         "GARFIBD2": {
          //                             "CODE": "GARFIBD2",
          //                             "PRD_DESC": "Bumpy Doodles, 2oz."
          //                         },
          //                         "GARFICLBR": {
          //                             "CODE": "GARFICLBR",
          //                             "PRD_DESC": "Clear Brushing"
          //                         },
          //                         "GARFIGL7": {
          //                             "CODE": "GARFIGL7",
          //                             "PRD_DESC": "Clear Dipping"
          //                         },
          //                         "GARFIFSF5": {
          //                             "CODE": "GARFIFSF5",
          //                             "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                         },
          //                         "GARFIFS5": {
          //                             "CODE": "GARFIFS5",
          //                             "PRD_DESC": "Funstroke Underglazes, Pints"
          //                         },
          //                         "GARFIPG5": {
          //                             "CODE": "GARFIPG5",
          //                             "PRD_DESC": "Pottery Glazes, Pints"
          //                         },
          //                         "GARFISP5": {
          //                             "CODE": "GARFISP5",
          //                             "PRD_DESC": "Specialty Glazes"
          //                         },
          //                         "GAFFISC": {
          //                             "CODE": "GAFFISC",
          //                             "PRD_DESC": "Surface Coats, Pints"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GARFIBD2",
          //                                     "PRD_DESC": "Bumpy Doodles, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GARFICLBR",
          //                                     "PRD_DESC": "Clear Brushing"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIGL7",
          //                                     "PRD_DESC": "Clear Dipping"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIFSF5",
          //                                     "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIFS5",
          //                                     "PRD_DESC": "Funstroke Underglazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFIPG5",
          //                                     "PRD_DESC": "Pottery Glazes, Pints"
          //                                 },
          //                                 {
          //                                     "CODE": "GARFISP5",
          //                                     "PRD_DESC": "Specialty Glazes"
          //                                 },
          //                                 {
          //                                     "CODE": "GAFFISC",
          //                                     "PRD_DESC": "Surface Coats, Pints"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "GARENF": {
          //                         "CODE": "GARENF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "GARNFPP5": {
          //                             "CODE": "GARNFPP5",
          //                             "PRD_DESC": "Party Paint Acrylics, Pints"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GARNFPP5",
          //                                     "PRD_DESC": "Party Paint Acrylics, Pints"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "GARELF",
          //                                 "PRD_DESC": "Cone 04-06 Glazes",
          //                                 "GARFIBD2": {
          //                                     "CODE": "GARFIBD2",
          //                                     "PRD_DESC": "Bumpy Doodles, 2oz."
          //                                 },
          //                                 "GARFICLBR": {
          //                                     "CODE": "GARFICLBR",
          //                                     "PRD_DESC": "Clear Brushing"
          //                                 },
          //                                 "GARFIGL7": {
          //                                     "CODE": "GARFIGL7",
          //                                     "PRD_DESC": "Clear Dipping"
          //                                 },
          //                                 "GARFIFSF5": {
          //                                     "CODE": "GARFIFSF5",
          //                                     "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                                 },
          //                                 "GARFIFS5": {
          //                                     "CODE": "GARFIFS5",
          //                                     "PRD_DESC": "Funstroke Underglazes, Pints"
          //                                 },
          //                                 "GARFIPG5": {
          //                                     "CODE": "GARFIPG5",
          //                                     "PRD_DESC": "Pottery Glazes, Pints"
          //                                 },
          //                                 "GARFISP5": {
          //                                     "CODE": "GARFISP5",
          //                                     "PRD_DESC": "Specialty Glazes"
          //                                 },
          //                                 "GAFFISC": {
          //                                     "CODE": "GAFFISC",
          //                                     "PRD_DESC": "Surface Coats, Pints"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "GARFIBD2",
          //                                             "PRD_DESC": "Bumpy Doodles, 2oz."
          //                                         },
          //                                         {
          //                                             "CODE": "GARFICLBR",
          //                                             "PRD_DESC": "Clear Brushing"
          //                                         },
          //                                         {
          //                                             "CODE": "GARFIGL7",
          //                                             "PRD_DESC": "Clear Dipping"
          //                                         },
          //                                         {
          //                                             "CODE": "GARFIFSF5",
          //                                             "PRD_DESC": "Funstroke Fleckles Underglazes, Pints"
          //                                         },
          //                                         {
          //                                             "CODE": "GARFIFS5",
          //                                             "PRD_DESC": "Funstroke Underglazes, Pints"
          //                                         },
          //                                         {
          //                                             "CODE": "GARFIPG5",
          //                                             "PRD_DESC": "Pottery Glazes, Pints"
          //                                         },
          //                                         {
          //                                             "CODE": "GARFISP5",
          //                                             "PRD_DESC": "Specialty Glazes"
          //                                         },
          //                                         {
          //                                             "CODE": "GAFFISC",
          //                                             "PRD_DESC": "Surface Coats, Pints"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "GARENF",
          //                                 "PRD_DESC": "Non-Fired",
          //                                 "GARNFPP5": {
          //                                     "CODE": "GARNFPP5",
          //                                     "PRD_DESC": "Party Paint Acrylics, Pints"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "GARNFPP5",
          //                                             "PRD_DESC": "Party Paint Acrylics, Pints"
          //                                         }
          //                                     ]
          //                                 ]
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "DUNPAINT",
          //                     "PRD_DESC": "Duncan",
          //                     "DUNFI": {
          //                         "CODE": "DUNFI",
          //                         "PRD_DESC": "Fired",
          //                         "DUNFICLBR": {
          //                             "CODE": "DUNFICLBR",
          //                             "PRD_DESC": "Clear Brushing Glaze"
          //                         },
          //                         "DUNFIPBD35": {
          //                             "CODE": "DUNFIPBD35",
          //                             "PRD_DESC": "Pure Brilliance"
          //                         },
          //                         "DUNFICN8": {
          //                             "CODE": "DUNFICN8",
          //                             "PRD_DESC": "Concepts, 8oz."
          //                         },
          //                         "DUNFIIN5": {
          //                             "CODE": "DUNFIIN5",
          //                             "PRD_DESC": "Envision Glazes"
          //                         },
          //                         "DUNFIEZ1": {
          //                             "CODE": "DUNFIEZ1",
          //                             "PRD_DESC": "EZ Strokes, 1oz."
          //                         },
          //                         "DUNFIFD1": {
          //                             "CODE": "DUNFIFD1",
          //                             "PRD_DESC": "French Dimensions, 1oz."
          //                         },
          //                         "DUNFIOG": {
          //                             "CODE": "DUNFIOG",
          //                             "PRD_DESC": "Overglazes and Accessories"
          //                         },
          //                         "DUNFISY": {
          //                             "CODE": "DUNFISY",
          //                             "PRD_DESC": "Specialty Fired Products"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "DUNFICLBR",
          //                                     "PRD_DESC": "Clear Brushing Glaze"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIPBD35",
          //                                     "PRD_DESC": "Pure Brilliance"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFICN8",
          //                                     "PRD_DESC": "Concepts, 8oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIIN5",
          //                                     "PRD_DESC": "Envision Glazes"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIEZ1",
          //                                     "PRD_DESC": "EZ Strokes, 1oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIFD1",
          //                                     "PRD_DESC": "French Dimensions, 1oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFIOG",
          //                                     "PRD_DESC": "Overglazes and Accessories"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNFISY",
          //                                     "PRD_DESC": "Specialty Fired Products"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "DUNNF": {
          //                         "CODE": "DUNNF",
          //                         "PRD_DESC": "Non-Fired",
          //                         "DUNNFOS2": {
          //                             "CODE": "DUNNFOS2",
          //                             "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                         },
          //                         "DUNNFSG2": {
          //                             "CODE": "DUNNFSG2",
          //                             "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                         },
          //                         "DUNNFAS": {
          //                             "CODE": "DUNNFAS",
          //                             "PRD_DESC": "\"AS\" Specialty Products"
          //                         },
          //                         "DUNNFUM2": {
          //                             "CODE": "DUNNFUM2",
          //                             "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                         },
          //                         "DUNNFSP": {
          //                             "CODE": "DUNNFSP",
          //                             "PRD_DESC": "\"SS\" Duncan Sprays"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "DUNNFOS2",
          //                                     "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFSG2",
          //                                     "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFAS",
          //                                     "PRD_DESC": "\"AS\" Specialty Products"
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFUM2",
          //                                     "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                                 },
          //                                 {
          //                                     "CODE": "DUNNFSP",
          //                                     "PRD_DESC": "\"SS\" Duncan Sprays"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "DUNFI",
          //                                 "PRD_DESC": "Fired",
          //                                 "DUNFICLBR": {
          //                                     "CODE": "DUNFICLBR",
          //                                     "PRD_DESC": "Clear Brushing Glaze"
          //                                 },
          //                                 "DUNFIPBD35": {
          //                                     "CODE": "DUNFIPBD35",
          //                                     "PRD_DESC": "Pure Brilliance"
          //                                 },
          //                                 "DUNFICN8": {
          //                                     "CODE": "DUNFICN8",
          //                                     "PRD_DESC": "Concepts, 8oz."
          //                                 },
          //                                 "DUNFIIN5": {
          //                                     "CODE": "DUNFIIN5",
          //                                     "PRD_DESC": "Envision Glazes"
          //                                 },
          //                                 "DUNFIEZ1": {
          //                                     "CODE": "DUNFIEZ1",
          //                                     "PRD_DESC": "EZ Strokes, 1oz."
          //                                 },
          //                                 "DUNFIFD1": {
          //                                     "CODE": "DUNFIFD1",
          //                                     "PRD_DESC": "French Dimensions, 1oz."
          //                                 },
          //                                 "DUNFIOG": {
          //                                     "CODE": "DUNFIOG",
          //                                     "PRD_DESC": "Overglazes and Accessories"
          //                                 },
          //                                 "DUNFISY": {
          //                                     "CODE": "DUNFISY",
          //                                     "PRD_DESC": "Specialty Fired Products"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "DUNFICLBR",
          //                                             "PRD_DESC": "Clear Brushing Glaze"
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFIPBD35",
          //                                             "PRD_DESC": "Pure Brilliance"
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFICN8",
          //                                             "PRD_DESC": "Concepts, 8oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFIIN5",
          //                                             "PRD_DESC": "Envision Glazes"
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFIEZ1",
          //                                             "PRD_DESC": "EZ Strokes, 1oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFIFD1",
          //                                             "PRD_DESC": "French Dimensions, 1oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFIOG",
          //                                             "PRD_DESC": "Overglazes and Accessories"
          //                                         },
          //                                         {
          //                                             "CODE": "DUNFISY",
          //                                             "PRD_DESC": "Specialty Fired Products"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "DUNNF",
          //                                 "PRD_DESC": "Non-Fired",
          //                                 "DUNNFOS2": {
          //                                     "CODE": "DUNNFOS2",
          //                                     "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                                 },
          //                                 "DUNNFSG2": {
          //                                     "CODE": "DUNNFSG2",
          //                                     "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                                 },
          //                                 "DUNNFAS": {
          //                                     "CODE": "DUNNFAS",
          //                                     "PRD_DESC": "\"AS\" Specialty Products"
          //                                 },
          //                                 "DUNNFUM2": {
          //                                     "CODE": "DUNNFUM2",
          //                                     "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                                 },
          //                                 "DUNNFSP": {
          //                                     "CODE": "DUNNFSP",
          //                                     "PRD_DESC": "\"SS\" Duncan Sprays"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "DUNNFOS2",
          //                                             "PRD_DESC": "\"OS\" Bisq-Stain Opaque Acrylics, 2oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNNFSG2",
          //                                             "PRD_DESC": "\"SG\" Sparklers Brush-On Glitter, 2oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNNFAS",
          //                                             "PRD_DESC": "\"AS\" Specialty Products"
          //                                         },
          //                                         {
          //                                             "CODE": "DUNNFUM2",
          //                                             "PRD_DESC": "\"UM\" Ultra Metallics, 2oz."
          //                                         },
          //                                         {
          //                                             "CODE": "DUNNFSP",
          //                                             "PRD_DESC": "\"SS\" Duncan Sprays"
          //                                         }
          //                                     ]
          //                                 ]
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "AMACOPAINT",
          //                     "PRD_DESC": "Amaco Glazes & Underglazes",
          //                     "AMACOLF": {
          //                         "CODE": "AMACOLF",
          //                         "PRD_DESC": "Cone 04-06",
          //                         "AMACO70": {
          //                             "CODE": "AMACO70",
          //                             "PRD_DESC": "Velvet Underglazes"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "AMACO70",
          //                                     "PRD_DESC": "Velvet Underglazes"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "AMACOHIFI": {
          //                         "CODE": "AMACOHIFI",
          //                         "PRD_DESC": "High Fire Cone 5-10 Glazes",
          //                         "AMACO30": {
          //                             "CODE": "AMACO30",
          //                             "PRD_DESC": "Potter's Choice (PC)"
          //                         },
          //                         "AMACO10": {
          //                             "CODE": "AMACO10",
          //                             "PRD_DESC": "Celedons (C)"
          //                         },
          //                         "AMACO40": {
          //                             "CODE": "AMACO40",
          //                             "PRD_DESC": "Shino (SH)"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "AMACO30",
          //                                     "PRD_DESC": "Potter's Choice (PC)"
          //                                 },
          //                                 {
          //                                     "CODE": "AMACO10",
          //                                     "PRD_DESC": "Celedons (C)"
          //                                 },
          //                                 {
          //                                     "CODE": "AMACO40",
          //                                     "PRD_DESC": "Shino (SH)"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "AMACOLF",
          //                                 "PRD_DESC": "Cone 04-06",
          //                                 "AMACO70": {
          //                                     "CODE": "AMACO70",
          //                                     "PRD_DESC": "Velvet Underglazes"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "AMACO70",
          //                                             "PRD_DESC": "Velvet Underglazes"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "AMACOHIFI",
          //                                 "PRD_DESC": "High Fire Cone 5-10 Glazes",
          //                                 "AMACO30": {
          //                                     "CODE": "AMACO30",
          //                                     "PRD_DESC": "Potter's Choice (PC)"
          //                                 },
          //                                 "AMACO10": {
          //                                     "CODE": "AMACO10",
          //                                     "PRD_DESC": "Celedons (C)"
          //                                 },
          //                                 "AMACO40": {
          //                                     "CODE": "AMACO40",
          //                                     "PRD_DESC": "Shino (SH)"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "AMACO30",
          //                                             "PRD_DESC": "Potter's Choice (PC)"
          //                                         },
          //                                         {
          //                                             "CODE": "AMACO10",
          //                                             "PRD_DESC": "Celedons (C)"
          //                                         },
          //                                         {
          //                                             "CODE": "AMACO40",
          //                                             "PRD_DESC": "Shino (SH)"
          //                                         }
          //                                     ]
          //                                 ]
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "FASHENHUES",
          //                     "PRD_DESC": "FashenHues"
          //                 }
          //             ]
          //         ]
          //     },
          //     "CLAY": {
          //         "CODE": "CLAY",
          //         "PRD_DESC": "Clay & Wheels",
          //         "POTCLAY": {
          //             "CODE": "POTCLAY",
          //             "PRD_DESC": "Clay",
          //             "POT20": {
          //                 "CODE": "POT20",
          //                 "PRD_DESC": "Low Fire Clay - Cone 02-06"
          //             },
          //             "POT30": {
          //                 "CODE": "POT30",
          //                 "PRD_DESC": "High Fire Clay - Cone 5-10"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "POT20",
          //                         "PRD_DESC": "Low Fire Clay - Cone 02-06"
          //                     },
          //                     {
          //                         "CODE": "POT30",
          //                         "PRD_DESC": "High Fire Clay - Cone 5-10"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "POTWHEEL": {
          //             "CODE": "POTWHEEL",
          //             "PRD_DESC": "Pottery Wheels",
          //             "SKUPOT10": {
          //                 "CODE": "SKUPOT10",
          //                 "PRD_DESC": "Pottery Wheel Accessories"
          //             },
          //             "SKUPOT": {
          //                 "CODE": "SKUPOT",
          //                 "PRD_DESC": "Skutt Pottery Wheels"
          //             },
          //             "BRENT": {
          //                 "CODE": "BRENT",
          //                 "PRD_DESC": "Brent Pottery Wheels"
          //             },
          //             "SHIMPO": {
          //                 "CODE": "SHIMPO",
          //                 "PRD_DESC": "Shimpo Pottery Wheels"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "SKUPOT10",
          //                         "PRD_DESC": "Pottery Wheel Accessories"
          //                     },
          //                     {
          //                         "CODE": "SKUPOT",
          //                         "PRD_DESC": "Skutt Pottery Wheels"
          //                     },
          //                     {
          //                         "CODE": "BRENT",
          //                         "PRD_DESC": "Brent Pottery Wheels"
          //                     },
          //                     {
          //                         "CODE": "SHIMPO",
          //                         "PRD_DESC": "Shimpo Pottery Wheels"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "POTEQUIP": {
          //             "CODE": "POTEQUIP",
          //             "PRD_DESC": "Potter Equipment",
          //             "BANDING": {
          //                 "CODE": "BANDING",
          //                 "PRD_DESC": "Banding Wheels"
          //             },
          //             "EXTRUDER": {
          //                 "CODE": "EXTRUDER",
          //                 "PRD_DESC": "Clay Extruders"
          //             },
          //             "POTSLAB": {
          //                 "CODE": "POTSLAB",
          //                 "PRD_DESC": "Slab Rollers"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "BANDING",
          //                         "PRD_DESC": "Banding Wheels"
          //                     },
          //                     {
          //                         "CODE": "EXTRUDER",
          //                         "PRD_DESC": "Clay Extruders"
          //                     },
          //                     {
          //                         "CODE": "POTSLAB",
          //                         "PRD_DESC": "Slab Rollers"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "POTMOLDS": {
          //             "CODE": "POTMOLDS",
          //             "PRD_DESC": "Pottery Molds",
          //             "POT150": {
          //                 "CODE": "POT150",
          //                 "PRD_DESC": "Clay Forms"
          //             },
          //             "POT160": {
          //                 "CODE": "POT160",
          //                 "PRD_DESC": "Sprig Molds"
          //             },
          //             "POT190": {
          //                 "CODE": "POT190",
          //                 "PRD_DESC": "Stamp Molds"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "POT150",
          //                         "PRD_DESC": "Clay Forms"
          //                     },
          //                     {
          //                         "CODE": "POT160",
          //                         "PRD_DESC": "Sprig Molds"
          //                     },
          //                     {
          //                         "CODE": "POT190",
          //                         "PRD_DESC": "Stamp Molds"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "PROTOOL": {
          //             "CODE": "PROTOOL",
          //             "PRD_DESC": "Pottery Tools"
          //         },
          //         "STAMPS": {
          //             "CODE": "STAMPS",
          //             "PRD_DESC": "Rubber Stamps"
          //         },
          //         "WSLIP": {
          //             "CODE": "WSLIP",
          //             "PRD_DESC": "Slip & Casting Molds",
          //             "SLI40": {
          //                 "CODE": "SLI40",
          //                 "PRD_DESC": "Slip Equipment"
          //             },
          //             "SLI30": {
          //                 "CODE": "SLI30",
          //                 "PRD_DESC": "Casting Molds",
          //                 "SLIP50": {
          //                     "CODE": "SLIP50",
          //                     "PRD_DESC": "Mayco Casting Molds"
          //                 },
          //                 "CLM": {
          //                     "CODE": "CLM",
          //                     "PRD_DESC": "Clay Magic Molds"
          //                 },
          //                 "CLMTL": {
          //                     "CODE": "CLMTL",
          //                     "PRD_DESC": "Clay Magic TL Design Molds"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "SLIP50",
          //                             "PRD_DESC": "Mayco Casting Molds"
          //                         },
          //                         {
          //                             "CODE": "CLM",
          //                             "PRD_DESC": "Clay Magic Molds"
          //                         },
          //                         {
          //                             "CODE": "CLMTL",
          //                             "PRD_DESC": "Clay Magic TL Design Molds"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "SLI10": {
          //                 "CODE": "SLI10",
          //                 "PRD_DESC": "Casting Slip"
          //             },
          //             "AGT": {
          //                 "CODE": "AGT",
          //                 "PRD_DESC": "Greenware Tools"
          //             },
          //             "SLI20": {
          //                 "CODE": "SLI20",
          //                 "PRD_DESC": "Bands & Straps"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "SLI40",
          //                         "PRD_DESC": "Slip Equipment"
          //                     },
          //                     {
          //                         "CODE": "SLI30",
          //                         "PRD_DESC": "Casting Molds",
          //                         "SLIP50": {
          //                             "CODE": "SLIP50",
          //                             "PRD_DESC": "Mayco Casting Molds"
          //                         },
          //                         "CLM": {
          //                             "CODE": "CLM",
          //                             "PRD_DESC": "Clay Magic Molds"
          //                         },
          //                         "CLMTL": {
          //                             "CODE": "CLMTL",
          //                             "PRD_DESC": "Clay Magic TL Design Molds"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "SLIP50",
          //                                     "PRD_DESC": "Mayco Casting Molds"
          //                                 },
          //                                 {
          //                                     "CODE": "CLM",
          //                                     "PRD_DESC": "Clay Magic Molds"
          //                                 },
          //                                 {
          //                                     "CODE": "CLMTL",
          //                                     "PRD_DESC": "Clay Magic TL Design Molds"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "SLI10",
          //                         "PRD_DESC": "Casting Slip"
          //                     },
          //                     {
          //                         "CODE": "AGT",
          //                         "PRD_DESC": "Greenware Tools"
          //                     },
          //                     {
          //                         "CODE": "SLI20",
          //                         "PRD_DESC": "Bands & Straps"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "subMenu": [
          //             [
          //                 {
          //                     "CODE": "POTCLAY",
          //                     "PRD_DESC": "Clay",
          //                     "POT20": {
          //                         "CODE": "POT20",
          //                         "PRD_DESC": "Low Fire Clay - Cone 02-06"
          //                     },
          //                     "POT30": {
          //                         "CODE": "POT30",
          //                         "PRD_DESC": "High Fire Clay - Cone 5-10"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "POT20",
          //                                 "PRD_DESC": "Low Fire Clay - Cone 02-06"
          //                             },
          //                             {
          //                                 "CODE": "POT30",
          //                                 "PRD_DESC": "High Fire Clay - Cone 5-10"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "POTWHEEL",
          //                     "PRD_DESC": "Pottery Wheels",
          //                     "SKUPOT10": {
          //                         "CODE": "SKUPOT10",
          //                         "PRD_DESC": "Pottery Wheel Accessories"
          //                     },
          //                     "SKUPOT": {
          //                         "CODE": "SKUPOT",
          //                         "PRD_DESC": "Skutt Pottery Wheels"
          //                     },
          //                     "BRENT": {
          //                         "CODE": "BRENT",
          //                         "PRD_DESC": "Brent Pottery Wheels"
          //                     },
          //                     "SHIMPO": {
          //                         "CODE": "SHIMPO",
          //                         "PRD_DESC": "Shimpo Pottery Wheels"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "SKUPOT10",
          //                                 "PRD_DESC": "Pottery Wheel Accessories"
          //                             },
          //                             {
          //                                 "CODE": "SKUPOT",
          //                                 "PRD_DESC": "Skutt Pottery Wheels"
          //                             },
          //                             {
          //                                 "CODE": "BRENT",
          //                                 "PRD_DESC": "Brent Pottery Wheels"
          //                             },
          //                             {
          //                                 "CODE": "SHIMPO",
          //                                 "PRD_DESC": "Shimpo Pottery Wheels"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "POTEQUIP",
          //                     "PRD_DESC": "Potter Equipment",
          //                     "BANDING": {
          //                         "CODE": "BANDING",
          //                         "PRD_DESC": "Banding Wheels"
          //                     },
          //                     "EXTRUDER": {
          //                         "CODE": "EXTRUDER",
          //                         "PRD_DESC": "Clay Extruders"
          //                     },
          //                     "POTSLAB": {
          //                         "CODE": "POTSLAB",
          //                         "PRD_DESC": "Slab Rollers"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "BANDING",
          //                                 "PRD_DESC": "Banding Wheels"
          //                             },
          //                             {
          //                                 "CODE": "EXTRUDER",
          //                                 "PRD_DESC": "Clay Extruders"
          //                             },
          //                             {
          //                                 "CODE": "POTSLAB",
          //                                 "PRD_DESC": "Slab Rollers"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "POTMOLDS",
          //                     "PRD_DESC": "Pottery Molds",
          //                     "POT150": {
          //                         "CODE": "POT150",
          //                         "PRD_DESC": "Clay Forms"
          //                     },
          //                     "POT160": {
          //                         "CODE": "POT160",
          //                         "PRD_DESC": "Sprig Molds"
          //                     },
          //                     "POT190": {
          //                         "CODE": "POT190",
          //                         "PRD_DESC": "Stamp Molds"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "POT150",
          //                                 "PRD_DESC": "Clay Forms"
          //                             },
          //                             {
          //                                 "CODE": "POT160",
          //                                 "PRD_DESC": "Sprig Molds"
          //                             },
          //                             {
          //                                 "CODE": "POT190",
          //                                 "PRD_DESC": "Stamp Molds"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "PROTOOL",
          //                     "PRD_DESC": "Pottery Tools"
          //                 },
          //                 {
          //                     "CODE": "STAMPS",
          //                     "PRD_DESC": "Rubber Stamps"
          //                 },
          //                 {
          //                     "CODE": "WSLIP",
          //                     "PRD_DESC": "Slip & Casting Molds",
          //                     "SLI40": {
          //                         "CODE": "SLI40",
          //                         "PRD_DESC": "Slip Equipment"
          //                     },
          //                     "SLI30": {
          //                         "CODE": "SLI30",
          //                         "PRD_DESC": "Casting Molds",
          //                         "SLIP50": {
          //                             "CODE": "SLIP50",
          //                             "PRD_DESC": "Mayco Casting Molds"
          //                         },
          //                         "CLM": {
          //                             "CODE": "CLM",
          //                             "PRD_DESC": "Clay Magic Molds"
          //                         },
          //                         "CLMTL": {
          //                             "CODE": "CLMTL",
          //                             "PRD_DESC": "Clay Magic TL Design Molds"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "SLIP50",
          //                                     "PRD_DESC": "Mayco Casting Molds"
          //                                 },
          //                                 {
          //                                     "CODE": "CLM",
          //                                     "PRD_DESC": "Clay Magic Molds"
          //                                 },
          //                                 {
          //                                     "CODE": "CLMTL",
          //                                     "PRD_DESC": "Clay Magic TL Design Molds"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "SLI10": {
          //                         "CODE": "SLI10",
          //                         "PRD_DESC": "Casting Slip"
          //                     },
          //                     "AGT": {
          //                         "CODE": "AGT",
          //                         "PRD_DESC": "Greenware Tools"
          //                     },
          //                     "SLI20": {
          //                         "CODE": "SLI20",
          //                         "PRD_DESC": "Bands & Straps"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "SLI40",
          //                                 "PRD_DESC": "Slip Equipment"
          //                             },
          //                             {
          //                                 "CODE": "SLI30",
          //                                 "PRD_DESC": "Casting Molds",
          //                                 "SLIP50": {
          //                                     "CODE": "SLIP50",
          //                                     "PRD_DESC": "Mayco Casting Molds"
          //                                 },
          //                                 "CLM": {
          //                                     "CODE": "CLM",
          //                                     "PRD_DESC": "Clay Magic Molds"
          //                                 },
          //                                 "CLMTL": {
          //                                     "CODE": "CLMTL",
          //                                     "PRD_DESC": "Clay Magic TL Design Molds"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "SLIP50",
          //                                             "PRD_DESC": "Mayco Casting Molds"
          //                                         },
          //                                         {
          //                                             "CODE": "CLM",
          //                                             "PRD_DESC": "Clay Magic Molds"
          //                                         },
          //                                         {
          //                                             "CODE": "CLMTL",
          //                                             "PRD_DESC": "Clay Magic TL Design Molds"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "SLI10",
          //                                 "PRD_DESC": "Casting Slip"
          //                             },
          //                             {
          //                                 "CODE": "AGT",
          //                                 "PRD_DESC": "Greenware Tools"
          //                             },
          //                             {
          //                                 "CODE": "SLI20",
          //                                 "PRD_DESC": "Bands & Straps"
          //                             }
          //                         ]
          //                     ]
          //                 }
          //             ]
          //         ]
          //     },
          //     "KILNS": {
          //         "CODE": "KILNS",
          //         "PRD_DESC": "Kilns & Supplies",
          //         "KILN200": {
          //             "CODE": "KILN200",
          //             "PRD_DESC": "Ceramic Kilns",
          //             "KILN210": {
          //                 "CODE": "KILN210",
          //                 "PRD_DESC": "Small"
          //             },
          //             "KILN220": {
          //                 "CODE": "KILN220",
          //                 "PRD_DESC": "Medium"
          //             },
          //             "KILN230": {
          //                 "CODE": "KILN230",
          //                 "PRD_DESC": "Large"
          //             },
          //             "KILN240": {
          //                 "CODE": "KILN240",
          //                 "PRD_DESC": "Oval"
          //             },
          //             "KILN250": {
          //                 "CODE": "KILN250",
          //                 "PRD_DESC": "Enviorvent 2"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "KILN210",
          //                         "PRD_DESC": "Small"
          //                     },
          //                     {
          //                         "CODE": "KILN220",
          //                         "PRD_DESC": "Medium"
          //                     },
          //                     {
          //                         "CODE": "KILN230",
          //                         "PRD_DESC": "Large"
          //                     },
          //                     {
          //                         "CODE": "KILN240",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     {
          //                         "CODE": "KILN250",
          //                         "PRD_DESC": "Enviorvent 2"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "KILNGL": {
          //             "CODE": "KILNGL",
          //             "PRD_DESC": "Glass Kilns",
          //             "KILNGL10": {
          //                 "CODE": "KILNGL10",
          //                 "PRD_DESC": "Bead Kilns"
          //             },
          //             "KILNGL20": {
          //                 "CODE": "KILNGL20",
          //                 "PRD_DESC": "Beginner/Test Kilns"
          //             },
          //             "KILNGL30": {
          //                 "CODE": "KILNGL30",
          //                 "PRD_DESC": "Classroom/Professional"
          //             },
          //             "KILNGL40": {
          //                 "CODE": "KILNGL40",
          //                 "PRD_DESC": "Side-Fired Production/Annealing Kilns"
          //             },
          //             "KILNGL50": {
          //                 "CODE": "KILNGL50",
          //                 "PRD_DESC": "Studio Kilns"
          //             },
          //             "KILNGL60": {
          //                 "CODE": "KILNGL60",
          //                 "PRD_DESC": "Flame Working Kilns"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "KILNGL10",
          //                         "PRD_DESC": "Bead Kilns"
          //                     },
          //                     {
          //                         "CODE": "KILNGL20",
          //                         "PRD_DESC": "Beginner/Test Kilns"
          //                     },
          //                     {
          //                         "CODE": "KILNGL30",
          //                         "PRD_DESC": "Classroom/Professional"
          //                     },
          //                     {
          //                         "CODE": "KILNGL40",
          //                         "PRD_DESC": "Side-Fired Production/Annealing Kilns"
          //                     },
          //                     {
          //                         "CODE": "KILNGL50",
          //                         "PRD_DESC": "Studio Kilns"
          //                     },
          //                     {
          //                         "CODE": "KILNGL60",
          //                         "PRD_DESC": "Flame Working Kilns"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "KILNS10": {
          //             "CODE": "KILNS10",
          //             "PRD_DESC": "Kiln Room",
          //             "KILNS20": {
          //                 "CODE": "KILNS20",
          //                 "PRD_DESC": "Designing A Kiln Room"
          //             },
          //             "KPO": {
          //                 "CODE": "KPO",
          //                 "PRD_DESC": "Kiln Posts"
          //             },
          //             "KSH": {
          //                 "CODE": "KSH",
          //                 "PRD_DESC": "Kiln Shelves & Kits"
          //             },
          //             "KST": {
          //                 "CODE": "KST",
          //                 "PRD_DESC": "Kiln Stilts"
          //             },
          //             "OH4": {
          //                 "CODE": "OH4",
          //                 "PRD_DESC": "Sitter Cones"
          //             },
          //             "OH6": {
          //                 "CODE": "OH6",
          //                 "PRD_DESC": "Shelf Cones"
          //             },
          //             "KILNS30": {
          //                 "CODE": "KILNS30",
          //                 "PRD_DESC": "Accessories"
          //             },
          //             "KILNS40": {
          //                 "CODE": "KILNS40",
          //                 "PRD_DESC": "Most Requested KM Kiln Parts"
          //             },
          //             "KILNS50": {
          //                 "CODE": "KILNS50",
          //                 "PRD_DESC": "Most Requested Kiln Sitter Parts"
          //             },
          //             "LEASE": {
          //                 "CODE": "LEASE",
          //                 "PRD_DESC": "Kiln Leasing"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "KILNS20",
          //                         "PRD_DESC": "Designing A Kiln Room"
          //                     },
          //                     {
          //                         "CODE": "KPO",
          //                         "PRD_DESC": "Kiln Posts"
          //                     },
          //                     {
          //                         "CODE": "KSH",
          //                         "PRD_DESC": "Kiln Shelves & Kits"
          //                     },
          //                     {
          //                         "CODE": "KST",
          //                         "PRD_DESC": "Kiln Stilts"
          //                     },
          //                     {
          //                         "CODE": "OH4",
          //                         "PRD_DESC": "Sitter Cones"
          //                     },
          //                     {
          //                         "CODE": "OH6",
          //                         "PRD_DESC": "Shelf Cones"
          //                     },
          //                     {
          //                         "CODE": "KILNS30",
          //                         "PRD_DESC": "Accessories"
          //                     },
          //                     {
          //                         "CODE": "KILNS40",
          //                         "PRD_DESC": "Most Requested KM Kiln Parts"
          //                     },
          //                     {
          //                         "CODE": "KILNS50",
          //                         "PRD_DESC": "Most Requested Kiln Sitter Parts"
          //                     },
          //                     {
          //                         "CODE": "LEASE",
          //                         "PRD_DESC": "Kiln Leasing"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "subMenu": [
          //             [
          //                 {
          //                     "CODE": "KILN200",
          //                     "PRD_DESC": "Ceramic Kilns",
          //                     "KILN210": {
          //                         "CODE": "KILN210",
          //                         "PRD_DESC": "Small"
          //                     },
          //                     "KILN220": {
          //                         "CODE": "KILN220",
          //                         "PRD_DESC": "Medium"
          //                     },
          //                     "KILN230": {
          //                         "CODE": "KILN230",
          //                         "PRD_DESC": "Large"
          //                     },
          //                     "KILN240": {
          //                         "CODE": "KILN240",
          //                         "PRD_DESC": "Oval"
          //                     },
          //                     "KILN250": {
          //                         "CODE": "KILN250",
          //                         "PRD_DESC": "Enviorvent 2"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "KILN210",
          //                                 "PRD_DESC": "Small"
          //                             },
          //                             {
          //                                 "CODE": "KILN220",
          //                                 "PRD_DESC": "Medium"
          //                             },
          //                             {
          //                                 "CODE": "KILN230",
          //                                 "PRD_DESC": "Large"
          //                             },
          //                             {
          //                                 "CODE": "KILN240",
          //                                 "PRD_DESC": "Oval"
          //                             },
          //                             {
          //                                 "CODE": "KILN250",
          //                                 "PRD_DESC": "Enviorvent 2"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "KILNGL",
          //                     "PRD_DESC": "Glass Kilns",
          //                     "KILNGL10": {
          //                         "CODE": "KILNGL10",
          //                         "PRD_DESC": "Bead Kilns"
          //                     },
          //                     "KILNGL20": {
          //                         "CODE": "KILNGL20",
          //                         "PRD_DESC": "Beginner/Test Kilns"
          //                     },
          //                     "KILNGL30": {
          //                         "CODE": "KILNGL30",
          //                         "PRD_DESC": "Classroom/Professional"
          //                     },
          //                     "KILNGL40": {
          //                         "CODE": "KILNGL40",
          //                         "PRD_DESC": "Side-Fired Production/Annealing Kilns"
          //                     },
          //                     "KILNGL50": {
          //                         "CODE": "KILNGL50",
          //                         "PRD_DESC": "Studio Kilns"
          //                     },
          //                     "KILNGL60": {
          //                         "CODE": "KILNGL60",
          //                         "PRD_DESC": "Flame Working Kilns"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "KILNGL10",
          //                                 "PRD_DESC": "Bead Kilns"
          //                             },
          //                             {
          //                                 "CODE": "KILNGL20",
          //                                 "PRD_DESC": "Beginner/Test Kilns"
          //                             },
          //                             {
          //                                 "CODE": "KILNGL30",
          //                                 "PRD_DESC": "Classroom/Professional"
          //                             },
          //                             {
          //                                 "CODE": "KILNGL40",
          //                                 "PRD_DESC": "Side-Fired Production/Annealing Kilns"
          //                             },
          //                             {
          //                                 "CODE": "KILNGL50",
          //                                 "PRD_DESC": "Studio Kilns"
          //                             },
          //                             {
          //                                 "CODE": "KILNGL60",
          //                                 "PRD_DESC": "Flame Working Kilns"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "KILNS10",
          //                     "PRD_DESC": "Kiln Room",
          //                     "KILNS20": {
          //                         "CODE": "KILNS20",
          //                         "PRD_DESC": "Designing A Kiln Room"
          //                     },
          //                     "KPO": {
          //                         "CODE": "KPO",
          //                         "PRD_DESC": "Kiln Posts"
          //                     },
          //                     "KSH": {
          //                         "CODE": "KSH",
          //                         "PRD_DESC": "Kiln Shelves & Kits"
          //                     },
          //                     "KST": {
          //                         "CODE": "KST",
          //                         "PRD_DESC": "Kiln Stilts"
          //                     },
          //                     "OH4": {
          //                         "CODE": "OH4",
          //                         "PRD_DESC": "Sitter Cones"
          //                     },
          //                     "OH6": {
          //                         "CODE": "OH6",
          //                         "PRD_DESC": "Shelf Cones"
          //                     },
          //                     "KILNS30": {
          //                         "CODE": "KILNS30",
          //                         "PRD_DESC": "Accessories"
          //                     },
          //                     "KILNS40": {
          //                         "CODE": "KILNS40",
          //                         "PRD_DESC": "Most Requested KM Kiln Parts"
          //                     },
          //                     "KILNS50": {
          //                         "CODE": "KILNS50",
          //                         "PRD_DESC": "Most Requested Kiln Sitter Parts"
          //                     },
          //                     "LEASE": {
          //                         "CODE": "LEASE",
          //                         "PRD_DESC": "Kiln Leasing"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "KILNS20",
          //                                 "PRD_DESC": "Designing A Kiln Room"
          //                             },
          //                             {
          //                                 "CODE": "KPO",
          //                                 "PRD_DESC": "Kiln Posts"
          //                             },
          //                             {
          //                                 "CODE": "KSH",
          //                                 "PRD_DESC": "Kiln Shelves & Kits"
          //                             },
          //                             {
          //                                 "CODE": "KST",
          //                                 "PRD_DESC": "Kiln Stilts"
          //                             },
          //                             {
          //                                 "CODE": "OH4",
          //                                 "PRD_DESC": "Sitter Cones"
          //                             },
          //                             {
          //                                 "CODE": "OH6",
          //                                 "PRD_DESC": "Shelf Cones"
          //                             },
          //                             {
          //                                 "CODE": "KILNS30",
          //                                 "PRD_DESC": "Accessories"
          //                             },
          //                             {
          //                                 "CODE": "KILNS40",
          //                                 "PRD_DESC": "Most Requested KM Kiln Parts"
          //                             },
          //                             {
          //                                 "CODE": "KILNS50",
          //                                 "PRD_DESC": "Most Requested Kiln Sitter Parts"
          //                             },
          //                             {
          //                                 "CODE": "LEASE",
          //                                 "PRD_DESC": "Kiln Leasing"
          //                             }
          //                         ]
          //                     ]
          //                 }
          //             ]
          //         ]
          //     },
          //     "GLASS": {
          //         "CODE": "GLASS",
          //         "PRD_DESC": "Glass",
          //         "GLASS96": {
          //             "CODE": "GLASS96",
          //             "PRD_DESC": "System96 Glass",
          //             "GLASS100": {
          //                 "CODE": "GLASS100",
          //                 "PRD_DESC": "Bits"
          //             },
          //             "GLASS105": {
          //                 "CODE": "GLASS105",
          //                 "PRD_DESC": "Blocks"
          //             },
          //             "GLASS110": {
          //                 "CODE": "GLASS110",
          //                 "PRD_DESC": "Buffalo Chips",
          //                 "GLASS111": {
          //                     "CODE": "GLASS111",
          //                     "PRD_DESC": "8 oz."
          //                 },
          //                 "GLASS112": {
          //                     "CODE": "GLASS112",
          //                     "PRD_DESC": "20 oz."
          //                 },
          //                 "GLASS113": {
          //                     "CODE": "GLASS113",
          //                     "PRD_DESC": "5 lbs."
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "GLASS111",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         {
          //                             "CODE": "GLASS112",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         {
          //                             "CODE": "GLASS113",
          //                             "PRD_DESC": "5 lbs."
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "GLASS115": {
          //                 "CODE": "GLASS115",
          //                 "PRD_DESC": "Dichroic Blocks"
          //             },
          //             "GLASS120": {
          //                 "CODE": "GLASS120",
          //                 "PRD_DESC": "Frit",
          //                 "GLASS121": {
          //                     "CODE": "GLASS121",
          //                     "PRD_DESC": "8 oz."
          //                 },
          //                 "GLASS122": {
          //                     "CODE": "GLASS122",
          //                     "PRD_DESC": "20 oz."
          //                 },
          //                 "GLASS123": {
          //                     "CODE": "GLASS123",
          //                     "PRD_DESC": "5 lbs."
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "GLASS121",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         {
          //                             "CODE": "GLASS122",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         {
          //                             "CODE": "GLASS123",
          //                             "PRD_DESC": "5 lbs."
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "GLASS125": {
          //                 "CODE": "GLASS125",
          //                 "PRD_DESC": "Noodles"
          //             },
          //             "GLASS200": {
          //                 "CODE": "GLASS200",
          //                 "PRD_DESC": "Pre Cuts"
          //             },
          //             "GLASS130": {
          //                 "CODE": "GLASS130",
          //                 "PRD_DESC": "Rods"
          //             },
          //             "GLASS150": {
          //                 "CODE": "GLASS150",
          //                 "PRD_DESC": "Sheet Glass",
          //                 "GLASS151": {
          //                     "CODE": "GLASS151",
          //                     "PRD_DESC": "24\" x 24\""
          //                 },
          //                 "GLASS152": {
          //                     "CODE": "GLASS152",
          //                     "PRD_DESC": "12\" x 24\""
          //                 },
          //                 "GLASS153": {
          //                     "CODE": "GLASS153",
          //                     "PRD_DESC": "12\" x 12\""
          //                 },
          //                 "GLASS154": {
          //                     "CODE": "GLASS154",
          //                     "PRD_DESC": "6\" x 12\""
          //                 },
          //                 "GLASS155": {
          //                     "CODE": "GLASS155",
          //                     "PRD_DESC": "21\" x 16\""
          //                 },
          //                 "GLASS156": {
          //                     "CODE": "GLASS156",
          //                     "PRD_DESC": "12\" x 12\" Bases"
          //                 },
          //                 "GLASS157": {
          //                     "CODE": "GLASS157",
          //                     "PRD_DESC": "10\" x 10\" Bases"
          //                 },
          //                 "GLASS158": {
          //                     "CODE": "GLASS158",
          //                     "PRD_DESC": "8\" x 8\" Bases"
          //                 },
          //                 "GLASS159": {
          //                     "CODE": "GLASS159",
          //                     "PRD_DESC": "6\" x 6\" Bases"
          //                 },
          //                 "GLASS160": {
          //                     "CODE": "GLASS160",
          //                     "PRD_DESC": "4\" x 4\" Bases"
          //                 },
          //                 "subMenu": [
          //                     [
          //                         {
          //                             "CODE": "GLASS151",
          //                             "PRD_DESC": "24\" x 24\""
          //                         },
          //                         {
          //                             "CODE": "GLASS152",
          //                             "PRD_DESC": "12\" x 24\""
          //                         },
          //                         {
          //                             "CODE": "GLASS153",
          //                             "PRD_DESC": "12\" x 12\""
          //                         },
          //                         {
          //                             "CODE": "GLASS154",
          //                             "PRD_DESC": "6\" x 12\""
          //                         },
          //                         {
          //                             "CODE": "GLASS155",
          //                             "PRD_DESC": "21\" x 16\""
          //                         },
          //                         {
          //                             "CODE": "GLASS156",
          //                             "PRD_DESC": "12\" x 12\" Bases"
          //                         },
          //                         {
          //                             "CODE": "GLASS157",
          //                             "PRD_DESC": "10\" x 10\" Bases"
          //                         },
          //                         {
          //                             "CODE": "GLASS158",
          //                             "PRD_DESC": "8\" x 8\" Bases"
          //                         },
          //                         {
          //                             "CODE": "GLASS159",
          //                             "PRD_DESC": "6\" x 6\" Bases"
          //                         },
          //                         {
          //                             "CODE": "GLASS160",
          //                             "PRD_DESC": "4\" x 4\" Bases"
          //                         }
          //                     ]
          //                 ]
          //             },
          //             "GLASS180": {
          //                 "CODE": "GLASS180",
          //                 "PRD_DESC": "Strips"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "GLASS100",
          //                         "PRD_DESC": "Bits"
          //                     },
          //                     {
          //                         "CODE": "GLASS105",
          //                         "PRD_DESC": "Blocks"
          //                     },
          //                     {
          //                         "CODE": "GLASS110",
          //                         "PRD_DESC": "Buffalo Chips",
          //                         "GLASS111": {
          //                             "CODE": "GLASS111",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         "GLASS112": {
          //                             "CODE": "GLASS112",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         "GLASS113": {
          //                             "CODE": "GLASS113",
          //                             "PRD_DESC": "5 lbs."
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS111",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS112",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS113",
          //                                     "PRD_DESC": "5 lbs."
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "GLASS115",
          //                         "PRD_DESC": "Dichroic Blocks"
          //                     },
          //                     {
          //                         "CODE": "GLASS120",
          //                         "PRD_DESC": "Frit",
          //                         "GLASS121": {
          //                             "CODE": "GLASS121",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         "GLASS122": {
          //                             "CODE": "GLASS122",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         "GLASS123": {
          //                             "CODE": "GLASS123",
          //                             "PRD_DESC": "5 lbs."
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS121",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS122",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS123",
          //                                     "PRD_DESC": "5 lbs."
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "GLASS125",
          //                         "PRD_DESC": "Noodles"
          //                     },
          //                     {
          //                         "CODE": "GLASS200",
          //                         "PRD_DESC": "Pre Cuts"
          //                     },
          //                     {
          //                         "CODE": "GLASS130",
          //                         "PRD_DESC": "Rods"
          //                     },
          //                     {
          //                         "CODE": "GLASS150",
          //                         "PRD_DESC": "Sheet Glass",
          //                         "GLASS151": {
          //                             "CODE": "GLASS151",
          //                             "PRD_DESC": "24\" x 24\""
          //                         },
          //                         "GLASS152": {
          //                             "CODE": "GLASS152",
          //                             "PRD_DESC": "12\" x 24\""
          //                         },
          //                         "GLASS153": {
          //                             "CODE": "GLASS153",
          //                             "PRD_DESC": "12\" x 12\""
          //                         },
          //                         "GLASS154": {
          //                             "CODE": "GLASS154",
          //                             "PRD_DESC": "6\" x 12\""
          //                         },
          //                         "GLASS155": {
          //                             "CODE": "GLASS155",
          //                             "PRD_DESC": "21\" x 16\""
          //                         },
          //                         "GLASS156": {
          //                             "CODE": "GLASS156",
          //                             "PRD_DESC": "12\" x 12\" Bases"
          //                         },
          //                         "GLASS157": {
          //                             "CODE": "GLASS157",
          //                             "PRD_DESC": "10\" x 10\" Bases"
          //                         },
          //                         "GLASS158": {
          //                             "CODE": "GLASS158",
          //                             "PRD_DESC": "8\" x 8\" Bases"
          //                         },
          //                         "GLASS159": {
          //                             "CODE": "GLASS159",
          //                             "PRD_DESC": "6\" x 6\" Bases"
          //                         },
          //                         "GLASS160": {
          //                             "CODE": "GLASS160",
          //                             "PRD_DESC": "4\" x 4\" Bases"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS151",
          //                                     "PRD_DESC": "24\" x 24\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS152",
          //                                     "PRD_DESC": "12\" x 24\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS153",
          //                                     "PRD_DESC": "12\" x 12\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS154",
          //                                     "PRD_DESC": "6\" x 12\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS155",
          //                                     "PRD_DESC": "21\" x 16\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS156",
          //                                     "PRD_DESC": "12\" x 12\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS157",
          //                                     "PRD_DESC": "10\" x 10\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS158",
          //                                     "PRD_DESC": "8\" x 8\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS159",
          //                                     "PRD_DESC": "6\" x 6\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS160",
          //                                     "PRD_DESC": "4\" x 4\" Bases"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     {
          //                         "CODE": "GLASS180",
          //                         "PRD_DESC": "Strips"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "BIMOLDS": {
          //             "CODE": "BIMOLDS",
          //             "PRD_DESC": "Glass Molds"
          //         },
          //         "GLPAINT30": {
          //             "CODE": "GLPAINT30",
          //             "PRD_DESC": "GlassLine Paints Individual Writers"
          //         },
          //         "GLTOOLS": {
          //             "CODE": "GLTOOLS",
          //             "PRD_DESC": "Glass Tools",
          //             "GLART10": {
          //                 "CODE": "GLART10",
          //                 "PRD_DESC": "Individual Artist Tools"
          //             },
          //             "GLSHOP10": {
          //                 "CODE": "GLSHOP10",
          //                 "PRD_DESC": "Individual Shop Tools"
          //             },
          //             "subMenu": [
          //                 [
          //                     {
          //                         "CODE": "GLART10",
          //                         "PRD_DESC": "Individual Artist Tools"
          //                     },
          //                     {
          //                         "CODE": "GLSHOP10",
          //                         "PRD_DESC": "Individual Shop Tools"
          //                     }
          //                 ]
          //             ]
          //         },
          //         "subMenu": [
          //             [
          //                 {
          //                     "CODE": "GLASS96",
          //                     "PRD_DESC": "System96 Glass",
          //                     "GLASS100": {
          //                         "CODE": "GLASS100",
          //                         "PRD_DESC": "Bits"
          //                     },
          //                     "GLASS105": {
          //                         "CODE": "GLASS105",
          //                         "PRD_DESC": "Blocks"
          //                     },
          //                     "GLASS110": {
          //                         "CODE": "GLASS110",
          //                         "PRD_DESC": "Buffalo Chips",
          //                         "GLASS111": {
          //                             "CODE": "GLASS111",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         "GLASS112": {
          //                             "CODE": "GLASS112",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         "GLASS113": {
          //                             "CODE": "GLASS113",
          //                             "PRD_DESC": "5 lbs."
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS111",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS112",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS113",
          //                                     "PRD_DESC": "5 lbs."
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "GLASS115": {
          //                         "CODE": "GLASS115",
          //                         "PRD_DESC": "Dichroic Blocks"
          //                     },
          //                     "GLASS120": {
          //                         "CODE": "GLASS120",
          //                         "PRD_DESC": "Frit",
          //                         "GLASS121": {
          //                             "CODE": "GLASS121",
          //                             "PRD_DESC": "8 oz."
          //                         },
          //                         "GLASS122": {
          //                             "CODE": "GLASS122",
          //                             "PRD_DESC": "20 oz."
          //                         },
          //                         "GLASS123": {
          //                             "CODE": "GLASS123",
          //                             "PRD_DESC": "5 lbs."
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS121",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS122",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS123",
          //                                     "PRD_DESC": "5 lbs."
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "GLASS125": {
          //                         "CODE": "GLASS125",
          //                         "PRD_DESC": "Noodles"
          //                     },
          //                     "GLASS200": {
          //                         "CODE": "GLASS200",
          //                         "PRD_DESC": "Pre Cuts"
          //                     },
          //                     "GLASS130": {
          //                         "CODE": "GLASS130",
          //                         "PRD_DESC": "Rods"
          //                     },
          //                     "GLASS150": {
          //                         "CODE": "GLASS150",
          //                         "PRD_DESC": "Sheet Glass",
          //                         "GLASS151": {
          //                             "CODE": "GLASS151",
          //                             "PRD_DESC": "24\" x 24\""
          //                         },
          //                         "GLASS152": {
          //                             "CODE": "GLASS152",
          //                             "PRD_DESC": "12\" x 24\""
          //                         },
          //                         "GLASS153": {
          //                             "CODE": "GLASS153",
          //                             "PRD_DESC": "12\" x 12\""
          //                         },
          //                         "GLASS154": {
          //                             "CODE": "GLASS154",
          //                             "PRD_DESC": "6\" x 12\""
          //                         },
          //                         "GLASS155": {
          //                             "CODE": "GLASS155",
          //                             "PRD_DESC": "21\" x 16\""
          //                         },
          //                         "GLASS156": {
          //                             "CODE": "GLASS156",
          //                             "PRD_DESC": "12\" x 12\" Bases"
          //                         },
          //                         "GLASS157": {
          //                             "CODE": "GLASS157",
          //                             "PRD_DESC": "10\" x 10\" Bases"
          //                         },
          //                         "GLASS158": {
          //                             "CODE": "GLASS158",
          //                             "PRD_DESC": "8\" x 8\" Bases"
          //                         },
          //                         "GLASS159": {
          //                             "CODE": "GLASS159",
          //                             "PRD_DESC": "6\" x 6\" Bases"
          //                         },
          //                         "GLASS160": {
          //                             "CODE": "GLASS160",
          //                             "PRD_DESC": "4\" x 4\" Bases"
          //                         },
          //                         "subMenu": [
          //                             [
          //                                 {
          //                                     "CODE": "GLASS151",
          //                                     "PRD_DESC": "24\" x 24\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS152",
          //                                     "PRD_DESC": "12\" x 24\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS153",
          //                                     "PRD_DESC": "12\" x 12\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS154",
          //                                     "PRD_DESC": "6\" x 12\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS155",
          //                                     "PRD_DESC": "21\" x 16\""
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS156",
          //                                     "PRD_DESC": "12\" x 12\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS157",
          //                                     "PRD_DESC": "10\" x 10\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS158",
          //                                     "PRD_DESC": "8\" x 8\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS159",
          //                                     "PRD_DESC": "6\" x 6\" Bases"
          //                                 },
          //                                 {
          //                                     "CODE": "GLASS160",
          //                                     "PRD_DESC": "4\" x 4\" Bases"
          //                                 }
          //                             ]
          //                         ]
          //                     },
          //                     "GLASS180": {
          //                         "CODE": "GLASS180",
          //                         "PRD_DESC": "Strips"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "GLASS100",
          //                                 "PRD_DESC": "Bits"
          //                             },
          //                             {
          //                                 "CODE": "GLASS105",
          //                                 "PRD_DESC": "Blocks"
          //                             },
          //                             {
          //                                 "CODE": "GLASS110",
          //                                 "PRD_DESC": "Buffalo Chips",
          //                                 "GLASS111": {
          //                                     "CODE": "GLASS111",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 "GLASS112": {
          //                                     "CODE": "GLASS112",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 "GLASS113": {
          //                                     "CODE": "GLASS113",
          //                                     "PRD_DESC": "5 lbs."
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "GLASS111",
          //                                             "PRD_DESC": "8 oz."
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS112",
          //                                             "PRD_DESC": "20 oz."
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS113",
          //                                             "PRD_DESC": "5 lbs."
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "GLASS115",
          //                                 "PRD_DESC": "Dichroic Blocks"
          //                             },
          //                             {
          //                                 "CODE": "GLASS120",
          //                                 "PRD_DESC": "Frit",
          //                                 "GLASS121": {
          //                                     "CODE": "GLASS121",
          //                                     "PRD_DESC": "8 oz."
          //                                 },
          //                                 "GLASS122": {
          //                                     "CODE": "GLASS122",
          //                                     "PRD_DESC": "20 oz."
          //                                 },
          //                                 "GLASS123": {
          //                                     "CODE": "GLASS123",
          //                                     "PRD_DESC": "5 lbs."
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "GLASS121",
          //                                             "PRD_DESC": "8 oz."
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS122",
          //                                             "PRD_DESC": "20 oz."
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS123",
          //                                             "PRD_DESC": "5 lbs."
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "GLASS125",
          //                                 "PRD_DESC": "Noodles"
          //                             },
          //                             {
          //                                 "CODE": "GLASS200",
          //                                 "PRD_DESC": "Pre Cuts"
          //                             },
          //                             {
          //                                 "CODE": "GLASS130",
          //                                 "PRD_DESC": "Rods"
          //                             },
          //                             {
          //                                 "CODE": "GLASS150",
          //                                 "PRD_DESC": "Sheet Glass",
          //                                 "GLASS151": {
          //                                     "CODE": "GLASS151",
          //                                     "PRD_DESC": "24\" x 24\""
          //                                 },
          //                                 "GLASS152": {
          //                                     "CODE": "GLASS152",
          //                                     "PRD_DESC": "12\" x 24\""
          //                                 },
          //                                 "GLASS153": {
          //                                     "CODE": "GLASS153",
          //                                     "PRD_DESC": "12\" x 12\""
          //                                 },
          //                                 "GLASS154": {
          //                                     "CODE": "GLASS154",
          //                                     "PRD_DESC": "6\" x 12\""
          //                                 },
          //                                 "GLASS155": {
          //                                     "CODE": "GLASS155",
          //                                     "PRD_DESC": "21\" x 16\""
          //                                 },
          //                                 "GLASS156": {
          //                                     "CODE": "GLASS156",
          //                                     "PRD_DESC": "12\" x 12\" Bases"
          //                                 },
          //                                 "GLASS157": {
          //                                     "CODE": "GLASS157",
          //                                     "PRD_DESC": "10\" x 10\" Bases"
          //                                 },
          //                                 "GLASS158": {
          //                                     "CODE": "GLASS158",
          //                                     "PRD_DESC": "8\" x 8\" Bases"
          //                                 },
          //                                 "GLASS159": {
          //                                     "CODE": "GLASS159",
          //                                     "PRD_DESC": "6\" x 6\" Bases"
          //                                 },
          //                                 "GLASS160": {
          //                                     "CODE": "GLASS160",
          //                                     "PRD_DESC": "4\" x 4\" Bases"
          //                                 },
          //                                 "subMenu": [
          //                                     [
          //                                         {
          //                                             "CODE": "GLASS151",
          //                                             "PRD_DESC": "24\" x 24\""
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS152",
          //                                             "PRD_DESC": "12\" x 24\""
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS153",
          //                                             "PRD_DESC": "12\" x 12\""
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS154",
          //                                             "PRD_DESC": "6\" x 12\""
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS155",
          //                                             "PRD_DESC": "21\" x 16\""
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS156",
          //                                             "PRD_DESC": "12\" x 12\" Bases"
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS157",
          //                                             "PRD_DESC": "10\" x 10\" Bases"
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS158",
          //                                             "PRD_DESC": "8\" x 8\" Bases"
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS159",
          //                                             "PRD_DESC": "6\" x 6\" Bases"
          //                                         },
          //                                         {
          //                                             "CODE": "GLASS160",
          //                                             "PRD_DESC": "4\" x 4\" Bases"
          //                                         }
          //                                     ]
          //                                 ]
          //                             },
          //                             {
          //                                 "CODE": "GLASS180",
          //                                 "PRD_DESC": "Strips"
          //                             }
          //                         ]
          //                     ]
          //                 },
          //                 {
          //                     "CODE": "BIMOLDS",
          //                     "PRD_DESC": "Glass Molds"
          //                 },
          //                 {
          //                     "CODE": "GLPAINT30",
          //                     "PRD_DESC": "GlassLine Paints Individual Writers"
          //                 },
          //                 {
          //                     "CODE": "GLTOOLS",
          //                     "PRD_DESC": "Glass Tools",
          //                     "GLART10": {
          //                         "CODE": "GLART10",
          //                         "PRD_DESC": "Individual Artist Tools"
          //                     },
          //                     "GLSHOP10": {
          //                         "CODE": "GLSHOP10",
          //                         "PRD_DESC": "Individual Shop Tools"
          //                     },
          //                     "subMenu": [
          //                         [
          //                             {
          //                                 "CODE": "GLART10",
          //                                 "PRD_DESC": "Individual Artist Tools"
          //                             },
          //                             {
          //                                 "CODE": "GLSHOP10",
          //                                 "PRD_DESC": "Individual Shop Tools"
          //                             }
          //                         ]
          //                     ]
          //                 }
          //             ]
          //         ]
          //     },
          //     "subMenu": []
          //   }
          // // console.log(obj);
          //     setCategoryList(obj);


            await axios.get(NavigationAPI)
              .then(res => {
                const obj = res.data;
                menuArray.push(obj)
                // console.log(menuArray);
               const flattenObj = (obj, parent, res = {}) => {
                       const index = "subMenu";
                       let nItem = [];
                      for (const key of Object.keys(obj)) {
                        // console.log(key);
                        // // if(parent != undefined){
                        // //    obj[key]["subMenu"] = [];
                        // // }
                        const propName = parent ? parent : key;
                        // console.log(propName);
                        // console.log(typeof obj[key]);
                        // obj[key][index] = [];
                        if (typeof obj[key] === 'object') {
                            if(key != propName){
                                nItem.push(obj[key]);
                            }
                            obj[index] =[];
                            // console.log(nItem);
                            if(nItem.length > 0){
                                obj[index].push(nItem);
                            }
                           //  console.log(obj);
                           // console.log(parent);
                           // console.log(res);
                            flattenObj(obj[key], propName, res);
                        } else {
                          res[propName] = obj[key];
                        }
                      }
                      return res;
                }

                const flattened = flattenObj(menuArray[0]);
                // console.log(menuArray[0]);
                setCategoryList(menuArray[0]);
            })
          };
        handleAddClick();
        fetchCategList();
        if(params.id != undefined && initData == '0'){
           fetchPrefillData();     
        }
        
    }, []);
    
    const fetchPrefillData =  async ()=>{

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            withCredentials: false,
            itemId:params.id,
            action: "PRODUCTIDINFO"
        };
        // const formData = new FormData();
        // formData.append('File', selectedFile);
        
        const fetchInfo  = await axios.post(apiUrl+"fetch_ceramics.php", requestOptions);
        // console.log("fetChData: ", fetchInfo.data);
        if(fetchInfo != undefined && fetchInfo.data){
            // const filtered =  Object.keys(categoryList).find(key => categoryList[key].indexOf(fetchInfo.data.category_code) > -1);
            // console.log("jhakkakaassssssss");
            // console.log(filtered);
            const parseSUbCateg = fetchInfo.data.subCategCodes !== "" && JSON.parse(fetchInfo.data.subCategCodes);
            // console.log("subCatg: ", parseSUbCateg)
            setActiveData(parseSUbCateg)
            
            // setValue('category_list',fetchInfo.data?.category_name);
            const updatedTabsInfo = updateQuotesSorted(fetchInfo.data?.tabs_data);
            let parseTabs= updatedTabsInfo;
            tabInfoPrefill = parseTabs;
            setInputList(parseTabs); 
            if(categoryList != null){
                for (const key of Object.keys(categoryList)) {
                    if(categoryList[key][fetchInfo.data.category_code]){
                        const activeCateg = categoryList[key][fetchInfo.data.category_code];
                        setValue('category_list', JSON.stringify(activeCateg));
                        setCategChain([{CODE : activeCateg.CODE, PRD_DESC: activeCateg.PRD_DESC, subMenu: activeCateg.subMenu[0]}]);
                    }   
                }
                // console.log("plist", productList)
                if(productList != null){
                  const activeP = productList.filter((x)=>x.item_code == params.id);
                   // console.log("I am here");
                   // console.log(activeP);
                  // const activeJson = categoryList[key][fetchInfo.data.category_code];
                            // setValue('category_list', JSON.stringify(activeCateg));
                  setValue('productSku', JSON.stringify(activeP[0]));  
                  setSelectedProduct([{Item_Code : activeP[0].Item_Code, Item_Desc: activeP[0].Item_Desc}]);
                }
                
                
                return; 
            } 
          initData = '1';
        }
    }
    
   function getArraySorted(){
       // let tdataNew = [];
      /* for(var m=0; m<inputList.length; m++){
           if(inputList[m].tabcontent.indexOf('"') > -1){
               // console.log("Jhakkass");
               // console.log(inputList[m].tabcontent);
               const newText = inputList[m].tabcontent.replace(/"/g,"&quot;");
               inputList[m].tabcontent = newText;
               // console.log(inputList[m].tabcontent);               
           }
       }*/
       return inputList;
   }
   function updateQuotesSorted(TabsData){
       // let tdataNew = [];
       for(var m=0; m<TabsData.length; m++){
           if(TabsData[m].tabcontent !== null && TabsData[m].tabcontent.indexOf('&quot;') > -1){
               // console.log("Jhakkass");
               // console.log(TabsData[m].tabcontent);
               const newText = TabsData[m].tabcontent.replace(/&quot;/g,'"');
               TabsData[m].tabcontent = newText;
               // console.log(TabsData[m].tabcontent);               
           }
       }
       return TabsData;
   }
    
  const onSubmit = async (data) => { 
       console.log(data);
       const tabDataArray = getArraySorted();
      // console.log(tabDataArray);
      // console.log(selectedProduct);
      // return;
      
        const parentCategName = data.category_list !== "" ? JSON.parse(data.category_list) : "";
        // console.log(parentCategName);
       let requestOptions ={};
       const formData = new FormData();
      
      if(params.id!=undefined){
          formData.append("ITEM_CODE",  (selectedProduct.length === 0) ? params.id : selectedProduct[0]?.Item_Code);
           formData.append("description", (selectedProduct.length === 0) ? "" : selectedProduct[0]?.Item_Desc);
           formData.append("tabsArray", JSON.stringify(tabDataArray));
           formData.append("action", "EDIT");
           formData.append("rowId", params.id);
           formData.append("categoryName", parentCategName.PRD_DESC);
           formData.append("subCategariesList", JSON.stringify(subCategList));
           formData.append("categoryCode", parentCategName.CODE); 
           formData.append("seo_title", seojson?.title);
           formData.append("seo_desc", seojson?.desc);
      }else{
           formData.append("ITEM_CODE",selectedProduct[0]?.Item_Code);
           formData.append("description", selectedProduct[0]?.Item_Desc);
           formData.append("tabsArray", JSON.stringify(tabDataArray));
           formData.append("action", "ADD");
           formData.append("rowId", 0);
           formData.append("categoryName", parentCategName.PRD_DESC);
           formData.append("subCategariesList", JSON.stringify(subCategList));
           formData.append("categoryCode", parentCategName.CODE); 
           formData.append("seo_title", seojson?.title);
           formData.append("seo_desc", seojson?.desc); 
      }
      
        
         
        // console.log(apiUrl);
        // return;    
        const res  = await axios.post(apiUrl+"add_productDetails.php", formData, {headers: { "Content-Type": "multipart/form-data" }});
        // console.log(res);
        if(res.data.status == true){
            setStatus('1');
            setMessage(res.data.message);
        }else{
            setStatus('0');    
            setMessage(res.data.message);
        }                

  };
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote', 'code'],
      [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  }

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 'code',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
  ]

  
  const handleAddClick = () => {
    setInputList([...inputList, { tabtitle: "", tabcontent: ""}]);
  };
  const handleChangeContent = (event,index,name)=>{
    // console.log(event);
    // console.log(inputList);
    // console.log(name);
    if(name == "tabtitle"){
      
      

      const newState = inputList.map((obj, i) => {
          // console.log(obj);
          if(index==i){
            return {...obj, tabtitle:event.target.value};
          }
        return obj;
      });
      setInputList(newState);
    }else{

      const newState = inputList.map((obj, i) => {
          // console.log(obj);
          if(index==i && name == 'tabcontent'){
            return {...obj, tabcontent: event};
          }
        return obj;
      });
      setInputList(newState);
    }
  
  }
    const changeHandler = (event) => {
        let file = event.target.files[0];
        // console.log(file);
        setMessage("");
        setStatus('');
        const fileExt = file.name.split('.').pop().toLowerCase();
        // console.log(fileExt);
        if ( /\.(jpe?g|png|gif|mp4)$/i.test(file.name) === false ) { 
            alert("Not an image or video (mp4) file!");
            setSelectedFile();
            return;
        }else{
            setSelectedFile(event.target.files[0]);
            if(fileExt.toLowerCase() == 'mp4'){
                setFileType('video');
            }else{
                setFileType("image");     
            }
            
        }
        
    };
    const selectMainCateg = (event)=>{
        // console.log(event);
        const paresData = JSON.parse(event.target.value);
        // console.log(paresData);
        if(paresData?.subMenu != undefined){
          setCategChain([{CODE : paresData.CODE, PRD_DESC: paresData.PRD_DESC, subMenu: paresData.subMenu[0]}]);    
        }else{
          setCategChain([{CODE : paresData.CODE, PRD_DESC: paresData.PRD_DESC, subMenu: []}]);
          fetchProducts(paresData.CODE);
        }
        // console.log(categChain);
        
        
    }
    const selectProduct = (event)=>{
        // console.log(event);
        const paresData = JSON.parse(event.target.value);
        // console.log(paresData);
        setSelectedProduct([{Item_Code : paresData.Item_Code, Item_Desc: paresData.Item_Desc}]);
    }
    const sendDataToParent = (index) =>{ // the callback. Use a better name
        // console.log(index);
        setSubCategList(index);
        const getLastElement = index[index.length-1];
        // console.log(getLastElement);
        fetchProducts(getLastElement.CODE);
    }
    const fetchProducts = async (cateCode) =>{
      setIsLoading(true);
      // console.log(cateCode);
      const requestOptions = {
        categId :cateCode,
        customerId:"",
        cust_level: "",
        countryCode: "",
        cname: "",
        session: ""
      } 
      // let URL = 'https://dev.ceramicarts.com/API/LoadProductItems.php';
      // FetchProducts
      await axios.post(FetchProducts, requestOptions)
        .then(res => {
          // console.log(res.data);
          const obj = res.data;
          // console.log(menuArray[0]);
          if(obj.ITEMS != undefined && obj.ITEMS.length > 0){
            // console.log(obj.ITEMS)
            setProductList(obj.ITEMS);
            setIsLoading(false);
          }else{
            setProductList([]);
            setIsLoading(false);
          }

      })
      // if(productList != null){
         

      // } 
    }
    const handleSeoData=(data)=>{
      console.log(data);
      setSeoJson(data)
    }
  return (
      <div className="">
        {isLoading && <LoadingSpinner /> }
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="">
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2 text-gray-600">Category List</label>
              <select {...register("category_list")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" onChange={selectMainCateg}>
                <option value="">Choose Catgeory</option>
                {categoryList != null && Object.keys(categoryList).map((menukey, menuValue) => (
                    <optgroup label={categoryList[menukey].PRD_DESC}>
                        {(categoryList[menukey]?.subMenu && categoryList[menukey].subMenu[0].length >0) && categoryList[menukey].subMenu[0].map((subMenuObject, index) => {
                              return(
                                    <option value={JSON.stringify(subMenuObject)} key={"optionVal_"+index}>{subMenuObject.PRD_DESC}</option>  
                              )
                        })}
                      </optgroup>
                    
                    
                ))}
              </select>

            </div>
            <div className="flex mb-5">
                {categChain[0]?.subMenu != undefined && categChain[0]?.subMenu.length > 0 && (
                    <ListDropdown options={categChain[0].subMenu} dept={0} sendDataToParent={sendDataToParent} selectedData={(params.id != undefined) && activeData} />
                )}
            </div>
          </div>
          {productList != null && (
            <div className="flex flex-col">
              <label className="font-semibold text-lg mb-2 text-gray-600">Choose Product</label>
              <select {...register("productSku")} className="w-56 outline-none border border-gray-400 rounded p-2 mb-6" onChange={selectProduct}>
                <option value="">Choose Product</option>
                {productList != null && productList.map((pitem, pindex) => (
                  <>
                  <option value={JSON.stringify(pitem)} key={"p"+pindex}>{pitem.Item_Code}-{pitem.Item_Desc}</option>
                  </>
                ))}
              </select>
            </div>
          )}
          <div className="mt-4">
            <div className="flex items-top mb-10 justify-between">
              <h2 className="text-xl font-bold ">Tabs</h2>
              {inputList.length < 4 &&(
                <button className="inline-flex w-32 items-center bg-transparent " type="button">
                  <IoAddCircleOutline onClick={handleAddClick} className="w-7 h-7 cursor-pointer mr-1"/>
                  Add More
                </button>
              )}
            </div>
            <div>
              {inputList.map((items,index)=>{
                return(
                  <div className="">
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Title</label>
                        <input
                          placeholder="Enter Title"
                          defaultValue={(items.tabtitle != '') ? items.tabtitle : ""}
                          className="px-3 py-2 outline-none border border-gray-400 mb-4"
                          onChange={(e)=>handleChangeContent(e,index,'tabtitle')}
                        />
                    </div>
                    <div className="flex flex-col">
                      <label className="font-semibold text-lg mb-2 text-gray-600">Content</label>
                      <div className="mb-20">
                        <JoditEditor
                          config={config}
                          value={items.tabcontent}
                          tabIndex={"tabsC_"+index} // tabIndex of textarea
                          onChange={(e)=>handleChangeContent(e,index,'tabcontent')}
                        />
                        
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            <div>
                <SeoForm seoData={handleSeoData}/>   
            </div>
          </div>
          <div className="flex items-center gap-10">
              <button className="w-32 bg-gray-600 px-4 py-2 text-white rounded">Submit</button>
                {message !='' && (
                    <div className={status=='0'?"text-red-100":"text-greenBase "}>{message}</div>
                )}
           </div>
        </form>
      </div>
 );
};

export default AddProduct;