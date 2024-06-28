/* eslint-disable @typescript-eslint/no-unused-vars */
const statusList = [
    { category: 'Decline', responseCode: 'SW054', responseDescription: 'Suspicious transaction activity', reasonCode: '1', reasonDescription: 'Exceeded thresholds', suggestedActions: 'Please try again later or use a different bank account. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW054', responseDescription: 'Suspicious transaction activity', reasonCode: '2', reasonDescription: 'Data mismatch', suggestedActions: 'Please ensure the user is using their own financial institution that matches with the merchant info. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW054', responseDescription: 'Suspicious transaction activity', reasonCode: '3', reasonDescription: 'Suspicious History', suggestedActions: 'For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW054', responseDescription: 'Suspicious transaction activity', reasonCode: '4', reasonDescription: '3rd Party Suspicious History', suggestedActions: 'For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW055', responseDescription: 'Negative data', reasonCode: '5', reasonDescription: 'Negative Database', suggestedActions: 'Please contact Trustly\'s merchant support team if the user escalates. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW055', responseDescription: 'Negative data', reasonCode: '6', reasonDescription: 'Sanctions', suggestedActions: 'For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW055', responseDescription: 'Negative data', reasonCode: '7', reasonDescription: 'IP Sanctions', suggestedActions: 'Please ensure the user is coming from a non-sanctioned country. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW055', responseDescription: 'Negative data', reasonCode: '8', reasonDescription: 'Negative Database', suggestedActions: 'Please contact Trustly\'s merchant support team if the user escalates. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW056', responseDescription: 'Invalid account', reasonCode: '9', reasonDescription: 'Business Account Unsupported (Regulatory Reasons)', suggestedActions: 'Please prompt the user to use a personal debitable account. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW056', responseDescription: 'Invalid account', reasonCode: '10', reasonDescription: 'Account Unsupported (Regulatory Reasons)', suggestedActions: 'Please prompt the user to use a personal debitable account. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW057', responseDescription: 'Expired Split Token', reasonCode: '11', reasonDescription: 'Expired Split Token', suggestedActions: 'Please prompt the user to log in again. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW021', responseDescription: 'Authorization denied', reasonCode: '12', reasonDescription: 'Insufficient funds', suggestedActions: 'The account selected does not have sufficient funds. Please prompt the user to use another bank account or lower the transaction amount. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW051', responseDescription: 'Merchant error', reasonCode: '13', reasonDescription: 'Integration error', suggestedActions: 'Integration error - please contact Trustly\'s integration team. Popular reasons are: sent invalid request or mandatory fields in the request are missing. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW052', responseDescription: 'Financial institution error', reasonCode: '14', reasonDescription: 'Financial institution maintenance', suggestedActions: 'User\'s online financial institution error (ex. financial institution is under maintenance, financial institution website is down). For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW053', responseDescription: 'Internal network error', reasonCode: '15', reasonDescription: 'Generic error', suggestedActions: 'Generic error. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW059', responseDescription: 'Instant transaction rejected due to risk', reasonCode: '16', reasonDescription: 'Risk profile', suggestedActions: 'Instant payout transaction rejection due to consumer\'s risk profile. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW060', responseDescription: 'Bank or network processor is down', reasonCode: '17', reasonDescription: 'Bank/network down', suggestedActions: 'Instant payout bank is down or instant payout network (TCH) is down. For suggested copy see consumer messaging below.' },
    { category: 'Decline', responseCode: 'SW013', responseDescription: 'User Cancelled', reasonCode: '18', reasonDescription: 'Transaction was cancelled by user', suggestedActions: 'This transaction was cancelled partway by you, your browser, or your device.' },
    { category: 'Decline', responseCode: 'SW021', responseDescription: 'Insufficient Funds', reasonCode: '19', reasonDescription: 'Insufficient funds', suggestedActions: 'Transaction unsuccessful. We are unable to complete your transaction due to insufficient funds in your account. Please a) add funds to your account, b) Use another account at the same bank, c) Or, sign in to another bank.' },
    { category: 'Decline', responseCode: 'SW051', responseDescription: 'Merchant Error', reasonCode: '20', reasonDescription: 'Technical error on merchant side', suggestedActions: 'Transaction unsuccessful: We\'re sorry. The transaction could not be completed because of a technical error on the merchant\'s side.' },
    { category: 'Decline', responseCode: 'SW052', responseDescription: 'Bank Error', reasonCode: '21', reasonDescription: 'Technical error on bank side', suggestedActions: 'Transaction unsuccessful: We\'re sorry. The transaction could not be completed because of a technical error on the bank\'s side.' },
    { category: 'Decline', responseCode: 'SW053', responseDescription: 'Network Error', reasonCode: '22', reasonDescription: 'Technical error from the network', suggestedActions: 'Transaction unsuccessful: We\'re sorry. The transaction could not be completed because of a technical error from the network.' },
    { category: 'Decline', responseCode: 'SW054', responseDescription: 'Security Controls', reasonCode: '23', reasonDescription: 'Unusual activity detected', suggestedActions: 'Security Alert: We detected some unusual activity and as a result, this transaction was not completed. To protect consumers and merchants, Trustly employs risk mitigation and fraud prevention tools to spot suspicious activity. Please see Trustly\'s FAQs for further information on Trustly\'s risk decisioning process.' },
    { category: 'Decline', responseCode: 'SW055', responseDescription: 'Security Controls', reasonCode: '24', reasonDescription: 'Unusual activity detected', suggestedActions: 'Security Alert: We detected some unusual activity and as a result, this transaction was blocked. To protect consumers and merchants, Trustly employs risk mitigation and fraud prevention tools to spot suspicious activity. Please see Trustly\'s FAQs for further information on Trustly\'s risk decisioning process.' },
    { category: 'Decline', responseCode: 'SW056', responseDescription: 'Unsupported Account Type', reasonCode: '25', reasonDescription: 'Invalid account', suggestedActions: 'Invalid Account: To comply with Federal, state, or local regulations, Trustly does not currently support this type of account.' },
    { category: 'Decline', responseCode: 'SW059', responseDescription: 'Security Controls', reasonCode: '26', reasonDescription: 'Unusual activity detected', suggestedActions: 'Security Alert: We detected some unusual activity and as a result, this transaction was not completed. To protect consumers and merchants, Trustly employs risk mitigation and fraud prevention tools to spot suspicious activity. Please see Trustly\'s FAQs for further information on Trustly\'s risk decisioning process.' },
    { category: 'Decline', responseCode: 'SW060', responseDescription: 'Bank Error', reasonCode: '27', reasonDescription: 'Technical error on bank side', suggestedActions: 'Transaction unsuccessful: We\'re sorry. The transaction could not be completed because of a technical error on the bank\'s side.' }
];

const returnDetails = [
    { 
        responseCode: 'R01', 
        title: 'Insufficient Funds', 
        description: 'The available and/or cash reserve balance is not sufficient to cover the dollar value of the debit entry.',
        action: 'You can try the transaction again up to two times within 30 days of the original authorization date.' 
    },
    { 
        responseCode: 'R02', 
        title: 'Account Closed', 
        description: 'A previously active account has been closed by action of the customer or the RDFI.',
        action: 'Contact your customer for a different bank account, or for another form of payment. If you have not yet shipped the goods or provided the services covered by the payment, you may want to wait to do so until you have confirmation of a settled payment.'
    },
    { 
        responseCode: 'R03', 
        title: 'No Account/Unable to Locate Account', 
        description: 'The account number structure is valid and it passes the check digit validation, but the account number does not correspond to the individual identified in the entry, or the account number designated is not an open account.' ,
        action: 'Contact your customer and confirm the Routing Number, Bank Account Number and the exact name on the bank account. (You can request a copy of a voided check so that you can verify.) If this information does not exactly match what you initially entered, make changes and submit a NEW payment.'
    },
    { 
        responseCode: 'R04', 
        title: 'Invalid Account Number', 
        description: 'The account number structure is not valid. The entry may fail the check digit validation or may contain an incorrect number of digits.',
        action: 'Obtain the correct bank account number. (You can request a copy of a voided check so that you can verify.) Submit a NEW payment using the corrected bank account number.' 
    },
    { 
        responseCode: 'R05', 
        title: 'Unauthorized Debit Entry', 
        description: 'Account number structure not valid: entry may fail check digit validation or may contain incorrect number of digits. You cannot re-submit this transaction. Any additional transactions you attempt to process against this account will also be returned unless your customer specifically instructs his bank to accept them.' ,
        action: 'Contact your customer and resolve any issues that caused the transaction to be disputed. You can ask the customer for a different form of payment, or ask to debit a different bank account. If you need to debit the same bank account, instruct your customer to call the bank and remove the block on transactions. Unfortunately, any additional transactions you attempt to process against this account will also be returned unless your customer specifically instructs his bank to accept them.'
    },
    { 
        responseCode: 'R06', 
        title: 'Returned per ODFI’s Request', 
        description: 'The ODFI has requested that the RDFI return the ACH entry. If the RDFI agrees to return the entry, the ODFI must indemnify the RDFI according to Article Five (Return, Adjustment, Correction, and Acknowledgment of Entries and Entry Information) of these Rules.' ,
        action: 'Please contact ACHQ'
    },
    { 
        responseCode: 'R07', 
        title: 'Authorization Revoked by Customer (adjustment entries)', 
        description: 'Authorization Revoked by Customer – Consumer, who previously authorized ACH payment, has revoked authorization from Originator (must be returned no later than 60 days from settlement date and customer must sign affidavit).',
        action:  'Immediately suspend any recurring payment schedules entered for this bank account. This will prevent additional transactions from being returned while you address the issue with your customer. Then contact your customer and resolve any issues that caused the transaction to be disputed or the schedule to be cancelled. You can ask the customer for a different form of payment, or ask to debit a different bank account. If you need to debit the same bank account, instruct your customer to call the bank and remove the block on transactions. Unfortunately, there is no dispute resolution available to you within the ACH Network. If your customer continues to claim the transaction was not authorized, but you have proof that it was properly authorized, you will need to sue your customer in Small Claims Court to collect. If this action is taken, please contact ACHQ.' 
    },
    { 
        responseCode: 'R08', 
        title: 'Payment Stopped or Stop Payment on Item', 
        description: 'The Receiver of a recurring debit transaction has the right to stop payment on any specific ACH debit. The RDFI should verify the Receiver’s intent when a request for stop payment is made to ensure this is not intended to be a revocation of authorization. A stop payment order shall remain in effect until the earliest of the following occurs: a lapse of six months from the date of the stop payment order, payment of the debit entry has been stopped, or the Receiver withdraws the stop payment order. OR The RDFI determines that a stop payment order has been placed on the item to which the PPD debit entry constituting notice of presentment or the PPD Accounts Receivable Truncated Check Debit Entry relates. [The RDFI determines that a stop payment order has been placed on the item to which the PPD Accounts Receivable Truncated Check Debit Entry relates.]',
        action: 'What to Do: Contact your customer and resolve any issues that caused the transaction to be stopped. You can re-enter the returned transaction again with proper authorization from your customer. You can also ask your customer for a different form of payment.'
    },
    { 
        responseCode: 'R09', 
        title: 'Uncollected Funds', 
        description: 'Sufficient book or ledger balance exists to satisfy the dollar value of the transaction, but the dollar value of transactions in the process of collection (i.e., uncollected checks) brings the available and/or cash  reserve balance below the dollar value of the debit entry.',
        action: 'You can try the transaction again up to two times within 30 days of the original authorization date.' 
    },
    { 
        responseCode: 'R10', 
        title: 'Customer Advises Not Authorized; Item Is Ineligible, Notice Not Provided, Signatures Not Genuine, or Item Altered (adjustment entries)', 
        description: `For entries to Consumer Accounts that are not PPD debit entries constituting notice of presentment or 
        PPD Accounts Receivable Truncated Check Debit Entries in accordance with Article Two, subsection 2.1.4(2), the RDFI has been notified by its customer, 
        the Receiver, that the Originator of a given transaction has not been authorized to debit his account. 
        [For entries to Consumer Accounts that are not PPD Accounts Receivable Truncated Check Debit 
            Entries in accordance with Article Two, subsection 2.1.4(2) (Authorization/Notification for PPD Accounts Receivable Truncated Check Debit Entries), the RDFI has been notified by its customer, 
            the Receiver, that the Originator of a given transaction has not been authorized to debit his account.]`,
        action: 'The Receiver may request immediate credit from the RDFI for an unauthorized debit.  The request must be made in writing within fifteen (15) days after the RDFI sends or makes available to the Receiver information pertaining to that debit entry.' 
    },
    { 
        responseCode: 'R11', 
        title: `Check Truncation Entry Return`, 
        description: `To be used when returning a check truncation entry.  This reason for return should be used only if no other return reason code is applicable.  
        The RDFI should use the appropriate field in the addenda record to specify the reason for return (i.e., “exceeds dollar limit,” “no match on ARP,” “stale date,” etc.)`,
        action: `Immediately suspend any recurring payment schedules entered for this bank account. 
        This will prevent additional transactions from being returned while you address the issue with your customer. 
        Then contact your customer and resolve any issues that caused the transaction to be disputed or the schedule to be cancelled.

        You can ask the customer for a different form of payment, or ask to debit a different bank account.
        If you need to debit the same bank account, instruct your customer to call the bank and remove the block on transactions.
        
        Unfortunately, there is no dispute resolution available to you within the ACH Network. If your customer continues to claim the transaction was not authorized, 
        but you have proof that it was properly authorized, you will need to sue your customer in Small Claims Court to collect. If this action is taken, please contact ACHQ.'`
    },
    { 
        responseCode: 'R12', 
        title: 'Branch Sold to Another DFI', 
        description: `A financial institution may continue to receive entries destined for an account at a branch that has been sold to another financial institution.  Because the RDFI no longer maintains the account and is unable to post the entry, it should return the entry to the ODFI.What to Do:
        Obtain new Routing Number and Bank Account Number information, then enter a NEW transaction using the updated account numbers.
        
         If the transaction was part of a recurring payment schedule, be sure to update the schedule to use the new bank account.`,
        action: `No action found` 
    },
    { 
        responseCode: 'R13', 
        title: 'RDFI not qualified to participate', 
        description: `Financial institution is not qualified to participate in ACH or the routing number is incorrect.`,
        action: `Double-check that you entered the Routing Number correctly, and contact your customer to confirm it if necessary. 
        Then submit a NEW payment using the correct routing number.` 
    },
    { 
        responseCode: 'R14', 
        title: 'Representative Payee Deceased or Unable to Continue in that Capacity', 
        description: `The representative payee is a person or institution authorized to accept entries on behalf of 
        one or more other persons, such as legally incapacitated adults or minor children.  
        The representative payee is either deceased or unable to continue in that capacity.  The beneficiary is not deceased.`,
        action: `action not found` 
    },
    { 
        responseCode: 'R15', 
        title: 'Beneficiary or Account Holder (Other Than a Representative Payee) Deceased', 
        description: `(1) The beneficiary is the person entitled to the benefits and is deceased.  The beneficiary may or may not be the account holder;
        or(2) The account holder (acting in a non-representative payee capacity) is an owner of the account and is deceased.`,
        action: `action no found` 
    },
    { 
        responseCode: 'R16', 
        title: 'Account Frozen', 
        description: `The funds in the account are unavailable due to specific action taken by the RDFI or by legal action.`,
        action: `Obtain a different form of payment. You will not be able to process transactions using this bank account until it is un-frozen.` 
    },
    { 
        responseCode: 'R17', 
        title: 'File Record Edit Criteria (Specify)', 
        description: `Some fields that are not edited by the ACH Operator are edited by the RDFI.  
        If the entry cannot be processed by the RDFI, the field(s) causing the processing error must be identified in the 
        addenda record information field of the return.`,
        action: `action not found` 
    },
    { 
        responseCode: 'R20', 
        title: 'Non-Transaction Account', 
        description: `The ACH entry destined for a non-transaction account. 
        This would include either an account against which transactions are prohibited or limited.`,
        action: `Contact your customer to obtain authorization to charge a different bank account. Or Ask for a different form of payment.` 
    },
    { 
        responseCode: 'R21', 
        title: 'Invalid Company Identification', 
        description: `The identification number used in the Company Identification Field is not valid.  
        This Return Reason Code will normally be used on CIE transactions.`,
        action: `action not found` 
    },
    { 
        responseCode: 'R22', 
        title: 'Invalid Individual ID Number', 
        description: `In CIE and MTE entries, the Individual ID Number is used by the Receiver to identify the account.  
        The Receiver has indicated to the RDFI that the number with which the Originator was identified is not correct.`,
        action: `action not found` 
    },
    { 
        responseCode: 'R23', 
        title: 'Credit Entry Refused by Receiver', 
        description: `The Receiver may return a credit entry because one of the following conditions exists:  (1) a 
        minimum amount required by the Receiver has not been remitted; (2) the exact amount required has not been remitted; (3) 
        the account is subject to litigation and the Receiver will not accept the transaction; (4) acceptance of the transaction 
        results in an overpayment; (5) the Originator is not known by the Receiver; or (6) 
        the Receiver has not authorized this credit entry to this account.`,
        action: `Contact your customer to work out the problem, or ask them to work the problem out with their bank. 
        Have your customer confirm that the refund will be accepted, then attempt to refund the transaction again. 
        Alternately, you can send your customer a paper check for the refund  amount.` 
    },
    { 
        responseCode: 'R', 
        title: 'title', 
        description: `description`,
        action: `action not found` 
    },
    { 
        responseCode: 'R', 
        title: 'title', 
        description: `description`,
        action: `action not found` 
    },

    // More entries here...
];

const acknowledgeCommunicationDetails = [
    {
        statusCode: 'AC100',
        description: 'AC Pending'
    },
    {
        statusCode: 'AC101',
        description: 'AC Declined'
    },
    {
        statusCode: 'AC102',
        description: 'AC Approved'
    },
    {
        statusCode: 'AC103',
        description: 'AC Error'
    },
    {
        statusCode: 'AC104',
        description: 'AC Voided'
    },
    {
        statusCode: 'AC105',
        description: 'AC Processed'
    },
    {
        statusCode: 'AC106',
        description: 'AC Collected'
    },
    {
        statusCode: 'AC107',
        description: 'AC Awaiting Capture'
    },
    {
        statusCode: 'AC108',
        description: 'AC Awaiting Approval'
    },
    {
        statusCode: 'AC109',
        description: 'AC Suspended'
    },
    {
        statusCode: 'AC110',
        description: 'AC In Collection'
    },
    {
        statusCode: 'AC111',
        description: 'AC In Research'
    },
    {
        statusCode: 'AC112',
        description: 'AC Disputed'
    },
    {
        statusCode: 'AC113',
        description: 'AC Uncollected, Insufficient Funds'
    },
    {
        statusCode: 'AC114',
        description: 'AC Invalid or Closed Account'
    },
    {
        statusCode: 'AC115',
        description: 'AC Other Returns'
    },
    {
        statusCode: 'AC116',
        description: 'AC None'
    },
    {
        statusCode: 'AC117',
        description: 'AC Expired'
    },
    {
        statusCode: 'AC118',
        description: 'AC Settled'
    }
];

const eFtDeclineCodes = [
    {
        statusCode: '900',
        description: 'Account information incorrectly entered'
    },
    {
        statusCode: '901',
        description: 'Insufficient Funds'
    },
    {
        statusCode: '902',
        description: 'Account not Found'
    },
    {
        statusCode: '903',
        description: 'Payment Stopped/Recalled'
    },
    {
        statusCode: '904',
        description: 'Post/Stale Dated'
    },
    {
        statusCode: '905',
        description: 'Account Closed'
    },
    {
        statusCode: '907',
        description: 'No Debit Allowed'
    },
    {
        statusCode: '908',
        description: 'Funds Not Cleared'
    },
    {
        statusCode: '909',
        description: 'Currency/Account Mismatch'
    },
    {
        statusCode: '910',
        description: 'Payor/Payee Deceased'
    },
    {
        statusCode: '911',
        description: 'Account Frozen'
    },
    {
        statusCode: '912',
        description: 'Invalid/Incorrect Account No'
    },
    {
        statusCode: '914',
        description: 'Incorrect Payor/Payee Name'
    },
    {
        statusCode: '915',
        description: 'No Agreement Existed - Business/Personal Refused'
    },
    {
        statusCode: '916',
        description: 'Not in accordance with Agreement - Personal'
    },
    {
        statusCode: '917',
        description: 'Agreement Revoked - Personal'
    },
    {
        statusCode: '918',
        description: 'No Confirmation/Pre-Notification - Personal'
    },
    {
        statusCode: '919',
        description: 'Not in accordance with Agreement - Business'
    },
    {
        statusCode: '920',
        description: 'Agreement Revoked - Business'
    },
    {
        statusCode: '921',
        description: 'No Pre-Notification - Business'
    },
    {
        statusCode: '922',
        description: 'Customer Initiated Return - Credit Only'
    },
    {
        statusCode: '990',
        description: 'Institution in Default'
    },
    {
        statusCode: '996',
        description: 'Chargeback'
    }
];

const transactionTypes = [
    {
        value: '0',
        name: 'External',
        description: 'This transaction is created when the Feedback API is called to update the status of a transaction created with a paymentType of Retrieval.'
    },
    {
        value: '1',
        name: 'Authorize',
        description: 'This is a transaction created with paymentType is Deferred or Recurring.'
    },
    {
        value: '2',
        name: 'Pay',
        description: 'This is a transaction created with paymentType of Instant.'
    },
    {
        value: '3',
        name: 'Capture',
        description: 'Capture transactions are created with the Capture API.'
    },
    {
        value: '4',
        name: 'Refund',
        description: 'Capture transactions are created with the Refund API.'
    },
    {
        value: '5',
        name: 'Reverse',
        description: 'A reverse transaction is created when the payment is charged back by the bank (payment provider).'
    },
    {
        value: '6',
        name: 'Deposit',
        description: 'Deposit transactions are created with the Deposit API.'
    },
    {
        value: '7',
        name: 'Reclaim',
        description: 'Reclaim transactions are created with the Reclaim API.'
    },
    {
        value: '8',
        name: 'Representment',
        description: 'A representment transaction represents an attempt to reprocess a previously denied Capture transaction.'
    },
    {
        value: '9',
        name: 'Tokenization',
        description: ''
    },
    {
        value: '10',
        name: 'Preauthorization',
        description: 'Preauthorization transactions are created with the Preauthorization API.'
    },
    {
        value: '11',
        name: 'Guarantee',
        description: ''
    }
];

const userCanceledStatusCodes = [
    {
        statuscode: 'UC01',
        description: 'User canceled the transaction at bank selection page'
    },
    {
        statuscode: 'UC02',
        description: 'User canceled the transaction at login page'
    },
    {
        statuscode: 'UC03',
        description: 'User canceled the transaction at invalid login page'
    },
    {
        statuscode: 'UC04',
        description: 'User canceled the transaction at challenge question page'
    },
    {
        statuscode: 'UC05',
        description: 'User canceled the transaction at invalid answers for challenge questions page.'
    },
    {
        statuscode: 'UC06',
        description: 'User canceled the transaction at MFA page'
    },
    {
        statuscode: 'UC07',
        description: 'User canceled the transaction at invalid MFA page'
    },
    {
        statuscode: 'UC08',
        description: 'User canceled the transaction at account selection page'
    },
    {
        statuscode: 'UC09',
        description: 'User canceled the transaction at error page'
    },
    {
        statuscode: 'UC10',
        description: 'User canceled the transaction at partial account number page'
    },
    {
        statuscode: 'UC11',
        description: 'User canceled the transaction at select account location page'
    },
    {
        statuscode: 'UC12',
        description: 'User canceled the transaction because it does not have a bank on the list'
    },
    {
        statuscode: 'UC13',
        description: 'User canceled the transaction at login with captcha page'
    },
    {
        statuscode: 'UC14',
        description: 'User canceled the transaction at captcha validation page'
    },
    {
        statuscode: 'UC15',
        description: 'User canceled the transaction at manual account input page'
    },
    {
        statuscode: 'UC16',
        description: 'User canceled the transaction at manual account confirmation page'
    },
    {
        statuscode: 'UC17',
        description: 'User canceled the transaction at MCD confirmation page'
    },
    {
        statuscode: 'UC18',
        description: 'User canceled the transaction at MCD validation page'
    },
    {
        statuscode: 'UC19',
        description: 'User canceled the transaction at account profile input page'
    },
    {
        statuscode: 'UC20',
        description: 'User canceled the transaction at no dynamic balance page'
    },
    {
        statuscode: 'UC21',
        description: 'User canceled the transaction at partial account not supported page'
    },
    {
        statuscode: 'UC22',
        description: 'User canceled the transaction at security script page'
    },
    {
        statuscode: 'UC23',
        description: 'User canceled the transaction at account not supported page'
    },
    {
        statuscode: 'UC24',
        description: 'User canceled the transaction at authorize page with exception'
    },
    {
        statuscode: 'UC25',
        description: 'User canceled the transaction at bad account page'
    },
    {
        statuscode: 'UC26',
        description: 'User canceled the transaction at the bank\'s reset password screen'
    },
    {
        statuscode: 'UC27',
        description: 'User canceled the transaction because the bank was unavailable'
    },
    {
        statuscode: 'UC28',
        description: 'User canceled the transaction at an external screen'
    },
    {
        statuscode: 'UC29',
        description: 'User canceled the transaction due to a timeout'
    },
    {
        statuscode: 'UC30',
        description: 'User canceled on the manual entry screen after an invalid routing or account number entry'
    },
    {
        statuscode: 'UC31',
        description: 'User canceled on the manual entry screen due to related information (SWIFT code or address) not being found'
    },
    {
        statuscode: 'UC32',
        description: 'User canceled the transaction at the maintenance page'
    },
    {
        statuscode: 'UC33',
        description: 'User canceled the transaction at non-eligible currency error page'
    },
    {
        statuscode: 'UC34',
        description: 'User canceled the transaction at Connect to your bank (OAuth login) page'
    },
    {
        statuscode: 'UC35',
        description: 'User canceled the transaction at Waiting for your approval page'
    },
    {
        statuscode: 'UC36',
        description: 'User canceled the transaction at VAN info page'
    },
    {
        statuscode: 'UC37',
        description: 'User canceled the transaction at widget within Lightbox page'
    },
    {
        statuscode: 'UC39',
        description: 'User canceled the transaction indirectly by allowing the FI OAuth login session to expire'
    }
];


function findStatusDetails(statusCode) {
    return statusList.find(status => status.responseCode === statusCode.trim());
}

function findReturnDetails(returnCode) {
    return returnDetails.find(code => code.responseCode === returnCode.trim());
}

function findACDetails(statusCode) {
    return acknowledgeCommunicationDetails.find(code => code.statusCode === statusCode.trim());
}

function findTransactionTypesDetails(transactionType) {
    return transactionTypes.find(type => type.name === transactionType.trim());
}

function findEFTDeclineCodeDetails(statusCode) {

    const cleanedStatusCode = statusCode.replace('EFT_', '').trim();

    return eFtDeclineCodes.find(code => code.statusCode === cleanedStatusCode);
}

function findUserCanceledDetailsCode(statusCode) {

    return userCanceledStatusCodes.find(code => code.statuscode === statusCode.trim());
}



// function showToast(htmlContent, element) {
//     const toast = document.createElement('div');
//     toast.classList.add('toast');
//     toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

//     // Center the toast horizontally and set it 200px from the top
//     toast.style.position = 'fixed';
//     toast.style.top = '100px';
//     toast.style.left = '50%';
//     toast.style.transform = 'translateX(-50%)';

//     document.body.appendChild(toast);

//     // Show the toast
//     toast.style.opacity = "1";

//     // Remove toast after a delay
//     let removalTimeout;

//     function removeToast() {
//         removalTimeout = setTimeout(() => {
//             toast.style.opacity = "0";
//             setTimeout(() => {
//                 toast.remove();
//             }, 500); // Fade out duration
//         }, 1000); // Delay before starting fade out
//     }

//     // Clear the removal timeout if the mouse enters the toast
//     function clearRemoveToast() {
//         clearTimeout(removalTimeout);
//     }

//     element.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseleave', removeToast);
//     toast.addEventListener('mouseenter', clearRemoveToast);
//     element.addEventListener('mouseenter', clearRemoveToast); // Optional: prevent removal if mouse re-enters the element
// }

function showToast(htmlContent, element) {
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.innerHTML = htmlContent; // Use innerHTML to set HTML content

    toast.style.position = 'fixed';
    toast.style.top = '100px';
    toast.style.left = '50%';
    toast.style.transform = 'translateX(-50%)';
    toast.style.backgroundColor = '#0C0C0D';
    //toast.style.color = '#262626';

    document.body.appendChild(toast);

    // Show the toast
    toast.style.opacity = "1";

    // Remove toast after a delay
    let removalTimeout;

    function removeToast() {
        removalTimeout = setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => {
                toast.remove();
            }, 500); // Fade out duration
        }, 1000); // Delay before starting fade out
    }

    // Clear the removal timeout if the mouse enters the toast
    function clearRemoveToast() {
        clearTimeout(removalTimeout);
    }

    element.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseleave', removeToast);
    toast.addEventListener('mouseenter', clearRemoveToast);
    element.addEventListener('mouseenter', clearRemoveToast); // Optional: prevent removal if mouse re-enters the element
}
