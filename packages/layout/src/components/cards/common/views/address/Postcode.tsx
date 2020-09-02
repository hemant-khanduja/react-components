import React, { useEffect, useCallback, ChangeEvent } from 'react';
import { Flex, Button, P, Link } from '@tpr/core';
import { Input } from '@tpr/forms';
import { extractToObject } from './helpers';
import { PostcodeProps } from '../../../common/interfaces';
import styles from './Postcode.module.scss';

const Postcode: React.FC<PostcodeProps> = ({
	lookup,
	loading,
	postCode,
	setPostcode,
	showLookup,
	setLoading,
	setOptions,
	addressAPI,
	i18n,
}) => {
	//const { addressAPI, i18n } = useInHouseAdminContext();

	const search = useCallback(
		(postCode: string, country = 'GBR') => {
			setLoading(true);
			addressAPI
				.get(
					`search?country=${country}&query=${postCode}&take=${
						addressAPI.limit || 50
					}`,
				)
				.then((response: { data: any }) => {
					if (
						response &&
						Array.isArray(response.data.results) &&
						response.data.results.length > 0
					) {
						Promise.all(
							response.data.results.map(({ format }: { format: string }) => {
								const [url] = format.split('v2/').slice(-1);
								return addressAPI.get(url).then(({ data }) => {
									const addressObject = extractToObject(data.address);

									const addressToOurFormat = {
										addressLine1: addressObject.addressLine1 || '',
										addressLine2: addressObject.addressLine2 || '',
										addressLine3: addressObject.addressLine3 || '',
										postTown: addressObject.locality || '',
										postCode: addressObject.postalCode || '',
										county: addressObject.province || '',
										country: addressObject.country || '',
									};

									return {
										value: addressToOurFormat,
										label: Object.keys(addressToOurFormat)
											.filter((key) => addressObject[key])
											.map((key) => addressObject[key])
											.join(', '),
									};
								});
							}),
						).then((results) => {
							setOptions(results);
							showLookup(false);
							setLoading(false);
						});
					} else {
						setLoading(false);
						// console.error('NOTHING WAS FOUND');
					}
				})
				.catch((err) => {
					console.log(err);
					setLoading(false);
				});
		},
		[setOptions],
	);

	useEffect(() => {
		if (postCode) {
			search(postCode);
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<P cfg={{ mb: 3 }}>{i18n.address.auto.subtitle}</P>
			<P cfg={{ mb: 2, fontWeight: 3 }}>{i18n.address.postCode.title}</P>
			{lookup ? (
				<>
					<div className={styles.inputWrapper}>
						<Input
							type="text"
							value={postCode}
							onChange={(evt: ChangeEvent<HTMLInputElement>) =>
								setPostcode(evt.target.value)
							}
							disabled={loading}
						/>
					</div>
					<Flex>
						<Button
							onClick={() => {
								search(postCode);
								// form.change("address", undefined);
							}}
							disabled={loading}
						>
							{loading ? 'Loading...' : i18n.address.postCode.button}
						</Button>
					</Flex>
				</>
			) : (
				<Flex>
					<P cfg={{ mr: 2 }}>{postCode}</P>
					<Link onClick={() => showLookup(true)} underline>
						{i18n.address.postCode.link}
					</Link>
				</Flex>
			)}
		</div>
	);
};

export default Postcode;