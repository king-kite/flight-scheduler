import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth';
import timeGridPlugin from '@fullcalendar/timegrid';
import moment from 'moment';

import Header from './components/header';

function App() {
	const calendarRef = React.useRef();
	const [planes, setPlanes] = React.useState([
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
			],
		},
		{
			id: 'plane_2',
			title: 'Plane 2',
			flights: [
				{
					groupId: 'plane_2',
					title: 'Flight Two',
					start: moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss'),
					end: moment()
						.add(1, 'day')
						.add(1, 'hour')
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
					title: 'Flight Three',
					start: moment().add(3, 'day').format('YYYY-MM-DD HH:mm:ss'),
					end: moment()
						.add(3, 'day')
						.add(1, 'hour')
						.format('YYYY-MM-DD HH:mm:ss'),
					extendedProps: {
						published: false,
					},
				},
			],
		},
	]);

	const [plane, setPlane] = React.useState(null);

	const [filter, setFilter] = React.useState({
		from: moment().date(1).format('YYYY-MM-DD'),
		to: moment().date(1).add(1, 'month').format('YYYY-MM-DD'),
	});

	const [calendarType, setCalendarType] = React.useState('grid'); // list || grid
	const [currentView, setCurrentView] = React.useState(2);

	const listViews = React.useMemo(
		() => ['listDay', 'listWeek', 'listMonth', 'listYear'],
		[]
	);
	const gridViews = React.useMemo(
		() => [
			'timeGridDay',
			'timeGridWeek',
			'dayGridMonth',
			'multiMonthYear',
			'multiMonthYear',
		],
		[]
	);

	const initialView = React.useMemo(
		() => (calendarType === 'list' ? listViews[2] : gridViews[2]),
		[calendarType, gridViews, listViews]
	);
	// const initialView = React.useMemo(() => calendarType === 'list' ? views[2] : views[2], [calendarType, views])

	const zoom = React.useCallback(
		(direction, date) => {
			if (calendarRef.current) {
				let views = gridViews;
				if (calendarType === 'list') views = listViews;
				// IF ZOOM OUT
				const calendarApi = calendarRef.current.getApi();
				if (direction === 'out') {
					const view = views[currentView + 1]
						? views[currentView + 1]
						: views[views.length - 1];
					calendarApi.changeView(view, date);
					setCurrentView(
						views[currentView + 1] ? currentView + 1 : views.length - 1
					);
				} else {
					// ZOOM OUT
					const view = views[currentView - 1]
						? views[currentView - 1]
						: views[0];
					calendarApi.changeView(view, date);
					setCurrentView(views[currentView - 1] ? currentView - 1 : 0);
				}
			}
		},
		[calendarRef.current, currentView, listViews, gridViews, calendarType]
	);

	const prevNowNext = React.useCallback(
		(direction) => {
			if (calendarRef.current) {
				const calendarApi = calendarRef.current.getApi();

				switch (direction) {
					case 'previous':
						return calendarApi.prev();
					case 'next':
						return calendarApi.next();
					case 'now':
						return calendarApi.changeView(
							calendarType === 'grid' ? 'timeGridDay' : 'listDay',
							moment().format('YYYY-MM-DD HH:mm:ss')
						);
					default:
						return;
				}
			}
		},
		[calendarRef.current, calendarType]
	);

	return (
		<React.Fragment>
			<div>
				<div className="menu">
					<h3>aircrafts</h3>
					<ul className="menu-list">
						<li
							className={plane === null ? 'active' : ''}
							onClick={() => setPlane(null)}
						>
							all
						</li>
						{planes.map((item, index) => (
							<li
								key={index}
								className={plane?.id === item.id ? 'active' : ''}
								onClick={() => setPlane(item)}
							>
								{item.title}
							</li>
						))}
					</ul>
				</div>
				<div className="content">
					<Header
						zoom={zoom}
						type={calendarType}
						changeType={() => {
							if (calendarRef.current) {
								const calendarApi = calendarRef.current.getApi();
								setCurrentView(2);
								setCalendarType((prevState) => {
									const value = prevState === 'list' ? 'grid' : 'list';
									calendarApi.changeView(
										value === 'grid' ? 'dayGridMonth' : 'listMonth'
									);
									return value;
								});
							}
						}}
						prevNowNext={prevNowNext}
						filter={filter}
						setfilter={setFilter}
					/>
					<div className="calendar">
						<FullCalendar
							ref={calendarRef}
							plugins={[
								multiMonthPlugin,
								dayGridPlugin,
								interactionPlugin,
								listPlugin,
								timeGridPlugin,
							]}
							headerToolbar={{
								// left: 'prev,next',
								left: '',
								center: 'title',
								right: '',
								// right: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridFourDay', // user can switch between the two
								// right: views.join(','), // user can switch between the two
							}}
							initialView={initialView}
							// multiMonthMaxColumns={1}
							// multiMonthMaxColumns={
							// 	calendarType === 'grid' && currentView === 4 ? 1 : undefined
							// }
							weekends={true}
							dateClick={(arg) => {
								// bind with an arrow function
								console.log(arg);
								alert(arg.dateStr);
							}}
							events={
								plane
									? plane.flights
									: planes.reduce(
											(acc, plane) => [...acc, ...plane.flights],
											[]
									  )
							}
							eventContent={RenderEventContent} // render custom component
							noEventsContent="No Flights Scheduled"
							// eventDidMount={function (info) {
							// 	if (info.event.extendedProps.published === 'done') {
							// 		// // Change background color of row
							// 		// info.el.style.backgroundColor = 'red';

							// 		// Change color of dot marker
							// 		var dotEl =
							// 			info.el.getElementsByClassName('fc-list-event-dot')[0];
							// 		if (dotEl) {
							// 			dotEl.style.backgroundColor = 'rgb(73, 205, 73)';
							// 		}
							// 	}
							// }}
							// views={{
							//   timeGridFourDay: {
							//     type: 'timeGrid',
							//     duration: { days: 4 }
							//   }
							// }}
							height="80vh"
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

function RenderEventContent(eventInfo) {
	const start = moment(eventInfo.event.start).format('HH:mma');
	const end = moment(eventInfo.event.end).format('HH:mma');

	return (
		<div
			className={`render-event-content ${
				eventInfo.event.extendedProps.published ? 'published' : ''
			}`}
		>
			<span className="render-event-title">{eventInfo.event.title}</span>
			<span className="render-event-time">{`${start} - ${end}`}</span>
		</div>
	);
}

export default App;
