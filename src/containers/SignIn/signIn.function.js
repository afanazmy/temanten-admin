import { Form } from 'antd';
import { paths } from 'routes';
import { useAppProvider } from 'hooks';
import { FormattedMessage } from 'components';
import { useNavigate } from 'react-router-dom';
import { saveToken, setFieldsError } from 'helpers';
import { useEffect, useRef, useState } from 'react';
import { useCreation, useMemoizedFn, useRequest } from 'ahooks';

import useSignInFetch from './signIn.api';

export const useSignInController = () => {
  const drawerSetup = useRef();
  const [form] = Form.useForm();
  const fetch = useSignInFetch();
  const navigate = useNavigate();

  const { data, loading: loadingGetSetupWizards } = useRequest(fetch.getSetupWizards, {
    onSuccess: (response) => {
      if (response?.result?.length === 0) return;
      drawerSetup?.current?.onOpen?.();
    },
  });

  const {
    run: postSignIn,
    error: postSignInError,
    loading: loadingPostSignIn,
  } = useRequest(fetch.postSignIn, {
    manual: true,
    onSuccess: (response) => {
      const { token } = response?.result || {};
      saveToken({ token });
      navigate(paths.home);
    },
  });

  useEffect(() => setFieldsError({ error: postSignInError, form }), [form, postSignInError]);

  const onSignIn = useMemoizedFn((values) => {
    postSignIn(values);
  });

  return { form, drawerSetup, setupWizards: data?.result, loadingGetSetupWizards, onSignIn, loadingPostSignIn };
};

export const useDrawerSetupController = ({ setupWizards }) => {
  const fetch = useSignInFetch();
  const { app } = useAppProvider();
  const [step, setStep] = useState(0);
  const [open, setOpen] = useState(false);

  const onOpen = useMemoizedFn(() => setOpen(true));
  const onClose = useMemoizedFn(() => setOpen(false));

  const { run: postSetupWizard, loading: loadingPostSetupWizard } = useRequest(fetch.postSetupWizard, {
    manual: true,
    onSuccess: () => setOpen(false),
  });

  const { language } = app || {};
  const items = useCreation(() => {
    const items = setupWizards?.map?.(({ name }) => ({ title: name?.[language] }));
    items?.push({ title: <FormattedMessage id="signIn.Finish Setup" /> });
    return items;
  }, [JSON.stringify(setupWizards), language]);

  const onFinish = useMemoizedFn((values) => {
    const isLastStep = step === setupWizards?.length;
    if (!isLastStep) return setStep(setupWizards?.length);
    postSetupWizard(values);
  });

  const onFinishFailed = useMemoizedFn(() => setStep(0));

  return { open, items, step, setStep, onOpen, onClose, onFinish, onFinishFailed, loadingPostSetupWizard };
};
