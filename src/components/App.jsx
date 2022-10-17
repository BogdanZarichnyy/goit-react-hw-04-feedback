import { useState, useEffect } from "react";

import { Section } from "./Section";
import { FeedbackOptions } from "./FeedbackOptions";
import { Statistics } from "./Statistics";
import { Notification } from "./Notification";

import css from './Feedback.module.css';

export const App = () => {

    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });
    const [total, setTotal] = useState(0);
    const [positivePercentage, setPositivePercentage] = useState(0);

    useEffect(() => { 
        let totalValue = Object.values(state).reduce( (prevTotal, total) => prevTotal + total, 0 );
        setTotal(totalValue);
        setPositivePercentage(Math.round( ( 100 / totalValue ) * state.good ));
    }, [state]);

    const handleCount = ({ target: { innerText } }) => {
        setState( prevState => ({ ...prevState, [innerText.toLowerCase()]: prevState[innerText.toLowerCase()] + 1 }) );
    }
    
    return (
        <div className={css.data}>
            <div className={css.box}>

                <Section title="Please leave feedback">

                    <FeedbackOptions options={state} onLeaveFeedback={handleCount} />

                </Section>
                
                <Section title="Statistics">

                    {(total === 0 ?
                        <Notification title="There is no feedback"/> :
                        <Statistics
                            state={state}
                            total={total}
                            positivePercentage={positivePercentage}
                        />
                    )}
    
                </Section>

            </div>
        </div>
    );
}