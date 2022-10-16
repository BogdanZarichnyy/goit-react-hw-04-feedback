import { useState } from "react";

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

    const countTotalFeedback = () => {
        return Object.values(state).reduce( (prevTotal, total) => prevTotal + total, 0 );
    }

    const countPositiveFeedbackPercentage = () => {
        return `${Math.round( ( 100 / countTotalFeedback() ) * state.good )}%`;
    }

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

                    {(countTotalFeedback() === 0 ?
                        <Notification title="There is no feedback"/> :
                        <Statistics
                            state={state}
                            total={countTotalFeedback}
                            positivePercentage={countPositiveFeedbackPercentage}
                        />
                    )}
    
                </Section>

            </div>
        </div>
    );
}