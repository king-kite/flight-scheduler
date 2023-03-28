import React from 'react';
import {
	FaArrowLeft,
	FaArrowRight,
	FaSearchPlus,
	FaSearchMinus,
} from 'react-icons/fa';

// const views = ['dayGridMonth', 'timeGridWeek', 'timeGridDay'];

function Header({ view, changeView, filter, setFilter, prevNowNext }) {
	const zoomIn = React.useCallback(() => {
		switch (view) {
			case 'timeGridDay':
				return changeView('timeGridWeek');
			case 'timeGridWeek':
				return changeView('dayGridMonth');
			default:
				return changeView('dayGridMonth');
		}
	}, [view, changeView]);

	const zoomOut = React.useCallback(() => {
		switch (view) {
			case 'dayGridMonth':
				return changeView('timeGridWeek');
			case 'timeGridWeek':
				return changeView('timeGridDay');
			default:
				return changeView('timeGridDay');
		}
	}, [view, changeView]);

	return (
		<div className="toolbar">
			<div className="date-input">
				<label htmlFor="from">from</label>
				<input
					type="date"
					name="from"
					id="from"
					onChange={(e) => {
						setFilter((prevState) => ({
							...prevState,
							from: e.target.value,
						}));
					}}
					value={filter.from}
				/>
			</div>
			<div className="date-input">
				<label htmlFor="to">to</label>
				<input
					type="date"
					name="to"
					id="to"
					onChange={(e) => {
						setFilter((prevState) => ({
							...prevState,
							to: e.target.value,
						}));
					}}
					value={filter.to}
				/>
			</div>
			<div className="prev-now-next">
				<span onClick={() => prevNowNext('previous')}>
					<FaArrowLeft className="prev-now-next-arrow" />
				</span>
				<span
					onClick={() => prevNowNext('now')}
					className="prev-now-next-title"
				>
					now
				</span>
				<span onClick={() => prevNowNext('next')}>
					<FaArrowRight className="prev-now-next-arrow" />
				</span>
			</div>
			<div className="change-view-icons-container">
				<span onClick={zoomOut}>
					<FaSearchMinus className="change-view-icon" />
				</span>
				<span onClick={zoomIn}>
					<FaSearchPlus className="change-view-icon" />
				</span>
			</div>
		</div>
	);
}

export default Header;
