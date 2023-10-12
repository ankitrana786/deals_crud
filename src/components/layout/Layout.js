import React, { useEffect, useState } from 'react';
import Header from "./header/header";
import Footer from "../footer/footer";
import MobileNavigation from "./mobile-navigation/mobile-navigation";
import Logo from '../Ui/Logo';
import NavigationAPI from "../../API/LoadMenuItems.php";
import axios from "axios";
import HeaderLoader from "../Ui/loaders/header-loader";


const Layout =({children}) =>{
	const [mainMenu, setMegamenu] = useState(null);
	useEffect(() => {
        let menuArray = [];
        const fetchMenu = async () =>{
            // let obj ={
            //     "BISQUE": {
            //         "CODE": "BISQUE",
            //         "PRD_DESC": "Bisque",
            //         "WBISQUE": {
            //             "CODE": "WBISQUE",
            //             "PRD_DESC": "Best Sellers In Stock",
            //             "BSP180": {
            //                 "CODE": "BSP180",
            //                 "PRD_DESC": "Bisque Prep Tools"
            //             },
            //             "WBISQUE20": {
            //                 "CODE": "WBISQUE20",
            //                 "PRD_DESC": "Banks"
            //             },
            //             "WBISQUE45": {
            //                 "CODE": "WBISQUE45",
            //                 "PRD_DESC": "Bowls"
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
            //             "WBISQUE90": {
            //                 "CODE": "WBISQUE90",
            //                 "PRD_DESC": "Plates"
            //             },
            //             "WBISQUE110": {
            //                 "CODE": "WBISQUE110",
            //                 "PRD_DESC": "Tiles"
            //             }
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
            //             }
            //         },
            //         "WAMMIEW": {
            //             "CODE": "WAMMIEW",
            //             "PRD_DESC": "Ammie Williams Collection"
            //         },
            //         "WBIS110": {
            //             "CODE": "WBIS110",
            //             "PRD_DESC": "Banks",
            //             "XBANKA100": {
            //                 "CODE": "XBANKA100",
            //                 "PRD_DESC": "African"
            //             },
            //             "XBANKA110": {
            //                 "CODE": "XBANKA110",
            //                 "PRD_DESC": "Birds"
            //             },
            //             "XBANKA120": {
            //                 "CODE": "XBANKA120",
            //                 "PRD_DESC": "Cats"
            //             },
            //             "XBANKA130": {
            //                 "CODE": "XBANKA130",
            //                 "PRD_DESC": "Dinos & Dragons"
            //             },
            //             "XBANKA140": {
            //                 "CODE": "XBANKA140",
            //                 "PRD_DESC": "Dogs"
            //             },
            //             "XBANKA150": {
            //                 "CODE": "XBANKA150",
            //                 "PRD_DESC": "Farm"
            //             },
            //             "XBANKA160": {
            //                 "CODE": "XBANKA160",
            //                 "PRD_DESC": "Sea Life"
            //             },
            //             "XBANK40": {
            //                 "CODE": "XBANK40",
            //                 "PRD_DESC": "Food Banks"
            //             },
            //             "XBANKA170": {
            //                 "CODE": "XBANKA170",
            //                 "PRD_DESC": "Horses & Unicorns"
            //             },
            //             "XBANK95": {
            //                 "CODE": "XBANK95",
            //                 "PRD_DESC": "Miscellaneous Banks"
            //             },
            //             "XBANK25": {
            //                 "CODE": "XBANK25",
            //                 "PRD_DESC": "Monsters, Characters & Friends"
            //             },
            //             "XBANKA210": {
            //                 "CODE": "XBANKA210",
            //                 "PRD_DESC": "Other"
            //             },
            //             "XBANKA180": {
            //                 "CODE": "XBANKA180",
            //                 "PRD_DESC": "Penguins"
            //             },
            //             "XBANKA190": {
            //                 "CODE": "XBANKA190",
            //                 "PRD_DESC": "Piggy Banks"
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
            //             "XBANKA200": {
            //                 "CODE": "XBANKA200",
            //                 "PRD_DESC": "Turtles, Frogs, Insects"
            //             }
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
            //             }
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
            //             }
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
            //             }
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
            //             }
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
            //             }
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
            //             "XKIDSBBMT": {
            //                 "CODE": "XKIDSBBMT",
            //                 "PRD_DESC": "Might Tots \"BB\""
            //             },
            //             "XKIDS95": {
            //                 "CODE": "XKIDS95",
            //                 "PRD_DESC": "Miscellaneous Kid Objects"
            //             },
            //             "XKIDS10": {
            //                 "CODE": "XKIDS10",
            //                 "PRD_DESC": "Other Animals"
            //             },
            //             "XKIDS74": {
            //                 "CODE": "XKIDS74",
            //                 "PRD_DESC": "Party Bisque Imports"
            //             },
            //             "XKIDS33": {
            //                 "CODE": "XKIDS33",
            //                 "PRD_DESC": "Party Duncan"
            //             },
            //             "XKIDS72": {
            //                 "CODE": "XKIDS72",
            //                 "PRD_DESC": "Party Gare"
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
            //             "XKIDS50": {
            //                 "CODE": "XKIDS50",
            //                 "PRD_DESC": "Sports"
            //             },
            //             "XKIDS15": {
            //                 "CODE": "XKIDS15",
            //                 "PRD_DESC": "Transportation"
            //             },
            //             "XKIDS45": {
            //                 "CODE": "XKIDS45",
            //                 "PRD_DESC": "Turtles"
            //             }
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
            //             }
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
            //             }
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
            //             }
            //         },
            //         "WBIS220": {
            //             "CODE": "WBIS220",
            //             "PRD_DESC": "Seasonal",
            //             "XWINT10": {
            //                 "CODE": "XWINT10",
            //                 "PRD_DESC": "Christmas Kitchen, Plates, Bowls, etc."
            //             },
            //             "XWINT60": {
            //                 "CODE": "XWINT60",
            //                 "PRD_DESC": "Christmas Nativity"
            //             },
            //             "XWINT20": {
            //                 "CODE": "XWINT20",
            //                 "PRD_DESC": "Christmas Ornaments Flat"
            //             },
            //             "XWINT35": {
            //                 "CODE": "XWINT35",
            //                 "PRD_DESC": "Christmas Ornaments 3 Dimensional"
            //             },
            //             "XWINT30": {
            //                 "CODE": "XWINT30",
            //                 "PRD_DESC": "Christmas Miscellaneous"
            //             },
            //             "XWINT40": {
            //                 "CODE": "XWINT40",
            //                 "PRD_DESC": "Christmas Trees & Wreathes"
            //             },
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
            //             }
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
            //             }
            //         },
            //         "WBIS250": {
            //             "CODE": "WBIS250",
            //             "PRD_DESC": "Tiles & Plaques",
            //             "XTILE45": {
            //                 "CODE": "XTILE45",
            //                 "PRD_DESC": "Coaster + Palette Tray + Tile Accessories"
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
            //             "XTILE70": {
            //                 "CODE": "XTILE70",
            //                 "PRD_DESC": "Wall Plaques"
            //             }
            //         },
            //         "XSTONE": {
            //             "CODE": "XSTONE",
            //             "PRD_DESC": "Stoneware"
            //         }
            //     },
            //     "PAINTS": {
            //         "CODE": "PAINTS",
            //         "PRD_DESC": "Paints/Glazes",
            //         "MAYPAINT": {
            //             "CODE": "MAYPAINT",
            //             "PRD_DESC": "Mayco",
            //             "MAYLIT": {
            //                 "CODE": "MAYLIT",
            //                 "PRD_DESC": "Mayco Colour Brochures"
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
            //                     "DUNFIEZ1": {
            //                         "CODE": "DUNFIEZ1",
            //                         "PRD_DESC": "EZ Strokes, 1oz."
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
            //                     "DUNFIFD1": {
            //                         "CODE": "DUNFIFD1",
            //                         "PRD_DESC": "French Dimensions, 1oz."
            //                     },
            //                     "DUNFIOG": {
            //                         "CODE": "DUNFIOG",
            //                         "PRD_DESC": "Overglazes and Accessories"
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
            //                     }
            //                 },
            //                 "MAYHF": {
            //                     "CODE": "MAYHF",
            //                     "PRD_DESC": "Cone 5-6 Glazes",
            //                     "WMAYHFFN": {
            //                         "CODE": "WMAYHFFN",
            //                         "PRD_DESC": "Foundations - No Change at Cone 6"
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
            //                     }
            //                 }
            //             },
            //             "MAYNF": {
            //                 "CODE": "MAYNF",
            //                 "PRD_DESC": "Non-Fired",
            //                 "DUNNFOS2": {
            //                     "CODE": "DUNNFOS2",
            //                     "PRD_DESC": "Bisq-Stain OS, 2oz."
            //                 },
            //                 "DUNNFOS8": {
            //                     "CODE": "DUNNFOS8",
            //                     "PRD_DESC": "Bisq-Stain OS, 8oz."
            //                 },
            //                 "DUNNFSG2": {
            //                     "CODE": "DUNNFSG2",
            //                     "PRD_DESC": "Brush-On Glitter, 2oz."
            //                 },
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
            //                 "DUNNFAS": {
            //                     "CODE": "DUNNFAS",
            //                     "PRD_DESC": "Specialty Products"
            //                 },
            //                 "DUNNFUM2": {
            //                     "CODE": "DUNNFUM2",
            //                     "PRD_DESC": "Ultra Metallics, 2oz."
            //                 }
            //             }
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
            //                 }
            //             },
            //             "GARENF": {
            //                 "CODE": "GARENF",
            //                 "PRD_DESC": "Non-Fired",
            //                 "GARNFPP5": {
            //                     "CODE": "GARNFPP5",
            //                     "PRD_DESC": "Party Paint Acrylics, Pints"
            //                 },
            //                 "DUNFIPBD35": {
            //                     "CODE": "DUNFIPBD35",
            //                     "PRD_DESC": "Pure Brilliance"
            //                 }
            //             }
            //         },
            //         "AMACOPAINT": {
            //             "CODE": "AMACOPAINT",
            //             "PRD_DESC": "Amaco Glazes & Underglazes",
            //             "AMACOLF": {
            //                 "CODE": "AMACOLF",
            //                 "PRD_DESC": "Cone 04-06",
            //                 "DUNFISY": {
            //                     "CODE": "DUNFISY",
            //                     "PRD_DESC": "Specialty Fired Products"
            //                 },
            //                 "AMACO70": {
            //                     "CODE": "AMACO70",
            //                     "PRD_DESC": "Velvet Underglazes"
            //                 }
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
            //                 }
            //             }
            //         }
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
            //             }
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
            //             }
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
            //             }
            //         },
            //         "PROTOOL": {
            //             "CODE": "PROTOOL",
            //             "PRD_DESC": "Pottery Tools"
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
            //                 "CLM": {
            //                     "CODE": "CLM",
            //                     "PRD_DESC": "Clay Magic Molds"
            //                 },
            //                 "CLMTL": {
            //                     "CODE": "CLMTL",
            //                     "PRD_DESC": "Clay Magic TL Design Molds"
            //                 }
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
            //             }
            //         }
            //     },
            //     "KILNS": {
            //         "CODE": "KILNS",
            //         "PRD_DESC": "Kiln Room",
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
            //             }
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
            //             }
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
            //             "KSHKITS": {
            //                 "CODE": "KSHKITS",
            //                 "PRD_DESC": "Kiln Furniture Kits"
            //             },
            //             "AKSH": {
            //                 "CODE": "AKSH",
            //                 "PRD_DESC": "Advancer Kiln Shelves"
            //             },
            //             "KSH": {
            //                 "CODE": "KSH",
            //                 "PRD_DESC": "Kiln Shelves"
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
            //             }
            //         }
            //     },
            //     "SUPPLIES": {
            //         "CODE": "SUPPLIES",
            //         "PRD_DESC": "Supplies",
            //         "FSTUDIO10": {
            //             "CODE": "FSTUDIO10",
            //             "PRD_DESC": "Accessories For Bisque",
            //             "DISPLAY10": {
            //                 "CODE": "DISPLAY10",
            //                 "PRD_DESC": "Backing"
            //             },
            //             "BSP110": {
            //                 "CODE": "BSP110",
            //                 "PRD_DESC": "Bank Stoppers"
            //             },
            //             "DISPLAY30": {
            //                 "CODE": "DISPLAY30",
            //                 "PRD_DESC": "Easels & Plate Hangers"
            //             },
            //             "EE4": {
            //                 "CODE": "EE4",
            //                 "PRD_DESC": "Electrical Bulbs"
            //             },
            //             "DISPLAY20": {
            //                 "CODE": "DISPLAY20",
            //                 "PRD_DESC": "Iron Accents"
            //             },
            //             "WMUGS50": {
            //                 "CODE": "WMUGS50",
            //                 "PRD_DESC": "Travel Mug Rubber Lids"
            //             },
            //             "DISPLAY40": {
            //                 "CODE": "DISPLAY40",
            //                 "PRD_DESC": "Wood Accents"
            //             },
            //             "EC4": {
            //                 "CODE": "EC4",
            //                 "PRD_DESC": "Xmas Tree Kits & Electrical"
            //             },
            //             "ASL": {
            //                 "CODE": "ASL",
            //                 "PRD_DESC": "Xmas Tree Lights"
            //             }
            //         },
            //         "BSP190": {
            //             "CODE": "BSP190",
            //             "PRD_DESC": "Bisque Decorating Books"
            //         },
            //         "FSTUDIO20": {
            //             "CODE": "FSTUDIO20",
            //             "PRD_DESC": "Brushes",
            //             "BRUSH100": {
            //                 "CODE": "BRUSH100",
            //                 "PRD_DESC": "Individual"
            //             },
            //             "BRUSH200": {
            //                 "CODE": "BRUSH200",
            //                 "PRD_DESC": "Kits"
            //             },
            //             "BRUSH300": {
            //                 "CODE": "BRUSH300",
            //                 "PRD_DESC": "Assortments"
            //             },
            //             "BRUSH400": {
            //                 "CODE": "BRUSH400",
            //                 "PRD_DESC": "Accessories"
            //             },
            //             "MAYBRU": {
            //                 "CODE": "MAYBRU",
            //                 "PRD_DESC": "Mayco Brushes"
            //             }
            //         },
            //         "FSTUDIO30": {
            //             "CODE": "FSTUDIO30",
            //             "PRD_DESC": "Decorating Tools",
            //             "BSP220": {
            //                 "CODE": "BSP220",
            //                 "PRD_DESC": "Art Tape"
            //             },
            //             "BSP200": {
            //                 "CODE": "BSP200",
            //                 "PRD_DESC": "Bisque Decals"
            //             },
            //             "BSP140": {
            //                 "CODE": "BSP140",
            //                 "PRD_DESC": "Decorating Stickies"
            //             },
            //             "DOTGYRE": {
            //                 "CODE": "DOTGYRE",
            //                 "PRD_DESC": "Dotting Gyre"
            //             },
            //             "CONNECT01": {
            //                 "CODE": "CONNECT01",
            //                 "PRD_DESC": "Glues"
            //             },
            //             "PRINT": {
            //                 "CODE": "PRINT",
            //                 "PRD_DESC": "Print & Fire"
            //             },
            //             "STAMPS": {
            //                 "CODE": "STAMPS",
            //                 "PRD_DESC": "Rubber Stamps"
            //             },
            //             "ROY70": {
            //                 "CODE": "ROY70",
            //                 "PRD_DESC": "Sponges"
            //             },
            //             "BISTICKIES": {
            //                 "CODE": "BISTICKIES",
            //                 "PRD_DESC": "Stickers"
            //             },
            //             "BISCREENS": {
            //                 "CODE": "BISCREENS",
            //                 "PRD_DESC": "Silkscreens - Bisque Imports"
            //             },
            //             "MAYDSS": {
            //                 "CODE": "MAYDSS",
            //                 "PRD_DESC": "Silkscreens - Mayco"
            //             },
            //             "BSP125": {
            //                 "CODE": "BSP125",
            //                 "PRD_DESC": "Transfer Paper"
            //             },
            //             "BSP150": {
            //                 "CODE": "BSP150",
            //                 "PRD_DESC": "Underglaze Pencils"
            //             },
            //             "BSP130": {
            //                 "CODE": "BSP130",
            //                 "PRD_DESC": "Writer Tips"
            //             }
            //         },
            //         "BSP175": {
            //             "CODE": "BSP175",
            //             "PRD_DESC": "Dipping Tools"
            //         },
            //         "STUDIO40": {
            //             "CODE": "STUDIO40",
            //             "PRD_DESC": "Paint Pots & Bottles"
            //         },
            //         "STUDIO30": {
            //             "CODE": "STUDIO30",
            //             "PRD_DESC": "Studio Tools"
            //         }
            //     },
            //     "CAFE": {
            //         "CODE": "CAFE",
            //         "PRD_DESC": "Cafe Products",
            //         "COFFEE10": {
            //             "CODE": "COFFEE10",
            //             "PRD_DESC": "Espresso Machines"
            //         },
            //         "COFFEE30": {
            //             "CODE": "COFFEE30",
            //             "PRD_DESC": "Cups & Accessories"
            //         },
            //         "COFFEE50": {
            //             "CODE": "COFFEE50",
            //             "PRD_DESC": "Gourmet Ice Machine and Flavors"
            //         },
            //         "COFFEE40": {
            //             "CODE": "COFFEE40",
            //             "PRD_DESC": "Cleaning Supplies"
            //         },
            //         "COFFEE20": {
            //             "CODE": "COFFEE20",
            //             "PRD_DESC": "Smilt Tiger Craft Coffee"
            //         }
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
            //                 }
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
            //                 }
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
            //                 }
            //             },
            //             "GLASS180": {
            //                 "CODE": "GLASS180",
            //                 "PRD_DESC": "Strips"
            //             }
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
            //             }
            //         }
            //     }
            // }

            // menuArray.push(obj);
            // const flattenObj = (obj, parent, res = {}) => {
            //            const index = "subMenu";
            //            let nItem = [];
            //           for (const key of Object.keys(obj)) {
            //             // console.log(key);
            //             // // if(parent != undefined){
            //             // //    obj[key]["subMenu"] = [];
            //             // // }
            //             const propName = parent ? parent : key;
            //             // console.log(propName);
            //             // console.log(typeof obj[key]);
            //             // obj[key][index] = [];
            //             if (typeof obj[key] === 'object') {
            //                 if(key != propName){
            //                     nItem.push(obj[key]);
            //                 }
            //                 obj[index] =[];
            //                 // console.log(nItem);
            //                 if(nItem.length > 0){
            //                     obj[index].push(nItem);
            //                 }
            //                //  console.log(obj);
            //                // console.log(parent);
            //                // console.log(res);
            //                 flattenObj(obj[key], propName, res);
            //             } else {
            //               res[propName] = obj[key];
            //             }
            //           }
            //           return res;
            //     }

            //     const flattened = flattenObj(menuArray[0]);
            // //         // console.log(flattened)
            // //     // }
            // //     console.log(menuArray[0]);
            //    setMegamenu(menuArray[0]);

        // return fb;    


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
                setMegamenu(menuArray[0]);
            })
           //return fb;    

        };
        fetchMenu();

        
    }, []);
	
    return(
    	<>
            <main>{children}</main>  
      </>
    )
}

export default Layout;
