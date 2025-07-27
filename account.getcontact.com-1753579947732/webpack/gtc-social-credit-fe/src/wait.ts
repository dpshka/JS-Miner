/**
 * This code got with small changes from
 * https://github.com/MeForma/vue-wait-for
 */

import { App, reactive } from "vue";

export class Wait {
  list: any;
  constructor() {
    this.list = reactive({});
  }
  is(name: string) {
    const filters = Array.isArray(name) ? name : [name];
    return filters.filter((item) => !!this.list[item]).length > 0;
  }
  start(name: string) {
    return !this.list[name] && (this.list[name] = Date.now());
  }
  end(name: string) {
    const start = this.list[name];
    delete this.list[name];
    return Date.now() - start;
  }
  any() {
    return !!Object.keys(this.list).length;
  }
  clear() {
    const clearList: Record<string, any> = {};
    Object.keys(this.list).forEach((item) => {
      clearList[item] = this.end(item);
    });
    return clearList;
  }
}

export const $wait = new Wait();

export default {
  install(app: App): any {
    app.config.globalProperties.$wait = $wait;
    app.provide("$wait", $wait);
  },
};
