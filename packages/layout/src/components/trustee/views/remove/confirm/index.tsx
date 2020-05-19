import React from 'react';
import { Flex, H3, P } from '@tpr/core';
import { useTrusteeContext } from '../../../context';
import { Footer } from '../../../components/card';
import { Content } from '../../../components/content';

const RemoveConfirm: React.FC = () => {
	const { current, send, onRemove } = useTrusteeContext();
	const { leftTheScheme } = current.context;

	return (
		<Content>
			<H3>Are you sure you want to remove this trustee?</H3>
			<Flex
				cfg={{ flex: '1 1 auto', flexDirection: 'column', my: 3 }}
				// borderBottom="1px solid"
				// borderColor="neutral.100"
			/>
			<P cfg={{ color: 'neutral.3' }}>This can't be undone.</P>
			<Footer
				onContinue={{
					title: 'Remove',
					intent: 'danger',
					fn: () =>
						onRemove({
							id: 'trustee_id_here',
							reason: {
								leftTheScheme: leftTheScheme ? true : false,
								date: leftTheScheme,
							},
						}),
				}}
				onSave={{
					title: 'Cancel',
					appearance: 'outlined',
					fn: () => send('CANCEL'),
				}}
			/>
		</Content>
	);
};

export default RemoveConfirm;
