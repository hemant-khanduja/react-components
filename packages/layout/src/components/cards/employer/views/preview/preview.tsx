import React, { useState } from 'react';
import { Flex, P, Hr, H4, classNames } from '@tpr/core';
import { UnderlinedButton } from '../../../components/button';
import { Checkbox } from '@tpr/forms';
import styles from './preview.module.scss';
import { useEmployerContext } from '../../context';

type IdentifiersItemProps = { title: string; number: string | number };
const IdentifiersItem: React.FC<IdentifiersItemProps> = ({ title, number }) => {
	return (
		<>
			<H4 cfg={{ lineHeight: 3 }}>{title}</H4>
			<P>{number}</P>
		</>
	);
};

export const Preview: React.FC<any> = () => {
	const { current, send, onCorrect, i18n } = useEmployerContext();
	const { employer, complete, preValidatedData } = current.context;
	const [items] = useState(
		[
			{
				title: i18n.preview.identifiers.companiesHouseNo,
				number: employer.companiesHouseNumber,
			},
			{
				title: i18n.preview.identifiers.registeredCharityNo,
				number: employer.registeredCharityNumber,
			},
			{
				title: i18n.preview.identifiers.epsrNumber,
				number: employer.epsrNumber,
			},
		].filter((item) => item.title && item.number),
	);

	return (
		<div
			className={
				preValidatedData
					? classNames([styles.content, styles.complete])
					: classNames([{ [styles.complete]: complete }, styles.content])
			}
		>
			<Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pr: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.three}</UnderlinedButton>
					<Flex cfg={{ my: 2, flexDirection: 'column' }}>
						<H4 cfg={{ lineHeight: 3 }}>{employer.organisationName}</H4>
						<P>{employer.address.addressLine1}</P>
						{employer.address.addressLine2 && (
							<P>{employer.address.addressLine2}</P>
						)}
						{employer.address.addressLine3 && (
							<P>{employer.address.addressLine3}</P>
						)}
						<P>{employer.address.postTown}</P>
						{employer.address.county && <P>{employer.address.county}</P>}
						<P>{employer.address.postcode}</P>
					</Flex>
				</Flex>
				<Flex
					cfg={{ width: 5, flex: '0 0 auto', flexDirection: 'column', pl: 4 }}
				>
					<UnderlinedButton>{i18n.preview.buttons.four}</UnderlinedButton>
					<Flex cfg={{ mt: 1, flexDirection: 'column' }}>
						{items.map((item, key) => (
							<IdentifiersItem key={key} {...item} />
						))}
					</Flex>
				</Flex>
			</Flex>
			<Flex cfg={{ flexDirection: 'column' }}>
				<Hr cfg={{ my: 4 }} />
				<Checkbox
					value={complete}
					checked={complete}
					onChange={() => {
						send('COMPLETE', { value: !complete });
						onCorrect(!complete);
					}}
					label={i18n.preview.checkboxLabel}
				/>
			</Flex>
		</div>
	);
};
