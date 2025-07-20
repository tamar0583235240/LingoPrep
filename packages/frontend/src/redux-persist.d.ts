declare module 'redux-persist/integration/react' {
  import * as React from 'react';
  interface PersistGateProps {
    loading?: React.ReactNode;
    onBeforeLift?: () => void | Promise<void>;
    persistor: any;
    children?: React.ReactNode;
  }
  export class PersistGate extends React.Component<PersistGateProps> {}
}

declare module 'redux-persist/lib/storage' {
  const storage: any;
  export default storage;
}

declare module 'redux-persist';
