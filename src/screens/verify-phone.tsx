import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { accountSelectors } from "../store/account/selectors";
import { setAccountDetails } from "../store/account/slice";
import { Card } from "../design-system/Card";
import { PageContents } from "../design-system/PageContents";
import { List } from "../design-system/List";
import { Text } from "../design-system/Text";
import { Button } from "../design-system/Button";
import { Divider } from "../design-system/Divider";
import { Heading } from "../design-system/Heading";
import { TextInput } from "../design-system/TextInput";
import { ProgressSteps } from "../components/ProgressSteps";
import { CardActions } from "../design-system/CardActions";
import { TextButton } from "../design-system/TextButton";

interface FormInput {
  verificationCode: string;
}

export function VerifyPhone() {
  const history = useHistory();
  const dispatch = useDispatch();
  const account = useSelector(accountSelectors.getAccount);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, errors } = useForm<FormInput>();

  const onSubmit = handleSubmit(() => {
    setIsSubmitting(true);

    setTimeout(() => {
      dispatch(setAccountDetails({ phoneVerified: true }));
      setIsSubmitting(false);
      history.push("/account-complete");
    }, 400);
  });

  return (
    <>
      <PageContents maxWidth={560}>
        <Card>
          <ProgressSteps currentStep={2} />
          <Divider />
          <List gap={3}>
            <Heading size={4} fontFamily="display">
              Check your phone
            </Heading>
            <Text>
              We’ve sent a text message with a six-digit code to{" "}
              <Text isBold={true} isInline={true}>
                {account.phone}
              </Text>
              .
            </Text>
            <Text>
              Enter the code below. This confirms that we have the right phone
              number for you.
            </Text>
          </List>
          <TextInput
            type="number"
            pattern="[0-9]*"
            name="verificationCode"
            label="Six-digit code"
            validationMessage={
              errors.verificationCode && "Please enter the six-digit code"
            }
            ref={register({
              required: true,
              pattern: /[0-9]{6}/,
            })}
          />
          <Divider />
          <CardActions>
            <Button variant="secondary" onClick={() => history.goBack()}>
              Go back
            </Button>
            <Button onClick={onSubmit} isLoading={isSubmitting}>
              Continue
            </Button>
          </CardActions>
        </Card>

        <Card>
          <List gap={1}>
            <Text isBold={true}>Used the wrong phone number?</Text>
            <TextButton onClick={() => history.push("/change-phone")}>
              Change phone number
            </TextButton>
          </List>
          <Divider />
          <List gap={1}>
            <Text isBold={true}>Not received the message?</Text>
            <Text>It might take a few minutes to arrive.</Text>
            <TextButton onClick={() => history.push("/resend-message")}>
              Resend text message
            </TextButton>
          </List>
        </Card>
      </PageContents>
    </>
  );
}
