import React from 'react';
import { render } from '@testing-library/react';
import { EmployerCard } from '../cards/employer/employer';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';

// TODO: write more tests

const noop = () => Promise.resolve();

const employer = {
	schemeRoleId: 123,
	employerType: 'principal-and-participating' as 'principal-and-participating',
	organisationReference: 0,
	companiesHouseNumber: 'AB123456',
	registeredCharityNumber: '123',
	organisationName: 'The Pensions Regulator',
	addressLine1: 'Napier House',
	addressLine2: 'Trafalgar Pl',
	postTown: 'Brighton',
	postCode: 'BN1 4DW',
	county: 'West Sussex',
	countryId: '',
	effectiveDate: '1997-04-01T00:00:00',
};

describe('Employer Preview', () => {
	test('is accessible', async () => {
		const { container } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});
});

describe('Employer Remove', () => {
	test('Date screen is accessible', async () => {
		const { container, getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		getByText('Remove').click();

		const results = await axe(container);
		expect(results).toHaveNoViolations();
	});

	test('Date screen date and checkbox is required', async () => {
		const { getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen date is required', async () => {
		const { getByText } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		userEvent.click(getByText('Remove'));
		userEvent.click(getByText(/I confirm/i));
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen checkbox is required', async () => {
		const { getByText, getByTestId } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Please confirm and fill in the date fields.'),
		).toBeInTheDocument();
	});

	test('Date screen validation passes when required fields complete', async () => {
		const { getByText, getByTestId } = render(
			<EmployerCard
				onSaveType={noop}
				onRemove={noop}
				onCorrect={(_value) => {}}
				complete={true}
				employer={employer}
			/>,
		);

		// go to remove screen
		userEvent.click(getByText('Remove'));
		// confirm checkbox
		userEvent.click(getByText(/I confirm/i));
		// enter date
		userEvent.type(getByTestId('dd-field'), '10');
		userEvent.type(getByTestId('mm-field'), '10');
		userEvent.type(getByTestId('yyyy-field'), '2010');
		// click Continue and check validation
		userEvent.click(getByText('Continue'));

		expect(
			getByText('Are you sure you want to remove this employer?'),
		).toBeInTheDocument();
	});
});
