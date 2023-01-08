import {styled} from 'nativewind';
import {useRef, useState} from 'react';
import {Text, View, _View} from 'react-native';
import ActionSheet, {SheetManager} from 'react-native-actions-sheet';

import {
  BDT_SCHOLARSHIP_AMOUNT,
  BDT_SERVICE_CHARGE,
  USD_SCHOLARSHIP_AMOUNT,
  USD_SERVICE_CHARGE,
} from '../../config';
import {assignStudent, payMonthly} from '../../requests/PortalRequests';
import {PrimaryButton} from '../Buttons';

const generateCharges = (qty, method) => {
  let scholarship_charges = {};

  if (method === 'stripe') {
    let transferred_amount = qty * BDT_SCHOLARSHIP_AMOUNT;
    let service_charge = qty * BDT_SERVICE_CHARGE;
    let monthly_payable = transferred_amount + service_charge;
    let monthly_payable_usd =
      qty * USD_SCHOLARSHIP_AMOUNT + qty * USD_SERVICE_CHARGE;

    Object.assign(scholarship_charges, {
      transferred_amount: transferred_amount.toLocaleString(),
      service_charge: service_charge.toLocaleString(),
      monthly_payable: monthly_payable.toLocaleString(),
      monthly_payable_usd: monthly_payable_usd.toFixed(2).toLocaleString(),
    });
  } else {
    let transferred_amount = qty * BDT_SCHOLARSHIP_AMOUNT;
    let service_charge = qty * BDT_SERVICE_CHARGE;
    let total = transferred_amount + service_charge;
    // let card_payment_charge =
    //   (transferred_amount + service_charge) * BDT_CARD_CHARGE;
    let monthly_payable = transferred_amount + service_charge;

    Object.assign(scholarship_charges, {
      transferred_amount: transferred_amount.toLocaleString(),
      service_charge: service_charge.toLocaleString(),
      total: total.toLocaleString(),
      // card_payment_charge: card_payment_charge.toLocaleString(),
      monthly_payable: monthly_payable.toLocaleString(),
    });
  }

  return scholarship_charges;
};

function PaymentSheet({sheetId, payload}) {
  const paymentSheetRef = useRef(null);

  const {method, qty, type} = payload;

  const [isLoading, setIsLoading] = useState(false);

  const monthly = (for_month, payment_method) => {
    setIsLoading(true);
    let _payload = {success: false, url: null};

    payMonthly({
      months: for_month,
      payment_method: payment_method,
    })
      .then(response => {
        if (response.data.success === true) {
          _payload.success = true;
          _payload.url = response.data.url;
        }
      })
      .catch(error => console.log('Monthly Payment Error', error.response))
      .finally(() => {
        setIsLoading(false);
        SheetManager.hide(sheetId, {
          payload: _payload,
        });
      });
  };

  const checkout = (students, method, months) => {
    setIsLoading(true);
    let _payload = {success: false, url: null};

    assignStudent({
      students: students,
      payment_method: method,
      months: months,
    })
      .then(response => {
        if (response.data.success === true) {
          _payload.success = true;
          _payload.url = response.data.url;
        }
      })
      .catch(error => console.log('Checkout Error', error.response))
      .finally(() => {
        setIsLoading(false);
        SheetManager.hide(sheetId, {
          payload: _payload,
        });
      });
  };

  const handlePayment = () => {
    type === 'checkout' ? checkout(qty, method, 1) : monthly(1, method);
  };

  let charges = generateCharges(qty, method);

  let checkoutMonths = [12, 6, 4, 2];
  let monthlyMonths = [12, 6, 2, 1];

  return (
    <ActionSheet
      id={sheetId}
      ref={paymentSheetRef}
      containerStyle={{
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
      }}
      indicatorStyle={{
        width: 100,
      }}
      openAnimationConfig={{damping: 35, stiffness: 300}}
      gestureEnabled={true}
      onClose={() =>
        SheetManager.hide(sheetId, {
          payload: {success: false, url: null},
        })
      }>
      <View className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <View>
          <Text className="font-gilroybold text-lg mb-1">
            Monthly Subscription
          </Text>
          <AyText>Your scholarship will auto-renew every month</AyText>
        </View>

        <View className="p-4 border border-gray-200 rounded-lg">
          <View className="flex flex-col gap-6 ">
            <View className="flex flex-row justify-between">
              <AyText>
                Student's Scholarship Amount x {qty} {'\n\n'}
                <Text className="font-gilroymedium text-gray-300">
                  Transferred via bKash
                </Text>
              </AyText>
              <AyText>BDT {charges.transferred_amount}</AyText>
            </View>
            <View className="flex flex-row justify-between pb-6 border-b border-b-gray-200 ">
              <AyText>Scholarship Service Fee x {qty}</AyText>
              <AyText>BDT {charges.service_charge}</AyText>
            </View>
            <View className="flex flex-row justify-between">
              <Text className="font-gilroybold">Monthly Payable</Text>
              <Text className="font-gilroybold">
                BDT {charges.monthly_payable}
              </Text>
            </View>
          </View>
        </View>

        <View>
          <PrimaryButton
            title={`Pay ${method === 'stripe' ? 'USD' : 'BDT'} ${
              method === 'stripe'
                ? charges?.monthly_payable_usd
                : charges.monthly_payable
            }/month`}
            handleFn={handlePayment}
            loading={isLoading}
          />
        </View>

        {charges?.monthly_payable_usd && (
          <View className="flex flex-row justify-center">
            <Text className="font-gilroymedium text-xs text-gray-300">
              Includes an international payment charge of USD 1.00/month
            </Text>
          </View>
        )}
      </View>
    </ActionSheet>
  );
}

const AyText = styled(Text, 'font-gilroymedium');

export default PaymentSheet;
