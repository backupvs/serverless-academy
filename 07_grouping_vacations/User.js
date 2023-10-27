export default class User {
  constructor(id, name) {
    this.userId = id;
    this.userName = name;
    this.vacations = [];
  }

  addVacation(startDate, endDate) {
    this.vacations.push({
      startDate,
      endDate,
    });
  }
}
