import { rollup } from '../../config/rollup.config';

export default rollup({
	name: 'forms',
	extraExternal: [
		'@tpr/core',
		'@tpr/icons',
		'@tpr/theming',
		'@types/lodash',
		'@types/match-sorter',
		'@types/qs',
		'date-fns',
		'downshift',
		'final-form',
		'lodash',
		'match-sorter',
		'qs',
		'react-final-form',
	],
});
