import React from 'react';
import { Flex } from '../../../layout';
import { Text, H4 } from '../../../typography';
import { useTrusteeContext } from '../../context';
import { Checkbox } from '@tpr/forms';
import { Button } from '../../components/button';
import { StyledCardToolbar } from '../../components/card';

const Preview: React.FC = () => {
	const { current, send, onCorrect } = useTrusteeContext();
	const state = current.context;
	return (
		<Flex flex="1 1 auto" flexDirection="column">
			<StyledCardToolbar>
				<Flex
					width="100%"
					flex="1 1 auto"
					flexDirection="column"
					mr={[null, '40px']}
				>
					<Button onClick={() => send('EDIT_ORG')}>
						Correspondence address {'>'}
					</Button>
					<Flex mt={0} flexDirection="column">
						<H4 fontWeight="bold">{state.address.addressLine1}</H4>
						<Text>{state.address.addressLine2}</Text>
						<Text>{state.address.addressLine3}</Text>
						<Text>{state.address.postTown}</Text>
						<Text>{state.address.postcode}</Text>
					</Flex>
				</Flex>
				<Flex width="100%" flex="1 1 auto" flexDirection="column">
					<Button onClick={() => send('EDIT_CONTACTS')}>
						Contact details {'>'}
					</Button>
					<Flex mt={0} flexDirection="column">
						<H4 fontWeight="bold">Phone</H4>
						<Text>{state.telephoneNumber}</Text>
						<H4 fontWeight="bold">Email</H4>
						<Text>{state.emailAddress}</Text>
					</Flex>
				</Flex>
			</StyledCardToolbar>
			<Flex
				flex="0 0 auto"
				justifyContent="flex-start"
				borderTop="1px solid #eee"
				mt={0}
				pt={2}
			>
				<Checkbox
					value={state.complete}
					checked={state.complete}
					onChange={evt => onCorrect(!!Boolean(evt.target.value))}
					label="All details are correct"
				/>
			</Flex>
		</Flex>
	);
};

export default Preview;
