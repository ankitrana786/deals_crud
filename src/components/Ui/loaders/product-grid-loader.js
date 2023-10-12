import ContentLoader from "react-content-loader";

const ProductGridLoader = (props) => (

	<ContentLoader
		speed={2}
		width={props.width}
		height={props.height}
		viewBox="0 0 10 10"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		className="h-auto"
		{...props}
	>
		<rect x="0" y="0" rx="0" ry="0" width={props.width} height={props.height} />
	</ContentLoader>
);

export default ProductGridLoader;
