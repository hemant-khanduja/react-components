import { Machine, assign } from 'xstate';
import {
	CardAddress,
	CardPersonalDetails,
	CardContactDetails,
} from '../common/interfaces';

interface TrusteeStates {
	states: {
		preview: {};
		edit: {
			states: {
				trustee: {
					states: {
						name: {};
						kind: {};
						save: {};
					};
				};
				company: {
					states: {
						address: {};
						save: {};
					};
				};
				contact: {
					states: {
						details: {};
						save: {};
					};
				};
			};
		};
		remove: {
			states: {
				reason: {};
				confirm: {};
				deleted: {};
			};
		};
	};
}

type TrusteeEvents =
	| { type: 'EDIT_TRUSTEE' }
	| { type: 'EDIT_ORG' }
	| { type: 'EDIT_CONTACTS' }
	| { type: 'REMOVE' }
	| { type: 'COMPLETE' }
	| { type: 'NEXT' }
	| { type: 'CANCEL' }
	| { type: 'SAVE'; address?: Partial<CardAddress>; values?: any }
	| { type: 'BACK' }
	| {
			type: 'SELECT';
			values?: {
				reason: null | string;
				date: null | string;
			};
	  }
	| { type: 'DELETE' };

export interface TrusteeProps extends CardPersonalDetails, CardContactDetails {
	schemeRoleId: string;
	//
	trusteeType: string;
	isProfessionalTrustee: boolean;
	//
	address: Partial<CardAddress>;
	//
	[key: string]: any;
}

export interface TrusteeContext {
	loading: boolean;
	complete: boolean;
	preValidatedData?: boolean | null;
	trustee: TrusteeProps;
	remove?: {
		reason: null | string;
		date: null | string;
	};
}

const trusteeMachine = Machine<TrusteeContext, TrusteeStates, TrusteeEvents>({
	id: 'trustee',
	initial: 'preview',
	context: {
		loading: false,
		complete: false,
		trustee: {
			schemeRoleId: '',
			//
			title: '',
			firstName: '',
			lastName: '',
			trusteeType: '',
			isProfessionalTrustee: false,
			//
			address: {
				addressLine1: '',
				addressLine2: '',
				addressLine3: '',
				postTown: '',
				postcode: '',
				county: '',
			},
			//
			telephoneNumber: '',
			emailAddress: '',
		},
		remove: null,
	},
	states: {
		preview: {
			id: 'preview',
			on: {
				EDIT_TRUSTEE: 'edit.trustee.name',
				EDIT_ORG: 'edit.company.address',
				EDIT_CONTACTS: 'edit.contact.details',
				REMOVE: 'remove',
				COMPLETE: {
					actions: assign((_: any, event: any) => ({
						complete: event.value,
					})),
				},
			},
		},
		edit: {
			id: 'edit',
			initial: 'trustee',
			states: {
				trustee: {
					initial: 'name',
					states: {
						name: {
							id: 'name',
							on: {
								NEXT: {
									target: 'kind',
									actions: assign((context: any, event: any) => ({
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						kind: {
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								BACK: 'name',
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('onDetailsSave', 'kind'),
					},
				},
				company: {
					initial: 'address',
					states: {
						address: {
							id: 'address',
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											address: event.address,
										},
									})),
								},
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('onAddressSave', 'address'),
					},
				},
				contact: {
					initial: 'details',
					states: {
						details: {
							on: {
								SAVE: {
									target: 'save',
									actions: assign((context, event) => ({
										loading: true,
										trustee: {
											...context.trustee,
											...event.values,
										},
									})),
								},
								CANCEL: '#preview',
								REMOVE: '#remove',
							},
						},
						save: saveTrustee('onContactSave', 'details'),
					},
				},
			},
		},
		remove: {
			id: 'remove',
			initial: 'reason',
			states: {
				reason: {
					on: {
						SELECT: {
							target: 'confirm',
							actions: assign((_, event) => {
								return {
									remove: event.values,
								};
							}),
						},
						EDIT_TRUSTEE: '#edit.trustee.name',
						CANCEL: '#preview',
					},
				},
				confirm: {
					on: {
						EDIT_TRUSTEE: '#edit.trustee.name',
						BACK: 'reason',
						CANCEL: '#preview',
						DELETE: 'deleted',
					},
				},
				deleted: {
					type: 'final',
				},
			},
		},
	},
});

function saveTrustee(
	onSaveFunctionName: 'onContactSave' | 'onAddressSave' | 'onDetailsSave',
	targetOnError: string,
) {
	if (!onSaveFunctionName) {
		throw Error('saveTrustee function doesn`t have a prop name');
	}
	return {
		invoke: {
			id: onSaveFunctionName,
			src: onSaveFunctionName,
			onDone: {
				target: '#preview',
				actions: assign({
					loading: false,
				}),
			},
			onError: {
				target: targetOnError,
				actions: assign({
					loading: false,
				}),
			},
		},
	};
}

export default trusteeMachine;
