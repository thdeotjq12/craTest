import React, { Component } from "react";
import DatetimePicker, { parseDate } from "react-datetimepicker-syaku";

var today = new Date();
class Multiple extends Component {
  constructor(props) {
    super(props);

    this.onDatetime = this.onDatetime.bind(this);

    this.state = {
      selectedDates: [parseDate(today, "Ymd")],
      selectedDates2: []
    };
  }

  onDatetime(selectedDates, name) {
    this.setState({ [name]: selectedDates });
  }

  render() {
    return (
      <div className="row">
        <div className="col-xs-6">
          <DatetimePicker
            onChange={selectedDates => {
              this.onDatetime(selectedDates, "selectedDates");
            }}
            type="date"
            endDate={this.state.selectedDates2}
            defaultDate={this.state.selectedDates}
            className="input-group-sm"
          />
        </div>
        <div className="col-xs-6">
          <DatetimePicker
            onChange={selectedDates =>
              this.onDatetime(selectedDates, "selectedDates2")
            }
            type="date"
            startDate={this.state.selectedDates}
            defaultDate={this.state.selectedDates2}
            className="input-group-sm"
          />
        </div>
      </div>
    );
  }
}

export default Multiple;
