import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Days from './Days';
import '../includes/css/app.css';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // getting current date object properties
      currentYear: new Date().getFullYear(),
      currentMonth: new Date().getMonth(),
      currentDay: new Date().getDay(),
      monthArr: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      weekArr: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
    }
  }
  // pushing all month days in on array
  getAllDaysInMonth() {
    // main date object
    const date = new Date(this.state.currentYear, this.state.currentMonth, 1);
    // get the last day of the current month value
    const lastDayOfMonth = new Date(this.state.currentYear, this.state.currentMonth + 1, 0);
    // get the last day of the previous month value
    const lastDayOfPreviousMonth = new Date(this.state.currentYear, this.state.currentMonth, 0);
    let lastDayOfPreviousMonthNumber = lastDayOfPreviousMonth.getDate() + 1;
    let lastDaysOfPreviousMonthArr = [];
    // get the first the of week which corresponds to first day of month
    let firstWeekDay = date.getDay();
    // set Sunday as the last day of week (index 7)
    firstWeekDay = firstWeekDay == 0 ? 7 : firstWeekDay;
    let days = [];
    // some counter for month where Sunday is the first day
    let sundayCounter = 0;
    while (date.getMonth() === this.state.currentMonth) {
      // to fill in last days from the previous month in the beginning of row
      if(date.getDate() < firstWeekDay) {
        lastDaysOfPreviousMonthArr.push(lastDayOfPreviousMonthNumber - date.getDate());
        if(firstWeekDay - lastDaysOfPreviousMonthArr.length == 1) {
          // reverse arr to display days like 27, 28, 29, 30 - not: 30, 29, 28, 27
          lastDaysOfPreviousMonthArr.reverse();
          lastDaysOfPreviousMonthArr = lastDaysOfPreviousMonthArr.map((item, index) => {
            /*
            pushing object as an array element with two properties: index (number of day)
            and status (day of current month or previous one)
            */
            days.push({index: item, status: "inactive"});
          });
        }
      } else if(date.getDate() == firstWeekDay) { // to start dating when the first day of week and month matched
        days.push({index: 1, status: "active"});
        // to take the last weekday value (minus 1 to prevent repeating the same number in the following 'else' statement)
        var firstWeekDayIndex = firstWeekDay - 1;
      } else { // continue dating when month days number becomes bigger than weekdays one
          // to start pushing number values into calendar rows after empty ones
          days.push({index: date.getDate() - firstWeekDayIndex, status: "active"});
          /*
          check if days array length is equil to the last day of current month. If yes, create counter with the last array index value
          and continue to fill up calendar with numbers to reach the last day of month (firsly empty values were calculated as well,
          so every month finished with 27, 26 day extc.)
          */
          if(days.length == lastDayOfMonth.getDate()) {
            let counter = days[days.length - 1].index;
            while(counter < lastDayOfMonth.getDate()) {
              counter++;
              days.push({index: counter, status: "active"});
            }
          }
      }
      // increase current date on 1 after every iteration
      date.setDate(date.getDate() + 1);
    }
    /*
      transforming current month days array into two dimensional array
      with 7 in every embedded array (to show user 7 days per line)
    */
    let result = [];
    for(var i = 0; i <= 35; i++) {
      let line = [];
      for(var j = i; j < i + 7; j++) {
        line.push(days[j]);
      }
      result.push(line);
      i = j - 1;
    }
  return result;
  }
  // rendering main content
  render() {
    const month = new Date();
    // rendering week days
    let weekArr = this.state.weekArr;
    weekArr = weekArr.map((item, index) => {
      return(
        <h3 key={index} className="calendar-container__body-weekdays-item">
          {item}
        </h3>
      )
    });
    // rendering month days
     return(
      <section className="calendar-container">
        <div className="calendar-container__item">
          <section className="calendar-container__heading-section">
            <span className="calendar-container__heading-section-switch" onClick={this.getPreviousMonth.bind(this)}> &lArr; </span>
            <h2 className="calendar-container__heading-section-title">{this.state.monthArr[this.state.currentMonth]} {this.state.currentYear}</h2>
            <span className="calendar-container__heading-section-switch" onClick={this.getNextMonth.bind(this)}> &rArr;	</span>
          </section>
          <div className="calendar-container__body-weekdays">
            {weekArr}
          </div>
          <div className="calendar-container__body-month-days-container">
            <Days year={this.state.currentYear} month={this.state.currentMonth} days={this.getAllDaysInMonth.bind(this)} />
          </div>
        </div>
      </section>
    );
  }
  // previous month btn in calendar
  getPreviousMonth() {
    // to get current date properties
    let prevMonth = this.state.currentMonth;
    let prevYear = this.state.currentYear;
    // minus one month every time when btn is clicked
    prevMonth--;
    const previousDate = new Date(prevYear, prevMonth, 1);
    if(prevMonth < 1) {
      this.setState({
        currentMonth: 11,
        currentYear: prevYear - 1,
        currentDay: previousDate.getDay() + 1
      });
    } else {
      this.setState({
        currentMonth: prevMonth,
        currentDay: previousDate.getDay() + 1
      });
    }
  }
  // next month btn in calendar
  getNextMonth() {
    // to get current date properties
    let nextMonth = this.state.currentMonth;
    let nextYear = this.state.currentYear;
    // plus one month every time the btn is clicked
    nextMonth++;
    if(nextMonth > 11) {
      this.setState({
        currentMonth: 0,
        currentYear: nextYear + 1,
      });
    } else {
      this.setState({
        currentMonth: nextMonth
      });
    }
  }
}
