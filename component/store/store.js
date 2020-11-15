//MobX
import UserStore from "./UserStore";
//전역 Store
//import { userStore } from "store";
//<Button onPress={() => userStore.printUserStore()} title="유저 출력"/>

export const userStore = new UserStore();
