**ecoXchange**

🌍 **Inspiration**
The first inspiration for this project came from a research project I did last year with the local Region 7 EPA. I did a project on environmental altruism and while it wasn't technically oriented, some of the discussions I had really stood oout to me. One discussion in particular about a potential future Carbon Credits cap and trade system greatly stood out to me. I deciided that utilizing the XRPL would be the perfect way to actually implement a real world carbon credits exchange system. By creating a decentralized marketplace for carbon credits, ecoXchange enables entities to contribute meaningfully to global environmental goals while proving their own green footprint.

💼 **What It Does**
ecoXchange is a blockchain-powered platform that facilitates the trading and transfer of carbon credits. 
The platform allows entities (firms, companies, factories, etc...) to:

**1. Transfer Carbon Credits:** Securely transfer carbon credits to other wallets on the XRPL (XRP Ledger).
**2. List Credits for Sale:** Users can post their available carbon credits for sale which appear in the marketplace.
**3. Track Carbon Credit Balance:** The platform displays a user’s current balance of carbon credits in their XRPL wallet in real-time.
**4. Progress Tracking:** Users can monitor their progress towards environmental awards via a visual progress bar.

🛠️ **How I Built It**
Tech Stack
**Frontend:**
HTML: The user interface is styled with HTML and Bootstrap.
JavaScript: JS handles form submissions, updates balance data, and manages marketplace listings.
Bootstrap & Font Awesome: Bootstrap is used for a pleasant layout and icons for  a modern design.
**Blockchain:**
XRPL (XRP Ledger): XRPL is used for real-time carbon credit balance display and creditstransfer functionality. It is also used to tokenize 'Carbon Credit' as a new token (this token has no value and a set starting amount as a proof of concept). 

**Key Features and Files**
**Landing Page:** This page includes information about ecoxchange and a contact form.
**dashboard.html:** This page includes a dashboard interface with balance display, credit transfer form, and marketplace listing.
**credits.html:** This page shows progress tracker and badges (unfinished).
**accountsTesting.js:** This javaScript file containts wallet interactions (both wallets directly integrated into code for proof of concept), such as retrieving balances and handling transfers.


🚀 **Using ecoXchange**
**Installation and Setup**
**1. Clone the Repository:**
git clone https://github.com/your-username/ecoXchange.git
**2. cd ecoXchange**
**3. Install Dependencies in the project directory** 
**4. enter npm start into a terminal to launch the local host.**

**How to ese ecoXchange**
**Check Carbon Credit Balance:** The platform will fetch and display the current carbon credit balance for the wallet address integrated directly in the code.
**Transfer Credits:** Fill in the recipient's wallet address and the amount to transfer to initiate the transaction.
**List Credits for Sale:** You can specify your credits for sale, set a price, and input contact information to make your listing visible in the marketplace.

🧩**Challenges I Ran Into**
The biggest challenge for me was that this was my first time ever developing a webapp and my first time doing it with web3 technology as well. It took a long time to learn a lot of the concepts and to get started with making a basic template. I also had to learn how to use github properly since I had never made a project on my own and I nearly ended up deletinig my entire project progress at some point on accident. Thankfully I was able to get help with github and restore my project!

