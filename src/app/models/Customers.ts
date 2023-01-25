export interface Customers {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  createdAt: Date;
  pdvNumber: string;
  phone: string;

  email?: string;
  occupation?: string;
  sends: sends[];
  transactions:transactions[]
  cardForSales: any[];
}


interface sends {
  id: number;
  amount: number;
  date: Date;
  sendType: string;
}

interface transactions{
  id:number;
  amount:number;
  date:Date;
  createdAt: Date;
}
