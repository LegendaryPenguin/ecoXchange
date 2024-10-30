
async function initializeXRPL() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();

    // Main account details
    const mainAccount = {
        address: "rn2GTNkJ19ZS4B8AHd1CzmXCTnjYpNUBLg",
        secret: "sEdSYzjwuAu3nPLSTpkrv31tBsoRCPt" 

    };
    const wallet = xrpl.Wallet.fromSeed(mainAccount.secret);

    // Check and Display Balance
    async function displayBalance() {
        try {
            const response = await client.request({
                command: "account_info",
                account: wallet.classicAddress,
                ledger_index: "validated"
            });
            const balance = xrpl.dropsToXrp(response.result.account_data.Balance);
            document.getElementById("balance-display").innerText = `Main Account Balance: ${balance} XRP`;
        } catch (error) {
            document.getElementById("balance-display").innerText = "Error loading balance";
            console.error("Balance loading error:", error);
        }
    }

    // Display balance on page load
    displayBalance();

    // Transfer Credits Function
    async function transferCredits() {
        const destination = document.getElementById("receiverWallet").value;

        const amount = document.getElementById("amount").value;


        // Input validation
        if (!destination || !amount || amount <= 0) {
            alert("Please enter a valid recipient address and amount.");
            return;
        }

        // Transaction details
        const transaction = {
            TransactionType: "Payment",
            Account: wallet.classicAddress,
            Amount: xrpl.xrpToDrops(amount), // Convert XRP amount to drops
            Destination: destination
        };

        try {
            const prepared = await client.autofill(transaction);
            const signed = wallet.sign(prepared);
            const result = await client.submitAndWait(signed.tx_blob);
            console.log("result: ", result);
            if (result.result.meta.TransactionResult === "tesSUCCESS") {
                alert("Transfer successful!");
                displayBalance(); // Update balance after transfer
            } else {
                alert("Transfer failed: " + result.result.meta.TransactionResult);
            }
        } catch (error) {
            alert("Transfer error: " + error.message);
            console.error("Transfer error:", error);
        }
    }

    // Attach transferCredits function to the button
    document.querySelector(".btn-transfer").onclick = transferCredits;

    // Disconnect client on window unload
    window.addEventListener("beforeunload", () => client.disconnect());
}

// Initialize XRPL on page load
initializeXRPL();