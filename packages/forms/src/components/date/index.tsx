import React, { useState, useEffect, useMemo } from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { isValid, toDate } from 'date-fns';
import {
	StyledInputDiv,
	StyledLabel,
	InputElementHeading,
	Span,
	Flex,
} from '../elements';
import { StyledInput } from '../text/styles';
import { FieldProps } from '../../utils/validation';

const handleChange = (onChange: Function, value: number) => ({ target }) => {
	if (!target.value) {
		onChange('');
	}
	if (parseInt(target.value, 10) < value) {
		onChange(target.value.trim().replace(/[^\d]/));
	}
};

export function getValidDate(yyyy: string, mm: string, dd: string) {
	const date = toDate(new Date(parseInt(yyyy), parseInt(mm) - 1, parseInt(dd)));
	if (isValid(date) && yyyy.length === 4) {
		return date;
	}
	return undefined;
}

const useDateTransformer = (initialDate: Date = undefined) => {
	return useMemo(() => {
		const valid = isValid(initialDate);
		return {
			dd: valid ? `${initialDate.getDate()}` : undefined,
			mm: valid ? `${initialDate.getMonth()}` : undefined,
			yyyy: valid ? `${initialDate.getFullYear()}` : undefined,
		};
	}, [initialDate]);
};

export const InputDate: React.FC<FieldRenderProps<string> & FieldProps> = ({
	label,
	hint,
	required,
	input = {},
	meta,
}) => {
	const { dd, mm, yyyy } = useDateTransformer(input.value);
	const [day, setDay] = useState(dd);
	const [month, setMonth] = useState(mm);
	const [year, setYear] = useState(yyyy);

	useEffect(() => {
		if (input && typeof input.onChange === 'function') {
			const newDate = getValidDate(year, month, day);
			if (newDate) {
				input.onChange(newDate);
			}
		}
	}, [day, month, year]);

	return (
		<StyledInputDiv
			isError={meta && meta.touched && meta.error}
			flexDirection="column"
			onFocus={input.onFocus}
			onBlur={input.onBlur}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Flex>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="48px" mr={0}>
					<Span>Day</Span>
					<StyledInput
						type="text"
						aria-label={`dd-${label}`}
						value={day}
						onChange={handleChange(setDay, 32)}
						meta={meta}
						autoComplete="off"
					/>
				</StyledLabel>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="48px" mr={0}>
					<Span>Month</Span>
					<StyledInput
						type="text"
						aria-label={`mm-${label}`}
						value={month}
						onChange={handleChange(setMonth, 13)}
						meta={meta}
						autoComplete="off"
					/>
				</StyledLabel>
				<StyledLabel flex="0 0 auto" flexDirection="column" width="70px">
					<Span>Year</Span>
					<StyledInput
						type="text"
						aria-label={`yyyy-${label}`}
						onChange={handleChange(setYear, 10000)}
						meta={meta}
						value={year}
						autoComplete="off"
					/>
				</StyledLabel>
			</Flex>
		</StyledInputDiv>
	);
};

export const FFInputDate: React.FC<FieldProps> = ({ type, ...fieldProps }) => {
	return <Field {...fieldProps} component={InputDate} />;
};
