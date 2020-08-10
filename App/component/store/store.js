//MobX
import BbsStore from "./BbsStore.js";
import UserStore from "./UserStore.js";
//전역 Store
//import { bbsStore, userStore } from "store";
//<Button onPress={() => userStore.printUserStore()} title="유저 출력"/>
export const bbsStore = new BbsStore();
export const userStore = new UserStore();
