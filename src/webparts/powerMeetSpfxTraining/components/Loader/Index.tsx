import * as React from "react";
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { Overlay,Spinner } from '@fluentui/react';

const styles = mergeStyleSets({
    loader:{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position:"fixed",
        width:"100%",
        height:"100%"
    }
})
export default class Loader extends React.Component<any,any>{
   public render()
    {
        return(
            <div>
               <Overlay isDarkThemed={true} style={{zIndex:1000000,position:'fixed'}}>
              <div className={styles.loader}>
             <Spinner/>
            </div>
          </Overlay>

            </div>
        )

    }
}