import React, { useState } from 'react';
import { FieldProps } from '@tpr/forms';
import { useInHouseAdminContext } from '../../context';
import { InHouseAdminI18nProps } from '../../i18n';
import {
	RecursivePartial,
	cardType,
	cardTypeName,
} from '../../../common/interfaces';
import NameForm from '../../../common/views/nameForm/nameForm';

const getFields = (
	fields: RecursivePartial<InHouseAdminI18nProps['name']['fields']>,
): FieldProps[] => [
	{
		name: 'title',
		type: 'text',
		label: fields.title.label,
		inputWidth: 1,
		cfg: { mb: 4 },
	},
	{
		name: 'firstName',
		type: 'text',
		label: fields.firstName.label,
		error: fields.firstName.error,
		inputWidth: 6,
		cfg: { mb: 4 },
	},
	{
		name: 'lastName',
		type: 'text',
		label: fields.lastName.label,
		error: fields.lastName.error,
		inputWidth: 6,
	},
];

export const NameScreen: React.FC = () => {
	const [loading, setLoading] = useState(false);
	const { current, send, i18n, onSaveName } = useInHouseAdminContext();
	const fields = getFields(i18n.name.fields);
	const state = current.context.inHouseAdmin;

	const onSubmit = async (values) => {
		setLoading(true);
		try {
			await onSaveName(values, state);
			setLoading(false);
			send('SAVE', { values });
		} catch (error) {
			console.log(error);
			setLoading(false);
		}
	};

	return (
		<NameForm
			type={cardType.inHouseAdmin}
			typeName={cardTypeName.inHouseAdmin}
			title={i18n.name.title}
			onSubmit={onSubmit}
			fields={fields}
			initialValues={{
				title: state.title,
				firstName: state.firstName,
				lastName: state.lastName,
			}}
			loading={loading}
		/>
	);
};
