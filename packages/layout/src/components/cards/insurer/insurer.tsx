import React from 'react';
import {
	InsurerProvider,
	InsurerProviderProps,
	useInsurerContext,
} from './context';
import { Flex, H4 } from '@tpr/core';
import { Toolbar } from '../components/toolbar';
import { UnderlinedButton } from '../components/button';
import { Preview } from './views/preview/preview';
import { RemoveDateForm } from './views/remove/date/date';
import { ConfirmRemove } from './views/remove/confirm/confirm';
import { Reference } from './views/reference';
import RemovedBox from '../components/removedBox';
import { cardTypeName } from '../common/interfaces';
import styles from '../cards.module.scss';

const CardContentSwitch: React.FC = () => {
	const { current } = useInsurerContext();
	switch (true) {
		case current.matches('preview'):
			return <Preview />;
		case current.matches({ edit: 'reference' }):
			return <Reference />;
		case current.matches({ remove: 'date' }):
			return <RemoveDateForm />;
		case current.matches({ remove: 'confirm' }):
			return <ConfirmRemove />;
		case current.matches({ remove: 'deleted' }):
			// message to show when successfuly deleted.
			return <RemovedBox type={cardTypeName.insurer} />;
		default:
			return null;
	}
};

const ToolbarButton: React.FC<{ title: string }> = ({ title }) => {
	const { current, send } = useInsurerContext();
	return (
		<UnderlinedButton
			isOpen={
				current.matches({ remove: 'date' }) ||
				current.matches({ remove: 'confirm' })
			}
			onClick={() => {
				if (
					current.matches({ remove: 'date' }) ||
					current.matches({ remove: 'confirm' })
				) {
					send('CANCEL');
				} else {
					send('REMOVE');
				}
			}}
		>
			{title}
		</UnderlinedButton>
	);
};

export const InsurerCard: React.FC<InsurerProviderProps> = ({
	testId,
	cfg,
	...rest
}) => {
	return (
		<InsurerProvider {...rest}>
			{({ current: { context }, i18n }) => {
				return (
					<Flex cfg={cfg} data-testid={testId} className={styles.card}>
						<Toolbar
							complete={context.preValidatedData ? true : context.complete}
							subtitle={() => <H4>{context.insurer.organisationName}</H4>}
							buttonLeft={() => (
								<UnderlinedButton>{i18n.preview.buttons.one}</UnderlinedButton>
							)}
							buttonRight={() => (
								<ToolbarButton title={i18n.preview.buttons.two} />
							)}
						/>
						<CardContentSwitch />
					</Flex>
				);
			}}
		</InsurerProvider>
	);
};
