import React from "react";
import FlashCardList from "./FlashCardList";

const Category = ({ match }) => {
	return (
		<div>
			<FlashCardList categoryId={match.params.categoryId} />
		</div>
	);
};

export default Category;
