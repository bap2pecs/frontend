import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import type { SmartContractMethodInput, SmartContractMethodArgType } from 'types/api/contract';

import { ARRAY_REGEXP } from '../utils';
import ContractMethodArrayButton from './ContractMethodArrayButton';
import ContractMethodFieldAccordion from './ContractMethodFieldAccordion';
import ContractMethodFieldInput from './ContractMethodFieldInput';
import ContractMethodFieldInputTuple from './ContractMethodFieldInputTuple';

interface Props {
  data: SmartContractMethodInput;
  level: number;
  basePath: string;
}

const ContractMethodFieldInputArray = ({ data, level, basePath }: Props) => {

  const [ registeredIndices, setRegisteredIndices ] = React.useState([ 0 ]);

  const handleAddButtonClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setRegisteredIndices((prev) => [ ...prev, prev[prev.length - 1] + 1 ]);
  }, []);

  const handleRemoveButtonClick = React.useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const itemIndex = event.currentTarget.getAttribute('data-index');
    if (itemIndex) {
      setRegisteredIndices((prev) => prev.filter((index) => index !== Number(itemIndex)));
    }
  }, [ ]);

  const type = data.type.slice(0, -2) as SmartContractMethodArgType;

  // TODO @tom2drum refactor this
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const content = (index: number) => {
    const itemData = { ...data, type, name: `item #${ (level ? `${ level }.` : '') + (index + 1) }` };

    if (data.components && type === 'tuple') {
      return <ContractMethodFieldInputTuple data={ itemData } basePath={ `${ basePath }:${ index }` } level={ level }/>;
    }

    const arrayMatch = type.match(ARRAY_REGEXP);

    if (arrayMatch) {
      return (
        <Box outline="1px dashed lightskyblue" w="100%">
          <Box lineHeight={ type.includes('tuple') ? '45px' : '32px' }>item #{ index + 1 }({ type })</Box>
          <ContractMethodFieldInputArray data={ itemData } level={ index + 1 } basePath={ `${ basePath }:${ index }` }/>
        </Box>
      );
    }

    return (
      <ContractMethodFieldInput data={ itemData } hideLabel path={ `${ basePath }:${ index }` } px={ 0 }/>
    );
  };

  const isNestedArray = data.type.includes('[][]');

  if (isNestedArray) {
    return <div>nested array</div>;
  }

  const isTupleArray = data.type.includes('tuple');

  if (isTupleArray) {
    return (
      <ContractMethodFieldAccordion
        level={ level }
        label={ `${ data.name || '<arg w/o name>' } (${ data.type }) level: ${ level }` }
      >
        { registeredIndices.map((registeredIndex, index) => {
          const itemData = { ...data, type, name: `item #${ (level ? `${ level }.` : '') + (index + 1) }` };

          return (
            <ContractMethodFieldInputTuple
              key={ registeredIndex }
              data={ itemData }
              basePath={ `${ basePath }:${ registeredIndex }` }
              level={ level }
              onAddClick={ index === registeredIndices.length - 1 ? handleAddButtonClick : undefined }
              onRemoveClick={ registeredIndices.length > 1 ? handleRemoveButtonClick : undefined }
              index={ registeredIndex }
            />
          );
        }) }
      </ContractMethodFieldAccordion>
    );
  }

  // primitive value array

  return (
    <Flex alignItems="flex-start" columnGap={ 3 } px="6px">
      <Box w="250px" fontSize="sm" flexShrink={ 0 } my="6px">
        { data.name || '<arg w/o name>' } ({ data.type })
      </Box>
      <Flex flexDir="column" rowGap={ 1 } w="100%">
        { registeredIndices.map((registeredIndex, index) => {
          return (
            <Flex key={ registeredIndex } alignItems="flex-start" columnGap={ 3 }>
              <ContractMethodFieldInput data={ data } hideLabel path={ `${ basePath }:${ index }` } px={ 0 }/>
              { registeredIndices.length > 1 &&
                <ContractMethodArrayButton index={ registeredIndex } onClick={ handleRemoveButtonClick } type="remove" my="6px"/> }
              { index === registeredIndices.length - 1 &&
                <ContractMethodArrayButton index={ registeredIndex } onClick={ handleAddButtonClick } type="add" my="6px"/> }
            </Flex>
          );
        }) }
      </Flex>
    </Flex>
  );
};

export default ContractMethodFieldInputArray;
