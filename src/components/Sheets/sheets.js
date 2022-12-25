import {registerSheet} from 'react-native-actions-sheet';
import PaymentSheet from './PaymentSheet';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('payment-sheet', PaymentSheet);

export {};
