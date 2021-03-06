import React from 'react';
import { Field, FieldRenderProps } from 'react-final-form';
import { StyledInputLabel, InputElementHeading } from '../elements';
import { FieldProps, FieldExtraProps } from '../../renderFields';
import { Input } from '../input/input';

type InputTextProps = FieldRenderProps<string> & FieldExtraProps;
const InputText: React.FC<InputTextProps> = ({
	label,
	ariaLabel,
	hint,
	input,
	testId,
	meta,
	required,
	placeholder,
	readOnly,
	inputWidth: width,
	cfg,
}) => {
	return (
		<StyledInputLabel
			isError={meta && meta.touched && meta.error}
			cfg={Object.assign({ flexDirection: 'column', mt: 1 }, cfg)}
		>
			<InputElementHeading
				label={label}
				required={required}
				hint={hint}
				meta={meta}
			/>
			<Input
				type="text"
				width={width}
				testId={testId}
				label={ariaLabel ? ariaLabel : label}
				placeholder={placeholder}
				readOnly={readOnly}
				touched={meta && meta.touched && meta.error}
				{...input}
			/>
		</StyledInputLabel>
	);
};

export const FFInputText: React.FC<FieldProps> = (fieldProps) => {
	return (
		<Field
			{...fieldProps}
			required={typeof fieldProps.validate === 'function' || fieldProps.error}
			component={InputText}
		/>
	);
};
