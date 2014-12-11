export default {
	boolean: val => typeof val === "string" || val,
	number: val => +val
};
