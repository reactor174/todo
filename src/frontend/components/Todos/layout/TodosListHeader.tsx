import React from 'react';
import TodoGrid from './TodoGrid';
import { useAppSelector } from '../../../store/hooks';
import { getCurrentUser } from '../../../store/slices/user';
import SortingTitle from './SortingTitle';

export default () => {
    const user = useAppSelector(getCurrentUser);

    return (
        <TodoGrid
            userName={<SortingTitle title="Username" sortingField={'userName'} />}
            eMail={<SortingTitle title="Email" sortingField={'eMail'} />}
            text="Todo text"
            isCompleted={<SortingTitle title="Completed" sortingField={'isCompleted'} />}
            isModified={<SortingTitle title="Modified" sortingField={'isModified'} />}
            actions={!!user ? 'Actions' : undefined}
        />
    );
};