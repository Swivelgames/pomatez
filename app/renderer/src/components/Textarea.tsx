import React, { useRef, useEffect } from "react";
import autoSize from "autosize";

type Props = React.ComponentPropsWithRef<"textarea"> & {
	autoFocus?: boolean;
	onComplete: (ref: HTMLTextAreaElement) => boolean;
	initialValue?: string;
};

const Textarea: React.FC<Props> = (
	{ autoFocus = true, onComplete, initialValue = "", ...props },
	ref
) => {
	const areaRef = useRef<HTMLTextAreaElement>(ref);

	useEffect(() => {
		if (!areaRef?.current) return;

		if (autoFocus) areaRef.current.focus();
		areaRef.current.value = initialValue;

		autoSize(areaRef.current);

		areaRef.current.onkeypress = (e: KeyboardEvent) => {
			if (!onComplete) return;

			if (e.ctrlKey && e.key === "Enter" && areaRef?.current) {
				e.preventDefault();
				if (onComplete(areaRef.current) && areaRef?.current?.style?.height)
					areaRef.current.style.height = "inherit";
			}
		};
	}, [initialValue, onComplete, autoFocus]);

	const passthrough = props as React.ComponentPropsWithRef<"textarea">;

	return (
		<textarea
			placeholder="Enter a title for this card..."
			ref={areaRef}
			onClick={(e: React.MouseEvent<HTMLTextAreaElement, MouseEvent>) => {
				e.stopPropagation();
			}}
			{...passthrough}
		/>
	);
};

export default React.memo(Textarea);
