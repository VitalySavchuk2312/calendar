import React, {Component} from 'react';

export default class Days extends Component {
  render() {
    // getting props from App component
    let days = this.props.days(this.props.year, this.props.month, 1);
    days = days.map((item, index) => {
      let arr = item.map((item2, index2) => {
        // if the last day in row is bigger than a month day, render just empty squares
        if(item2 == undefined) {
          return(
            <div key={index2} className="calendar-container__body-month-days-item">
              <span className="calendar-container__body-month-days-item-number"></span>
            </div>
          );
        } else {
          // if it is a previous month, add grey color class (.last-days-of-month) to its last days
          if(item2.status == "inactive") {
            return(
              <div key={item2.index} className="calendar-container__body-month-days-item">
                <span className="calendar-container__body-month-days-item-number last-days-of-month">{item2.index}</span>
              </div>
            );
          }
          return(
            <div key={item2.index} className="calendar-container__body-month-days-item">
              <span className="calendar-container__body-month-days-item-number">{item2.index}</span>
            </div>
          );
        }
      });
      // render the whole arr and display days in 5 rows
      return(
        <div key={index} className="calendar-container__body-month-days">
          {arr}
        </div>
      );
    });
    // render all the content to parent component
    return(
      days
    )
  }
}
