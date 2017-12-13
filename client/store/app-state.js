import {
  observable,
  action,
  autorun,
} from 'mobx';


export default class AppState {
  constructor({ count, name } = { count: 0, name: 'bengi' }) {
    this.count = count;
    this.name = name;
  }
  @observable count = 0
  @observable name = 'bengi'
  @action add() {
    this.count += 1;
  }
  @action changeName(name) {
    this.name = name.trim();
  }
  toJson() {
    return {
      count: this.count,
      name: this.name,
    };
  }
}


const app = new AppState();
autorun(() => {
  console.log(app.name);
});

