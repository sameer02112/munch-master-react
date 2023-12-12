import { useState } from "react";

const Instamart = () => {

    const [sectionConfig, setSectionConfig] = useState("about");
    return(
        <div>
            {/* <Section
                title = {"about instamart"}
                isVisible = {sectionConfig == 'about'}
                setIsVisible = {() => setSectionConfig('about')}
                description = {'Laborum incididunt pariatur nulla deserunt tempor sint occaecat cupidatat ad enim. Nostrud sit dolor quis exercitation reprehenderit magna est occaecat. Velit commodo est cillum nisi id laborum sint nostrud nostrud deserunt proident irure laborum elit. Ipsum anim irure in est est irure elit minim adipisicing. Laborum aliquip in labore aute adipisicing consectetur.'}/>
            <Section
                title = {"about team"}
                isVisible = {sectionConfig == 'team'}
                setIsVisible = {() => setSectionConfig('team')}
                description = {'Laborum incididunt pariatur nulla deserunt tempor sint occaecat cupidatat ad enim. Nostrud sit dolor quis exercitation reprehenderit magna est occaecat. Velit commodo est cillum nisi id laborum sint nostrud nostrud deserunt proident irure laborum elit. Ipsum anim irure in est est irure elit minim adipisicing. Laborum aliquip in labore aute adipisicing consectetur.'}/> */}
            Instamart TODO
        </div>
    )
}

const Section = ({title, description, isVisible, setIsVisible}) => {

    return(
        <div>
            <h3>{title}</h3>
            {isVisible && <p>{description}</p>}
            <button onClick={() => setIsVisible(!isVisible)}>{isVisible ? 'hide' : 'show'}</button>
        </div>
    )
}

export default Instamart;