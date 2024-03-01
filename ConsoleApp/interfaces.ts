export interface Operator {
    id: number;
    name: string;
    description: string;
    age: number;
    active: boolean;
    birthdate: Date;
    profileImageUrl: string;
    status: string;
    hobbies: string[];
    otherOperator: OtherOperator;
  }
  
  export interface OtherOperator {
    id: number;
    role: string;
    primaryWeapon: string;
    secondaryWeapon: string;
    gadget: string;
    bio: string;
  }
  