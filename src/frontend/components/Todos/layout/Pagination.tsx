import React, { useMemo } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getPaginationSettings, setCurrentPageNumber } from '../../../store/slices/todo';

export default () => {
    const paginationSettings = useAppSelector(getPaginationSettings);
    const { pagesCount, currentPageNumber } = paginationSettings;

    const pagesNumbers: number[] = useMemo(() => {
        const pagesNumbers: number[] = [];
        for (let i = 0; i < pagesCount; i++) {
            pagesNumbers.push(i);
        }
        return pagesNumbers;
    }, [pagesCount]);

    const dispatch = useAppDispatch();
    const changePageNumber = (pageNumber: number): void => {
        dispatch(setCurrentPageNumber(pageNumber));
    };

    return (
        <Row>
            <Col>
                <Stack gap={1} direction="horizontal">
                    {
                        pagesNumbers.map(pageNumber => {
                            const isCurrent = pageNumber === currentPageNumber;
                            return (
                                <Button
                                    key={pageNumber}
                                    children={String(pageNumber + 1)}
                                    variant={isCurrent ? 'primary' : 'default'}
                                    onClick={() => changePageNumber(pageNumber)}
                                    disabled={isCurrent}
                                />
                            );
                        })
                    }
                </Stack>
            </Col>
        </Row>
    );
};