import {FC} from "react";
import Header from "@components/Header";

export const Page: FC = ({children}) => {
    return <div>
        <Header/>
        <h2>I am a page component</h2>
        {children}
    </div>
}
