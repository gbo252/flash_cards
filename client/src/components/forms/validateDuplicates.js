export default (array, name, initialValues, form) => {
	let formType = form === "category" ? "category" : "header";

	let names = array.map(x => x[formType].toLowerCase());

	if (initialValues) {
		const index = names.indexOf(initialValues[formType].toLowerCase());
		names.splice(index, 1);
	}

	if (names.includes(name.toLowerCase())) {
		return `There is already a ${formType} named: "${name}"`;
	}

	return null;
};
