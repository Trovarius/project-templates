import React from 'react';

import { Hello, Button} from "./pages/components/hello";

export default () => {
  return (<div>
      <Hello compiler="TypeScript" framework="React" />
      <Button></Button>
  </div>);
};