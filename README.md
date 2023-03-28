# Description <br>

This is an example implementation of blockchain platform. The data structure is a simplified version of the structure used on the Ethereum platform.<br>

The data is stored in memory. <br>

New blocks are always added after at least 4 pending transactions have been added.<br>

In this example, the Proof of Work consensus method is implemented, which is based on the set difficulty of a cryptographic puzzle. The difficulty can be modified and we can observe how it affects performance. To verify this, run the available unit tests.<br><br>

# Install nodejs packages <br>

`npm install`
<br><br>

# Run tests <br>

`npm test`
<br><br>

# Change the difficulty of generating new blocks <br>

- Open blockchain.js file
- Go to Blockchain constructor
- Change number in line this.difficulty = 2;
- Re-run tests
