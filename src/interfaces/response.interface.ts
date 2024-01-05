interface AssignedMasterAccount {
  id: string;
  name: string;
}

interface TaxId {
  label: string;
  value: string;
  countryCode: string;
  description?: any;
}

interface AccountId {
  idType: string;
  label: string;
  value: string;
}

interface State {
  code: string;
  name: string;
}

interface Country {
  code: string;
  name: string;
}

interface PrintAddress {
  language: string;
  name: string;
  address: string;
}

interface PartyContact {
  title?: any;
  firstName: string;
  lastName: string;
  phone: string;
  fax: string;
  email: string;
  position: string;
}

interface PartyAddress {
  types: string[];
  line1: string;
  line2: string;
  city: string;
  state: State;
  country: Country;
  zipCode: string;
  printAddresses: PrintAddress[];
  partyContacts: PartyContact[];
}

interface SalesPerson {
  id: string;
  name: string;
}

interface AssignedAdmin {
  id: string;
  name: string;
}

interface LogisticsCoordinator {
  id: string;
  name: string;
}

interface Organization {
  salesPerson: SalesPerson;
  assignedAdmin: AssignedAdmin;
  logisticsCoordinator: LogisticsCoordinator;
}

interface ArPaymentTerms {
  code: string;
  description: string;
}

interface ApPaymentTerms {
  code: string;
  description: string;
}

interface CreditLimitCurrency {
  code: string;
  description: string;
}

interface CreditStatus {
  code: string;
  description: string;
}

interface Finance {
  paymentLookup: "C" | "B" | "P";
  arPaymentTerms: ArPaymentTerms;
  apPaymentTerms: ApPaymentTerms;
  creditLimit?: number;
  creditLimitCurrency: CreditLimitCurrency;
  creditStatus: CreditStatus;
}

interface SubOrganization {
  id: string;
  code: string;
  name: string;
}

export interface ShortParty {
  id: string;
  accountName: string;
  accountNumber: string;
}

export interface Party extends ShortParty {
  tenant: string;
  masterAccount: boolean;
  assignedMasterAccount: AssignedMasterAccount;
  taxId: TaxId;
  powerOfAttorney?: any;
  accountIds: AccountId[];
  accountTypes: string[];
  partyAddresses: PartyAddress[];
  address?: string;
  organization: Organization;
  finance: Finance;
  subOrganizations: SubOrganization[];
  tags?: any;
  active: boolean;
  createdBy?: any;
  createdDate: any;
  modifiedBy?: any;
  modifiedDate: any;
}
