import { Collapse } from 'antd';
import { useState } from 'react';

import { FormattedMessage } from 'components/Intl';

const { Panel } = Collapse;

/**
 * @typedef {Object} OptionalFieldProps
 * @property {import('react').ReactNode} title
 * @property {import('react').ReactNode} children
 * @property {import('components/Intl/FormattedMessage').IFormattedMessage['id']} moduleName
 * @property {Boolean} forceRender
 *
 * @param {OptionalFieldProps} props
 */
const OptionalField = ({ title, children, moduleName, forceRender }) => {
  const [open, setOpen] = useState([]);

  const header = () => {
    if (open?.length) return title || <FormattedMessage id="common.Show less" />;
    return (
      title || (
        <FormattedMessage id="common.Add {name} details" values={{ name: <FormattedMessage id={moduleName} /> }} />
      )
    );
  };

  return (
    <Collapse ghost onChange={setOpen} className="optional-field">
      <Panel key="optional-field" header={header()} forceRender={forceRender === false ? false : true}>
        {children}
      </Panel>
    </Collapse>
  );
};

export default OptionalField;
