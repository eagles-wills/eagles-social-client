import { useState } from "react";

const useForm = (initialState, callback) => {
	const [value, setValue] = useState(initialState);
	const handleChange = (event) =>
		setValue({ ...value, [event.target.name]: event.target.value });

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(value);
		callback();
	};

	return { value, handleChange, handleSubmit };
};

export default useForm;
