import React from 'react';

type SVGProps = Partial<{
	style: any;
	fill: string;
	width: string;
	className: string;
	viewBox: string;
}>;

export const SVG: React.FC<SVGProps> = ({
	style = {},
	fill = '#000',
	width = '24',
	className = '',
	viewBox = '0 0 24 24',
	children,
}) => (
	<svg
		width={width}
		height={width}
		style={style}
		fill={fill}
		viewBox={viewBox}
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		{children}
	</svg>
);

export const CheckboxChecked: React.FC<SVGProps> = props => {
	return (
		<SVG {...props}>
			<path d="M0 0h24v24H0z" fill="none" />
			<path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
		</SVG>
	);
};

export const CheckboxBlank: React.FC<SVGProps> = props => {
	return (
		<SVG {...props}>
			<path d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const RadioButtonChecked: React.FC<SVGProps> = props => {
	return (
		<SVG {...props}>
			<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};

export const RadioButtonUnchecked: React.FC<SVGProps> = props => {
	return (
		<SVG {...props}>
			<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z" />
			<path d="M0 0h24v24H0z" fill="none" />
		</SVG>
	);
};
