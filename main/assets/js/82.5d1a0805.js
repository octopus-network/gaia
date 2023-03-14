(window.webpackJsonp=window.webpackJsonp||[]).push([[82],{599:function(e,t,a){"use strict";a.r(t);var s=a(1),i=Object(s.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"auth-subspace"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#auth-subspace"}},[e._v("#")]),e._v(" "),a("code",[e._v("auth")]),e._v(" subspace")]),e._v(" "),a("p",[e._v("The "),a("code",[e._v("auth")]),e._v(" module is responsible for authenticating accounts and transactions. It has the following parameters:")]),e._v(" "),a("table",[a("tr",[a("th",[e._v("Key")]),e._v(" "),a("th",[e._v("Value")])]),e._v(" "),e._l(e.$themeConfig.currentParameters.auth,(function(t,s){return a("tr",[a("td",[a("a",{attrs:{href:"#"+s}},[a("code",[e._v(e._s(s))])])]),e._v(" "),a("td",[a("code",[e._v(e._s(t))])])])}))],2),e._v(" "),a("p",[e._v("The "),a("code",[e._v("auth")]),e._v(" module is responsible for specifying the base transaction and account types for an application, since the SDK itself is agnostic to these particulars. It contains the ante handler, where all basic transaction validity checks (signatures, nonces, auxiliary fields) are performed, and exposes the account keeper, which allows other modules to read, write, and modify accounts.")]),e._v(" "),a("h2",{attrs:{id:"governance-notes-on-parameters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#governance-notes-on-parameters"}},[e._v("#")]),e._v(" Governance notes on parameters")]),e._v(" "),a("h3",{attrs:{id:"maxmemocharacters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#maxmemocharacters"}},[e._v("#")]),e._v(" "),a("code",[e._v("MaxMemoCharacters")])]),e._v(" "),a("p",[a("strong",[e._v("The character limit for each transaction memo.")])]),e._v(" "),a("p",[e._v('There is an option to include a "memo," or additional information (data) to Cosmos Hub transactions, whether sending funds, delegating, voting, or other transaction types. This parameter limits the number of characters that may be included in the memo line of each transaction.')]),e._v(" "),a("ul",[a("li",[e._v("on-chain value: "),a("code",[e._v(e._s(e.$themeConfig.currentParameters.auth.MaxMemoCharacters))])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-4")]),e._v(" genesis: "),a("code",[e._v("512")])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-3")]),e._v(" genesis: "),a("code",[e._v("512")])])]),e._v(" "),a("h4",{attrs:{id:"decreasing-the-value-of-maxmemocharacters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decreasing-the-value-of-maxmemocharacters"}},[e._v("#")]),e._v(" Decreasing the value of "),a("code",[e._v("MaxMemoCharacters")])]),e._v(" "),a("p",[e._v("Decreasing the value of "),a("code",[e._v("MaxMemoCharacters")]),e._v(" will decrease the character limit for each transaction memo. This may break the functionality of applications that rely upon the data in the memo field. For example, an exchange may use a common deposit address for all of its users, and then individualize account deposits using the memo field. If the memo field suddenly decreased, the exchange may no longer automatically sort its users' transactions.")]),e._v(" "),a("h4",{attrs:{id:"increasing-the-value-of-maxmemocharacters"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#increasing-the-value-of-maxmemocharacters"}},[e._v("#")]),e._v(" Increasing the value of "),a("code",[e._v("MaxMemoCharacters")])]),e._v(" "),a("p",[e._v("Increasing the value of "),a("code",[e._v("MaxMemoCharacters")]),e._v(" will increase the character limit for each transaction memo. This may enable new functionality for applications that use transaction memos. It may also enable an increase in the amount of data in each block, leading to an increased storage need for the blockchain and "),a("a",{attrs:{href:"https://thecontrol.co/state-growth-a-look-at-the-problem-and-its-solutions-6de9d7634b0b",target:"_blank",rel:"noopener noreferrer"}},[e._v("state bloat"),a("OutboundLink")],1),e._v(".\n")]),e._v(" "),a("h3",{attrs:{id:"txsiglimit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#txsiglimit"}},[e._v("#")]),e._v(" "),a("code",[e._v("TxSigLimit")])]),e._v(" "),a("p",[a("strong",[e._v("The max number of signatures per transaction")])]),e._v(" "),a("p",[e._v("Users and applications may create multisignature (aka multisig) accounts. These accounts require more than one signature to generate a transaction. This parameter limits the number of signatures in a transaction.")]),e._v(" "),a("ul",[a("li",[e._v("on-chain value: "),a("code",[e._v(e._s(e.$themeConfig.currentParameters.auth.TxSigLimit))])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-4")]),e._v(" genesis: "),a("code",[e._v("7")])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-3")]),e._v(" genesis: "),a("code",[e._v("7")])])]),e._v(" "),a("h4",{attrs:{id:"decreasing-the-value-of-txsiglimit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decreasing-the-value-of-txsiglimit"}},[e._v("#")]),e._v(" Decreasing the value of "),a("code",[e._v("TxSigLimit")])]),e._v(" "),a("p",[e._v("Decreasing the value of "),a("code",[e._v("TxSigLimit")]),e._v(" will decrease the maximum number of signatures possible. This may constrain stakeholders that want to use as many as seven signatures to authorize a transaction. It will also break the functionality of entities or applications dependent upon up to seven transactions, meaning that those transactions will no longer be able to be authorized. In this case, funds and functions controlled by a multisignature address will no longer be accessible, and funds may become stranded.")]),e._v(" "),a("h4",{attrs:{id:"increasing-the-value-of-txsiglimit"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#increasing-the-value-of-txsiglimit"}},[e._v("#")]),e._v(" Increasing the value of "),a("code",[e._v("TxSigLimit")])]),e._v(" "),a("p",[e._v("Increasing the value of "),a("code",[e._v("TxSigLimit")]),e._v(" will increase the maximum number of signatures possible. As this value increases, the network becomes more likely to be susceptible to attacks that slow block production, due to the burden of computational cost when verifying more signatures (since signature verification is costlier than other operations).")]),e._v(" "),a("h3",{attrs:{id:"txsizecostperbyte"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#txsizecostperbyte"}},[e._v("#")]),e._v(" "),a("code",[e._v("TxSizeCostPerByte")])]),e._v(" "),a("p",[a("strong",[e._v("Sets the cost of transactions, in units of gas.")])]),e._v(" "),a("p",[a("code",[e._v("TxSizeCostPerByte")]),e._v(" is used to compute the gas-unit consumption for each transaction.")]),e._v(" "),a("ul",[a("li",[e._v("on-chain value: "),a("code",[e._v(e._s(e.$themeConfig.currentParameters.auth.TxSizeCostPerByte))])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-4")]),e._v(" genesis: "),a("code",[e._v("10")])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-3")]),e._v(" genesis: "),a("code",[e._v("10")])])]),e._v(" "),a("h4",{attrs:{id:"decreasing-the-value-of-txsizecostperbyte"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decreasing-the-value-of-txsizecostperbyte"}},[e._v("#")]),e._v(" Decreasing the value of "),a("code",[e._v("TxSizeCostPerByte")])]),e._v(" "),a("p",[e._v("Decreasing the value of "),a("code",[e._v("TxSizeCostPerByte")]),e._v(" will reduce the number of gas units used per transaction. This may also reduce the fees that validators earn for processing transactions. There may be other effects that have not been detailed here.")]),e._v(" "),a("h4",{attrs:{id:"increasing-the-value-of-txsizecostperbyte"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#increasing-the-value-of-txsizecostperbyte"}},[e._v("#")]),e._v(" Increasing the value of "),a("code",[e._v("TxSizeCostPerByte")])]),e._v(" "),a("p",[e._v("Increasing the value of "),a("code",[e._v("TxSizeCostPerByte")]),e._v(" will raise the number of gas units used per transaction. This may also increase the fees that validators earn for processing transactions. There may be other effects that have not been detailed here.")]),e._v(" "),a("h3",{attrs:{id:"sigverifycosted25519"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sigverifycosted25519"}},[e._v("#")]),e._v(" "),a("code",[e._v("SigVerifyCostED25519")])]),e._v(" "),a("p",[a("strong",[e._v("The cost for verifying ED25519 signatures, in units of gas.")])]),e._v(" "),a("p",[e._v("Ed25519 is the EdDSA cryptographic signature scheme (using SHA-512 (SHA-2) and Curve25519) that is used by Cosmos Hub validators. "),a("code",[e._v("SigVerifyCostED25519")]),e._v(" is the gas (ie. computational) cost for verifying ED25519 signatures, and ED25519-based transactions are not currently accepted by the Cosmos Hub.")]),e._v(" "),a("ul",[a("li",[e._v("on-chain value: "),a("code",[e._v(e._s(e.$themeConfig.currentParameters.auth.SigVerifyCostED25519))])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-4")]),e._v(" genesis: "),a("code",[e._v("590")])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-3")]),e._v(" genesis: "),a("code",[e._v("590")])])]),e._v(" "),a("h4",{attrs:{id:"decreasing-the-value-of-sigverifycosted25519"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decreasing-the-value-of-sigverifycosted25519"}},[e._v("#")]),e._v(" Decreasing the value of "),a("code",[e._v("SigVerifyCostED25519")])]),e._v(" "),a("p",[e._v("Decreasing the value of "),a("code",[e._v("SigVerifyCostED25519")]),e._v(" will decrease the amount of gas that is consumed by transactions that require Ed25519 signature verifications. Since Ed25519-signed transactions are not currently accepted by Cosmos Hub, changing this parameter is unlikely to affect stakeholders at this time.")]),e._v(" "),a("h4",{attrs:{id:"increasing-the-value-of-sigverifycosted25519"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#increasing-the-value-of-sigverifycosted25519"}},[e._v("#")]),e._v(" Increasing the value of "),a("code",[e._v("SigVerifyCostED25519")])]),e._v(" "),a("p",[e._v("Increasing the value of "),a("code",[e._v("SigVerifyCostED25519")]),e._v(" will increase the amount of gas that is consumed by transactions that require Ed25519 signature verifications. Since Ed25519 signature transactions are not currently accepted by Cosmos Hub, changing this parameter is unlikely to affect stakeholders at this time.")]),e._v(" "),a("h4",{attrs:{id:"notes"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#notes"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),a("p",[e._v("Ed25519 signatures are not currently being accepted by the Cosmos Hub. Ed25519 signatures will be verified and can be considered valid, so the gas to verify them will be consumed. However, the transaction itself will be rejected. It could be that these signatures will be used for transactions a later time, such as after inter-blockchain communication (IBC) evidence upgrades happen.")]),e._v(" "),a("h3",{attrs:{id:"sigverifycostsecp256k1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#sigverifycostsecp256k1"}},[e._v("#")]),e._v(" "),a("code",[e._v("SigVerifyCostSecp256k1")])]),e._v(" "),a("p",[a("strong",[e._v("The cost for verifying Secp256k1 signatures, in units of gas.")])]),e._v(" "),a("p",[e._v("Secp256k1 is an elliptic curve domain parameter for cryptographic signatures used by user accounts in the Cosmos Hub. "),a("code",[e._v("SigVerifyCostSecp256k1")]),e._v(" is the gas (ie. computational) cost for verifying Secp256k1 signatures. Practically all Cosmos Hub transactions require Secp256k1 signature verifications.")]),e._v(" "),a("ul",[a("li",[e._v("on-chain value: "),a("code",[e._v(e._s(e.$themeConfig.currentParameters.auth.SigVerifyCostSecp256k1))])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-4")]),e._v(" default: "),a("code",[e._v("1000")])]),e._v(" "),a("li",[a("code",[e._v("cosmoshub-3")]),e._v(" default: "),a("code",[e._v("1000")])])]),e._v(" "),a("h4",{attrs:{id:"decreasing-the-value-of-sigverifycostsecp256k1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#decreasing-the-value-of-sigverifycostsecp256k1"}},[e._v("#")]),e._v(" Decreasing the value of "),a("code",[e._v("SigVerifyCostSecp256k1")])]),e._v(" "),a("p",[e._v("Decreasing the value of "),a("code",[e._v("SigVerifyCostSecp256k1")]),e._v(" will decrease the amount of gas that is consumed by practically all Cosmos Hub transactions, which require Secp256k1 signature verifications. Decreasing this parameter may have unintended effects on how the Cosmos Hub operates, since the computational cost of verifying a transaction may be greater than what the system's assumption is.")]),e._v(" "),a("h4",{attrs:{id:"increasing-the-value-of-sigverifycostsecp256k1"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#increasing-the-value-of-sigverifycostsecp256k1"}},[e._v("#")]),e._v(" Increasing the value of "),a("code",[e._v("SigVerifyCostSecp256k1")])]),e._v(" "),a("p",[e._v("Increasing the value of "),a("code",[e._v("SigVerifyCostSecp256k1")]),e._v(" will increase the amount of gas that is consumed by practically all Cosmos Hub transactions, which require Secp256k1 signature verifications. Increasing this parameter may have unintended effects on how the Cosmos Hub operates, since the computational cost of verifying a transaction may be less than what the system's assumption is.")]),e._v(" "),a("h4",{attrs:{id:"notes-2"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#notes-2"}},[e._v("#")]),e._v(" Notes")]),e._v(" "),a("p",[e._v("There should be a better understanding of what the potential implications are for changing "),a("code",[e._v("SigVerifyCostSecp256k1")]),e._v(". For example, gas calculations are important because blocks have a gas limit. Transactions could be rejected for exceeding the block gas limit, breaking application functionality or perhaps preventing addresses controlled by multiple signatures from moving funds.")])])}),[],!1,null,null,null);t.default=i.exports}}]);