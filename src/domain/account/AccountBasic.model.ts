import { FirebaseTypeChange } from "../utils/FirebaseTypeChange";

export class AccountBasic {
  email: string;
  name: string;
  phone: string;
  isPubAdmin: boolean;
  getApproval: boolean;
  createdAt: Date;
  lastLogin: Date;

  constructor(
    email: string,
    name: string,
    phone: string,
    isPubAdmin: boolean,
    getApproval: boolean,
    createdAt: Date,
    lastLogin: Date
  ) {
    this.email = email;
    this.name = name;
    this.phone = phone;
    this.isPubAdmin = isPubAdmin;
    this.getApproval = getApproval;
    this.createdAt = createdAt;
    this.lastLogin = lastLogin;
  }

  static fromData(data: any): AccountBasic {
    try {
      const email = FirebaseTypeChange.stringFromData(data["email"]);
      const name = FirebaseTypeChange.stringFromData(data["name"]);
      const phone = FirebaseTypeChange.stringFromData(data["phone"]);
      const isPubAdmin = FirebaseTypeChange.booleanFromData(data["isPubAdmin"]);
      const getApproval = FirebaseTypeChange.booleanFromData(
        data["getApproval"]
      );
      const createdAt = FirebaseTypeChange.dateFromData(data["createdAt"]);
      const lastLogin = FirebaseTypeChange.dateFromData(data["lastLogin"]);

      return new AccountBasic(
        email,
        name,
        phone,
        isPubAdmin,
        getApproval,
        createdAt,
        lastLogin
      );
    } catch (error) {
      console.log(`[AccountBasic Model] fromData e: ${error}`);
      return AccountBasic.empty;
    }
  }

  static get empty() {
    return new AccountBasic("", "", "", false, false, new Date(), new Date());
  }

  get toMap() {
    return {
      email: this.email,
      name: this.name,
      phone: this.phone,
      isPubAdmin: this.isPubAdmin,
      getApproval: this.getApproval,
      createdAt: this.createdAt,
      lastLogin: this.lastLogin,
    };
  }
  get clone() {
    return new AccountBasic(
      this.email,
      this.name,
      this.phone,
      this.isPubAdmin,
      this.getApproval,
      this.createdAt,
      this.lastLogin
    );
  }
}
