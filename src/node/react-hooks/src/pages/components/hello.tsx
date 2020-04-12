import * as React from "react";

interface HelloProps { 
    compiler: string; 
    framework: string; 
}

export const Hello = (props: HelloProps) => <h1>Hello from darknest teste {props.compiler} and {props.framework}!</h1>;


export const Button: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const onClick= (e: React.MouseEvent) => {
        setValue(value + 1)
    }

    return (<div>
        <Hello compiler="Teste" framework={value.toString()}></Hello>
        <button onClick={onClick}>Click here to add</button>
    </div>)
}
