// Check out the readme if need explanation on this folder/file...
require('dotenv').config();

import {BestBuyExtractor} from '../extractors/Bestbuy';
import {makeWebhook} from '../util/discord';

const webhook = makeWebhook(process.env.WEBHOOK_URL, process.env.USERNAME);

const url =
  'https://www.bestbuy.com/site/sony-playstation-5-console/6426149.p?skuId=6426149';
const sku = '6426149';

(async () => {
  try {
    const result = await BestBuyExtractor.extract(url);
    if (result.id !== sku) {
      throw new Error(
        `SKU mismatch: Expected "${result.id}" to equal "${sku}"`
      );
    }
    if (result.status !== 'Sold Out') {
      throw new Error(
        `Status mismatch: Expected "${result.status}" to be "Sold Out"`
      );
    }
    await webhook('SNAFU');
  } catch (err) {
    console.error(err);
    await webhook(err.message);
  }
})();
