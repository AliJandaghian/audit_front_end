import React, { Component } from "react";
import DropDown from "./dropDown";
import Input from "./input";
class DateFilter extends Component {
  render() {
    const {
      onChangeTo,
      onChangeFrom,
      onItemClick,
      selectedFrom,
      selectedTo,
    } = this.props;
    return (
      <DropDown
        onItemClick={onItemClick}
        name={" Filter Date"}
        icon={<i class="fa fa-filter" aria-hidden="true" />}
        items={[
          { value: "today", label: "Today" },
          { value: "yesterday", label: "Yesterday" },
          { value: "thisWeek", label: "This Week" },
          { value: "lastWeek", label: "Last Week" },
          { value: "thisMonth", label: "This Month" },
          { value: "lastMonth", label: "Last Month" },
        ]}
        form={
          <div className="container">
              <label htmlFor="dateFrom">Start date</label>
            <Input
              type="date"
              placeholder="Start date"
              id='dateFrom'
              selected={selectedFrom}
              onChange={onChangeFrom}
              autoComplete="false"
            />
<label htmlFor="dateTo">End date</label>
            <Input
              type="date"
              id='dateTo'
              placeholder="End date"
              className="boxDatePicker"
              selected={selectedTo}
              onChange={onChangeTo}
            />

            <button
              disabled={!selectedFrom || !selectedTo}
              className="button button__purple"
              name={"customDate"}
              onClick={onItemClick}
            >
              Apply Filter
            </button>
          </div>
        }
        variant="btn rounded-pill btn-outline-dark btn-sm"
      />
    );
  }
}
export default DateFilter;
