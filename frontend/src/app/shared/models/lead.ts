export interface Lead {
   _id?: number | undefined;                     
  name: string;                     
  email: string;                  
  status: 'new' | 'contacted' | 'closed';
  createdAt?: Date;  
}
