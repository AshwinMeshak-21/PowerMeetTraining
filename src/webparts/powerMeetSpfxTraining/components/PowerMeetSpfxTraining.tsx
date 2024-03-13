import * as React from 'react';
import type { IPowerMeetSpfxTrainingProps } from './IPowerMeetSpfxTrainingProps';
import "@pnp/sp/webs";
import "@pnp/sp/sputilities";
import { Suspense } from 'react';
import Loader from './Loader/Index';
const DocumentMainForm = React.lazy(
  () => import("../components/CreateRequestScreen/CreateRequestForm")
);
export default class PowerMeetSpfxTraining extends React.Component<IPowerMeetSpfxTrainingProps, {}> {

  render() {
    

    
    
    return (
      <Suspense fallback={<Loader />}>
      <DocumentMainForm/>
      </Suspense>
    );
  }
}
