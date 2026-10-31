import {useEffect, useState} from "react";

export const useDropdownShellOpen = (isOpen: boolean) => {
	const [shellOpen, setShellOpen] = useState(false);

	useEffect(() => {
		if (isOpen) {
			setShellOpen(true);
		}
	}, [isOpen]);

	const onListClosed = () => {
		if (!isOpen) {
			setShellOpen(false);
		}
	};

	return {shellOpen, onListClosed};
};
