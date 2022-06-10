import React from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
type SortButtonPropsType = {
    accessor: string
    header: string
    type: string
    sortDir: {
        direction: string,
    }
    onClick: (newDirection: string, header: string) => void;
}

//todo: занести стейт в компонент, колБэк сделать утилитой, это повысит универсальность
export const SortButton = (props: SortButtonPropsType) => {
    const onClickHandler = () => {
      if(props.sortDir.direction === '0') props.onClick("", props.accessor)
        else if (props.sortDir.direction === '1') props.onClick("0", props.accessor)
        else if (props.sortDir.direction === '') props.onClick("1", props.accessor)
    }

    return <div onClick={()=> props.type === 'sorted' && onClickHandler()}>
        {props.type === 'sorted' && props.sortDir.direction === '1' && <ArrowUpwardIcon/>}
        {props.type === 'sorted' && props.sortDir.direction === '' && <ArrowDownwardIcon/>}
        {props.header}
    </div>
}

