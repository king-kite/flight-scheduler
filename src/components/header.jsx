import React from 'react';
import {
	FaArrowLeft,
	FaArrowRight,
	FaSearchPlus,
	FaSearchMinus,
} from 'react-icons/fa';

// const views = ['dayGridMonth', 'listDay', 'listWeek', 'listMonth', 'listYear', 'timeGridWeek', 'timeGridDay'];

function Header({ type, changeType, zoom, filter, setFilter, prevNowNext }) {
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
				<span onClick={() => zoom('out')}>
					<FaSearchMinus className="change-view-icon" />
				</span>
				<span onClick={() => zoom('in')}>
					<FaSearchPlus className="change-view-icon" />
				</span>
			</div>
			<div className="calendar-type-button-container">
				<button onClick={changeType}>
					set {type === 'list' ? 'grid view' : 'list view'}
				</button>
			</div>
		</div>
	);
}

export default Header;
