const axios = require('axios');



/////////////////////////
// FUNCTIONS ////////////
/////////////////////////
async function getHistoricalBitcoinPrice(timestamp) 
{
    let dateString = '';

    try 
    {
        console.log('Raw timestamp:', timestamp);
        const date = new Date(timestamp * 1000);
        console.log('Converted date:', date.toISOString());

        // Check if timestamp is valid
        if (isNaN(date.getTime())) 
        {
            console.error('Invalid timestamp:', timestamp);
            return null;
        }


        dateString = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
        const url = `https://api.coingecko.com/api/v3/coins/bitcoin/history?date=${dateString}`;

        console.log(`Fetching BTC price for date: ${dateString}`);

        await new Promise(resolve => setTimeout(resolve, 1200));

        const response = await axios.get(url, {
            headers: {
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0'
            }
        });


        if (!response.data.market_data?.current_price?.usd) 
        {
            console.error('No price data available for date:', dateString);

            return null;
        }

        const price = response.data.market_data.current_price.usd;
        console.log(`Successfully fetched price for ${dateString}: $${price}`);

        return price;
    } 
    catch (error) 
    {
        console.error(`Error fetching historical price for ${dateString}:`, error.message);

        return null;
    }
}

async function getBitcoinPriceFromBinance(timestamp) 
{
    try 
    {
        // Convert timestamp to milliseconds
        const msTimestamp = timestamp * 1000;

        // Binance kline/candlestick API endpoint
        // Interval can be: 1s, 1m, 3m, 5m, 15m, 30m, 1h, 2h, 4h, 6h, 8h, 12h, 1d, 3d, 1w, 1M
        const url = `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=1m&startTime=${msTimestamp}&limit=1`;
        const response = await axios.get(url);

        if (response.data && response.data[0]) 
        {

            // Returns an array with [openTime, open, high, low, close, volume, closeTime, ...]
            const price = parseFloat(response.data[0][4]); // Using close price
            console.log(`Successfully fetched price for timestamp ${new Date(msTimestamp).toISOString()}: $${price}`);

            return price;
        }

        return null;
    } 
    catch (error) 
    {
        console.error(`Error fetching Binance price:`, error.message);

        return null;
    }
}

async function getBitcoinPriceFromCryptoCompare(timestamp) 
{
    try 
    {
        const url = `https://min-api.cryptocompare.com/data/v2/histominute?fsym=BTC&tsym=USD&ts=${timestamp}&limit=1`;

        const response = await axios.get(url, {
            headers: {
                //NOT NEEDED, QUERING IS NOT LIMITED
                'authorization': 'YOUR_API_KEY' // API key from CryptoCompare
            }
        });

        if (response.data?.Data?.Data?.[0]) 
        {
            const price = response.data.Data.Data[0].close;
            console.log(`Successfully fetched price for timestamp ${new Date(timestamp * 1000).toISOString()}: $${price}`);

            return price;
        }

        return null;
    } 

    catch (error) 
    {
        console.error(`Error fetching CryptoCompare price:`, error.message);

        return null;
    }
}

async function getBitcoinPriceFromKraken(timestamp) 
{
    try 
    {
        // Convert timestamp to minutes for Kraken API
        const url = `https://api.kraken.com/0/public/OHLC?pair=BTCUSD&interval=1&since=${timestamp}`;
        const response = await axios.get(url);

        if (response.data?.result?.XXBTZUSD?.[0]) 
        {
            const price = parseFloat(response.data.result.XXBTZUSD[0][4]); // Using close price
            console.log(`Successfully fetched price for timestamp ${new Date(timestamp * 1000).toISOString()}: $${price}`);

            return price;
        }

        return null;
    } 

    catch (error) 
    {
        console.error(`Error fetching Kraken price:`, error.message);

        return null;
    }
}

async function getBitcoinHistoricalPrice(timestamp) 
{
    try 
    {
        // Try Binance first
        let price = await getBitcoinPriceFromBinance(timestamp);


        if (price) 
        {
            console.log('Price obtained from Binance');

            return price;
        }

        // If Binance fails, try CryptoCompare
        price = await getBitcoinPriceFromCryptoCompare(timestamp);


        if (price) 
        {
            console.log('Price obtained from CryptoCompare');

            return price;
        }

        // If CryptoCompare fails, try Kraken
        price = await getBitcoinPriceFromKraken(timestamp);

        if (price) 
        {
            console.log('Price obtained from Kraken');
            return price;
        }

        // If all APIs fail, fall back to CoinGecko daily price
        price = await getHistoricalBitcoinPrice(timestamp);

        if (price) 
        {
            console.log('Price obtained from CoinGecko');
            return price;
        }

        console.log('Failed to obtain price from any source');
        return null;
    } 
    catch (error) 
    {
        console.error('All price fetching attempts failed:', error.message);
        return null;
    }
}

async function getBitcoinWalletTransactions(address) 
{
    try 
    {
        // Number of transactions to fetch from a certain bitcoin wallet address ///
        const txLimit = 100;
        // Blockchain.com API endpoint with limit parameter ///
        const url = `https://blockchain.info/rawaddr/${address}?limit=${txLimit}`;
        const response = await axios.get(url);
        const data = response.data;

        // Extract TX data ///
        const transactions = await Promise.all(data.txs.map(async tx => 
        {
            const historicalPrice = await getBitcoinHistoricalPrice(tx.time);

            return {
                hash: tx.hash,
                timeUTC: new Date(tx.time * 1000).toISOString(),
                timeUTCFormatted: new Date(tx.time * 1000).toLocaleString('en-US', {
                    timeZone: 'UTC',
                    dateStyle: 'medium',
                    timeStyle: 'medium'
                }),
                timeGMT6: new Date(tx.time * 1000).toLocaleString('en-US', {
                    timeZone: 'America/Chicago',  // GMT-6 (Same as Mexico City) ///
                    dateStyle: 'medium',
                    timeStyle: 'medium'
                }),
                amount: tx.result / 100000000,
                btcPrice: historicalPrice,
                usdValue: (tx.result / 100000000) * historicalPrice,
                inputs: tx.inputs.map(input => input.prev_out?.addr || 'Unknown'),
                outputs: tx.out.map(output => output.addr)
            };
        }));

        return {
            address,
            totalTransactions: data.n_tx,
            finalBalance: data.final_balance / 100000000, // Convert satoshis to BTC ///
            transactions
        };
    } 
    catch (error) 
    {
        console.error('Error fetching wallet transactions:', error.message);

        throw error;
    }
}



/////////////////////////
// MAIN EXECUTION ///////
/////////////////////////
(
    async () => 
    {
        try 
        {
            const walletAddress = 'bc1qeaygua4c98lj3kdp25ypfchyupcnwt5ths85lq';
            const result = await getBitcoinWalletTransactions(walletAddress);

            console.log(`Address: ${result.address}`);
            console.log(`Total Transactions: ${result.totalTransactions}`);
            console.log(`Final Balance: ${result.finalBalance} BTC\n`);


            result.transactions.forEach((tx, index) => {
                console.log(`${index + 1} - Transaction Details:`);
                console.log(`   Hash: ${tx.hash}`);
                console.log(`   Time (UTC LINUX): ${tx.timeUTC}`);
                console.log(`   Time (UTC Formatted): ${tx.timeUTCFormatted}`);
                console.log(`   Time (GMT-6): ${tx.timeGMT6}`);
                console.log(`   Amount: ${tx.amount} BTC`);
                console.log(`   BTC Price: $${tx.btcPrice?.toLocaleString() || 'N/A'}`);
                console.log(`   USD Value: $${tx.usdValue?.toLocaleString() || 'N/A'}`);
                console.log(`   From: ${tx.inputs.join(', ')}`);
                console.log(`   To: ${tx.outputs.join(', ')}`);
                console.log('');
            });
        } 

        catch (error) 
        {
            console.error('Failed to fetch transactions:', error);
        }
    }
)(); 