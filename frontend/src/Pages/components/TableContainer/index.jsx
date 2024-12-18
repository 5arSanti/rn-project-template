/* eslint-disable react/prop-types */
import { ReactTable } from "./Table";
import { ScrollableWrapper } from "../ScrollableWrapper";

import "./styles.css";

const TableContainer = ({data}) => {
	return(
		<ScrollableWrapper maxHeight={400}>
			<div className="scroll-wrapper">
				{data && data.length !== 0 &&
					<ReactTable
						data={data}
					/>
				}
			</div>

		</ScrollableWrapper>
	);
}

export { TableContainer }