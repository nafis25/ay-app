const IS_RELEASE = false;

const base_url = IS_RELEASE
  ? 'https://admin.alteryouth.com/'
  : 'https://test.alteryouth.com/';
const img_base_url = IS_RELEASE ? '' : base_url;

const BDT_SCHOLARSHIP_AMOUNT = 1000;
const BDT_SERVICE_CHARGE = 200;
const BDT_TOTAL = 1200;
const USD_SCHOLARSHIP_AMOUNT = 12;
const USD_SERVICE_CHARGE = 2.7;
const USD_PAYMENT_CHARGE = 1;
const USD_TOTAL = 15.7;

const fam_photo_url =
  'https://alteryouth-test.s3.us-east-2.amazonaws.com/demo/0101011203_transfer.jpg';
const story_photo_url =
  'https://alteryouth-test.s3.us-east-2.amazonaws.com/demo/0101011203_story.jpg';
const profile_photo_url =
  'https://alteryouth-test.s3.us-east-2.amazonaws.com/demo/0101011203_profile.jpg';
const school_photo_url =
  'https://alteryouth-test.s3.us-east-2.amazonaws.com/demo/01010307_campus.jpg';
const ht_photo_url =
  'https://alteryouth-test.s3.us-east-2.amazonaws.com/demo/01010105_teacher.jpg';

export {
  base_url,
  img_base_url,
  fam_photo_url,
  story_photo_url,
  profile_photo_url,
  school_photo_url,
  ht_photo_url,
  BDT_SCHOLARSHIP_AMOUNT,
  BDT_SERVICE_CHARGE,
  BDT_TOTAL,
  USD_SCHOLARSHIP_AMOUNT,
  USD_SERVICE_CHARGE,
  USD_PAYMENT_CHARGE,
  USD_TOTAL,
};
