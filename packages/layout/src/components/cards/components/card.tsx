import React from 'react';
import { Flex, H3, P, classNames, Hr } from '@tpr/core';
import styles from './card.module.scss';
import { cardType } from '../common/interfaces';

type StyledCardProps = { complete: boolean };
export const StyledCard: React.FC<StyledCardProps> = ({
	complete = false,
	children,
}) => {
	return (
		<div
			className={classNames([
				styles.card,
				{ [styles['card-completed']]: complete },
			])}
		>
			{children}
		</div>
	);
};

export const StyledCardToolbar: React.FC = ({ children }) => {
	return <div className={styles.cardToolbar}>{children}</div>;
};

type ToolbarProps = {
	type: cardType;
	typeName?: string;
	title: string;
	subtitle?: string;
};
export const Toolbar: React.FC<ToolbarProps> = ({
	type = 'trustee',
	typeName,
	title,
	subtitle,
}) => {
	return (
		<Flex cfg={{ flexDirection: 'column', mt: 4, mb: 3 }}>
			<Flex
				cfg={{ flexDirection: 'column', pb: 2 }}
				className={styles.toolbarBottomBorder}
			>
				<P cfg={{ color: 'neutral.6', fontSize: 3 }}>
					Edit {typeName ? typeName : type}
				</P>
				<H3 cfg={{ fontWeight: 3 }}>{title}</H3>
			</Flex>
			{subtitle && (
				<Flex cfg={{ py: 3 }} className={styles.toolbarBottomBorder}>
					<P cfg={{ color: 'neutral.6' }}>{subtitle}</P>
				</Flex>
			)}
		</Flex>
	);
};

export const Footer: React.FC = ({ children }) => {
	return (
		<Flex
			cfg={{
				flex: '0 0 auto',
				flexDirection: 'column',
				alignItems: 'flex-start',
				justifyContent: 'flex-start',
				width: 10,
				mt: 5,
			}}
		>
			<Hr cfg={{ mb: 6 }} />
			<Flex>{children}</Flex>
		</Flex>
	);
};

export const StatusMessage = ({ complete, icon: Icon }) => {
	return (
		<Flex cfg={{ alignItems: 'center' }} height="22px">
			<Icon size={18} fill={complete ? '#207e3b' : '#d4351c'} />
			<P
				cfg={{
					ml: 1,
					fontSize: 2,
					fontWeight: 3,
					color: complete ? 'success.1' : 'danger.2',
				}}
			>
				{complete ? 'No issues' : 'Incomplete'}
			</P>
		</Flex>
	);
};
