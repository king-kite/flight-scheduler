import React from 'react';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
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

	const views = ['dayGridMonth', 'timeGridWeek', 'timeGridDay'];
	const initialView = React.useMemo(() => 'dayGridMonth', []);
	const [currentView, setCurrentView] = React.useState(initialView);

	const changeView = React.useCallback(
		(view, date) => {
			if (calendarRef.current) {
				const calendarApi = calendarRef.current.getApi();
				calendarApi.changeView(view, date);
				setCurrentView(view);
			}
		},
		[calendarRef.current]
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
						changeView={changeView}
						view={currentView}
						filter={filter}
						setfilter={setFilter}
					/>
					<div className="calendar">
						<FullCalendar
							ref={calendarRef}
							plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
							headerToolbar={{
								left: 'prev,next',
								center: 'title',
								// right: 'dayGridMonth,timeGridWeek,timeGridDay,timeGridFourDay', // user can switch between the two
								right: views.join(','), // user can switch between the two
							}}
							initialView={initialView}
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
							// eventContent={renderEventContent} // render custom component
							// views={{
							//   timeGridFourDay: {
							//     type: 'timeGrid',
							//     duration: { days: 4 }
							//   }
							// }}
							height="70vh"
						/>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

function renderEventContent(eventInfo) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	);
}

export default App;
