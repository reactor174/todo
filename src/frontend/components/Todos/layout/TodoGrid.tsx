import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

interface TodosListGridProps {
    userName: React.ReactNode;
    eMail: React.ReactNode;
    text: React.ReactNode;
    isCompleted?: React.ReactNode;
    isModified?: React.ReactNode;
    actions?: React.ReactNode;
}

const isNotUndef = (value: any) => typeof value !== 'undefined';

export default (props: TodosListGridProps) => {
    const { userName, eMail, text, isCompleted, isModified, actions } = props;

    const maxTextWidth = 8;
    let usedWidth = 0;
    if (isNotUndef(isCompleted)) usedWidth += 2;
    if (isNotUndef(isModified)) usedWidth += 1;
    if (isNotUndef(actions)) usedWidth += 2;
    const textWidth = maxTextWidth - usedWidth;

    return (
        <Row>
            <Col md={2}>
                {userName}
            </Col>
            <Col md={2}>
                {eMail}
            </Col>
            <Col md={textWidth}>
                {text}
            </Col>
            {
                isNotUndef(isCompleted)
                &&
                <Col md={2}>
                    {isCompleted}
                </Col>
            }
            {
                isNotUndef(isModified)
                &&
                <Col md={1}>
                    {isModified}
                </Col>
            }
            {
                isNotUndef(actions)
                &&
                <Col md={2} className="text-end">
                    {actions}
                </Col>
            }
        </Row>
    );
};