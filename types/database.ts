export type Profile = {
  id: string;
  email: string;
  created_at: string;
  last_login: string;
  data_threshold: number;
};

export type NetworkEvent = {
  id: string;
  user_id: string;
  app_name: string;
  event_type: 'sent' | 'received';
  bytes: number;
  timestamp: string;
};

export type Alert = {
  id: string;
  user_id: string;
  type: string;
  message: string;
  read: boolean;
  created_at: string;
}; 