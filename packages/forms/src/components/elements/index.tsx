import React from 'react';
import styled, { css } from 'styled-components';
import {
	compose,
	space,
	color,
	border,
	layout,
	flexbox,
	typography,
} from 'styled-system';
import {
	BorderProps,
	ColorProps,
	FlexboxProps,
	SpaceProps,
	LayoutProps,
	TypographyProps,
} from 'styled-system';

export const StyledFieldset = styled('fieldset')`
	border: none;

	legend {
		text-align: center;
	}
`;

export const ErrorMessage = styled('div')`
	color: ${({ theme }) => theme.colors.danger[300]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[3]};
`;

interface FormLabelTextProps extends SpaceProps {}
export const FormLabelText = styled('div')<FormLabelTextProps>`
	color: ${({ theme }) => theme.colors.neutral[900]};
	font-size: ${({ theme }) => theme.fontSizes[2]}px;
	font-weight: ${({ theme }) => theme.fontWeights[1]};
	margin: 5px 0;
	white-space: nowrap;

	${space}
`;

interface StyledLabelProps extends FlexboxProps, LayoutProps, SpaceProps {}
export const StyledLabel = styled('label')<StyledLabelProps>`
	display: flex;
	flex: 1 1 auto;
	margin: 0;
	padding: 0;

	${space};
	${layout};
	${flexbox};
`;

export const StyledInputLabel = styled(StyledLabel)<{ isError?: boolean }>`
	padding-left: ${({ isError }) => isError && '15px'};
	border-left: ${({ isError, theme }) =>
		isError && `4px solid ${theme.colors.danger[300]}`};
	cursor: default;
`;

interface StyledInputDiv extends FlexboxProps, LayoutProps, SpaceProps {
	isError?: boolean;
}
export const StyledInputDiv = styled('div')<StyledInputDiv>`
	display: flex;
	flex: 1 1 auto;
	margin: 0;
	padding: 0;
	padding-left: ${({ isError }) => isError && '15px'};
	border-left: ${({ isError, theme }) =>
		isError && `4px solid ${theme.colors.danger[300]}`};

	${space};
	${layout};
	${flexbox};
`;

type StyledHiddenInputProps = {
	checked: any;
};

export const StyledHiddenInput = styled('input')<StyledHiddenInputProps>`
	visibility: hidden;
	width: 0;
	height: 0;
`;

export const ElementPlaceholder = styled('div')`
	display: flex;
	flex: 0 0 auto;
	padding: ${({ theme }) => theme.space[0]}px;
	background-color: ${({ theme }) => theme.colors.neutral[100]};
`;

export const InputElementHeading = ({ label, required, hint, meta }: any) => {
	return (
		<>
			{label && (
				<FormLabelText m="0px">
					{label} {!required && '(optional)'}
				</FormLabelText>
			)}
			{hint && (
				<Span fontSize={1} my={0} color="neutral.300">
					{hint}
				</Span>
			)}
			{meta && meta.touched && meta.error && (
				<ErrorMessage>{meta.error}</ErrorMessage>
			)}
		</>
	);
};

// Exporting Flex and Span here to avoid circular dependencies with @tpr/core
export interface FlexProps
	extends FlexboxProps,
		SpaceProps,
		LayoutProps,
		TypographyProps,
		ColorProps,
		BorderProps {}
export const Flex = styled('div').attrs(() => ({
	display: 'flex',
}))<FlexProps>(compose(flexbox, space, layout, typography, color, border));

const fontStack = css`
	font-family: ${({ theme }) => theme.fonts.sansSerif};
`;

export interface HtmlHTagTypes
	extends SpaceProps,
		ColorProps,
		TypographyProps {}
export const Span = styled('span')<HtmlHTagTypes>`
	${fontStack};

	${color};
	${typography};
	${space};
`;