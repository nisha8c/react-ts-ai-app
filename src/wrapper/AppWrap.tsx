import React, {FC} from 'react';
import { SocialMedia } from '../components';

const AppWrap = (Component: FC, idName: string, classNames: string) => function HOC() {
    return (
        <div id={idName} className={`app__container ${classNames}`}>
            <SocialMedia />
            <div className="app__wrapper app__flex">
                <Component />
            </div>
        </div>
    );
};

export default AppWrap;