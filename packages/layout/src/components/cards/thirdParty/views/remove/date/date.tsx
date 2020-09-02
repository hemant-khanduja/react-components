import React from 'react';
import { FORM_ERROR } from 'final-form';
import { FieldProps } from '@tpr/forms';
import { useThirdPartyContext } from '../../../context';
import { isAfter, toDate, isBefore } from 'date-fns';
import DateForm from '../../../../common/views/remove/date/date';
import { cardType, cardTypeName } from '../../../../common/interfaces';

export const RemoveDateForm = () => {
	const { current, send, i18n } = useThirdPartyContext();
	const { remove, thirdParty } = current.context;

	const DateField: FieldProps[] = [
		{
			type: 'date',
			name: 'date',
			label: i18n.remove.date.fields.date.label,
			hint: i18n.remove.date.fields.date.hint,
			validate: (value) => {
				if (!value) {
					return i18n.remove.date.errors.formIncomplete;
				} else if (
					isBefore(
						toDate(new Date(value)),
						toDate(new Date(thirdParty.effectiveDate)),
					)
				) {
					return i18n.remove.date.errors.dateAddedBeforeEffectiveDate;
				} else if (isAfter(toDate(new Date(value)), new Date())) {
					return i18n.remove.date.errors.dateAddedInTheFuture;
				}
			},
			error: i18n.remove.date.fields.date.error,
			cfg: { mb: 3 },
		},
	];

	const onSubmit = (values) => {
		if (!values.confirm) {
			return {
				[FORM_ERROR]: i18n.remove.date.errors.formIncomplete,
			};
		} else {
			send('NEXT', { values });
		}
	};

	return (
		<DateForm
			title={i18n.remove.date.title}
			onSubmit={onSubmit}
			remove={remove}
			label={i18n.remove.date.fields.confirm.label}
			dateField={DateField}
			type={cardType.thirdParty}
			typeName={cardTypeName.thirdParty}
		/>
	);
};
