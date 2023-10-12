module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
			colors: {
				body: "#5A5A5A",
				greenBase:"#14958f",
				success:'#007c00',  
				heading: "#212121",
				input: "#1D1E1F",
				yellow:"#fdd835",
				black: "#333333",
				zblack: "#000000",
				lightBlack:"#322C2C",
				white: "#fff",
				linen: "#FBF1E9",
				linenSecondary: "#ECE7E3",
				olive: "#3D9970",
				green: "#4BB543",
				maroon: "#B03060",
				red: "#F51A1A",
				brown: "#C7844B",
				placeholder: "#707070",
				borderBottom: "#f7f7f7",
				facebook: "#4267B2",
				facebookHover: "#395fad",
				google: "#4285F4",
				googleHover: "#307bf9",
				loginbtnBase:"#64016B",
				createbtnBase:"#FC1C14",
				rightBase:"rgba(0, 0, 0, 0.4)",
				transaprentBg:"rgba(0, 0, 0, 0.6)",
				rightBannerBase:"rgba(17, 17, 17, 0.4)",
				bannerYellow: "#CBE82E",
				purpleBase:"#64016B",
				buttonBase:"#FFD22E",
				darkPurple:"#64016B",
				darkGreen: "#459e26",
				linkColor:"#31708f",
				lightShade:"#686868",
				hpBannerBase:'rgba(0, 0, 0, 0.4)',
				red:{
					100: "#F51A1A",
					200: "#F51A1A",
					300: "#F51A1A",
					400: "#F51A1A",
					500: "#F51A1A",
					600: "#F51A1A",
					700: "#F51A1A",
					800: "#FC1C14",
				},
				orange:{
					100: "#f29f05",
					200: "#e17c22",
					250: "#FF7E36",
					300: "#FFAB2D",
					400: "#cf5e03",
				},
				gray: {
					50: "#FBFBFB",
					100: "#F1F1F1",
					150: "#F4F4F4",
					200: "#F9F9F9",
					250:"#BDBDBD",
					300: "#E6E6E6",
					350: "#E9ECEF",
					400: "#999999",
					450:  "#DCDCDC",
					500: "#D8D8D8",
					550: "#858181",
					600: "#3A3A3A",
					650: "#6A6A6A",
					700: "#292929",
					750: "#9B9B9B",
					800: "#707070",
					850: "#797979",
					900: "rgba(0, 0, 0, 0.6)",
					950: "#F0F0F0",
				},
				green:{
					200:"#2B9007",
					250:"#2B9107",
				},
				purple:{
					50: "#F1E5F1"
				},
			},
			fontSize: {
				"10px": ".625rem",
			},
			screens: {
				xs: '320px',
				sm: "480px",
				lg: "1025px",
				"2xl": "1500px",
				"3xl": "1780px",
			},
			spacing: {
				"430px": "430px",
				"450px": "450px",
				"500px": "500px",
				"64vh": "64vh",
			},
			minHeight: {
				"50px": "50px",
			},
			scale: {
				80: "0.8",
				85: "0.85",
				300: "3",
				400: "4",
			},
			animation: {
				shine: "shine 1s",
			},
			keyframes: {
				shine: {
					"100%": { left: "125%" },
				},
			},
		},
		boxShadow: {
			cart: "0 3px 6px rgba(0,0,0,0.12)",
			product: "0 6px 12px rgba(0,0,0,.08)",
			listProduct: "0 2px 4px rgba(0,0,0,.08)",
			navigation: "0 3px 6px rgba(0, 0, 0, 0.16)",
			navigationReverse: "0 -3px 6px rgba(0, 0, 0, 0.16)",
			header: "0 2px 3px rgba(0, 0, 0, 0.08)",
			vendorCard: "1px 1px 4px rgba(0, 0, 0, 0.12)",
			vendorCardHover: "0 6px 18px rgba(0, 0, 0, 0.12)",
			subMenu: "1px 2px 3px rgba(0, 0, 0, 0.08)",
			bottomNavigation: "0 -2px 3px rgba(0, 0, 0, 0.06)",
			cookies: "0 -2px 3px rgba(0, 0, 0, 0.04)",
			avatar: "0px 15px 30px rgba(0, 0, 0, 0.16)",
		},
		fontFamily: {
			body: ["'Open Sans', sans-serif"],
			satisfy: ["'Satisfy', cursive"],
			segoe: ["'Segoe UI', sans-serif"],
			poppins: ["'Poppins', sans-serif"],
		},
		zIndex: {
			'0': 0,
	       '10': 10,
	       '20': 20,
	       '30': 30,
	       '40': 40,
	       '50': 50,
	       '25': 25,
	       '50': 50,
	       '75': 75,
	       '100': 100,
	       '199': 199,
	       'auto': 'auto',
		},
	},
	plugins: [],
};