const xrpl = require('xrpl');

async function initializeXRPL() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    // Issuer Account (this account will issue the custom token)
    const issuerAccount = {
        address: "rn2GTNkJ19ZS4B8AHd1CzmXCTnjYpNUBLg",
        secret: "sEdSYzjwuAu3nPLSTpkrv31tBsoRCPt"
    };
    const issuerWallet = xrpl.Wallet.fromSeed(issuerAccount.secret);

    // Receiver Account (this account will receive and transact the custom token)
    const receiverAccount = {
        address: "rfu8RpkCVVqQGzDhF7yr3X1jZFVuZH4r1o",
        secret: "sEdSdzc3kJy8iFBVkCeRqN6LQUtqSh3"
    };
    const receiverWallet = xrpl.Wallet.fromSeed(receiverAccount.secret);

    const tokenCode = "CARBON CREDIT";  // Define your custom token code
    const trustLineLimit = "1000000";  // Maximum amount of the custom token the receiver can hold

    // Display Receiver Account XRP Balance
    async function displayBalance() {
        try {
            const response = await client.request({
                command: "account_info",
                account: receiverWallet.classicAddress,
                ledger_index: "validated"
            });
            const balance = xrpl.dropsToXrp(response.result.account_data.Balance);
            document.getElementById("balance-display").innerText = `Receiver Account XRP Balance: ${balance} XRP`;
        } catch (error) {
            document.getElementById("balance-display").innerText = "Error loading balance";
            console.error("Balance loading error:", error);
        }
    }

    // Display balance on page load
    displayBalance();

    // Step 1: Create a Trust Line from Receiver to Issuer for Custom Token
    async function createTrustLine() {
        try {
            const trustSet = {
                TransactionType: "TrustSet",
                Account: receiverWallet.classicAddress,
                LimitAmount: {
                    currency: tokenCode,
                    issuer: issuerWallet.classicAddress,
                    value: trustLineLimit
                }
            };

            const prepared = await client.autofill(trustSet);
            const signed = receiverWallet.sign(prepared);
            const result = await client.submitAndWait(signed.tx_blob);

            if (result.result.meta.TransactionResult === "tesSUCCESS") {
                alert(`Trust line created: Receiver can hold up to ${trustLineLimit} ${tokenCode}`);
            } else {
                alert("Failed to create trust line: " + result.result.meta.TransactionResult);
            }
        } catch (error) {
            alert("Trust line creation error: " + error.message);
            console.error("Trust line creation error:", error);
        }
    }

    // Step 2: Issue Tokens from Issuer to Receiver
    async function issueToken(amount) {
        try {
            const payment = {
                TransactionType: "Payment",
                Account: issuerWallet.classicAddress,
                Amount: {
                    currency: tokenCode,
                    value: amount,
                    issuer: issuerWallet.classicAddress
                },
                Destination: receiverWallet.classicAddress
            };

            const prepared = await client.autofill(payment);
            const signed = issuerWallet.sign(prepared);
            const result = await client.submitAndWait(signed.tx_blob);

            if (result.result.meta.TransactionResult === "tesSUCCESS") {
                alert(`Issued ${amount} ${tokenCode} to receiver`);
            } else {
                alert("Failed to issue tokens: " + result.result.meta.TransactionResult);
            }
        } catch (error) {
            alert("Token issuance error: " + error.message);
            console.error("Token issuance error:", error);
        }
    }

    // Step 3: Transfer Custom Tokens from Receiver to Another Account
    async function transferToken() {
        const destination = document.getElementById("receiverWallet").value;
        const amount = document.getElementById("amount").value;

        // Input validation
        if (!destination || !amount || isNaN(amount) || amount <= 0) {
            alert("Please enter a valid recipient address and amount.");
            return;
        }

        try {
            const payment = {
                TransactionType: "Payment",
                Account: receiverWallet.classicAddress,
                Amount: {
                    currency: tokenCode,
                    value: amount,
                    issuer: issuerWallet.classicAddress
                },
                Destination: destination
            };

            const prepared = await client.autofill(payment);
            const signed = receiverWallet.sign(prepared);
            const result = await client.submitAndWait(signed.tx_blob);

            if (result.result.meta.TransactionResult === "tesSUCCESS") {
                alert(`Transferred ${amount} ${tokenCode} to ${destination}`);
            } else {
                alert("Transfer failed: " + result.result.meta.TransactionResult);
            }
        } catch (error) {
            alert("Token transfer error: " + error.message);
            console.error("Token transfer error:", error);
        }
    }

    // Attach functions to respective buttons
    document.querySelector(".btn-create-trustline").onclick = createTrustLine;
    document.querySelector(".btn-issue-token").onclick = () => issueToken("150"); // Issue 1000 CARBON tokens
    document.querySelector(".btn-transfer-token").onclick = transferToken;

    // Disconnect client on window unload
    window.addEventListener("beforeunload", () => client.disconnect());
}

// Initialize XRPL on page load
initializeXRPL();
