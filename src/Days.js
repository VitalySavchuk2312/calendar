import React, {Component} from 'react';

export default class Days extends Component {
  render() {
    // getting props from App component
    let days = this.props.days(this.props.year, this.props.month, 1);
    days = days.map((item, index) => {
      let arr = item.map((item2,index2) => {
        if(index == 0 && item2 - 1 > 20) {
          return(
            <div key={index2} className="calendar-container__body-month-days-item">
              <span className="calendar-container__body-month-days-item-number grey">{item2}</span>
            </div>
          );
        }
        return(
          <div key={index2} className="calendar-container__body-month-days-item">
            <span className="calendar-container__body-month-days-item-number">{item2}</span>
          </div>
        );
      });
      // render the whole arr and display days in 5 rows
      return(
        <div key={index} className="calendar-container__body-month-days">
          {arr}
        </div>
      );
    });
    return(
      days
    )
  }
}
