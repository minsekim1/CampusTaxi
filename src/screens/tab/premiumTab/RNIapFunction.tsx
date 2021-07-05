import { Alert, Platform } from "react-native";
import * as RNIap from "react-native-iap";

let purchaseUpdateSubscription: any;
let purchaseErrorSubscription: any;

//  해당 페이지에 넣어야됌
// if (productList.length === 0) {
//   getSubscriptions();
//   setTimeout(() => {
//     getSubscriptions();
//   }, 100);
// }

const appSubProductId = "regularpayment";

const itemSkus = Platform.select({
  ios: ["com.campustaxi.campustaxi", "testinapp"],
  android: ["android.campustaxi.campustaxi", appSubProductId],
});

export const itemSubs = Platform.select({
  ios: [
    "com.cooni.point1000",
    "com.cooni.point5000", // dooboolab
  ],
  android: ["android.campustaxi.campustaxi", appSubProductId],
});

export const PurchaseGoogle = () => {
  async () => {
    try {
      const result = await RNIap.initConnection();
      console.log("result", result);
      await RNIap.flushFailedPurchasesCachedAsPendingAndroid();
    } catch (e) {
      console.warn(e.code, e.message);
    }
  };
  purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(
    //#region 접속 시도 후 결제
    async (purchase: RNIap.InAppPurchase | RNIap.SubscriptionPurchase) => {
      const receipt = purchase.transactionReceipt;

      if (receipt) {
        try {
          // if (Platform.OS === 'ios') {
          //   finishTransactionIOS(purchase.transactionId);
          // } else if (Platform.OS === 'android') {
          //   // If consumable (can be purchased again)
          //   consumePurchaseAndroid(purchase.purchaseToken);
          //   // If not consumable
          //   acknowledgePurchaseAndroid(purchase.purchaseToken);
          // }
          const ackResult = await RNIap.finishTransaction(purchase);
        } catch (ackErr) {
          console.warn("ackErr", ackErr);
        }
        // setReceipt(receipt);
        //#region 결제 데이터 저장하기(AWS EC2)

        //#endregion 결제 데이터 저장하기(AWS EC2)

        //#region 접속 종료

        console.log("결제 완료", "결제가 정상적으로 처리되었습니다.");

        if (purchaseUpdateSubscription) {
          purchaseUpdateSubscription.remove();
          purchaseUpdateSubscription = null;
        }
        if (purchaseErrorSubscription) {
          purchaseErrorSubscription.remove();
          purchaseErrorSubscription = null;
        }
        RNIap.endConnection();
        //#endregion 접속 종료
      }
    }
  );
  //#endregion 접속 시도 후 결제
  //#region 에러 리스너
  purchaseErrorSubscription = RNIap.purchaseErrorListener(
    (error: RNIap.PurchaseError) => {
      console.log("purchaseErrorListener", error);
      console.log("결제 취소", "결제가 취소되었습니다.");
      //Alert.alert("purchase error", JSON.stringify(error));
    }
  );
  //#endregion 에러 리스너
};
export const getSubscriptions = async (): Promise<any> => {
  let products: any = null;
  try {
    if (!itemSubs) return;
    products = await RNIap.getSubscriptions(itemSubs);
    return new Promise(async (resolve) => {
      resolve(products);
    });
  } catch (err) {
    console.warn(err.code, err.message);
  }
  return new Promise(async (resolve) => {
    resolve(null);
  });
};

//#region 현재 구매한 목룍 확인 함수

export async function getAvailablePurchases() {
  return new Promise(
    async (resolve): Promise<any> => {
      //현재 구매한 목룍 확인 함수
      let result = false;
      try {
        const purchases: Array<any> = await RNIap.getAvailablePurchases();
        //console.info("Available purchases :: ", purchases);
        if (purchases && purchases.length > 0) {
          //console.log(`getAvailablePurchases Got ${purchases.length} items.`);
          for (let i = 0; i < purchases.length; i += 1) {
            // console.log("getAvailablePurchases", purchases[i].transactionReceipt);
            if (
              JSON.parse(purchases[i].transactionReceipt).productId ===
              appSubProductId
            ) {
              result = true;
            }
          }
          resolve(purchases);
        }
      } catch (err) {
        console.warn(err.code, err.message);
        console.log(err.message);
        resolve([]);
      }
      resolve([]);
    }
  );
}

//#endregion 현재 구매한 목룍 확인 함수

//#region 1회용 아이템 구매
// const requestPurchase = async (sku: string): Promise<void> => {
// 	try {
// 		RNIap.requestPurchase(sku);
// 	} catch (err) {
// 		console.warn(err.code, err.message);
// 	}
// };
//#endregion 1회용 아이템 구매

//#region 구독하기 구매
// sku = product.id 이걸로 매개변수 넣으면됌
export const requestSubscription = async (sku: string): Promise<boolean> => {
  return new Promise(async (resolve) => {
    if (!sku) { resolve(false); return};
    try {
      await getSubscriptions()
      await RNIap.requestSubscription(sku).then(v => resolve(v.autoRenewingAndroid === true));
      return;
    } catch (err) {
      console.log('requestSubscription',err.message);
    }
    resolve(false)
    return;
  });
};
//#endregion 구독하기 구매
