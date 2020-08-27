import React from 'react';
import { Form, FFCheckbox, renderFields } from '@tpr/forms';
import { P } from '@tpr/core';
import { Content } from '../../../../components/content';
import { Footer } from '../../../../components/card';
import { ArrowButton } from '../../../../../buttons/buttons';
import { cardType, cardTypeName } from '../../../../common/interfaces';
import styles from './date.module.scss';

interface DateFormProps {
  title: string,
  onSubmit: any,
  remove: any,
  label: string,
  dateField: any
}

const DateForm:React.FC<DateFormProps> = ({ 
  title,
  onSubmit,
  remove,
  label,
  dateField
 }) => {
	return (
		<Content type={cardType.actuary} typeName={cardTypeName.actuary} title={title}>
			<Form
				onSubmit={onSubmit}
				initialValues={{
					confirm: remove?.confirm,
					date: remove && remove.date && new Date(remove.date),
				}}
			>
				{({ handleSubmit, submitError }) => (
					<form onSubmit={handleSubmit} data-testid="remove-actuary-form">
						<FFCheckbox
							name="confirm"
							type="checkbox"
							label={label}
							cfg={{ mb: 3 }}
						/>
						<div className={styles.dateWrapper}>{renderFields(dateField)}</div>
						{submitError && (
							<P cfg={{ color: 'danger.2', mt: 5 }}>{submitError}</P>
						)}
						<Footer>
							<ArrowButton
								intent="special"
								pointsTo="right"
								iconSide="right"
								title="Continue"
								type="submit"
							/>
						</Footer>
					</form>
				)}
			</Form>
		</Content>
	);
};

export default React.memo(DateForm);