import moment from 'moment';

const planes = [
	{
		id: 'plane_1',
		title: 'Plane 1',
		flights: [
			{
				groupId: 'plane_1',
				title: 'Flight One',
				start: moment().format('YYYY-MM-DD HH:mm:ss'),
				end: moment().add(1, 'hour').format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: false,
				},
			},
			{
				groupId: 'plane_1',
				title: 'Flight Four',
				start: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'day')
					.add(5, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
			{
				groupId: 'plane_1',
				title: 'Flight Five',
				start: moment().add(2, 'day').format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(2, 'day')
					.add(12, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: false,
				},
			},
			{
				groupId: 'plane_1',
				title: 'Flight Word',
				start: moment().add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(3, 'day')
					.add(6, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
		],
	},
	{
		id: 'plane_2',
		title: 'Plane 2',
		flights: [
			{
				groupId: 'plane_2',
				title: 'Flight Twice',
				start: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'day')
					.add(1, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
			{
				groupId: 'plane_2',
				title: 'Flight Earth',
				start: moment()
					.add(1, 'month')
					.add(1, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'month')
					.add(1, 'day')
					.add(5, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
			{
				groupId: 'plane_2',
				title: 'Flight Space',
				start: moment()
					.add(1, 'month')
					.add(2, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'month')
					.add(2, 'day')
					.add(12, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: false,
				},
			},
			{
				groupId: 'plane_2',
				title: 'Flight Jumper',
				start: moment()
					.add(1, 'month')
					.add(3, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'month')
					.add(3, 'day')
					.add(6, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
		],
	},
	{
		id: 'plane_3',
		title: 'Plane 3',
		flights: [
			{
				groupId: 'plane_3',
				title: 'Flight April',
				start: moment().add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(3, 'day')
					.add(1, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: false,
				},
			},
			{
				groupId: 'plane_3',
				title: 'Flight Fall',
				start: moment()
					.add(2, 'month')
					.add(1, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(1, 'month')
					.add(1, 'day')
					.add(5, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
			{
				groupId: 'plane_3',
				title: 'Flight Mars',
				start: moment()
					.add(2, 'month')
					.add(2, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(2, 'month')
					.add(2, 'day')
					.add(12, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: false,
				},
			},
			{
				groupId: 'plane_3',
				title: 'Flight Pluto',
				start: moment()
					.add(2, 'month')
					.add(3, 'day')
					.format('YYYY-MM-DD HH:mm:ss'),
				end: moment()
					.add(2, 'month')
					.add(3, 'day')
					.add(6, 'hour')
					.format('YYYY-MM-DD HH:mm:ss'),
				extendedProps: {
					published: true,
				},
			},
		],
	},
];

export default planes;
