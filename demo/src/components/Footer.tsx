import type { Component } from "solid-js";

const Footer: Component = () => {
	return (
		<footer className="w-full bg-gray-800 text-gray-200 text-center p-4 mt-auto border-t border-gray-700">
			&copy; {new Date().getFullYear()} ACY. All rights reserved.
		</footer>
	);
};

export default Footer;
