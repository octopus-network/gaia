(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{620:function(e,o,s){"use strict";s.r(o);var t=s(1),a=Object(t.a)({},(function(){var e=this,o=e.$createElement,s=e._self._c||o;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"adr-002-globalfee-module"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#adr-002-globalfee-module"}},[e._v("#")]),e._v(" ADR 002: Globalfee Module")]),e._v(" "),s("h2",{attrs:{id:"changelog"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#changelog"}},[e._v("#")]),e._v(" Changelog")]),e._v(" "),s("ul",[s("li",[e._v("2023-06-12: Initial Draft")])]),e._v(" "),s("h2",{attrs:{id:"status"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#status"}},[e._v("#")]),e._v(" Status")]),e._v(" "),s("p",[e._v("ACCEPTED Implemented")]),e._v(" "),s("h2",{attrs:{id:"context"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#context"}},[e._v("#")]),e._v(" Context")]),e._v(" "),s("p",[e._v("The globalfee module was created to manage a parameter called "),s("code",[e._v("MinimumGasPricesParam")]),e._v(", which sets a network-wide minimum fee requirement. The intention was to stop random denominations from entering fee collections and to reduce the time validators take to check a long list of transaction fees. To address scenarios where no fee payment is required but the denominations for volunteered paid fees are still restricted, the zero coins was introduced to serve as a means of limiting the denoms. Nevertheless, the initial version of the globalfee module had some issues:")]),e._v(" "),s("ul",[s("li",[s("p",[e._v("In the globalfee module, several Cosmos SDK coins methods were redefined because of the allowance of zero-value coins in the "),s("code",[e._v("MinimumGasPricesParam")]),e._v(". The "),s("code",[e._v("MinimumGasPricesParam")]),e._v(" is of "),s("code",[e._v("sdk.DecCoins")]),e._v(" type. In the Cosmos SDK, "),s("code",[e._v("sdk.DecCoins")]),e._v(" are "),s("a",{attrs:{href:"https://github.com/cosmos/cosmos-sdk/blob/67f04e629623d4691c4b2e48806f7793a3aa211e/types/dec_coin.go#L160-L177",target:"_blank",rel:"noopener noreferrer"}},[e._v("sanitized"),s("OutboundLink")],1),e._v(" to remove zero-value coins. As a result, several methods from "),s("code",[e._v("sdk.Coins")]),e._v(" were "),s("a",{attrs:{href:"https://github.com/cosmos/gaia/blob/890ab3aa2e5788537b0d2ebc9bafdc968340e0e5/x/globalfee/ante/fee_utils.go#L46-L104",target:"_blank",rel:"noopener noreferrer"}},[e._v("redefined in the Gaia fee antehandler"),s("OutboundLink")],1),e._v(".")])]),e._v(" "),s("li",[s("p",[s("code",[e._v("BypassMinFeeMsgTypes")]),e._v(" exists in "),s("code",[e._v("app.toml")]),e._v(", which means each node can define its own value. Thus, it's not clear whether a transaction containing bypass-messages will be exempted from paying a fee.")])]),e._v(" "),s("li",[s("p",[e._v("The fee check logic is only executed in "),s("code",[e._v("CheckTx")]),e._v(". This could enable malicious validators to change the fee check code and propose transactions that do not meet the fee requirement.")])])]),e._v(" "),s("h2",{attrs:{id:"decision"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#decision"}},[e._v("#")]),e._v(" Decision")]),e._v(" "),s("p",[e._v("To fix these problems, the following changes are added to the globalfee module:")]),e._v(" "),s("ul",[s("li",[s("strong",[e._v("ZeroCoins in "),s("code",[e._v("MinimumGasPricesParam")]),e._v(":")]),s("br"),e._v("\nRefactor the fee check logics, in order to use the Cosmos SDK coins' methods instead of the redefined methods.")]),e._v(" "),s("li",[s("strong",[e._v("Bypass Message Types:")]),s("br"),e._v(" "),s("code",[e._v("BypassMinFeeMsgTypes")]),e._v(" is refactored to be a param of the globalfee module, in order to make the bypass messages deterministic.")]),e._v(" "),s("li",[s("strong",[e._v("Check Fees in "),s("code",[e._v("DeliverTx")]),e._v(":")]),s("br"),e._v("\nThe fee check is factored to executed in both "),s("code",[e._v("DeliverTx")]),e._v(" and "),s("code",[e._v("CheckTx")]),e._v(". This is to prevent malicious validators from changing the fee check logic and allowing any transactions to pass fee check. As a consequence, "),s("code",[e._v("MinimumGasPricesParam")]),e._v(" is introduced as a globalfee param.")])]),e._v(" "),s("h3",{attrs:{id:"zerocoins-in-minimumgaspricesparam"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#zerocoins-in-minimumgaspricesparam"}},[e._v("#")]),e._v(" ZeroCoins in "),s("code",[e._v("MinimumGasPricesParam")])]),e._v(" "),s("h4",{attrs:{id:"coins-split"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#coins-split"}},[e._v("#")]),e._v(" Coins Split")]),e._v(" "),s("p",[s("code",[e._v("CombinedFeeRequirement")]),e._v(" refers to the fee requirement that takes into account both "),s("code",[e._v("globalFees")]),e._v(" ("),s("code",[e._v("MinimumGasPricesParam")]),e._v(" in the globalfee module) and "),s("code",[e._v("localFees")]),e._v(" ("),s("code",[e._v("minimum-gas-prices")]),e._v(" in "),s("code",[e._v("app.toml")]),e._v("). This requirement is calculated as the maximum value between "),s("code",[e._v("globalFees")]),e._v(" and "),s("code",[e._v("localFees")]),e._v(" for denomination exists "),s("code",[e._v("globalFees")]),e._v(".\nThe allowance of zero coins in the "),s("code",[e._v("MinimumGasPricesParam")]),e._v(" within the globalfee module implies that "),s("code",[e._v("CombinedFeeRequirement(globalFees, localFees)")]),e._v(" also permits zero coins. Therefore, the "),s("code",[e._v("CombinedFeeRequirement")]),e._v(" doesn't meet the requirements of certain "),s("code",[e._v("sdk.Coins")]),e._v(" methods. For instance, the "),s("code",[e._v("DenomsSubsetOf")]),e._v(" method requires coins that do not contain zero coins.")]),e._v(" "),s("p",[e._v("To address this issue,  the "),s("code",[e._v("CombinedFeeRequirement")]),e._v(" and "),s("code",[e._v("feeCoins")]),e._v(" are split as shown in the chart below.")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"mermaid",base64:"LS0tCnRpdGxlOiBGZWUgUmVxdWlyZW1lbnRzIGFuZCBGZWUgU3BsaXRzCi0tLQpmbG93Y2hhcnQgVEQKCXN1YmdyYXBoIGZlZVJlcQogICAgQVtDb21iaW5lZEZlZVJlcXVpcmVtZW50XS0tJmd0O0JbL1NwbGl0IHplcm8vbm9uemVybyBjb2lucy9dCiAgICBCLS0mZ3Q7fHplcm8gY29pbnN8IENbemVyb0NvaW5GZWVzRGVub21SZXFdOwoJQi0tJmd0O3xub256ZXJvIGNvaW5zfCBEW25vbnplcm9Db2luRmVlc0Rlbm9tUmVxXTsKCgllbmQKCglzdWJncmFwaCBmZWVDb2luCglFW2ZlZUNvaW5zXS0tJmd0O0ZbL1NwbGl0IGJ5IHRoZSBkZW5vbXMgaW4gemVyby9ub256ZXJvIENvaW5GZWVzRGVub21SZXEvXQogICAgRi0tJmd0O3xkZW5vbXMgaW4gemVyb0NvaW5GZWVzRGVub21SZXEgc2V0fCBHW2ZlZUNvaW5zWmVyb0Rlbm9tXQogICAgRi0tJmd0O3xkZW5vbXMgaW4gbm9uemVyb0NvaW5GZWVzRGVub21SZXEgc2V0fCBIW2ZlZUNvaW5zTm9uWmVyb0Rlbm9tXQoJZW5kCg=="}}),e._v(" "),s("p",[e._v("The "),s("code",[e._v("CombinedFeeRequirement")]),e._v(" is split into zero and non-zero coins, forming "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(" and "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(". Similarly, the paid fees (feeCoins) are split into "),s("code",[e._v("feeCoinsNonZeroDenom")]),e._v(" and "),s("code",[e._v("feeCoinsZeroDenom")]),e._v(", based on the denominations of "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(" and "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(" as shown in the following code snippet.")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"CW5vblplcm9Db2luRmVlc1JlcSwgemVyb0NvaW5GZWVzRGVub21SZXEgOj0gZ2V0Tm9uWmVyb0ZlZXMoZmVlUmVxdWlyZWQpCgoJLy8gZmVlQ29pbnNOb25aZXJvRGVub20gY29udGFpbnMgbm9uLXplcm8gZGVub21pbmF0aW9ucyBmcm9tIHRoZSBmZWVSZXF1aXJlZAoJLy8gZmVlQ29pbnNOb25aZXJvRGVub20gaXMgdXNlZCB0byBjaGVjayBpZiB0aGUgZmVlcyBtZWV0cyB0aGUgcmVxdWlyZW1lbnQgaW1wb3NlZCBieSBub25aZXJvQ29pbkZlZXNSZXEKCS8vIHdoZW4gZmVlQ29pbnMgZG9lcyBub3QgY29udGFpbiB6ZXJvIGNvaW5zJyBkZW5vbXMgaW4gZmVlUmVxdWlyZWQKCWZlZUNvaW5zTm9uWmVyb0Rlbm9tLCBmZWVDb2luc1plcm9EZW5vbSA6PSBzcGxpdENvaW5zQnlEZW5vbXMoZmVlQ29pbnMsIHplcm9Db2luRmVlc0Rlbm9tUmVxKQoK"}}),e._v(" "),s("h4",{attrs:{id:"fee-checks"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fee-checks"}},[e._v("#")]),e._v(" Fee Checks")]),e._v(" "),s("p",[e._v("The Workflow of feeCheck is shown below:")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"mermaid",base64:"LS0tCnRpdGxlOiBGZWUgQ2hlY2sKLS0tCmZsb3djaGFydCBURAoKQVtmZWVDb2luc05vblplcm9EZW5vbV0tLSZndDtCWy9EZW5vbXNTdWJzZXRPZl9ub25aZXJvQ29pbkZlZXNSZXEvXTsKQi0tJmd0O3x5ZXN8Q1tpc19ieXBhc3NfbXNnXTsKQi0tJmd0O3xub3xEKChyZWplY3QpKTsKCkMtLSZndDt8eWVzfHBhc3MxKChwYXNzKSk7CkMtLSZndDt8bm98RFsvY29udGFpbl96ZXJvQ29pbkZlZXNEZW5vbVJlcV9kZW5vbS9dOwoKRC0tJmd0O3x5ZXN8cGFzczIoKHBhc3MpKTsKRC0tJmd0O3xub3xFWy9mZWVDb2luc1plcm9EZW5vbV9ub25FbXB0eS9dOwoKCkUtLSZndDt8eWVzfHBhc3MzKChwYXNzKSk7CkUtLSZndDt8bm98RlsvSXNBbnlHVEVfbm9uWmVyb0NvaW5GZWVzRGVub21SZXEvXTsKCkYtLSZndDt8eWVzfHBhc3M0KChwYXNzKSk7CkYtLSZndDt8bm98cmVqZWN0MigocmVqZWN0KSk7Cg=="}}),e._v(" "),s("p",[e._v("The split enable checking "),s("code",[e._v("feeCoinsNonZeroDenom")]),e._v(" against "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(", and "),s("code",[e._v("feeCoinsZeroDenom")]),e._v(" against\n"),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(" (as shown in the following code snippet). In the check of "),s("code",[e._v("feeCoinsNonZeroDenom")]),e._v(" against "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(", the Cosmos SDK coins' methods can be used since zero coins are removed from the "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(", while in the check "),s("code",[e._v("feeCoinsZeroDenom")]),e._v(" against "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(", only denoms need to be checked.")]),e._v(" "),s("p",[e._v("Checking "),s("code",[e._v("feeCoinsNonZeroDenom")]),e._v(" against "),s("code",[e._v("nonZeroCoinFeesReq")]),e._v(":")]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go ",base64:"CWlmICFmZWVDb2luc05vblplcm9EZW5vbS5Jc0FueUdURShub25aZXJvQ29pbkZlZXNSZXEpIHsKCQlyZXR1cm4gY3R4LCBzZGtlcnJvcnMuV3JhcGYoc2RrZXJyb3JzLkVyckluc3VmZmljaWVudEZlZSwgJnF1b3Q7aW5zdWZmaWNpZW50IGZlZXM7IGdvdDogJXMgcmVxdWlyZWQ6ICVzJnF1b3Q7LCBmZWVDb2lucy5TdHJpbmcoKSwgZmVlUmVxdWlyZWQuU3RyaW5nKCkpCgl9Cg=="}}),e._v(" "),s("p",[e._v("Here is an example of how the coins split and checked in fee antehandler:"),s("br"),e._v(" "),s("strong",[e._v("assumption")]),e._v(":"),s("br"),e._v(" "),s("code",[e._v("globalfee=[1photon, 0uatom, 1stake]")]),e._v(" and "),s("code",[e._v("local min-gas-prices=[0.5stake]")])]),e._v(" "),s("p",[s("strong",[e._v("fee requirement")]),e._v(":"),s("br"),e._v(" "),s("code",[e._v("combinedFeeRequirement=[1photon, 0uatom, 1stake]")])]),e._v(" "),s("p",[s("strong",[e._v("split fee requirement")]),e._v(":"),s("br"),e._v("\nthe "),s("code",[e._v("combinedFeeRequirement")]),e._v(" into "),s("code",[e._v("nonZeroCoinFeesReq=[0uatom]")]),e._v(", and "),s("code",[e._v("nonZeroCoinFeesReq=[1photon, 1stake]")])]),e._v(" "),s("p",[s("strong",[e._v("split the paid fees")]),e._v(":"),s("br"),e._v("\nif "),s("code",[e._v("paidFee=[1uatom, 0.5photon]")]),e._v(",\nthe "),s("code",[e._v("splitCoinsByDenoms")]),e._v(" splits the paidFee into "),s("code",[e._v("feeCoinsZeroDenom=[1uatom]")]),e._v(" (the same denom as zero coins in "),s("code",[e._v("combinedFeeRequirement")]),e._v("), and "),s("code",[e._v("feeCoinsNonZeroDenom=[0.5stake]")]),e._v("\nthen "),s("code",[e._v("feeCoinsZeroDenom=[1uatom]")]),e._v(" is checked by "),s("code",[e._v("nonZeroCoinFeesReq=[1photon, 1stake]")]),e._v(".")]),e._v(" "),s("p",[e._v("Please note that "),s("code",[e._v("feeCoins")]),e._v(" does not contain zero coins. The fee coins are split according to the denoms in "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(" or "),s("code",[e._v("nonZeroCoinFeesDenomReq")]),e._v(". If feeCoins contains coins not in both "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(" and "),s("code",[e._v("nonZeroCoinFeesDenomReq")]),e._v(", the transaction should be rejected. On the contrary, if  feeCoins' denoms are in either "),s("code",[e._v("zeroCoinFeesDenomReq")]),e._v(" or "),s("code",[e._v("nonZeroCoinFeesDenomReq")]),e._v(", and "),s("code",[e._v("len(zeroCoinFeesDenomReq)!=0")]),e._v(", the transaction can directly pass, otherwise, the fee amount need to be checked.")]),e._v(" "),s("h3",{attrs:{id:"bypass-message-types"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bypass-message-types"}},[e._v("#")]),e._v(" Bypass Message Types")]),e._v(" "),s("p",[s("code",[e._v("BypassMinFeeMsgTypes")]),e._v(" was a setup in "),s("code",[e._v("config/app.toml")]),e._v(" before the refactor. "),s("code",[e._v("BypassMinFeeMsgTypes")]),e._v(" is refactored to be a param of the globalfee module to get a network level agreement. Correspondingly,"),s("code",[e._v("MaxTotalBypassMinFeeMsgGasUsage")]),e._v(" is also introduced as a globalfee param.")]),e._v(" "),s("h3",{attrs:{id:"fee-checks-in-delivertx"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#fee-checks-in-delivertx"}},[e._v("#")]),e._v(" Fee Checks in  "),s("code",[e._v("DeliverTx")])]),e._v(" "),s("p",[e._v("Implementing fee checks within the "),s("code",[e._v("DeliverTx")]),e._v(" function introduces a few requirements:")]),e._v(" "),s("ul",[s("li",[s("strong",[e._v("Deterministic Minimum Fee Requirement")]),e._v(": For the "),s("code",[e._v("DeliverTx")]),e._v(" process, it is essential to have a deterministic minimum fee requirement. In "),s("code",[e._v("CheckTx")]),e._v(", fee is checked by the "),s("code",[e._v("CombinedFeeRequirement(globalFees, localFees)")]),e._v(", which considers both "),s("code",[e._v("minimum-gas-prices")]),e._v(" from "),s("code",[e._v("config/app.toml")]),e._v(" and "),s("code",[e._v("MinimumGasPricesParam")]),e._v(" from the globalfee Params (For more details, see "),s("RouterLink",{attrs:{to:"/modules/globalfee.html"}},[e._v("globalfee.md")]),e._v("). "),s("code",[e._v("CombinedFeeRequirement")]),e._v(" contains non-deterministic part: "),s("code",[e._v("minimum-gas-prices")]),e._v(" from "),s("code",[e._v("app.toml")]),e._v(". Therefore, "),s("code",[e._v("CombinedFeeRequirement")]),e._v(" cannot be used in "),s("code",[e._v("DeliverTx")]),e._v(". In "),s("code",[e._v("DeliverTx")]),e._v(", only "),s("code",[e._v("MinimumGasPricesParam")]),e._v(" in globalfee Params is used for fee verification. The code implementation is shown below.")],1)]),e._v(" "),s("tm-code-block",{staticClass:"codeblock",attrs:{language:"go",base64:"ZnVuYyAobWZkIEZlZURlY29yYXRvcikgR2V0VHhGZWVSZXF1aXJlZChjdHggc2RrLkNvbnRleHQsIHR4IHNkay5GZWVUeCkgKHNkay5Db2lucywgZXJyb3IpIHsKCS8vIEdldCByZXF1aXJlZCBnbG9iYWwgZmVlIG1pbiBnYXMgcHJpY2VzCgkvLyBOb3RlIHRoYXQgaXQgc2hvdWxkIG5ldmVyIGJlIGVtcHR5IHNpbmNlIGl0cyBkZWZhdWx0IHZhbHVlIGlzIHNldCB0byBjb2luPXsmcXVvdDtTdGFraW5nQm9uZERlbm9tJnF1b3Q7LCAwfQoJZ2xvYmFsRmVlcywgZXJyIDo9IG1mZC5HZXRHbG9iYWxGZWUoY3R4LCB0eCkKCWlmIGVyciAhPSBuaWwgewoJCXJldHVybiBzZGsuQ29pbnN7fSwgZXJyCgl9CgoJLy8gSW4gRGVsaXZlclR4LCB0aGUgZ2xvYmFsIGZlZSBtaW4gZ2FzIHByaWNlcyBhcmUgdGhlIG9ubHkgdHggZmVlIHJlcXVpcmVtZW50cy4KCWlmICFjdHguSXNDaGVja1R4KCkgewoJCXJldHVybiBnbG9iYWxGZWVzLCBuaWwKCX0KCgkvLyBJbiBDaGVja1R4IG1vZGUsIHRoZSBsb2NhbCBhbmQgZ2xvYmFsIGZlZSBtaW4gZ2FzIHByaWNlcyBhcmUgY29tYmluZWQKCS8vIHRvIGZvcm0gdGhlIHR4IGZlZSByZXF1aXJlbWVudHMKCgkvLyBHZXQgbG9jYWwgbWluaW11bS1nYXMtcHJpY2VzCglsb2NhbEZlZXMgOj0gR2V0TWluR2FzUHJpY2UoY3R4LCBpbnQ2NCh0eC5HZXRHYXMoKSkpCgoJLy8gUmV0dXJuIGNvbWJpbmVkIGZlZSByZXF1aXJlbWVudHMKCXJldHVybiBDb21iaW5lZEZlZVJlcXVpcmVtZW50KGdsb2JhbEZlZXMsIGxvY2FsRmVlcykKfQo="}}),e._v(" "),s("ul",[s("li",[s("p",[s("strong",[e._v("Deterministic Bypass Parameters")]),e._v(": The decision of whether a message can bypass the minimum fee has to be deterministic as well. To ensure this, "),s("code",[e._v("BypassMinFeeMsgTypes")]),e._v(" and "),s("code",[e._v("MaxTotalBypassMinFeeMsgGasUsage")]),e._v(" parameters are moved to a persistent store.")])]),e._v(" "),s("li",[s("p",[s("strong",[e._v("Module Initialization Order")]),e._v(": The genutils module must be initialized before the globalfee module. This is due to the "),s("code",[e._v("DeliverGenTxs")]),e._v(" in the genutils module, is called during "),s("code",[e._v("initGenesis")]),e._v(". This function executes "),s("code",[e._v("DeliverTx")]),e._v(", which subsequently calls the AnteHandle in FeeDecorator, triggering the fee check in "),s("code",[e._v("DeliverTx")]),e._v(".\nTo prevent the "),s("code",[e._v("DeliverGenTxs")]),e._v(" go through a fee check, the initialization of the globalfee module should occur after the genutils module. This sequencing ensures that all necessary components are in place when the fee check occurs. See "),s("a",{attrs:{href:"https://github.com/cosmos/gaia/issues/2489",target:"_blank",rel:"noopener noreferrer"}},[e._v("Gaia Issue #2489"),s("OutboundLink")],1),e._v(" for more context.")])])]),e._v(" "),s("h2",{attrs:{id:"consequences"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#consequences"}},[e._v("#")]),e._v(" Consequences")]),e._v(" "),s("h3",{attrs:{id:"positive"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#positive"}},[e._v("#")]),e._v(" Positive")]),e._v(" "),s("p",[e._v("This refactor results in code that is easier to maintain. It prevents malicious validators from escaping fee checks and make the bypass messages work at network level.")]),e._v(" "),s("h3",{attrs:{id:"negative"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#negative"}},[e._v("#")]),e._v(" Negative")]),e._v(" "),s("p",[e._v("The introduction of FeeDecorator has replaced the usage of "),s("code",[e._v("MempoolFeeDecorator")]),e._v(" in the Cosmos SDK. Currently, if both FeeDecorator and MempoolFeeDecorator are added to the AnteDecorator chain, it will result in redundant checks. However, there's potential for FeeDecorator and MempoolFeeDecorator to become incompatible in the future, depending on updates to the Cosmos SDK.")]),e._v(" "),s("h2",{attrs:{id:"references"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),s("ul",[s("li",[s("RouterLink",{attrs:{to:"/modules/globalfee.html"}},[e._v("Documentation of the globalfee module")])],1)])],1)}),[],!1,null,null,null);o.default=a.exports}}]);