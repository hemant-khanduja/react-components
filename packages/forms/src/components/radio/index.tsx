import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import {
	StyledLabel,
	StyledHiddenInput,
	ElementPlaceholder,
} from '../elements';
import { FieldProps } from '../../utils/validation';
import { StyledRadioWrapper } from './styles';
import { RadioButtonChecked, RadioButtonUnchecked } from '@tpr/icons';
import { Flex } from '@tpr/core';

type RadioButtonProps = {
	checked: any;
	onChange: (props: any) => void;
	disabled?: boolean;
	align?: string;
	dataCy?: string;
	id?: string;
	value?: any;
	name?: string;
	label: string;
};

export const RadioButton: React.FC<RadioButtonProps> = props => {
	return (
		<ElementPlaceholder>
			<StyledLabel alignItems="center">
				<StyledRadioWrapper
					disabled={props.disabled || false}
					align={props.align || 'center'}
					data-cy={
						props.dataCy
							? `${props.dataCy}-${props.checked ? 'checked' : 'unchecked'}`
							: null
					}
				>
					{props.checked ? <RadioButtonChecked /> : <RadioButtonUnchecked />}
					<StyledHiddenInput
						type="radio"
						id={props.id}
						name={props.name}
						checked={props.checked}
						value={props.value}
						disabled={props.disabled || false}
						onChange={props.onChange}
						data-cy={props.dataCy}
					/>
					{props.children}
				</StyledRadioWrapper>
				<Flex ml={0}>{props.label}</Flex>
			</StyledLabel>
		</ElementPlaceholder>
	);
};

type FFRenderRadioButtonProps = Partial<
	FieldRenderProps<string> & FieldProps & RadioButtonProps
>;
export const FFRadioButton: React.FC<FieldProps> = fieldProps => {
	return (
		<Field
			{...fieldProps}
			render={({ label, input, onChange }: FFRenderRadioButtonProps) => {
				return (
					<RadioButton
						name={input.name}
						value={input.value}
						checked={input.checked}
						label={label}
						onChange={() =>
							typeof onChange === 'function'
								? onChange(input)
								: input.onChange(!input.value)
						}
					/>
				);
			}}
		/>
	);
};
