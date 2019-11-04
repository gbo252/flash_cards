export default (
	fetchCategories,
	categories,
	category,
	history,
	fetchFlashCards
) => {
	if (!categories) {
		fetchCategories();
	}

	if (categories) {
		const categoryNames = categories.map(x => x.category.toLowerCase());

		if (!categoryNames.includes(category.toLowerCase())) {
			history.push("/404");
		} else {
			if (fetchFlashCards) {
				fetchFlashCards(category);
			}
		}
	}
};
