import React from 'react';
import { Flex } from '../../../layout';
import { useTrusteeContext } from '../../context';
import { Footer } from '../../components/card';

const Contacts: React.FC = () => {
	const { send } = useTrusteeContext();

	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<div>Contacts</div>
			<Footer onSave={{ title: 'Save and close', fn: () => send('SAVE') }} />
		</Flex>
	);
};

export default Contacts;