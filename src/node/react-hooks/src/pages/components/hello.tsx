import React,  { useState, useEffect } from "react";

interface HelloProps { 
    compiler: string; 
    framework: string; 
}

export const Hello = (props: HelloProps) => <h1>Hello from darknest teste {props.compiler} and {props.framework}!</h1>;

interface Post {
    title: string,
    author: string
    id: number
}

export const Button: React.FC = () => {
    const [value, setValue] = React.useState(0);

    const onClick= (e: React.MouseEvent) => {
        setValue(value + 1)
    }

    useEffect(() =>{
        document.title = `You clicked ${value} times`;
    })

    return (<div>
        <Hello compiler="Teste" framework={value.toString()}></Hello>
        <DataLoader>
            { (data: Array<Post>) => data.map((x: Post) => <Hello compiler={x.title} framework={x.author}></Hello>)}
        </DataLoader>
        <button onClick={onClick}>Click here to add</button>
    </div>)
}

export function DataLoader(props : any){
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() =>{
            fetch("http://localhost:3000/posts")
            .then(response => response.json())
            .then(data => {
                setData(data);
                setIsLoading(false);
            });
        } , 4000)
    }, []);

    return (<div>
         { isLoading ? "Loading" : props.children(data)}
    </div>)
}