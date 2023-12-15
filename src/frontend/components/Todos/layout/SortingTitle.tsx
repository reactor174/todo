import React from 'react';
import { SortingField } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { changeSorting, getSortingSettings } from '../../../store/slices/todo';
import useGetTodos from '../hooks/useGetTodos';

export default (props: { title: string, sortingField: SortingField }) => {
    const { sortingField, sortingOrder } = useAppSelector(getSortingSettings);

    const isEnabled = sortingField === props.sortingField;
    const currentOrder = !isEnabled ? 'asc' : sortingOrder;

    const nextPayload = { sortingOrder: 'asc', sortingField: props.sortingField, };
    if (isEnabled) {
        if (sortingOrder === 'asc') {
            nextPayload.sortingOrder = 'desc';
        }
        else {
            nextPayload.sortingField = 'id';
        }
    }

    const dispatch = useAppDispatch();
    const { refetchTodos } = useGetTodos();
    const onSortingChange = () => {
        dispatch(changeSorting(nextPayload));
        refetchTodos();
    };

    return (
        <div onClick={onSortingChange} className="sorting-title">
            { props.title }
            <span
                className={!isEnabled ? 'text-secondary' : 'text-primary'}
                children={currentOrder === 'asc' ? '▼' : '▲'}
            />
        </div>
    );
};