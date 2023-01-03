import {registerSheet} from 'react-native-actions-sheet';
import PaymentSheet from './PaymentSheet';
import DhlSheet from './DhlSheet';
import HishabSheet from './HishabSheet';
import PrivacySheet from './PrivacySheet';

/**
 * Registering the sheets here because otherwise sheet closes on
 * hot reload during development.
 */
registerSheet('payment-sheet', PaymentSheet);
registerSheet('dhl-sheet', DhlSheet);
registerSheet('hishab-sheet', HishabSheet);
registerSheet('privacy-sheet', PrivacySheet);

export {};
