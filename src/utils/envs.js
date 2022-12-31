export const availableEnv = {
  REACT_APP_APP_NAME: 'string',
  REACT_APP_API_URL: 'string',
  REACT_APP_CLIENT_ID: 'string',
  REACT_APP_CLIENT_SECRET: 'string',
};

/**
 * get value dari env, terutama untuk API base URL,
 * supaya API base URL nya bisa di config dari docker environment
 * @param {keyof availableEnv} key
 */
export const envs = (key) => {
  const values = {
    REACT_APP_APP_NAME: process.env.REACT_APP_APP_NAME,
    REACT_APP_CLIENT_ID: process.env.REACT_APP_CLIENT_ID,
    REACT_APP_CLIENT_SECRET: process.env.REACT_APP_CLIENT_SECRET,
    // REACT_APP_API_URL: '$REACT_APP_API_URL',
    REACT_APP_API_URL: process.env.REACT_APP_API_URL,
  };

  const value = values?.[key] || process.env?.[key];

  if (!value) {
    console.error(`environtment with key: ${key} not found`);
    return;
  }

  /**
   * ketika API base URL nya tidak di replace oleh docker,
   * yang ditandai dengan value nya diawali `$REACT_APP_`,
   * maka akan diambil dari .env langsung
   */
  if (value?.startsWith?.('$REACT_APP_')) {
    return process.env?.[key];
  }

  return value;
};
