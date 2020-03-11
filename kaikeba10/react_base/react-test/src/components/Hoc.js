import React from "react";

function Kaikeba(props) {
  return (
    <div>
      {props.stage}-{props.name}
    </div>
  );
}

function withStage(Component) {
    const NewCompoent  = props =>{
        return <Component {...props} stage="react"></Component>
    }
    return NewCompoent
}

export default withStage(Kaikeba);
