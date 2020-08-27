//MobX
import BbsStore from "./BbsStore";
import UserStore from "./UserStore";
import AnotherStore from "./AnotherStore";
//전역 Store
//import { bbsStore, userStore,anotherStore } from "store";

//import { bbsStore, } from "store";
//import { anotherStore } from "store";
//import { userStore } from "store";

//<Button onPress={() => userStore.printUserStore()} title="유저 출력"/>

export const bbsStore = new BbsStore();
export const userStore = new UserStore();
export const anotherStore = new AnotherStore();
