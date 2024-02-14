import { Box, Button, Skeleton, useDisclosure } from '@chakra-ui/react';
import React from 'react';

import type { SmartContractSecurityAuditSubmission } from 'types/api/contract';

import useApiQuery from 'lib/api/useApiQuery';
import dayjs from 'lib/date/dayjs';
import ContainerWithScrollY from 'ui/shared/ContainerWithScrollY';
import FormModal from 'ui/shared/FormModal';
import LinkExternal from 'ui/shared/LinkExternal';

import ContractSubmitAuditForm from './contractSubmitAuditForm/ContractSubmitAuditForm';

const SCROLL_GRADIENT_HEIGHT = 24;

type Props = {
  addressHash?: string;
}

const ContractSecurityAudits = ({ addressHash }: Props) => {
  const { data, isPlaceholderData } = useApiQuery('contract_security_audits', {
    pathParams: { hash: addressHash },
    queryOptions: {
      placeholderData: { items: [] },
      enabled: Boolean(addressHash),
    },
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const [ hasScroll, setHasScroll ] = React.useState(false);

  React.useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    setHasScroll(containerRef.current.scrollHeight >= containerRef.current.clientHeight + SCROLL_GRADIENT_HEIGHT / 2);
  }, []);

  const formTitle = 'Submit audit';

  const modalProps = useDisclosure();

  const renderForm = React.useCallback(() => {
    return <ContractSubmitAuditForm address={ addressHash } onSuccess={ modalProps.onClose }/>;
  }, [ addressHash, modalProps.onClose ]);

  return (
    <>
      <Button variant="outline" size="sm" onClick={ modalProps.onOpen }>Submit audit</Button>
      { data?.items && data.items.length > 0 && (
        <Box position="relative">
          <ContainerWithScrollY
            gradientHeight={ SCROLL_GRADIENT_HEIGHT }
            hasScroll={ hasScroll }
            rowGap={ 1 }
            w="100%"
            maxH="80px"
            ref={ containerRef }
            mt={ 2 }
          >
            { data.items.map(item => (
              <Skeleton isLoaded={ !isPlaceholderData } key={ item.audit_company_name + item.audit_publish_date }>
                <LinkExternal href={ item.audit_report_url }>
                  { `${ item.audit_company_name }, ${ dayjs(item.audit_publish_date).format('MMM DD, YYYY') }` }
                </LinkExternal>
              </Skeleton>
            )) }
          </ContainerWithScrollY>
        </Box>
      ) }
      <FormModal<SmartContractSecurityAuditSubmission>
        isOpen={ modalProps.isOpen }
        onClose={ modalProps.onClose }
        title={ formTitle }
        renderForm={ renderForm }
      />
    </>
  );
};

export default ContractSecurityAudits;
