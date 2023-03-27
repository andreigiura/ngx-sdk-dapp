import * as i0 from '@angular/core';
import { InjectionToken, Inject, Injectable, Pipe, inject, NgModule } from '@angular/core';
import * as i3 from '@ngxs-labs/actions-executing';
import { actionsExecuting, NgxsActionsExecutingModule } from '@ngxs-labs/actions-executing';
import * as i2 from '@ngxs/storage-plugin';
import { STORAGE_ENGINE, NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import * as i1 from '@ngxs/store';
import { Select, Action, State, NgxsModule } from '@ngxs/store';
import { __awaiter, __decorate, __param } from 'tslib';
import { lastValueFrom, filter, take, Observable, takeWhile, map, skipWhile } from 'rxjs';
import { NativeAuthClient } from '@multiversx/sdk-native-auth-client';
import * as i1$1 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { TokenPayment, Address } from '@multiversx/sdk-core';
import BigNumber from 'bignumber.js';
import { CommonModule } from '@angular/common';
import * as i4 from '@angular/router';
import { Router, NavigationEnd } from '@angular/router';
import { isString as isString$1 } from 'lodash';
import { Address as Address$1, TransactionPayload, Transaction } from '@multiversx/sdk-core/out';
import { ExtensionProvider } from '@multiversx/sdk-extension-provider/out';
import { WalletProvider } from '@multiversx/sdk-web-wallet-provider/out';
import { WalletConnectV2Provider } from '@multiversx/sdk-wallet-connect-provider';
import { HWProvider } from '@multiversx/sdk-hw-provider/out';

const DAPP_CONFIG = new InjectionToken('config');

class PatchAccount {
    constructor(payload) {
        this.payload = payload;
    }
}
PatchAccount.type = '[Account] Set Account partial data';
class LoginAccount {
    constructor(payload) {
        this.payload = payload;
    }
}
LoginAccount.type = '[Account] Set Account partial data';
class ResetAccount {
}
ResetAccount.type = '[Account] Reset Account';
class RefetchAccountData {
}
RefetchAccountData.type = '[Account] refetch Account data';

class AddTransactionsBatch {
    constructor(payload) {
        this.payload = payload;
    }
}
AddTransactionsBatch.type = '[Transactions] Add Transactions Batch';
class MoveToSignedTransactions {
    constructor(payload) {
        this.payload = payload;
    }
}
MoveToSignedTransactions.type = '[Transactions] Move to signed Transactions';
class ResetTransactions {
}
ResetTransactions.type = '[Transactions] Reset Transactions';
class ChangeTxStatus {
    constructor(payload) {
        this.payload = payload;
    }
}
ChangeTxStatus.type = '[Transactions] Move to failed Transactions';
class RemoveTransaction {
    constructor(payload) {
        this.payload = payload;
    }
}
RemoveTransaction.type = '[Transactions] Remove Transaction';
class SetTransactionHashes {
    constructor(payload) {
        this.payload = payload;
    }
}
SetTransactionHashes.type = '[Transactions] Set Transaction Hashes';
class CancelPendingSignature {
}
CancelPendingSignature.type = '[Transactions] Cancel Pending Signature';

var TxStatusEnum;
(function (TxStatusEnum) {
    TxStatusEnum["PENDING_SIGNATURE"] = "pendingSignature";
    TxStatusEnum["SIGNATURE_FAILED"] = "signatureFailed";
    TxStatusEnum["CANCELLED"] = "cancelled";
    TxStatusEnum["SIGNED"] = "signed";
    TxStatusEnum["READY_TO_SEND"] = "readyToSend";
    TxStatusEnum["SEND_IN_PROGRESS"] = "sendInProgress";
    TxStatusEnum["SENT_SUCCESS"] = "sentSuccess";
    TxStatusEnum["SENT_ERROR"] = "sentError";
})(TxStatusEnum || (TxStatusEnum = {}));

var ProvidersType;
(function (ProvidersType) {
    ProvidersType["Extension"] = "Extension";
    ProvidersType["WebWallet"] = "WebWallet";
    ProvidersType["XPortal"] = "XPortal";
    ProvidersType["Ledger"] = "Ledger";
    ProvidersType["EMPTY"] = "";
})(ProvidersType || (ProvidersType = {}));
/**
 * @ignore
 */
let GenericProvider = class GenericProvider {
    constructor(store, accountService, authenticationService, config) {
        this.store = store;
        this.accountService = accountService;
        this.authenticationService = authenticationService;
        this.config = config;
        if (this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
            this.authenticationService.isAuthenticated()) {
            this.reInitialize(accountService.account);
        }
    }
    connect(navAfterConnectRoute) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.accountService.account.currentProvider !== ProvidersType.EMPTY &&
                this.authenticationService.isAuthenticated()) {
                throw new Error('Provider is already connected, please logout first.');
            }
            const client = new NativeAuthClient();
            const init = yield client.initialize();
            return { client, init };
        });
    }
    logout() {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.dispatch(new ResetAccount());
            this.store.dispatch(new ResetTransactions());
            return true;
        });
    }
    sendTransactions(transactions, txId) { }
    addSignedTransactionsToState(transactions, txId) {
        this.store.dispatch(new MoveToSignedTransactions({
            signedTransactions: transactions,
            id: txId,
        }));
    }
    addFailedTransactionsToState(txId) {
        this.store.dispatch(new ChangeTxStatus({
            id: txId,
            newStatus: TxStatusEnum.SIGNATURE_FAILED,
        }));
    }
    addToCancelledTransaction(txId) {
        this.store.dispatch(new ChangeTxStatus({
            id: txId,
            newStatus: TxStatusEnum.CANCELLED,
        }));
    }
    cancelAction() { }
    reInitialize(account) { }
};
GenericProvider = __decorate([
    __param(3, Inject(DAPP_CONFIG))
], GenericProvider);

class AccountService {
    constructor(store) {
        var _a;
        this.store = store;
        this.account = AccountInitialState;
        (_a = this.account$) === null || _a === void 0 ? void 0 : _a.subscribe((account) => {
            this.account = account;
        });
    }
    refetchAccountData() {
        this.store.dispatch(new RefetchAccountData());
    }
    resetToInitialState() {
        this.store.dispatch(new ResetAccount());
    }
}
AccountService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, deps: [{ token: i1.Store }], target: i0.ɵɵFactoryTarget.Injectable });
AccountService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, providedIn: 'root' });
__decorate([
    Select()
], AccountService.prototype, "account$", void 0);
__decorate([
    Select(actionsExecuting([LoginAccount, RefetchAccountData]))
], AccountService.prototype, "accountDataLoading$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: i1.Store }]; }, propDecorators: { account$: [], accountDataLoading$: [] } });

class AccountApiService {
    constructor(http, accountService, config) {
        this.http = http;
        this.accountService = accountService;
        this.config = config;
    }
    getAccount(address) {
        return this.http.get(`${this.config.apiURL}/accounts/${address}`);
    }
    sendTransactions(transactions) {
        return this.http.post(`${this.config.gatewayURL}/transaction/send-multiple`, transactions);
    }
    trackTransactions(transactionHashes) {
        return this.http.get(`${this.config.apiURL}/accounts/${this.accountService.account.address}/transactions?hashes=${transactionHashes.join(',')}&fields=status&withScResults=true`);
    }
    getTransactions(listSize, sender, receiver) {
        return this.http.get(`${this.config.apiURL}/transactions?size=${listSize}&sender=${sender}&receiver=${receiver}&condition=must&fields=txHash%2Ctimestamp%2Csender%2CsenderShard%2Creceiver%2CreceiverShard%2Cstatus%2Cvalue%2Cfunction`);
    }
}
AccountApiService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, deps: [{ token: i1$1.HttpClient }, { token: AccountService }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
AccountApiService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountApiService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1$1.HttpClient }, { type: AccountService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }];
    } });

const AccountInitialState = {
    address: '',
    accessToken: '',
    currentProvider: ProvidersType.EMPTY,
    shard: null,
    balance: '',
    loginTimestamp: 0,
    nonce: 0,
};
let AccountState = class AccountState {
    constructor(accountApi) {
        this.accountApi = accountApi;
    }
    patchAccount({ patchState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            patchState(payload);
        });
    }
    loginAccount({ patchState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!payload.address)
                return;
            patchState({ loginTimestamp: Date.now() });
            const { shard, balance } = yield lastValueFrom(this.accountApi.getAccount(payload.address));
            patchState(Object.assign(Object.assign({}, payload), { shard, balance }));
        });
    }
    refetchAccountData({ patchState, getState, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const state = getState();
            if (state.address) {
                const { shard, balance, nonce } = yield lastValueFrom(this.accountApi.getAccount(state.address));
                patchState({ shard, balance, nonce });
            }
        });
    }
    resetAccount({ setState }) {
        return __awaiter(this, void 0, void 0, function* () {
            setState(AccountInitialState);
        });
    }
};
AccountState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState, deps: [{ token: AccountApiService }], target: i0.ɵɵFactoryTarget.Injectable });
AccountState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState });
__decorate([
    Action(PatchAccount)
], AccountState.prototype, "patchAccount", null);
__decorate([
    Action(LoginAccount)
], AccountState.prototype, "loginAccount", null);
__decorate([
    Action(RefetchAccountData)
], AccountState.prototype, "refetchAccountData", null);
__decorate([
    Action(ResetAccount)
], AccountState.prototype, "resetAccount", null);
AccountState = __decorate([
    State({
        name: 'account',
        defaults: AccountInitialState,
    })
], AccountState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AccountState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: AccountApiService }]; }, propDecorators: { patchAccount: [], loginAccount: [], refetchAccountData: [], resetAccount: [] } });

const GAS_PRICE_MODIFIER = 0.01;
const GAS_PER_DATA_BYTE = 1500;
const GAS_LIMIT = 50000;
const GAS_PRICE = 1000000000;
const DECIMALS = 18;
const DIGITS = 4;
const ZERO = '0';
const MULTIVERSX_CANCEL_ACTION = 'multiversx_cancelAction';
const ERD_CANCEL_ACTION = 'erd_cancelAction';

function pipe(previous) {
    return {
        if: function (condition) {
            if (condition) {
                return {
                    then: (newValue) => 
                    // if a callback is passed, callback is executed with previous value
                    newValue instanceof Function
                        ? pipe(newValue(previous))
                        : pipe(newValue)
                };
            }
            else {
                return {
                    then: () => pipe(previous)
                };
            }
        },
        then: (newValue) => newValue instanceof Function ? pipe(newValue(previous)) : pipe(newValue),
        valueOf: function () {
            return previous;
        }
    };
}

const stringIsInteger = (integer, positiveNumbersOnly = true) => {
    const stringInteger = String(integer);
    if (!stringInteger.match(/^[-]?\d+$/)) {
        return false;
    }
    const bNparsed = new BigNumber(stringInteger);
    const limit = positiveNumbersOnly ? 0 : -1;
    return (bNparsed.toString(10) === stringInteger && bNparsed.comparedTo(0) >= limit);
};

BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_FLOOR });
function formatAmount({ input, decimals = DECIMALS, digits = DIGITS, showLastNonZeroDecimal = false, showIsLessThanDecimalsLabel = false, addCommas = false, }) {
    if (!stringIsInteger(input, false)) {
        throw new Error('Invalid input');
    }
    const isNegative = new BigNumber(input).isNegative();
    let modInput = input;
    if (isNegative) {
        // remove - at start of input
        modInput = input.substring(1);
    }
    return (pipe(modInput)
        // format
        .then(() => TokenPayment.fungibleFromBigInteger('', modInput, decimals).toRationalNumber())
        // format
        .then((current) => {
        const bnBalance = new BigNumber(current);
        if (bnBalance.isZero()) {
            return ZERO;
        }
        const balance = bnBalance.toString(10);
        const [integerPart, decimalPart] = balance.split('.');
        const bNdecimalPart = new BigNumber(decimalPart || 0);
        const decimalPlaces = pipe(0)
            .if(Boolean(decimalPart && showLastNonZeroDecimal))
            .then(() => Math.max(decimalPart.length, digits))
            .if(bNdecimalPart.isZero() && !showLastNonZeroDecimal)
            .then(0)
            .if(Boolean(decimalPart && !showLastNonZeroDecimal))
            .then(() => Math.min(decimalPart.length, digits))
            .valueOf();
        const shownDecimalsAreZero = decimalPart &&
            digits >= 1 &&
            digits <= decimalPart.length &&
            bNdecimalPart.isGreaterThan(0) &&
            new BigNumber(decimalPart.substring(0, digits)).isZero();
        const formatted = bnBalance.toFormat(decimalPlaces);
        const formattedBalance = pipe(balance)
            .if(addCommas)
            .then(formatted)
            .if(Boolean(shownDecimalsAreZero))
            .then((current) => {
            const integerPartZero = new BigNumber(integerPart).isZero();
            const [numericPart, decimalSide] = current.split('.');
            const zeroPlaceholders = new Array(digits - 1).fill(0);
            const zeros = [...zeroPlaceholders, 0].join('');
            const minAmount = [...zeroPlaceholders, 1].join(''); // 00..1
            if (!integerPartZero) {
                return `${numericPart}.${zeros}`;
            }
            if (showIsLessThanDecimalsLabel) {
                return `<${numericPart}.${minAmount}`;
            }
            if (!showLastNonZeroDecimal) {
                return numericPart;
            }
            return `${numericPart}.${decimalSide}`;
        })
            .if(Boolean(!shownDecimalsAreZero && decimalPart))
            .then((current) => {
            const [numericPart] = current.split('.');
            let decimalSide = decimalPart.substring(0, decimalPlaces);
            if (showLastNonZeroDecimal) {
                const noOfZerosAtEnd = digits - decimalSide.length;
                if (noOfZerosAtEnd > 0) {
                    const zeroPadding = Array(noOfZerosAtEnd).fill(0).join('');
                    decimalSide = `${decimalSide}${zeroPadding}`;
                    return `${numericPart}.${decimalSide}`;
                }
                return current;
            }
            if (!decimalSide) {
                return numericPart;
            }
            return `${numericPart}.${decimalSide}`;
        })
            .valueOf();
        return formattedBalance;
    })
        .if(isNegative)
        .then((current) => `-${current}`)
        .valueOf());
}

class FormatAmountPipe {
    transform(value, formatOptions = {}) {
        return formatAmount(Object.assign(Object.assign({}, formatOptions), { input: value }));
    }
}
FormatAmountPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
FormatAmountPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, name: "formatAmount" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: FormatAmountPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'formatAmount',
                }]
        }] });

class AuthenticationService {
    constructor(accountService) {
        this.accountService = accountService;
    }
    isAuthenticated() {
        const decoded = decodeNativeAuthToken(this.accountService.account.accessToken);
        if (!decoded)
            return false;
        const millisecondsTTL = decoded.ttl * 1000;
        const isTokenValid = this.accountService.account.loginTimestamp +
            millisecondsTTL -
            Date.now() >
            0;
        return isTokenValid;
    }
}
AuthenticationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, deps: [{ token: AccountService }], target: i0.ɵɵFactoryTarget.Injectable });
AuthenticationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AuthenticationService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: AccountService }]; } });

const canActivateRoute = (route, state) => {
    const isAuthenticated = inject(AuthenticationService).isAuthenticated();
    if (!isAuthenticated) {
        const router = inject(Router);
        inject(AccountService).resetToInitialState();
        inject(TransactionsService).resetToInitialState();
        router.navigate(['/']);
    }
    return isAuthenticated;
};

function isStringBase64(string) {
    try {
        return Buffer.from(string, 'base64').toString() === atob(string);
    }
    catch (err) {
        return false;
    }
}
function encodeToBase64(string) {
    return btoa(string);
}
function decodeBase64(string) {
    if (!isStringBase64(string)) {
        return string;
    }
    return atob(string);
}

const decodeLoginToken = (loginToken) => {
    if (!loginToken || !isString$1(loginToken)) {
        return null;
    }
    const parts = loginToken.split('.');
    if (parts.length !== 4) {
        console.error('Invalid loginToken. You may be trying to decode a nativeAuthToken. Try using decodeNativeAuthToken method instead');
        return null;
    }
    try {
        const [origin, blockHash, ttl, extraInfo] = parts;
        const parsedExtraInfo = JSON.parse(decodeBase64(extraInfo));
        const parsedOrigin = decodeBase64(origin);
        return {
            ttl: Number(ttl),
            extraInfo: parsedExtraInfo,
            origin: parsedOrigin,
            blockHash,
        };
    }
    catch (e) {
        console.error(`Error trying to decode ${loginToken}:`, e);
        return null;
    }
};

function isString(x) {
    return Object.prototype.toString.call(x) === '[object String]';
}
const decodeNativeAuthToken = (accessToken) => {
    var _a;
    if (!accessToken || !isString(accessToken)) {
        return null;
    }
    const parts = accessToken.split('.');
    if (parts.length !== 3) {
        console.error('Invalid nativeAuthToken. You may be trying to decode a loginToken. Try using decodeLoginToken method instead');
        return null;
    }
    try {
        const [address, body, signature] = parts;
        const parsedAddress = decodeBase64(address);
        const parsedBody = decodeBase64(body);
        const parsedInitToken = decodeLoginToken(parsedBody);
        if (!parsedInitToken) {
            return {
                address: parsedAddress,
                body: parsedBody,
                signature,
                blockHash: '',
                origin: '',
                ttl: 0,
            };
        }
        const result = Object.assign(Object.assign({}, parsedInitToken), { address: parsedAddress, body: parsedBody, signature });
        // if empty object, delete extraInfo
        if (!((_a = parsedInitToken.extraInfo) === null || _a === void 0 ? void 0 : _a.timestamp)) {
            delete result.extraInfo;
        }
        return result;
    }
    catch (err) {
        return null;
    }
};

function parseAmount(amount, decimals = DECIMALS) {
    return TokenPayment.fungibleFromAmount('', amount, decimals).toString();
}

function canTransformToPublicKey(address) {
    try {
        const checkAddress = new Address(address);
        return Boolean(checkAddress.bech32());
    }
    catch (_a) {
        return false;
    }
}
function addressIsValid(destinationAddress) {
    const isValidBach = (destinationAddress === null || destinationAddress === void 0 ? void 0 : destinationAddress.startsWith('erd')) &&
        destinationAddress.length === 62 &&
        /^\w+$/.test(destinationAddress);
    return isValidBach && canTransformToPublicKey(destinationAddress);
}

var TypesOfSmartContractCallsEnum;
(function (TypesOfSmartContractCallsEnum) {
    TypesOfSmartContractCallsEnum["MultiESDTNFTTransfer"] = "MultiESDTNFTTransfer";
    TypesOfSmartContractCallsEnum["ESDTNFTTransfer"] = "ESDTNFTTransfer";
})(TypesOfSmartContractCallsEnum || (TypesOfSmartContractCallsEnum = {}));
const ESDTTransferTypes = [
    'ESDTNFTTransfer',
    'ESDTNFTBurn',
    'ESDTNFTAddQuantity',
    'ESDTNFTCreate',
    'MultiESDTNFTTransfer',
    'ESDTTransfer',
    'ESDTBurn',
    'ESDTLocalMint',
    'ESDTLocalBurn',
    'ESDTWipe',
    'ESDTFreeze',
];
function isContract(receiver, sender, data = '') {
    const isValid = addressIsValid(receiver);
    if (!isValid) {
        return false;
    }
    const isContract = new Address$1(receiver).isContractAddress();
    if (isContract) {
        return true;
    }
    const extractedAddress = getAddressFromDataField({ receiver, data });
    if (!extractedAddress) {
        return false;
    }
    const isExtractedAddressContractCall = new Address$1(extractedAddress).isContractAddress();
    return (isExtractedAddressContractCall || isSelfESDTContract(receiver, sender, data));
}
function isSelfESDTContract(receiver, sender, data) {
    const parts = data === null || data === void 0 ? void 0 : data.split('@');
    if (parts == null) {
        return false;
    }
    const [type, ...restParts] = parts;
    const isSelfTransaction = sender != null && receiver != null && receiver === sender;
    const isCorrectESDTType = ESDTTransferTypes.includes(type);
    const areDataPartsValid = restParts.every((part) => isHexValidCharacters(part) && isHexValidLength(part));
    return isSelfTransaction && isCorrectESDTType && areDataPartsValid;
}
const isHexValidCharacters = (str) => {
    return str.toLowerCase().match(/[0-9a-f]/g);
};
const isHexValidLength = (str) => {
    return str.length % 2 === 0;
};
function getAddressFromDataField({ receiver, data, }) {
    try {
        if (!data) {
            return receiver;
        }
        const parsedData = isStringBase64(data)
            ? TransactionPayload.fromEncoded(data).toString()
            : data;
        const addressIndex = getAddressIndex(parsedData);
        const parts = parsedData.split('@');
        return addressIndex > -1 ? parts[addressIndex] : receiver;
    }
    catch (err) {
        console.log(err);
        return;
    }
}
function getAddressIndex(data) {
    if (data.includes(TypesOfSmartContractCallsEnum.MultiESDTNFTTransfer)) {
        return 1;
    }
    if (data.includes(TypesOfSmartContractCallsEnum.ESDTNFTTransfer)) {
        return 4;
    }
    return -1;
}

class ParseAmountPipe {
    transform(value, decimals) {
        return parseAmount(value, decimals);
    }
}
ParseAmountPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
ParseAmountPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, name: "parseAmount" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ParseAmountPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'parseAmount',
                }]
        }] });

const TransactionsInitialState = {
    transactions: [],
};
let TransactionsState = class TransactionsState {
    constructor() { }
    addTransactionBatch({ setState, getState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = getState().transactions;
            transactions.push(payload);
            setState({ transactions });
        });
    }
    moveToSigned({ setState, getState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = getState().transactions;
            transactions.map((tx) => {
                if (tx.id === payload.id) {
                    tx.status = TxStatusEnum.SIGNED;
                    tx.transactions = payload.signedTransactions;
                }
            });
            setState({ transactions });
        });
    }
    resetTransactions({ setState }) {
        return __awaiter(this, void 0, void 0, function* () {
            setState(TransactionsInitialState);
        });
    }
    moveToFailed({ setState, getState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = getState().transactions;
            transactions.map((tx) => {
                if (tx.id === payload.id) {
                    tx.status = payload.newStatus;
                }
            });
            setState({ transactions });
        });
    }
    removeTransaction({ setState, getState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            let transactions = getState().transactions;
            transactions = transactions.filter((tx) => {
                return tx.id !== payload.id;
            });
            setState({ transactions });
        });
    }
    setTxHashes({ setState, getState }, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = getState().transactions;
            transactions.map((tx) => {
                if (tx.id === payload.id) {
                    tx.transactionsHashes = payload.hashes;
                }
            });
            setState({ transactions });
        });
    }
    cancelPendingSignature({ setState, getState, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const transactions = getState().transactions;
            transactions.map((tx) => {
                if (tx.status === TxStatusEnum.PENDING_SIGNATURE) {
                    tx.status = TxStatusEnum.CANCELLED;
                }
            });
            setState({ transactions });
        });
    }
};
TransactionsState.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
TransactionsState.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState });
__decorate([
    Action(AddTransactionsBatch)
], TransactionsState.prototype, "addTransactionBatch", null);
__decorate([
    Action(MoveToSignedTransactions)
], TransactionsState.prototype, "moveToSigned", null);
__decorate([
    Action(ResetTransactions)
], TransactionsState.prototype, "resetTransactions", null);
__decorate([
    Action(ChangeTxStatus)
], TransactionsState.prototype, "moveToFailed", null);
__decorate([
    Action(RemoveTransaction)
], TransactionsState.prototype, "removeTransaction", null);
__decorate([
    Action(SetTransactionHashes)
], TransactionsState.prototype, "setTxHashes", null);
__decorate([
    Action(CancelPendingSignature)
], TransactionsState.prototype, "cancelPendingSignature", null);
TransactionsState = __decorate([
    State({
        name: 'transactions',
        defaults: TransactionsInitialState,
    })
], TransactionsState);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsState, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; }, propDecorators: { addTransactionBatch: [], moveToSigned: [], resetTransactions: [], moveToFailed: [], removeTransaction: [], setTxHashes: [], cancelPendingSignature: [] } });

class TrimStrPipe {
    transform(value, ...args) {
        return value.slice(0, 6) + '...' + value.slice(-6);
    }
}
TrimStrPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TrimStrPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, name: "trimStr" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TrimStrPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'trimStr',
                }]
        }] });

class TimeAgoPipe {
    transform(value, ...args) {
        if (value) {
            const seconds = Math.floor((+new Date() - +new Date(value * 1000)) / 1000);
            if (seconds < 29)
                // less than 30 seconds ago will show as 'Just now'
                return 'Just now';
            const intervals = {
                year: 31536000,
                month: 2592000,
                week: 604800,
                day: 86400,
                hour: 3600,
                minute: 60,
                second: 1,
            };
            let counter;
            for (const i in intervals) {
                counter = Math.floor(seconds / intervals[i]);
                if (counter > 0)
                    if (counter === 1) {
                        return counter + ' ' + i + ' ago'; // singular (1 day ago)
                    }
                    else {
                        return counter + ' ' + i + 's ago'; // plural (2 days ago)
                    }
            }
        }
        return value;
    }
}
TimeAgoPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
TimeAgoPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, name: "timeAgo" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TimeAgoPipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'timeAgo',
                }]
        }] });

class AddressToFormattedBalancePipe {
    constructor(config, http, accountApi, formatPipe) {
        this.config = config;
        this.http = http;
        this.accountApi = accountApi;
        this.formatPipe = formatPipe;
    }
    transform(value, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield lastValueFrom(this.accountApi.getAccount(value));
            return this.formatPipe.transform(account.balance, {
                digits: 2,
                addCommas: true,
            });
        });
    }
}
AddressToFormattedBalancePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AddressToFormattedBalancePipe, deps: [{ token: DAPP_CONFIG }, { token: i1$1.HttpClient }, { token: AccountApiService }, { token: FormatAmountPipe }], target: i0.ɵɵFactoryTarget.Pipe });
AddressToFormattedBalancePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: AddressToFormattedBalancePipe, name: "addressToFormattedBalance" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: AddressToFormattedBalancePipe, decorators: [{
            type: Pipe,
            args: [{
                    name: 'addressToFormattedBalance',
                }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }, { type: i1$1.HttpClient }, { type: AccountApiService }, { type: FormatAmountPipe }];
    } });

class MyStorageEngine {
    get length() {
        return Object.keys(localStorage).filter((x) => x.startsWith(MyStorageEngine.STORAGE_PREFIX)).length;
    }
    getItem(key) {
        return localStorage.getItem(MyStorageEngine.STORAGE_PREFIX + key);
    }
    setItem(key, val) {
        localStorage.setItem(MyStorageEngine.STORAGE_PREFIX + key, val);
    }
    removeItem(key) {
        localStorage.removeItem(MyStorageEngine.STORAGE_PREFIX + key);
    }
    clear() {
        Object.keys(localStorage)
            .filter((x) => x.startsWith(MyStorageEngine.STORAGE_PREFIX))
            .forEach((x) => localStorage.removeItem(x));
    }
}
MyStorageEngine.STORAGE_PREFIX = 'ngx-sdk-dapp_';
class NgxSdkDappModule {
}
NgxSdkDappModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
NgxSdkDappModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, declarations: [FormatAmountPipe,
        ParseAmountPipe,
        TrimStrPipe,
        TimeAgoPipe,
        AddressToFormattedBalancePipe], imports: [i1.ɵj, i2.NgxsStoragePluginModule, i3.NgxsActionsExecutingModule, HttpClientModule,
        CommonModule], exports: [FormatAmountPipe,
        ParseAmountPipe,
        TrimStrPipe,
        TimeAgoPipe,
        AddressToFormattedBalancePipe] });
NgxSdkDappModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, providers: [
        {
            provide: STORAGE_ENGINE,
            useClass: MyStorageEngine,
        },
    ], imports: [NgxsModule.forRoot([AccountState, TransactionsState]),
        NgxsStoragePluginModule.forRoot(),
        NgxsActionsExecutingModule.forRoot(),
        HttpClientModule,
        CommonModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NgxSdkDappModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        FormatAmountPipe,
                        ParseAmountPipe,
                        TrimStrPipe,
                        TimeAgoPipe,
                        AddressToFormattedBalancePipe,
                    ],
                    imports: [
                        NgxsModule.forRoot([AccountState, TransactionsState]),
                        NgxsStoragePluginModule.forRoot(),
                        NgxsActionsExecutingModule.forRoot(),
                        HttpClientModule,
                        CommonModule,
                    ],
                    providers: [
                        {
                            provide: STORAGE_ENGINE,
                            useClass: MyStorageEngine,
                        },
                    ],
                    exports: [
                        FormatAmountPipe,
                        ParseAmountPipe,
                        TrimStrPipe,
                        TimeAgoPipe,
                        AddressToFormattedBalancePipe,
                    ],
                }]
        }] });

class NativeAuthTokenInterceptorService {
    constructor(accountService, authenticationService, config) {
        this.accountService = accountService;
        this.authenticationService = authenticationService;
        this.config = config;
    }
    intercept(request, next) {
        // add auth header with jwt if account is logged in and request is to the api url
        const account = this.accountService.account;
        const isLoggedIn = this.authenticationService.isAuthenticated();
        const isApiUrl = Object.values(this.config.nativeAuthAPIs).some((apiURL) => {
            return request.url.startsWith(apiURL);
        });
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: { Authorization: `Bearer ${account.accessToken}` },
            });
        }
        return next.handle(request);
    }
}
NativeAuthTokenInterceptorService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, deps: [{ token: AccountService }, { token: AuthenticationService }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
NativeAuthTokenInterceptorService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: NativeAuthTokenInterceptorService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: AccountService }, { type: AuthenticationService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }];
    } });

class ExtensionProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
        this.localStore = store;
        this.localAccount = accountService;
    }
    connect(navAfterConnectRoute) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { client, init } = yield _super.connect.call(this, navAfterConnectRoute);
            const extensionInstance = ExtensionProvider.getInstance();
            const extensionInitialized = yield extensionInstance.init();
            if (!extensionInitialized) {
                throw new Error('Extension could not be initialized');
            }
            yield extensionInstance.login({ token: init });
            const { signature, address } = extensionInstance.account;
            if (signature) {
                const accessToken = client.getToken(address, init, signature);
                this.localStore.dispatch(new LoginAccount({
                    address,
                    accessToken,
                    currentProvider: ProvidersType.Extension,
                }));
            }
            if (navAfterConnectRoute)
                this.router.navigate([navAfterConnectRoute]);
            return { client, init };
        });
    }
    logout() {
        const _super = Object.create(null, {
            logout: { get: () => super.logout }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const extensionInstance = ExtensionProvider.getInstance();
            yield extensionInstance.logout();
            this.router.navigate(['/']);
            return _super.logout.call(this);
        });
    }
    reInitialize(account) {
        if (this.localAccount &&
            this.localAccount.account.currentProvider !== ProvidersType.Extension)
            return;
        ExtensionProvider.getInstance().init();
        ExtensionProvider.getInstance().setAddress(account.address);
    }
    sendTransactions(transactions, txId) {
        return __awaiter(this, void 0, void 0, function* () {
            const txArray = transactions.map((tx) => {
                const tx1 = Transaction.fromPlainObject(tx);
                return tx1;
            });
            try {
                const result = yield ExtensionProvider.getInstance().signTransactions(txArray);
                this.addSignedTransactionsToState(result.map((tx) => tx.toPlainObject()), txId);
            }
            catch (error) {
                this.addToCancelledTransaction(txId);
            }
        });
    }
    cancelAction() {
        ExtensionProvider.getInstance().cancelAction();
    }
}
ExtensionProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, deps: [{ token: i1.Store }, { token: AccountService }, { token: AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
ExtensionProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: ExtensionProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Store }, { type: AccountService }, { type: AuthenticationService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }, { type: i4.Router }];
    } });

const DAPP_INIT_ROUTE = '/dapp/init';
class WebWalletProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, router, route, config, activatedRoute) {
        super(store, accountService, authenticationService, config);
        this.router = router;
        this.route = route;
        this.config = config;
        this.activatedRoute = activatedRoute;
        this.localStore = store;
        this.localAccount = accountService;
        router.events
            .pipe(filter((event) => event instanceof NavigationEnd))
            .pipe(take(1))
            .subscribe((event) => {
            const pathname = event.url.split('?')[0];
            console.log('pathname', pathname);
            this.route.queryParams.pipe(take(1)).subscribe((params) => {
                console.log('herere', params);
                if (params['walletProviderStatus'] === 'transactionsSigned' &&
                    params['signSession']) {
                    this.transactionsSuccessCallback(parseInt(params['signSession']));
                }
                if (params['signSession'] && params['status'] === 'failed') {
                    this.transactionsFailedCallback(parseInt(params['signSession']), pathname);
                }
                if (params['signSession'] && params['status'] === 'cancelled') {
                    this.transactionsCancelledCallback(parseInt(params['signSession']), pathname);
                }
                if (params['address'] && params['signature'])
                    this.connectCallback(params['address'], params['signature']);
            });
        });
    }
    transactionsFailedCallback(signSession, pathname) {
        console.log('useP1', pathname);
        this.router.navigate([pathname]);
        this.addFailedTransactionsToState(signSession);
    }
    transactionsCancelledCallback(signSession, pathname) {
        console.log('useP2', pathname);
        this.router.navigate([pathname]);
        this.addToCancelledTransaction(signSession);
    }
    transactionsSuccessCallback(signSession) {
        var _a;
        const transactions = (_a = this.walletProvider) === null || _a === void 0 ? void 0 : _a.getTransactionsFromWalletUrl();
        if (!transactions)
            return;
        transactions.map((tx) => {
            var _a;
            if (tx.data) {
                tx.data = Buffer.from((_a = tx.data) !== null && _a !== void 0 ? _a : '', 'utf8').toString('base64');
            }
        });
        const url = new URL(window.location.href);
        this.router.navigate([url.pathname]);
        this.addSignedTransactionsToState(transactions, signSession);
    }
    connectCallback(address, signature) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessToken = new NativeAuthClient().getToken(address, localStorage.getItem('initToken'), signature);
            localStorage.removeItem('initToken');
            this.localStore.dispatch(new LoginAccount({
                address,
                accessToken,
                currentProvider: ProvidersType.WebWallet,
            }));
            this.walletProvider = new WalletProvider(`https://wallet.multiversx.com${DAPP_INIT_ROUTE}`);
            const navAfterConnectRoute = localStorage.getItem('navAfterConnectRoute');
            if (navAfterConnectRoute)
                yield this.router.navigate([navAfterConnectRoute]);
            window.location.reload();
        });
    }
    connect(navAfterConnectRoute) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { client, init } = yield _super.connect.call(this, navAfterConnectRoute);
            localStorage.setItem('initToken', init);
            localStorage.setItem('navAfterConnectRoute', navAfterConnectRoute || '');
            this.walletProvider = new WalletProvider(`${this.config.walletURL}${DAPP_INIT_ROUTE}`);
            this.walletProvider.login({
                callbackUrl: window.location.href,
                token: init,
            });
            return { client, init };
        });
    }
    logout() {
        const _super = Object.create(null, {
            logout: { get: () => super.logout }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletProvider)
                throw new Error('Provider was not reinitialized!');
            _super.logout.call(this);
            this.walletProvider.logout({ callbackUrl: window.location.href });
            return true;
        });
    }
    reInitialize() {
        if (this.localAccount &&
            this.localAccount.account.currentProvider !== ProvidersType.WebWallet)
            return;
        this.walletProvider = new WalletProvider(`${this.config.walletURL}${DAPP_INIT_ROUTE}`);
    }
    cancelAction() {
        if (!this.walletProvider) {
            return;
        }
        this.localStore.dispatch(new CancelPendingSignature());
    }
    sendTransactions(transactions, txId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const txArray = transactions.map((tx) => {
                const tx1 = Transaction.fromPlainObject(tx);
                return tx1;
            });
            try {
                const url = new URL(window.location.href);
                url.searchParams.append('signSession', txId.toString());
                (_a = this.walletProvider) === null || _a === void 0 ? void 0 : _a.signTransactions(txArray, {
                    callbackUrl: encodeURIComponent(url.href),
                });
            }
            catch (error) {
                throw error;
            }
        });
    }
}
WebWalletProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, deps: [{ token: i1.Store }, { token: AccountService }, { token: AuthenticationService }, { token: i4.Router }, { token: i4.ActivatedRoute }, { token: DAPP_CONFIG }, { token: i4.ActivatedRoute }], target: i0.ɵɵFactoryTarget.Injectable });
WebWalletProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: WebWalletProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Store }, { type: AccountService }, { type: AuthenticationService }, { type: i4.Router }, { type: i4.ActivatedRoute }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }, { type: i4.ActivatedRoute }];
    } });

class XPortalProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
        this.onClientLogin = () => {
            var _a;
            if (!this.initToken) {
                throw new Error('No init token found');
            }
            (_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.getSignature().then((signature) => {
                var _a;
                (_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.getAddress().then((address) => {
                    const accessToken = new NativeAuthClient().getToken(address, this.initToken, signature);
                    this.localStore.dispatch(new LoginAccount({
                        address,
                        accessToken,
                        currentProvider: ProvidersType.XPortal,
                    }));
                    if (this.navAfterConnectRoute)
                        this.router.navigate([this.navAfterConnectRoute]);
                });
            });
        };
        this.onClientLogout = () => {
            this.logout();
        };
        this.onClientEvent = (event) => { };
        this.localStore = store;
        this.localAccountService = accountService;
    }
    connect(navAfterConnectRoute) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { client, init } = yield _super.connect.call(this, navAfterConnectRoute);
            this.initToken = init;
            this.navAfterConnectRoute = navAfterConnectRoute;
            this.walletConnect = new WalletConnectV2Provider({
                onClientLogin: this.onClientLogin,
                onClientLogout: this.onClientLogout,
                onClientEvent: this.onClientEvent,
            }, this.config.chainID, this.config.walletConnectV2RelayAddresses[0], this.config.walletConnectV2ProjectId);
            try {
                yield this.walletConnect.init();
                const { uri, approval } = yield this.walletConnect.connect({
                    methods: [MULTIVERSX_CANCEL_ACTION, ERD_CANCEL_ACTION],
                });
                if (!uri) {
                    throw new Error('WalletConnect could not be initialized');
                }
                let walletConectUriWithToken = uri;
                walletConectUriWithToken = `${walletConectUriWithToken}&token=${init}`;
                this.awaitUserConnectionResponse({
                    approval,
                    token: init,
                });
                return {
                    client,
                    init,
                    qrCodeStr: walletConectUriWithToken,
                    approval,
                    token: init,
                };
            }
            catch (error) {
                throw error;
            }
        });
    }
    awaitUserConnectionResponse({ approval, token, }) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield ((_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.login({ approval, token }));
                this.userResponseObservable = new Observable((subscriber) => {
                    subscriber.complete();
                });
            }
            catch (error) {
                this.userResponseObservable = new Observable((subscriber) => {
                    var _a;
                    subscriber.next('rejected');
                    subscriber.complete();
                    (_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.logout();
                });
            }
            return this.userResponseObservable;
        });
    }
    logout() {
        const _super = Object.create(null, {
            logout: { get: () => super.logout }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.walletConnect)
                return _super.logout.call(this);
            const connected = yield this.walletConnect.isConnected();
            if (connected)
                this.walletConnect.logout();
            this.router.navigate(['/']);
            return _super.logout.call(this);
        });
    }
    sendTransactions(transactions, txId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const txArray = transactions.map((tx) => {
                const tx1 = Transaction.fromPlainObject(tx);
                return tx1;
            });
            try {
                const result = yield ((_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.signTransactions(txArray));
                if (!result)
                    return this.addToCancelledTransaction(txId);
                this.addSignedTransactionsToState(result.map((tx) => tx.toPlainObject()), txId);
            }
            catch (error) {
                this.addToCancelledTransaction(txId);
            }
        });
    }
    reInitialize() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.localAccountService &&
                this.localAccountService.account.currentProvider !== ProvidersType.XPortal)
                return '';
            try {
                this.walletConnect = new WalletConnectV2Provider({
                    onClientLogin: () => {
                        this.onClientLogin();
                    },
                    onClientLogout: () => {
                        this.onClientLogout();
                    },
                    onClientEvent: (e) => {
                        this.onClientEvent(e);
                    },
                }, this.config.chainID, this.config.walletConnectV2RelayAddresses[0], this.config.walletConnectV2ProjectId);
                yield this.walletConnect.init();
                const connected = yield this.walletConnect.isConnected();
                if (!connected &&
                    this.localAccountService.account.currentProvider ===
                        ProvidersType.XPortal)
                    this.logout();
                else
                    this.walletConnect.methods = [
                        MULTIVERSX_CANCEL_ACTION,
                        ERD_CANCEL_ACTION,
                    ];
            }
            catch (error) {
                this.logout();
            }
            return '';
        });
    }
    cancelAction() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this.walletConnect) {
                    return;
                }
                this.localStore.dispatch(new CancelPendingSignature());
                yield ((_b = (_a = this.walletConnect) === null || _a === void 0 ? void 0 : _a.sendCustomRequest) === null || _b === void 0 ? void 0 : _b.call(_a, {
                    request: {
                        method: MULTIVERSX_CANCEL_ACTION,
                        params: { action: 'cancelSignTx' },
                    },
                }));
            }
            catch (error) {
                console.warn('WalletConnectV2: Unable to send cancelAction event', error);
            }
        });
    }
}
XPortalProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, deps: [{ token: i1.Store }, { token: AccountService }, { token: AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
XPortalProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: XPortalProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Store }, { type: AccountService }, { type: AuthenticationService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }, { type: i4.Router }];
    } });

class LedgerProviderService extends GenericProvider {
    constructor(store, accountService, authenticationService, config, router) {
        super(store, accountService, authenticationService, config);
        this.config = config;
        this.router = router;
        this.localStore = store;
        this.localAccount = accountService;
    }
    connect(navAfterConnectRoute) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { client, init } = yield _super.connect.call(this, navAfterConnectRoute);
            this.navAfterConnectRoute = navAfterConnectRoute;
            this.ledgerProvider = new HWProvider();
            try {
                yield this.ledgerProvider.init();
                if (yield this.ledgerProvider.isInitialized()) {
                    try {
                        const accounts = yield this.ledgerProvider.getAccounts(0, 10);
                        return { client, init, accounts };
                    }
                    catch (error) {
                        return {
                            client,
                            init,
                            error: 'Could not get accounts, open multiversx app on ledger',
                        };
                    }
                }
                else {
                    return {
                        client,
                        init,
                        error: 'Could not initialize ledger provider',
                    };
                }
            }
            catch (error) {
                return {
                    client,
                    init,
                    error: 'Could not initialize ledger provider',
                };
            }
        });
    }
    authenticateAccount(index) {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { client, init } = yield _super.connect.call(this, this.navAfterConnectRoute || '/');
            try {
                const loginResult = yield ((_a = this.ledgerProvider) === null || _a === void 0 ? void 0 : _a.tokenLogin({
                    addressIndex: index,
                    token: Buffer.from(init),
                }));
                if (!(loginResult === null || loginResult === void 0 ? void 0 : loginResult.signature) || !(loginResult === null || loginResult === void 0 ? void 0 : loginResult.address)) {
                    throw new Error('Could not login with ledger');
                }
                const { signature, address } = loginResult;
                const accessToken = client.getToken(address, init, signature.hex());
                this.localStore.dispatch(new LoginAccount({
                    address,
                    accessToken,
                    currentProvider: ProvidersType.Ledger,
                    ledgerIndex: index,
                }));
                if (this.navAfterConnectRoute)
                    this.router.navigate([this.navAfterConnectRoute]);
            }
            catch (error) { }
        });
    }
    logout() {
        const _super = Object.create(null, {
            logout: { get: () => super.logout }
        });
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            yield ((_a = this.ledgerProvider) === null || _a === void 0 ? void 0 : _a.logout());
            this.router.navigate(['/']);
            return _super.logout.call(this);
        });
    }
    sendTransactions(transactions, txId) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const txArray = transactions.map((tx) => {
                const tx1 = Transaction.fromPlainObject(tx);
                return tx1;
            });
            try {
                const result = yield ((_a = this.ledgerProvider) === null || _a === void 0 ? void 0 : _a.signTransactions(txArray));
                this.addSignedTransactionsToState(result.map((tx) => tx.toPlainObject()), txId);
            }
            catch (error) {
                this.addToCancelledTransaction(txId);
            }
        });
    }
    loadAccounts(page, numAddresses) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.ledgerProvider) {
                return this.ledgerProvider.getAccounts(page, numAddresses);
            }
            throw new Error('Ledger provider not initialized');
        });
    }
    reInitialize(account) {
        return __awaiter(this, void 0, void 0, function* () {
            if (account.currentProvider !== ProvidersType.Ledger)
                return;
            try {
                this.ledgerProvider = new HWProvider();
                yield this.ledgerProvider.init();
                yield this.ledgerProvider.isInitialized();
                this.ledgerProvider.setAddressIndex(account.ledgerIndex);
            }
            catch (error) { }
        });
    }
}
LedgerProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: LedgerProviderService, deps: [{ token: i1.Store }, { token: AccountService }, { token: AuthenticationService }, { token: DAPP_CONFIG }, { token: i4.Router }], target: i0.ɵɵFactoryTarget.Injectable });
LedgerProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: LedgerProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: LedgerProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: i1.Store }, { type: AccountService }, { type: AuthenticationService }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }, { type: i4.Router }];
    } });

class PermissionsProviderService {
    constructor(extensionProvider, webWalletProvider, xportalProvider, ledgerProvider, accountService, authService) {
        this.extensionProvider = extensionProvider;
        this.webWalletProvider = webWalletProvider;
        this.xportalProvider = xportalProvider;
        this.ledgerProvider = ledgerProvider;
        this.accountSubscription = null;
        this._provider = null;
        this.localAccountService = accountService;
        let providerSet = false;
        if (accountService.account$) {
            this.accountSubscription = accountService.account$
                .pipe(takeWhile((account) => !providerSet))
                .subscribe((account) => {
                if (account.currentProvider !== ProvidersType.EMPTY &&
                    authService.isAuthenticated()) {
                    providerSet = true;
                    this.setProvider(account.currentProvider);
                    this.refreshRemoteData();
                }
            });
        }
    }
    refreshRemoteData() {
        this.localAccountService.refetchAccountData();
    }
    setProvider(providerType) {
        switch (providerType) {
            case ProvidersType.Extension:
                this.provider = this.extensionProvider;
                break;
            case ProvidersType.WebWallet:
                this.provider = this.webWalletProvider;
                break;
            case ProvidersType.XPortal:
                this.provider = this.xportalProvider;
                break;
            case ProvidersType.Ledger:
                this.provider = this.ledgerProvider;
                break;
            default:
                this.provider = null;
                break;
        }
    }
    get provider() {
        return this._provider;
    }
    set provider(provider) {
        this._provider = provider;
    }
    connect(navAfterConnectRoute) {
        if (this._provider) {
            return this._provider.connect(navAfterConnectRoute);
        }
        throw new Error('Provider is not set');
    }
    logout(navAfterConnectRoute) {
        if (this._provider) {
            return this._provider.logout();
        }
        throw new Error('Provider is not set');
    }
    cancelAction() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this._provider && this._provider.cancelAction) {
                this._provider.cancelAction();
                return;
            }
            throw new Error('Provider is not set123');
        });
    }
    sendTransactions(transactions, txId) {
        if (this._provider) {
            return this._provider.sendTransactions(transactions, txId);
        }
        throw new Error('Provider is not set');
    }
}
PermissionsProviderService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, deps: [{ token: ExtensionProviderService }, { token: WebWalletProviderService }, { token: XPortalProviderService }, { token: LedgerProviderService }, { token: AccountService }, { token: AuthenticationService }], target: i0.ɵɵFactoryTarget.Injectable });
PermissionsProviderService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, providedIn: 'root' });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: PermissionsProviderService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () { return [{ type: ExtensionProviderService }, { type: WebWalletProviderService }, { type: XPortalProviderService }, { type: LedgerProviderService }, { type: AccountService }, { type: AuthenticationService }]; } });

class TransactionsService {
    constructor(permissionsProvider, store, accountApi, accountService, parseAmount, config) {
        this.permissionsProvider = permissionsProvider;
        this.store = store;
        this.accountApi = accountApi;
        this.accountService = accountService;
        this.parseAmount = parseAmount;
        this.config = config;
        this.toasts = [];
        this.toastTemplate = null;
        this.trackedTransactions = [];
        setTimeout(() => {
            var _a;
            (_a = this.transactions$) === null || _a === void 0 ? void 0 : _a.subscribe((state) => {
                var _a, _b;
                for (const transaction of state.transactions) {
                    if (transaction.status === TxStatusEnum.SIGNED &&
                        !transaction.options.signOnly) {
                        this.sendTxToAPI(transaction.transactions, transaction.id);
                    }
                    if (transaction.status === TxStatusEnum.SIGNATURE_FAILED ||
                        transaction.status === TxStatusEnum.CANCELLED ||
                        transaction.status === TxStatusEnum.SEND_IN_PROGRESS ||
                        transaction.status === TxStatusEnum.SENT_SUCCESS ||
                        transaction.status === TxStatusEnum.SENT_ERROR) {
                        const transactionsInfo = (_a = transaction.transactionsHashes) === null || _a === void 0 ? void 0 : _a.map((txHash) => ({
                            txHash: txHash,
                            status: TxStatusEnum.SEND_IN_PROGRESS,
                        }));
                        this.show(transaction.options.transactionTitle, transactionsInfo || [], transaction.id, transaction.status);
                        if (((_b = transaction.transactionsHashes) === null || _b === void 0 ? void 0 : _b.length) &&
                            !this.trackedTransactions.includes(transaction.id)) {
                            this.trackedTransactions.push(transaction.id);
                            this.trackTransactionStatus(transaction);
                        }
                    }
                }
            });
        }, 1000);
        this.watchUnload();
    }
    watchUnload() {
        return __awaiter(this, void 0, void 0, function* () {
            window.onbeforeunload = (e) => {
                var _a;
                if ((_a = this.permissionsProvider.provider) === null || _a === void 0 ? void 0 : _a.cancelAction) {
                    this.permissionsProvider.provider.cancelAction();
                    this.store.dispatch(new CancelPendingSignature());
                }
            };
        });
    }
    trackTransactionStatus(transaction) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!transaction.transactionsHashes)
                return;
            try {
                const txStatuses = yield lastValueFrom(this.accountApi.trackTransactions(transaction.transactionsHashes));
                const shouldContinueTracking = this.updateToastStatus(txStatuses, transaction.id);
                if (shouldContinueTracking) {
                    setTimeout(() => {
                        this.trackTransactionStatus(transaction);
                    }, 6000);
                }
            }
            catch (error) { }
        });
    }
    watchTransactionByTitle(txTitle, watchForStatus) {
        if (this.transactions$ === undefined)
            throw new Error('transactions$ is undefined');
        return this.transactions$
            .pipe(map((state) => {
            const tx = state.transactions.filter((tx) => {
                return tx.options.transactionTitle === txTitle;
            });
            return tx[0];
        }))
            .pipe(skipWhile((tx) => !tx || tx.status !== watchForStatus))
            .pipe(take(1));
    }
    hasTransactionsInStatus(status) {
        if (this.transactions$ === undefined)
            throw new Error('transactions$ is undefined');
        return this.transactions$.pipe(map((transaction) => transaction.transactions.some((tx) => {
            return tx.status === status;
        })));
    }
    updateToastStatus(txHashesStatus, transactionId) {
        let shouldContinueTracking = false;
        this.toasts.map((toast) => {
            if (toast.id === transactionId) {
                for (let i in txHashesStatus) {
                    switch (txHashesStatus[i].status) {
                        case 'fail':
                            this.store.dispatch(new ChangeTxStatus({
                                id: transactionId,
                                newStatus: TxStatusEnum.SENT_ERROR,
                            }));
                            toast.transactionsInfo[i].status = TxStatusEnum.SENT_ERROR;
                            break;
                        case 'success':
                            this.store.dispatch(new ChangeTxStatus({
                                id: transactionId,
                                newStatus: TxStatusEnum.SENT_SUCCESS,
                            }));
                            toast.transactionsInfo[i].status = TxStatusEnum.SENT_SUCCESS;
                            break;
                        default:
                            break;
                    }
                }
                const shouldContinue = toast.transactionsInfo.some((tx) => tx.status === TxStatusEnum.SEND_IN_PROGRESS);
                const shouldSetSuccess = toast.transactionsInfo.every((tx) => tx.status === TxStatusEnum.SENT_SUCCESS);
                const shouldSetError = toast.transactionsInfo.some((tx) => tx.status === TxStatusEnum.SENT_ERROR);
                if (shouldSetError) {
                    toast.status = TxStatusEnum.SENT_ERROR;
                }
                if (shouldSetSuccess) {
                    toast.status = TxStatusEnum.SENT_SUCCESS;
                }
                shouldContinueTracking = shouldContinue;
            }
            return false;
        });
        if (!shouldContinueTracking) {
            this.accountService.refetchAccountData();
        }
        return shouldContinueTracking;
    }
    sendTxToAPI(transactions, transactionsId) {
        return __awaiter(this, void 0, void 0, function* () {
            this.store.dispatch(new ChangeTxStatus({
                newStatus: TxStatusEnum.READY_TO_SEND,
                id: transactionsId,
            }));
            try {
                const { data: { txsHashes, numOfSentTxs }, error, } = yield lastValueFrom(this.accountApi.sendTransactions(transactions));
                const hashesArray = Object.values(txsHashes);
                if (error ||
                    !txsHashes ||
                    numOfSentTxs === 0 ||
                    hashesArray.length === 0) {
                    this.store.dispatch(new ChangeTxStatus({
                        newStatus: TxStatusEnum.SENT_ERROR,
                        id: transactionsId,
                    }));
                    return;
                }
                this.store.dispatch(new SetTransactionHashes({
                    id: transactionsId,
                    hashes: hashesArray,
                }));
                this.store.dispatch(new ChangeTxStatus({
                    newStatus: TxStatusEnum.SEND_IN_PROGRESS,
                    id: transactionsId,
                }));
            }
            catch (error) {
                this.store.dispatch(new ChangeTxStatus({
                    newStatus: TxStatusEnum.SENT_ERROR,
                    id: transactionsId,
                }));
            }
        });
    }
    sendTransactions(transactions, txOptions) {
        const txId = Date.now();
        const transactionsToSend = transactions.map((tx, index) => {
            var _a;
            return (Object.assign(Object.assign({}, tx), { nonce: this.accountService.account.nonce + index, sender: this.accountService.account.address, data: Buffer.from((_a = tx.data) !== null && _a !== void 0 ? _a : '', 'utf8').toString('base64'), value: this.parseAmount.transform(tx.value), chainID: this.config.chainID, 
                //TODO: change version if needed (ledger, guardians, etc)
                version: 1 }));
        });
        this.store.dispatch(new AddTransactionsBatch({
            id: txId,
            transactions: transactionsToSend,
            status: TxStatusEnum.PENDING_SIGNATURE,
            options: txOptions,
        }));
        this.permissionsProvider.sendTransactions(transactionsToSend, txId);
        return txId;
    }
    show(header, transactionsInfo, txId, status) {
        if (!this.toastTemplate)
            throw new Error('TransactionsService: toastTemplate is not set');
        if (this.toasts.find((t) => t.id === txId))
            return;
        this.toasts.push({
            id: txId,
            header,
            status,
            transactionsInfo,
            templateRef: this.toastTemplate,
        });
    }
    remove(toastId) {
        this.store.dispatch(new RemoveTransaction({ id: toastId }));
        this.toasts = this.toasts.filter((t) => t.id != toastId);
    }
    setTxTemplate(template) {
        this.toastTemplate = template;
    }
    resetToInitialState() {
        this.store.dispatch(new ResetTransactions());
    }
}
TransactionsService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, deps: [{ token: PermissionsProviderService }, { token: i1.Store }, { token: AccountApiService }, { token: AccountService }, { token: ParseAmountPipe }, { token: DAPP_CONFIG }], target: i0.ɵɵFactoryTarget.Injectable });
TransactionsService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, providedIn: 'root' });
__decorate([
    Select()
], TransactionsService.prototype, "transactions$", void 0);
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.2.1", ngImport: i0, type: TransactionsService, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: function () {
        return [{ type: PermissionsProviderService }, { type: i1.Store }, { type: AccountApiService }, { type: AccountService }, { type: ParseAmountPipe }, { type: undefined, decorators: [{
                        type: Inject,
                        args: [DAPP_CONFIG]
                    }] }];
    }, propDecorators: { transactions$: [] } });

/*
 * Public API Surface of ngx-sdk-dapp
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AccountApiService, AccountService, AddressToFormattedBalancePipe, AuthenticationService, DAPP_CONFIG, DECIMALS, DIGITS, ERD_CANCEL_ACTION, ESDTTransferTypes, FormatAmountPipe, GAS_LIMIT, GAS_PER_DATA_BYTE, GAS_PRICE, GAS_PRICE_MODIFIER, LedgerProviderService, MULTIVERSX_CANCEL_ACTION, MyStorageEngine, NativeAuthTokenInterceptorService, NgxSdkDappModule, ParseAmountPipe, PermissionsProviderService, ProvidersType, TimeAgoPipe, TransactionsService, TrimStrPipe, TxStatusEnum, TypesOfSmartContractCallsEnum, XPortalProviderService, ZERO, addressIsValid, canActivateRoute, decodeBase64, decodeLoginToken, decodeNativeAuthToken, encodeToBase64, getAddressFromDataField, isContract, isSelfESDTContract, isStringBase64, parseAmount, stringIsInteger };
//# sourceMappingURL=ngx-sdk-dapp.mjs.map
